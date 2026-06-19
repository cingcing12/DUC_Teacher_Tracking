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
// 🔥 THE NIGHTLY ATTENDANCE AUDITOR
// ==========================================
const normalizeText = (str) => String(str || "").replace(/[\s\u200B-\u200D\uFEFF]/g, '').toLowerCase();

const getColumnLetter = (colIndex) => {
    let letter = '';
    let temp = colIndex;
    while (temp >= 0) {
        letter = String.fromCharCode((temp % 26) + 65) + letter;
        temp = Math.floor(temp / 26) - 1;
    }
    return letter;
};

// Internal function for the Cron Job to mark "A"
const markAbsence = async (sheets, cohort, subject, teacher, dateStr) => {
    try {
        const dateObj = new Date(dateStr);
        const monthNum = String(dateObj.getMonth() + 1).padStart(2, '0');
        const targetDay = parseInt(dateObj.getDate());
        
        const KHMER_MONTHS = {
            "01": "មករា", "02": "កុម្ភៈ", "03": "មីនា", "04": "មេសា", "05": "ឧសភា", "06": "មិថុនា",
            "07": "កក្កដា", "08": "សីហា", "09": "កញ្ញា", "10": "តុលា", "11": "វិច្ឆិកា", "12": "ធ្នូ"
        };
        const khmerMonth = normalizeText(KHMER_MONTHS[monthNum]);

        const sheetMeta = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEETS.ATTENDANCE });
        const tabs = sheetMeta.data.sheets; 

        let targetSheetId = null;
        let targetRowIndex = -1;
        let targetColIndex = -1;

        const cleanTeacher = normalizeText(String(teacher).replace(/លោកគ្រូ|អ្នកគ្រូ|Dr\.|Dr/gi, ''));
        const cleanSubject = normalizeText(subject);
        const cleanCohort = normalizeText(String(cohort).replace(/^g\d+-/i, ''));

        for (const tab of tabs) {
            const tabTitle = tab.properties.title;
            const response = await sheets.spreadsheets.values.get({
                spreadsheetId: SPREADSHEETS.ATTENDANCE,
                range: `'${tabTitle}'!A1:AZ200`
            });
            const rows = response.data.values || [];
            if (rows.length < 7) continue;

            const monthRow = rows[5] || [];
            const monthMap = {};
            for (let c = 6; c < 100; c++) { 
                if (monthRow[c] && String(monthRow[c]).trim() !== "") monthMap[c] = normalizeText(monthRow[c]);
            }

            let bestRowMatch = -1, fallbackRowMatch = -1;
            for (let r = 7; r < rows.length; r++) { 
                if (!rows[r]) continue;
                const rowSubject = normalizeText(rows[r][2]); 
                const rowTeacher = normalizeText(rows[r][3]); 
                const rowCohortClean = normalizeText(rows[r][6]).replace(/^g\d+-/i, '');

                if (rowSubject === cleanSubject && rowTeacher.includes(cleanTeacher)) {
                    if (fallbackRowMatch === -1) fallbackRowMatch = r;
                    if (rowCohortClean.includes(cleanCohort) || cleanCohort.includes(rowCohortClean)) {
                        bestRowMatch = r; break;
                    }
                }
            }

            targetRowIndex = bestRowMatch !== -1 ? bestRowMatch : fallbackRowMatch;

            if (targetRowIndex !== -1) {
                targetSheetId = tab.properties.sheetId;
                let blockHeaderRowIdx = -1;
                
                for (let i = targetRowIndex; i >= 6; i--) {
                    if (!rows[i]) continue;
                    const checkStr = normalizeText(rows[i][0]) + normalizeText(rows[i][1]) + normalizeText(rows[i][2]);
                    if (checkStr.includes("ថ្ងៃ") || /monday|tuesday|wednesday|thursday|friday|saturday|sunday/i.test(checkStr)) {
                        blockHeaderRowIdx = i; break;
                    }
                }

                if (blockHeaderRowIdx !== -1) {
                    const dayRow = rows[blockHeaderRowIdx];
                    let closestDiff = 999;
                    let bestCol = -1;

                    for (let c = 7; c < Math.max(dayRow.length, 100); c++) {
                        const dayCell = String(dayRow[c] || "").trim();
                        if (dayCell !== "" && !isNaN(dayCell) && monthMap[c] === khmerMonth) {
                            const diff = Math.abs(parseInt(dayCell) - targetDay);
                            if (diff < closestDiff) {
                                closestDiff = diff; bestCol = c;
                            }
                        }
                    }
                    if (bestCol !== -1 && closestDiff <= 6) targetColIndex = bestCol;
                }
                if (targetColIndex !== -1) break; 
            }
        }

        if (targetRowIndex === -1 || targetColIndex === -1) return false;

        // Dark Red Background, White Text for "A"
        const requests = [{
            updateCells: {
                range: { sheetId: targetSheetId, startRowIndex: targetRowIndex, endRowIndex: targetRowIndex + 1, startColumnIndex: targetColIndex, endColumnIndex: targetColIndex + 1 },
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
        }];

        await sheets.spreadsheets.batchUpdate({ spreadsheetId: SPREADSHEETS.ATTENDANCE, requestBody: { requests } });
        console.log(`🚨 Auto-Marked ABSENT ('A') for ${teacher} - ${subject}`);
        return true;
    } catch (error) {
        console.error("Cron Job Visual Paint Error:", error);
        return false;
    }
};

// ⏰ Runs every single night at 11:59 PM (Phnom Penh Time)
cron.schedule('59 23 * * *', async () => {
  console.log("🌙 WAKING UP: Running Nightly Attendance Auditor...");
  try {
    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: authClient });

    // Get today's date in Cambodia time
    const now = new Date(new Date().toLocaleString("en-US", {timeZone: "Asia/Phnom_Penh"}));
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const todayName = dayNames[now.getDay()];
    const todayDateStr = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;

    console.log(`📅 Auditing for: ${todayName}, ${todayDateStr}`);

    // 1. Get everyone who ACTUALLY taught today
    const trackRes = await sheets.spreadsheets.values.get({ spreadsheetId: SPREADSHEETS.TRACKING, range: "'MasterTracking'!A2:Q" });
    const trackedRows = trackRes.data.values || [];
    const taughtToday = new Set();

    trackedRows.forEach(row => {
        const dbDate = String(row[9] || "").replace(/'/g, "").trim(); 
        if (dbDate === todayDateStr) {
            const subj = normalizeText(row[5]);
            const teacher = normalizeText(String(row[7]).replace(/លោកគ្រូ|អ្នកគ្រូ|Dr\.|Dr/gi, ''));
            taughtToday.add(`${subj}_${teacher}`);
        }
    });

    // 2. Cross-reference with the SCHEDULE to see who was SUPPOSED to teach today
    const schedRes = await sheets.spreadsheets.values.get({ spreadsheetId: SPREADSHEETS.SCHEDULE, range: "'Current Schedule'!A7:Q200" });
    const schedRows = schedRes.data.values || [];
    
    let currentDayBlock = "";

    for (let r = 0; r < schedRows.length; r++) {
        const row = schedRows[r];
        if (!row || row.length === 0) continue;

        const dayCell = String(row[1] || "").trim();
        if (dayCell.includes("-")) {
            currentDayBlock = dayCell.split("-")[1].trim(); // Gets "Monday"
        }

        // Only scan rows belonging to TODAY
        if (currentDayBlock === todayName) {
            const teacherNameRaw = String(row[2] || "").trim(); // Col C is Teacher Name
            if (!teacherNameRaw) continue;

            for (let c = 3; c <= 16; c++) { // Scan all class blocks in the row
                const cellValue = String(row[c] || "").trim();
                if (cellValue !== "") {
                    const lines = cellValue.split("\n").map(l => l.trim()).filter(l => l);
                    if (lines.length >= 2) {
                        const cohort = lines[0];
                        const subject = lines[1];

                        const cleanSubj = normalizeText(subject);
                        const cleanTeacher = normalizeText(teacherNameRaw.replace(/លោកគ្រូ|អ្នកគ្រូ|Dr\.|Dr/gi, ''));

                        // If they are scheduled, but missing from the tracking sheet...
                        if (!taughtToday.has(`${cleanSubj}_${cleanTeacher}`)) {
                            console.log(`⚠️ MISSED CLASS DETECTED: ${teacherNameRaw} did not track ${subject}.`);
                            await markAbsence(sheets, cohort, subject, teacherNameRaw, todayDateStr);
                        }
                    }
                }
            }
        }
    }
    console.log("✅ Nightly Audit Complete.");
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