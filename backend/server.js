const express = require("express");
const cors = require("cors");
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
// 🔥 THE API AUDITOR (TRIGGERED EXTERNALLY BY CRON-JOB.ORG)
// ==========================================
const normalizeText = (str) => String(str || "").replace(/[\s\u200B-\u200D\uFEFF]/g, '').toLowerCase();

// The secret key matching your cron-job.org URL
const CRON_SECRET = "DUC_AUDIT_2026_SECRET_KEY_12345"; 

app.get("/api/admin/run-nightly-audit", async (req, res) => {
    // 1. Security Check
    if (req.query.secret !== CRON_SECRET) {
        console.log("⚠️ Unauthorized attempt to run auditor.");
        return res.status(401).json({ success: false, message: "Unauthorized." });
    }

    console.log("🌙 EXTERNAL WAKE UP: Running Smart Retroactive Sweep...");
    
    try {
        const authClient = await auth.getClient();
        const sheets = google.sheets({ version: "v4", auth: authClient });

        // 🔥 Get current time in Cambodia
        const cambodiaTime = new Date(new Date().toLocaleString("en-US", {timeZone: "Asia/Phnom_Penh"}));
        console.log(`📅 [REAL-TIME CLOCK] Scanning up to: ${cambodiaTime.toDateString()} ${cambodiaTime.toLocaleTimeString()}`);

        const KHMER_MONTHS_RAW = {
            "មករា": 0, "កុម្ភៈ": 1, "មីនា": 2, "មេសា": 3, "ឧសភា": 4, "មិថុនា": 5,
            "កក្កដា": 6, "សីហា": 7, "កញ្ញា": 8, "តុលា": 9, "វិច្ឆិកា": 10, "ធ្នូ": 11
        };
        
        const KHMER_TO_MONTH_INDEX = {};
        for (const [key, val] of Object.entries(KHMER_MONTHS_RAW)) {
            KHMER_TO_MONTH_INDEX[normalizeText(key)] = val;
        }

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

            let pastColumnsToAudit = [];

            for (let r = 6; r < rows.length; r++) {
                if (!rows[r]) continue;

                const checkStr = normalizeText(rows[r][0]) + normalizeText(rows[r][1]) + normalizeText(rows[r][2]);
                const isDayHeader = checkStr.includes("ថ្ងៃ") || /monday|tuesday|wednesday|thursday|friday|saturday|sunday/i.test(checkStr);

                if (isDayHeader) {
                    pastColumnsToAudit = [];
                    
                    for (let c = 7; c < Math.max(rows[r].length, 100); c++) {
                        const dayCell = String(rows[r][c] || "").trim();
                        const colMonthText = monthMap[c];

                        if (dayCell !== "" && !isNaN(dayCell) && colMonthText) {
                            const monthIndex = KHMER_TO_MONTH_INDEX[colMonthText];
                            
                            if (monthIndex !== undefined) {
                                // Set this column's date to 11:59:00 PM of that specific day
                                const colDate = new Date(cambodiaTime.getFullYear(), monthIndex, parseInt(dayCell), 23, 59, 0); 
                                
                                // Is this column's 11:59 PM strictly older than the current time right now?
                                if (colDate < cambodiaTime) {
                                    pastColumnsToAudit.push(c); 
                                }
                            }
                        }
                    }
                    continue; 
                }

                if (pastColumnsToAudit.length > 0) {
                    const subject = String(rows[r][2] || "").trim(); 
                    const teacher = String(rows[r][3] || "").trim(); 

                    if (subject !== "" && teacher !== "") {
                        for (const targetColIndex of pastColumnsToAudit) {
                            const currentStatus = String(rows[r][targetColIndex] || "").trim();
                            
                            if (currentStatus === "") {
                                console.log(`🚨 Retro-Marked ABSENT ('A') for ${teacher} - ${subject} in tab ${tabTitle}`);
                                
                                paintRequests.push({
                                    updateCells: {
                                        range: { sheetId: sheetId, startRowIndex: r, endRowIndex: r + 1, startColumnIndex: targetColIndex, endColumnIndex: targetColIndex + 1 },
                                        rows: [{
                                            values: [{
                                                userEnteredValue: { stringValue: "A" },
                                                userEnteredFormat: {
                                                    backgroundColor: { red: 0.8, green: 0.0, blue: 0.0 }, 
                                                    textFormat: { foregroundColor: { red: 1, green: 1, blue: 1 }, bold: true }, 
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
        }

        if (paintRequests.length > 0) {
            await sheets.spreadsheets.batchUpdate({ spreadsheetId: SPREADSHEETS.ATTENDANCE, requestBody: { requests: paintRequests } });
            console.log(`✅ Swept and painted ${paintRequests.length} retroactive absences successfully!`);
            return res.status(200).json({ success: true, message: `Audited and painted ${paintRequests.length} records.` });
        } else {
            console.log("✅ No past absences found. Everyone's history is perfect!");
            return res.status(200).json({ success: true, message: "Audited. No absences found." });
        }

    } catch (error) {
        console.error("Retroactive auditor failed:", error);
        return res.status(500).json({ success: false, message: "Audit failed." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Secure Server running on port ${PORT}`);
});