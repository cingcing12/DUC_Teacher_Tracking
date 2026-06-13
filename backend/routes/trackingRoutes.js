const express = require("express");
const router = express.Router();
const { google, auth, SPREADSHEETS } = require("../config/googleClient");

const MASTER_TAB = "MasterTracking";

// ==========================================
// 🔥 THE "FORCE FRESH" CACHE SYSTEM
// ==========================================
let masterSheetCache = {
    rows: null,
    lastFetch: 0
};
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

const getMasterRows = async (sheets, forceFresh = false) => {
    // If frontend sends ?fresh=true, we SKIP the RAM cache completely!
    if (!forceFresh && masterSheetCache.rows && (Date.now() - masterSheetCache.lastFetch < CACHE_TTL)) {
        console.log("⚡ Serving from Fast RAM Cache!");
        return masterSheetCache.rows;
    }
    
    console.log("📥 Fetching LIVE data from Google Sheets...");
    const response = await sheets.spreadsheets.values.get({ 
        spreadsheetId: SPREADSHEETS.TRACKING, 
        range: `'${MASTER_TAB}'!A2:Q` 
    });
    
    masterSheetCache.rows = response.data.values || [];
    masterSheetCache.lastFetch = Date.now();
    return masterSheetCache.rows;
};

const extractPureCohort = (str) => {
    if (!str) return '';
    const match = str.match(/^(G\d+-[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)?)/i);
    return match ? match[1].toUpperCase() : String(str).trim();
};

const calculateHours = (start, end) => {
    if(!start || !end) return "0 ម៉ោង 00 នាទី";
    const s = new Date(`1970-01-01T${start}:00`);
    const e = new Date(`1970-01-01T${end}:00`);
    let diff = e - s;
    if (diff < 0) diff += 24 * 60 * 60 * 1000;
    const hrs = Math.floor(diff / 3600000);
    const mins = Math.round((diff % 3600000) / 60000);
    const formattedMins = mins < 10 ? `0${mins}` : mins;
    return `${hrs} ម៉ោង ${formattedMins} នាទី`;
};

// ==========================================
// ANTI-BROWSER CACHE MIDDLEWARE
// ==========================================
const noCache = (req, res, next) => {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate, max-age=0');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
};

// ==========================================
// POST: TRACK LESSON
// ==========================================
router.post("/track-lesson", async (req, res) => {
  try {
    const { teacherNameKh, department, subject, cohort, room, week, date, startTime, endTime, lessonNo, hours, content, notes, year, semester } = req.body;
    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: authClient });

    const pureCohort = extractPureCohort(cohort);
    let fullMajorName = pureCohort; 
    let fullFacultyName = department || "Unknown Department"; 

    const genMatch = pureCohort.match(/G(\d+)/i);
    const generation = genMatch ? `ជំនាន់ទី ${genMatch[1]}` : "Unknown";

    try {
        const majorRes = await sheets.spreadsheets.values.get({ spreadsheetId: SPREADSHEETS.TRACKING, range: "'Majors'!A2:B" });
        const match = majorRes.data.values.find(r => r[0] && pureCohort.includes(String(r[0]).trim()));
        if (match) fullMajorName = String(match[1]).trim();
    } catch (e) {}

    try {
        const facRes = await sheets.spreadsheets.values.get({ spreadsheetId: SPREADSHEETS.TRACKING, range: "'Faculties'!A2:B" });
        const match = facRes.data.values.find(r => r[0] && pureCohort.includes(String(r[0]).trim()));
        if (match) fullFacultyName = String(match[1]).trim();
    } catch (e) {}

    const safeDate = date ? `'${date}` : "";
    const safeStartTime = startTime ? `'${startTime}` : "";
    const safeEndTime = endTime ? `'${endTime}` : "";

    const rowData = [[
      fullFacultyName, fullMajorName, generation, year || "?", semester || "?", subject, pureCohort, teacherNameKh, week, safeDate, safeStartTime, safeEndTime, lessonNo, content, hours, notes || "", room               
    ]];

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEETS.TRACKING,
      range: `'${MASTER_TAB}'!A:Q`,
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: { values: rowData },
    });

    // 🔥 OBLITERATE THE CACHE: Forces the NEXT request to fetch live data
    masterSheetCache.rows = null;
    masterSheetCache.lastFetch = 0;

    res.json({ success: true, message: "Data saved successfully to Master Sheet" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error saving tracking data" });
  }
});

// ==========================================
// GET: CLASS HISTORY
// ==========================================
router.get("/class-history", noCache, async (req, res) => {
  try {
    const { cohort, subject, teacher } = req.query;
    if (!cohort) return res.status(400).json({ success: false, message: "Cohort required" });

    const pureCohort = extractPureCohort(cohort).trim().toLowerCase();
    const querySubject = String(subject || "").trim().toLowerCase();
    
    let targetTeacher = teacher ? String(teacher).replace(/លោកគ្រូ|អ្នកគ្រូ/g, '').trim() : "";
    if (!targetTeacher && cohort.includes('-')) {
        const parts = String(cohort).split('-');
        if (parts.length >= 4) targetTeacher = parts[3].replace(/លោកគ្រូ|អ្នកគ្រូ/g, '').trim();
    }

    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: authClient });

    // 🔥 CHECK FOR FRESH OVERRIDE
    const forceFresh = req.query.fresh === 'true';
    const rows = await getMasterRows(sheets, forceFresh); 
    
    const history = [];
    let totalMinutes = 0;

    rows.forEach(row => {
      const dbCohort = String(row[6] || "").trim().toLowerCase();
      const dbSubject = String(row[5] || "").trim().toLowerCase();
      const dbTeacher = String(row[7] || "");

      if (dbCohort === pureCohort && dbSubject === querySubject) {
        if (!targetTeacher || dbTeacher.includes(targetTeacher)) {
            history.push({
              week: parseInt(row[8] || "0", 10),
              date: String(row[9] || ""),
              time: `${row[10] || ""} - ${row[11] || ""}`,
              lessonNo: String(row[12] || ""),
              content: String(row[13] || ""),
              hours: String(row[14] || ""),
              notes: String(row[15] || "")
            });

            const hrMatch = String(row[14] || "").match(/(\d+)\s*ម៉ោង/);
            const minMatch = String(row[14] || "").match(/(\d+)\s*នាទី/);
            if (hrMatch) totalMinutes += parseInt(hrMatch[1], 10) * 60;
            if (minMatch) totalMinutes += parseInt(minMatch[1], 10);
        }
      }
    });

    const totalHrs = Math.floor(totalMinutes / 60);
    const totalMins = totalMinutes % 60;
    const totalHoursString = `${totalHrs} ម៉ោង ${totalMins < 10 ? '0'+totalMins : totalMins} នាទី`;

    history.sort((a, b) => (b.week || 0) - (a.week || 0));

    res.json({ success: true, data: history, totalHours: totalHoursString });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching history" });
  }
});

// ==========================================
// PUT: EDIT CLASS HISTORY
// ==========================================
router.put("/class-history", noCache, async (req, res) => {
  try {
    const { cohort, week, date, lessonNo, content, notes, startTime, endTime, subject, teacher } = req.body;
    
    const pureCohort = extractPureCohort(cohort).trim().toLowerCase();
    const querySubject = String(subject || "").trim().toLowerCase();
    let targetTeacher = teacher ? String(teacher).replace(/លោកគ្រូ|អ្នកគ្រូ/g, '').trim() : "";

    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: authClient });

    const rows = await getMasterRows(sheets);
    let rowIndex = -1;
    let existingData = [];

    for (let i = 0; i < rows.length; i++) {
      const dbCohort = String(rows[i][6] || "").trim().toLowerCase();
      const dbSubject = String(rows[i][5] || "").trim().toLowerCase();
      const dbTeacher = String(rows[i][7] || "");

      if (dbCohort === pureCohort && dbSubject === querySubject && String(rows[i][8]) == String(week)) {
          if (!targetTeacher || dbTeacher.includes(targetTeacher)) {
              rowIndex = i + 2; 
              existingData = rows[i];
              break;
          }
      }
    }

    if (rowIndex === -1) return res.status(404).json({ success: false, message: "Record not found" });

    const newHours = calculateHours(startTime, endTime);
    const safeDate = date ? `'${date}` : existingData[9] || "";
    const safeStartTime = startTime ? `'${startTime}` : existingData[10] || "";
    const safeEndTime = endTime ? `'${endTime}` : existingData[11] || "";

    const updatedRow = [
      existingData[0] || "", existingData[1] || "", existingData[2] || "", existingData[3] || "", existingData[4] || "", 
      existingData[5] || subject, existingData[6] || extractPureCohort(cohort), existingData[7] || teacher, String(week), 
      safeDate, safeStartTime, safeEndTime, String(lessonNo), String(content), newHours, String(notes || ""), existingData[16] || "" 
    ];

    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEETS.TRACKING, 
      range: `'${MASTER_TAB}'!A${rowIndex}:Q${rowIndex}`,
      valueInputOption: "USER_ENTERED", 
      requestBody: { values: [updatedRow] },
    });

    masterSheetCache.rows = null;
    masterSheetCache.lastFetch = 0;

    res.json({ success: true, message: "Updated successfully" });
  } catch (error) { 
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" }); 
  }
});

// ==========================================
// DELETE: CLASS HISTORY
// ==========================================
router.delete("/class-history", noCache, async (req, res) => {
  try {
    const { cohort, week, subject, teacher } = req.query;
    
    const pureCohort = extractPureCohort(cohort).trim().toLowerCase();
    const querySubject = String(subject || "").trim().toLowerCase();
    let targetTeacher = teacher ? String(teacher).replace(/លោកគ្រូ|អ្នកគ្រូ/g, '').trim() : "";

    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: authClient });

    const rows = await getMasterRows(sheets);
    let rowIndex = -1;

    for (let i = 0; i < rows.length; i++) {
      const dbCohort = String(rows[i][6] || "").trim().toLowerCase();
      const dbSubject = String(rows[i][5] || "").trim().toLowerCase();
      const dbTeacher = String(rows[i][7] || "");

      if (dbCohort === pureCohort && dbSubject === querySubject && String(rows[i][8]) == String(week)) {
          if (!targetTeacher || dbTeacher.includes(targetTeacher)) {
              rowIndex = i + 2; 
              break;
          }
      }
    }

    if (rowIndex === -1) return res.status(404).json({ success: false, message: "Record not found" });

    const sheetIdRes = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEETS.TRACKING });
    const masterSheet = sheetIdRes.data.sheets.find(s => s.properties.title === MASTER_TAB);

    await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SPREADSHEETS.TRACKING,
        requestBody: {
            requests: [{
                deleteDimension: {
                    range: {
                        sheetId: masterSheet.properties.sheetId, dimension: "ROWS", startIndex: rowIndex - 1, endIndex: rowIndex        
                    }
                }
            }]
        }
    });

    masterSheetCache.rows = null;
    masterSheetCache.lastFetch = 0;

    res.json({ success: true, message: "Deleted successfully" });
  } catch (error) { 
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" }); 
  }
});

// GET: ADMIN TRACKING DIRECTORY
router.get('/tracking-directory', noCache, async (req, res) => {
  try {
    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: authClient });

    let avatarMap = {};
    try {
      const avatarRes = await sheets.spreadsheets.values.get({ spreadsheetId: SPREADSHEETS.TRACKING, range: "'Avatars'!A2:C" });
      const avatarRows = avatarRes.data.values || [];
      avatarRows.forEach(row => {
        const name = String(row[0] || '').trim();
        const imgUrl = String(row[2] || '').trim(); 
        if (name && imgUrl) {
          const cleanName = name.replace(/លោកគ្រូ|អ្នកគ្រូ/g, '').trim();
          avatarMap[cleanName] = imgUrl;
          avatarMap[name] = imgUrl;
        }
      });
    } catch (e) {}

    const forceFresh = req.query.fresh === 'true';
    const rows = await getMasterRows(sheets, forceFresh);
    
    const dirMap = {};

    rows.forEach(row => {
      if (!row[5] || !row[6] || String(row[5]).trim() === "" || String(row[6]).trim() === "") return;

      const dept = String(row[0] || "Unknown Department");
      const major = String(row[1] || "Unknown Major");
      const generation = String(row[2] || "Unknown Generation");
      const year = String(row[3] || "?");
      const semester = String(row[4] || "?");
      const subject = String(row[5]).trim();
      const cohort = String(row[6]).trim();
      const teacher = String(row[7] || "Unknown Teacher");
      const week = parseInt(row[8], 10);

      const key = `${cohort}_${subject}_${teacher}`;
      
      if (!dirMap[key]) {
          let cleanTeacherName = teacher.replace(/លោកគ្រូ|អ្នកគ្រូ/g, '').trim();
          let avatarUrl = avatarMap[cleanTeacherName] || avatarMap[teacher] || null;
          
          dirMap[key] = {
              tab: `${cohort}-${cleanTeacherName}-${subject}`, 
              generation: generation, year: year, semester: semester, department: dept, major: major, subject: subject, teacher: teacher, avatarUrl: avatarUrl, filledWeeks: []
          };
      }
      
      if (!isNaN(week) && !dirMap[key].filledWeeks.includes(week)) {
          dirMap[key].filledWeeks.push(week);
      }
    });

    res.json({ success: true, data: Object.values(dirMap) });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error loading directory" });
  }
});

// MAJORS AND FACULTY ROUTES OMITTED FOR BREVITY (Keep them exactly the same as before!)
module.exports = router;