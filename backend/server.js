const express = require("express");
const cors = require("cors");
const cron = require("node-cron");
const { google, auth, SPREADSHEETS } = require("./config/googleClient");

// Import Routers
const teacherRoutes = require("./routes/teacherRoutes");
const scheduleRoutes = require("./routes/scheduleRoutes");
const trackingRoutes = require("./routes/trackingRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Mount the routes with the '/api' prefix
app.use("/api", teacherRoutes);
app.use("/api", scheduleRoutes);
app.use("/api", trackingRoutes);
app.use("/api", adminRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ 
    success: true, 
    message: "DUC Tracking API is awake and running perfectly!" 
  });
});

// ==========================================
// 🔥 THE PRODUCTION ATTENDANCE AUDITOR
// ==========================================
const normalizeText = (str) => String(str || "").replace(/[\s\u200B-\u200D\uFEFF]/g, '').toLowerCase();

// ⏰ RUNS EVERY NIGHT AT 11:59 PM (CAMBODIA TIME)
cron.schedule('59 23 * * *', async () => {
  console.log("🌙 WAKING UP: Running Nightly Attendance Auditor...");
  
  try {
    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: authClient });

    // 🔥 REAL-TIME CLOCK (Cambodia Time)
    const now = new Date(new Date().toLocaleString("en-US", {timeZone: "Asia/Phnom_Penh"}));
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const todayName = dayNames[now.getDay()]; 
    
    // Formatting YYYY-MM-DD for logs
    const todayDateStr = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`; 

    console.log(`📅 [REAL-TIME CLOCK] Auditing ONLY for: ${todayName}, ${todayDateStr}`);

    const monthNum = String(now.getMonth() + 1).padStart(2, '0');
    const targetDay = parseInt(now.getDate());
    
    const KHMER_MONTHS = {
        "01": "មករា", "02": "កុម្ភៈ", "03": "មីនា", "04": "មេសា", "05": "ឧសភា", "06": "មិថុនា",
        "07": "កក្កដា", "08": "សីហា", "09": "កញ្ញា", "10": "តុលា", "11": "វិច្ឆិកា", "12": "ធ្នូ"
    };
    const targetKhmerMonth = normalizeText(KHMER_MONTHS[monthNum]);

    const sheetMeta = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEETS.ATTENDANCE });
    const tabs = sheetMeta.data.sheets; 
    const paintRequests = [];

    for (const tab of tabs) {
        const tabTitle = tab.properties.title;
        const sheetId = tab.properties.sheetId;

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEETS.ATTENDANCE,
            range: `'${tabTitle}'!A1:AZ200`
        });
        const rows = response.data.values || [];
        if (rows.length < 7) continue;

        // 🔥 BULLETPROOF MONTH FINDER
        let monthRowIndex = -1;
        for (let r = 0; r < 8; r++) {
            if (rows[r] && rows[r].some(cell => /មករា|កុម្ភៈ|មីនា|មេសា|ឧសភា|មិថុនា|កក្កដា|សីហា|កញ្ញា|តុលា|វិច្ឆិកា|ធ្នូ/.test(normalizeText(cell)))) {
                monthRowIndex = r;
                break;
            }
        }

        const monthMap = {};
        if (monthRowIndex !== -1) {
            let currentMonth = "";
            for (let c = 6; c < 100; c++) { 
                if (rows[monthRowIndex][c] && String(rows[monthRowIndex][c]).trim() !== "") {
                    currentMonth = normalizeText(rows[monthRowIndex][c]);
                }
                monthMap[c] = currentMonth;
            }
        }

        let targetColIndex = -1;
        let isActiveBlock = false;

        for (let r = 6; r < rows.length; r++) {
            if (!rows[r]) continue;

            const checkStr = normalizeText(rows[r][0]) + normalizeText(rows[r][1]) + normalizeText(rows[r][2]);
            const isDayHeader = checkStr.includes("ថ្ងៃ") || /monday|tuesday|wednesday|thursday|friday|saturday|sunday/i.test(checkStr);

            if (isDayHeader) {
                targetColIndex = -1; 
                isActiveBlock = false;

                // Check if this block matches today's exact name
                if (checkStr.includes(todayName.toLowerCase())) {
                    isActiveBlock = true;
                    
                    for (let c = 7; c < Math.max(rows[r].length, 100); c++) {
                        const dayCell = String(rows[r][c] || "").trim();
                        
                        // Look for today's number
                        if (dayCell !== "" && !isNaN(dayCell) && parseInt(dayCell) === targetDay) {
                            if (monthRowIndex !== -1) {
                                if (monthMap[c] === targetKhmerMonth) {
                                    targetColIndex = c;
                                    break;
                                }
                            } else {
                                targetColIndex = c;
                            }
                        }
                    }
                    if (targetColIndex !== -1) {
                        console.log(`🎯 Locked onto Column Index [${targetColIndex}] for ${todayDateStr} in tab ${tabTitle}`);
                    }
                }
                continue; 
            }

            if (isActiveBlock && targetColIndex !== -1) {
                const subject = String(rows[r][2] || "").trim(); // Col C
                const teacher = String(rows[r][3] || "").trim(); // Col D

                if (subject !== "" && teacher !== "") {
                    const currentStatus = String(rows[r][targetColIndex] || "").trim();
                    
                    // If the exact cell is empty, mark "A"
                    if (currentStatus === "") {
                        console.log(`🚨 Auto-Marked ABSENT ('A') for ${teacher} - ${subject}`);
                        
                        paintRequests.push({
                            updateCells: {
                                range: { sheetId: sheetId, startRowIndex: r, endRowIndex: r + 1, startColumnIndex: targetColIndex, endColumnIndex: targetColIndex + 1 },
                                rows: [{
                                    values: [{
                                        userEnteredValue: { stringValue: "A" },
                                        userEnteredFormat: {
                                            backgroundColor: { red: 0.8, green: 0.0, blue: 0.0 }, // Dark Red
                                            textFormat: { foregroundColor: { red: 1, green: 1, blue: 1 }, bold: true }, // White Text
                                            horizontalAlignment: "CENTER", verticalAlignment: "MIDDLE"
                                        }
                                    }]
                                }],
                                fields: "userEnteredValue,userEnteredFormat(backgroundColor,textFormat,horizontalAlignment,verticalAlignment)"
                            }
                        });
                    }
                }
            }
        }
    }

    if (paintRequests.length > 0) {
        await sheets.spreadsheets.batchUpdate({ spreadsheetId: SPREADSHEETS.ATTENDANCE, requestBody: { requests: paintRequests } });
        console.log(`✅ Painted ${paintRequests.length} absent records for ${todayDateStr} successfully!`);
    } else {
        console.log(`✅ No absences found for ${todayDateStr}. Everyone submitted (or no classes scheduled)!`);
    }

  } catch (error) {
      console.error("Nightly auditor failed:", error);
  }
}, {
  scheduled: true,
  timezone: "Asia/Phnom_Penh"
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Secure Server running on http://localhost:${PORT}`);
});