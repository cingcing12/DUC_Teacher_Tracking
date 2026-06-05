const express = require("express");
const router = express.Router();
const { google, auth, SPREADSHEETS } = require("../config/googleClient");

// ==========================================
// GET: TEACHER SCHEDULE (WITH SMART GRID SCANNER & DEPARTMENT EXTRACTOR)
// ==========================================
router.get("/my-schedule", async (req, res) => {
  try {
    const teacherName = req.query.name;
    if (!teacherName) return res.status(400).json({ success: false, message: "Teacher name required" });

    const cleanSearchName = teacherName
      .replace("លោកគ្រូ", "").replace("អ្នកគ្រូ", "")
      .replace("បណ្ឌិត", "").replace("សាស្ត្រាចារ្យ", "")
      .replace("Dr.", "").trim();

    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: authClient });

    const myClasses = [];
    const tab = "Current Schedule"; 

    // 1. FETCH THE SCHEDULE TAB
    const scheduleData = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEETS.SCHEDULE,
      range: `'${tab}'!A7:Q200`,
    });

    const rows = scheduleData.data.values;

    if (rows && rows.length > 0) {
      const rooms = rows[0];
      let currentDay = "Unknown";

      for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        if (!row || row.length === 0) continue;

        const dayCell = row[1] ? row[1].trim() : "";
        if (dayCell && dayCell !== "DAY" && dayCell !== "LUNCH TIME" && dayCell.length > 1) {
          currentDay = dayCell.replace(/[\n\s]/g, "");
        }

        for (let c = 3; c <= 16; c++) {
          const cellValue = row[c];
          if (cellValue && cellValue.includes(cleanSearchName)) {
            const lines = cellValue.split("\n").map((l) => l.trim()).filter((l) => l);
            const roomName = rooms[c] || `DUC${c - 2}`;
            const group = lines[0] || "";
            const subject = lines[1] || "";
            const exactTime = lines[lines.length - 1].includes(":")
              ? lines[lines.length - 1].replace(/[()]/g, "").trim()
              : row[2] || "";

            myClasses.push({
              scheduleType: tab, 
              day: currentDay, 
              time: exactTime,
              room: roomName, 
              group: group, 
              subject: subject,
              year: "?",       
              semester: "?",   
              department: "?" // Default placeholder
            });
          }
        }
      }
    }

    // 🔥 2. SMART GRID SCANNER: CROSS-REFERENCE TEACHER DATABASE
    try {
      const teacherMeta = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEETS.TEACHER });
      const teacherTabs = teacherMeta.data.sheets.map(s => s.properties.title);
      
      const ranges = teacherTabs.map(t => `'${t}'!A1:BM100`);
      const teacherDataRes = await sheets.spreadsheets.values.batchGet({
        spreadsheetId: SPREADSHEETS.TEACHER,
        ranges: ranges
      });

      const courseInfoMap = {};
      const khmerToArabic = {'១':'1','២':'2','៣':'3','៤':'4','៥':'5','៦':'6'};

      teacherDataRes.data.valueRanges.forEach((rangeData, index) => {
        const tabName = teacherTabs[index]; // 🔥 GRABS THE EXACT SHEET TAB NAME
        const tRows = rangeData.values || [];
        if (tRows.length < 5) return;

        const yearRow = tRows[1] || [];
        const semRow = tRows[2] || [];
        const headerRow = tRows[3] || [];

        let currentYear = "?";
        let currentSem = "?";
        const columnMap = {};

        const maxCols = Math.max(yearRow.length, semRow.length, headerRow.length);

        for (let c = 0; c < maxCols; c++) {
          if (yearRow[c] && yearRow[c].includes("ឆ្នាំទី")) {
            const ym = yearRow[c].match(/ឆ្នាំទី\s*([១-៩1-9])/);
            if (ym) currentYear = khmerToArabic[ym[1]] || ym[1];
          }
          
          if (semRow[c] && semRow[c].includes("ឆមាសទី")) {
            const sm = semRow[c].match(/ឆមាសទី\s*([១-៩1-9])/);
            if (sm) currentSem = khmerToArabic[sm[1]] || sm[1];
          }
          
          columnMap[c] = { year: currentYear, semester: currentSem };
        }

        for (let r = 4; r < tRows.length; r++) {
          const tRow = tRows[r];
          if (!tRow) continue;
          
          for (let c = 0; c < tRow.length; c++) {
            if (headerRow[c] && headerRow[c].includes("មុខវិជ្ជា")) {
              const cellVal = (tRow[c] || "").trim();
              
              if (cellVal.length > 2) {
                courseInfoMap[cellVal.toUpperCase()] = { 
                  year: columnMap[c]?.year || "?", 
                  semester: columnMap[c]?.semester || "?",
                  department: tabName // 🔥 SAVES THE EXACT SHEET TAB NAME (e.g. មហាវិទ្យាល័យឧស្សាហកម្ម...)
                };
              }
            }
          }
        }
      });

      // 3. INJECT EXACT DATA INTO SCHEDULE
      myClasses.forEach(cls => {
        const cleanSubj = cls.subject.toUpperCase();
        if (courseInfoMap[cleanSubj]) {
          cls.year = courseInfoMap[cleanSubj].year;
          cls.semester = courseInfoMap[cleanSubj].semester;
          cls.department = courseInfoMap[cleanSubj].department; // 🔥 INJECTS IT TO THE FRONTEND!
        }
      });

    } catch (dbError) {
      console.error("Could not cross-reference Teacher DB", dbError);
    }

    res.json({ success: true, data: myClasses });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error reading schedule" });
  }
});

module.exports = router;