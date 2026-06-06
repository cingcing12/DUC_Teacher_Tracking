const express = require("express");
const router = express.Router();
const { google, auth, SPREADSHEETS } = require("../config/googleClient");

// ==========================================
// HELPER: FUZZY MATCHER
// Removes all spaces and casing to guarantee a perfect match
// ==========================================
const normalize = (str) => {
  return String(str || "").replace(/\s+/g, '').toLowerCase();
};

// ==========================================
// GET: TEACHER SCHEDULE (WITH DEEP ROW SCANNER)
// ==========================================
router.get("/my-schedule", async (req, res) => {
  try {
    const teacherName = req.query.name;
    if (!teacherName) return res.status(400).json({ success: false, message: "Teacher name required" });

    const cleanSearchName = teacherName
      .replace(/លោកគ្រូ|អ្នកគ្រូ|បណ្ឌិត|សាស្ត្រាចារ្យ|Dr\./g, "")
      .trim().toLowerCase();

    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: authClient });

    const myClasses = [];
    const tab = "Current Schedule"; 

    // 1. FETCH THE SCHEDULE TAB
    const scheduleData = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEETS.SCHEDULE,
      range: `'${tab}'!A7:Q200`,
    });

    const rows = scheduleData.data.values || [];

    if (rows.length > 0) {
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
          if (cellValue && cellValue.toLowerCase().includes(cleanSearchName)) {
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
              department: "?"  
            });
          }
        }
      }
    }

    // 🔥 2. SMART GRID SCANNER: CROSS-REFERENCE TEACHER DATABASE HEADERS & DATA ROWS
    try {
      const teacherMeta = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEETS.TEACHER });
      const teacherTabs = teacherMeta.data.sheets.map(s => s.properties.title);
      
      // INCREASED RANGE: We must read all the way down to get the subjects inside the teacher rows!
      const ranges = teacherTabs.map(t => `'${t}'!A1:BM200`); 
      const teacherDataRes = await sheets.spreadsheets.values.batchGet({
        spreadsheetId: SPREADSHEETS.TEACHER,
        ranges: ranges
      });

      const courseInfoMap = {};
      const khmerToArabic = {'១':'1','២':'2','៣':'3','៤':'4','៥':'5','៦':'6'};

      teacherDataRes.data.valueRanges.forEach((rangeData, index) => {
        const tabName = teacherTabs[index]; 
        const tRows = rangeData.values || [];
        if (tRows.length < 4) return;

        // DYNAMICALLY find which row holds Year, Semester, and Subject Headers
        let yearRowIdx = -1;
        let semRowIdx = -1;
        let headerRowIdx = -1;

        for (let r = 0; r < Math.min(8, tRows.length); r++) {
          const rowStr = normalize(tRows[r].join(""));
          if (yearRowIdx === -1 && (rowStr.includes("ឆ្នាំទី") || rowStr.includes("year"))) yearRowIdx = r;
          if (semRowIdx === -1 && (rowStr.includes("ឆមាសទី") || rowStr.includes("sem"))) semRowIdx = r;
          if (headerRowIdx === -1 && (rowStr.includes("មុខវិជ្ជា") || rowStr.includes("english") || rowStr.includes("khmer"))) headerRowIdx = r;
        }

        // Fallbacks
        if (yearRowIdx === -1) yearRowIdx = 1;
        if (semRowIdx === -1) semRowIdx = 2;
        if (headerRowIdx === -1) headerRowIdx = 3;

        const yearRow = tRows[yearRowIdx] || [];
        const semRow = tRows[semRowIdx] || [];
        const headerRow = tRows[headerRowIdx] || [];

        let currentYear = "?";
        let currentSem = "?";
        const columnMeta = {};

        const maxCols = Math.max(yearRow.length, semRow.length, headerRow.length);

        // Step A: Map out what each column represents (Year, Semester, and is it a Subject column?)
        for (let c = 0; c < maxCols; c++) {
          if (yearRow[c] && yearRow[c].includes("ឆ្នាំ")) {
            const ym = yearRow[c].match(/([១-៩1-9])/);
            if (ym) currentYear = khmerToArabic[ym[1]] || ym[1];
          }
          
          if (semRow[c] && semRow[c].includes("ឆមាស")) {
            const sm = semRow[c].match(/([១-៩1-9])/);
            if (sm) currentSem = khmerToArabic[sm[1]] || sm[1];
          }

          const hCell = normalize(headerRow[c]);
          const isSubjectColumn = hCell.includes("មុខវិជ្ជា") || hCell.includes("english") || hCell.includes("khmer") || hCell.includes("subject");
          
          columnMeta[c] = {
            year: currentYear,
            semester: currentSem,
            isSubject: isSubjectColumn
          };
        }

        // Step B: Loop through ALL teacher rows to grab the actual subject names!
        for (let r = headerRowIdx + 1; r < tRows.length; r++) {
          const row = tRows[r];
          if (!row) continue;

          for (let c = 0; c < row.length; c++) {
            if (columnMeta[c] && columnMeta[c].isSubject) {
              const subName = String(row[c] || "").trim();
              
              if (subName.length > 2) {
                courseInfoMap[normalize(subName)] = { 
                  year: columnMeta[c].year, 
                  semester: columnMeta[c].semester, 
                  department: tabName 
                };
              }
            }
          }
        }
      });

      // 3. INJECT EXACT DATA INTO SCHEDULE CLASSES
      myClasses.forEach(cls => {
        const cleanSubj = normalize(cls.subject);
        if (courseInfoMap[cleanSubj]) {
          cls.year = courseInfoMap[cleanSubj].year;
          cls.semester = courseInfoMap[cleanSubj].semester;
          cls.department = courseInfoMap[cleanSubj].department; 
        }
      });

    } catch (dbError) {
      console.error("Could not cross-reference Teacher DB", dbError);
    }

    res.json({ success: true, data: myClasses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error reading schedule" });
  }
});

module.exports = router;