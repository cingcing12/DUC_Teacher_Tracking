const express = require("express");
const router = express.Router();
const { google, auth, SPREADSHEETS } = require("../config/googleClient");

const MASTER_TAB = "MasterTracking";

// 🔥 SUPER FIX: Safely extracts "G1-DGD1" or "G1-PG-A1". 
const extractPureCohort = (str) => {
    if (!str) return '';
    const match = str.match(/^(G\d+-[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)?)/i);
    return match ? match[1].toUpperCase() : str.trim();
};

// 🔥 HELPER: Auto-calculates hours if time changes
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
// POST: TRACK LESSON (Appends to Master Sheet)
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

    const finalYear = year || "?";
    const finalSemester = semester || "?";

    try {
        const majorRes = await sheets.spreadsheets.values.get({ spreadsheetId: SPREADSHEETS.TRACKING, range: "'Majors'!A2:B" });
        const match = majorRes.data.values.find(r => r[0] && pureCohort.includes(r[0].trim()));
        if (match) fullMajorName = match[1].trim();
    } catch (e) {}

    try {
        const facRes = await sheets.spreadsheets.values.get({ spreadsheetId: SPREADSHEETS.TRACKING, range: "'Faculties'!A2:B" });
        const match = facRes.data.values.find(r => r[0] && pureCohort.includes(r[0].trim()));
        if (match) fullFacultyName = match[1].trim();
    } catch (e) {}

    // 🔥 DATE & TIME FIX: Adding apostrophe forces Google Sheets to treat it as TEXT, stopping the serial number bug!
    const safeDate = date ? `'${date}` : "";
    const safeStartTime = startTime ? `'${startTime}` : "";
    const safeEndTime = endTime ? `'${endTime}` : "";

    const rowData = [[
      fullFacultyName,   
      fullMajorName,     
      generation,        
      finalYear,         
      finalSemester,     
      subject,           
      pureCohort,        
      teacherNameKh,     
      week,              
      safeDate,          // 🔥 Fixed
      safeStartTime,     // 🔥 Fixed
      safeEndTime,       // 🔥 Fixed
      lessonNo,          
      content,           
      hours,             
      notes || "",       
      room               
    ]];

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEETS.TRACKING,
      range: `'${MASTER_TAB}'!A:Q`,
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: { values: rowData },
    });

    res.json({ success: true, message: "Data saved successfully to Master Sheet" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error saving tracking data" });
  }
});

// ==========================================
// GET: CLASS HISTORY (Filters Master Sheet)
// ==========================================
router.get("/class-history", async (req, res) => {
  try {
    const { cohort, subject, teacher } = req.query;
    if (!cohort) return res.status(400).json({ success: false, message: "Cohort required" });

    const pureCohort = extractPureCohort(cohort);
    let targetTeacher = teacher ? teacher.replace(/លោកគ្រូ|អ្នកគ្រូ/g, '').trim() : "";
    
    if (!targetTeacher && cohort.includes('-')) {
        const parts = cohort.split('-');
        if (parts.length >= 4) targetTeacher = parts[3].replace(/លោកគ្រូ|អ្នកគ្រូ/g, '').trim();
    }

    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: authClient });

    const response = await sheets.spreadsheets.values.get({ 
        spreadsheetId: SPREADSHEETS.TRACKING, 
        range: `'${MASTER_TAB}'!A2:Q` 
    });

    const rows = response.data.values || [];
    const history = [];
    let totalMinutes = 0;

    rows.forEach(row => {
      if (row[6] === pureCohort && row[5] === subject) {
        if (!targetTeacher || (row[7] && row[7].includes(targetTeacher))) {
            history.push({
              week: parseInt(row[8], 10),
              date: row[9] || "",
              time: `${row[10] || ""} - ${row[11] || ""}`,
              lessonNo: row[12] || "",
              content: row[13] || "",
              hours: row[14] || "",
              notes: row[15] || ""
            });

            const hrMatch = (row[14] || "").match(/(\d+)\s*ម៉ោង/);
            const minMatch = (row[14] || "").match(/(\d+)\s*នាទី/);
            if (hrMatch) totalMinutes += parseInt(hrMatch[1], 10) * 60;
            if (minMatch) totalMinutes += parseInt(minMatch[1], 10);
        }
      }
    });

    const totalHrs = Math.floor(totalMinutes / 60);
    const totalMins = totalMinutes % 60;
    const totalHoursString = `${totalHrs} ម៉ោង ${totalMins < 10 ? '0'+totalMins : totalMins} នាទី`;

    history.sort((a, b) => b.week - a.week);
    res.json({ success: true, data: history, totalHours: totalHoursString });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching history" });
  }
});

// ==========================================
// PUT: EDIT CLASS HISTORY
// ==========================================
router.put("/class-history", async (req, res) => {
  try {
    const { cohort, week, date, lessonNo, content, notes, startTime, endTime, subject, teacher } = req.body;
    const pureCohort = extractPureCohort(cohort);
    let targetTeacher = teacher ? teacher.replace(/លោកគ្រូ|អ្នកគ្រូ/g, '').trim() : "";

    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: authClient });

    const getRes = await sheets.spreadsheets.values.get({ 
        spreadsheetId: SPREADSHEETS.TRACKING, 
        range: `'${MASTER_TAB}'!A2:Q` 
    });

    const rows = getRes.data.values || [];
    let rowIndex = -1;
    let existingData = [];

    for (let i = 0; i < rows.length; i++) {
      if (rows[i][6] === pureCohort && rows[i][5] === subject && rows[i][8] == week) {
          if (!targetTeacher || (rows[i][7] && rows[i][7].includes(targetTeacher))) {
              rowIndex = i + 2; 
              existingData = rows[i];
              break;
          }
      }
    }

    if (rowIndex === -1) return res.status(404).json({ success: false, message: "Record not found" });

    const newHours = calculateHours(startTime, endTime);

    // 🔥 DATE & TIME FIX: Force text formatting on edits as well!
    const safeDate = date ? `'${date}` : existingData[9] || "";
    const safeStartTime = startTime ? `'${startTime}` : existingData[10] || "";
    const safeEndTime = endTime ? `'${endTime}` : existingData[11] || "";

    const updatedRow = [
      existingData[0] || "", 
      existingData[1] || "", 
      existingData[2] || "", 
      existingData[3] || "", 
      existingData[4] || "", 
      existingData[5] || subject, 
      existingData[6] || pureCohort,
      existingData[7] || teacher,
      week, 
      safeDate,        // 🔥 Fixed
      safeStartTime,   // 🔥 Fixed
      safeEndTime,     // 🔥 Fixed
      lessonNo, 
      content, 
      newHours, 
      notes || "",
      existingData[16] || "" 
    ];

    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEETS.TRACKING, 
      range: `'${MASTER_TAB}'!A${rowIndex}:Q${rowIndex}`,
      valueInputOption: "USER_ENTERED", 
      requestBody: { values: [updatedRow] },
    });

    res.json({ success: true, message: "Updated successfully" });
  } catch (error) { 
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" }); 
  }
});

// ==========================================
// DELETE: CLASS HISTORY
// ==========================================
router.delete("/class-history", async (req, res) => {
  try {
    const { cohort, week, subject, teacher } = req.query;
    const pureCohort = extractPureCohort(cohort);
    let targetTeacher = teacher ? teacher.replace(/លោកគ្រូ|អ្នកគ្រូ/g, '').trim() : "";

    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: authClient });

    const getRes = await sheets.spreadsheets.values.get({ 
        spreadsheetId: SPREADSHEETS.TRACKING, 
        range: `'${MASTER_TAB}'!A2:I` 
    });

    const rows = getRes.data.values || [];
    let rowIndex = -1;

    for (let i = 0; i < rows.length; i++) {
      if (rows[i][6] === pureCohort && rows[i][5] === subject && rows[i][8] == week) {
          if (!targetTeacher || (rows[i][7] && rows[i][7].includes(targetTeacher))) {
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
                        sheetId: masterSheet.properties.sheetId,
                        dimension: "ROWS",
                        startIndex: rowIndex - 1, 
                        endIndex: rowIndex        
                    }
                }
            }]
        }
    });

    res.json({ success: true, message: "Deleted successfully" });
  } catch (error) { 
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" }); 
  }
});

// ==========================================
// GET: ADMIN TRACKING DIRECTORY
// ==========================================
router.get('/tracking-directory', async (req, res) => {
  try {
    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: authClient });

    let avatarMap = {};
    try {
      const avatarRes = await sheets.spreadsheets.values.get({ spreadsheetId: SPREADSHEETS.TRACKING, range: "'Avatars'!A2:C" });
      const avatarRows = avatarRes.data.values || [];
      avatarRows.forEach(row => {
        const name = (row[0] || '').trim();
        const imgUrl = (row[2] || '').trim(); 
        if (name && imgUrl) {
          const cleanName = name.replace(/លោកគ្រូ|អ្នកគ្រូ/g, '').trim();
          avatarMap[cleanName] = imgUrl;
          avatarMap[name] = imgUrl;
        }
      });
    } catch (e) {}

    const response = await sheets.spreadsheets.values.get({ 
        spreadsheetId: SPREADSHEETS.TRACKING, 
        range: `'${MASTER_TAB}'!A2:I` 
    });
    
    const rows = response.data.values || [];
    const dirMap = {};

    rows.forEach(row => {
      if (!row[5] || !row[6] || row[5].trim() === "" || row[6].trim() === "") return;

      const dept = row[0] || "Unknown Department";
      const major = row[1] || "Unknown Major";
      const generation = row[2] || "Unknown Generation";
      const year = row[3] || "?";
      const semester = row[4] || "?";
      const subject = row[5].trim();
      const cohort = row[6].trim();
      const teacher = row[7] || "Unknown Teacher";
      const week = parseInt(row[8], 10);

      const key = `${cohort}_${subject}_${teacher}`;
      
      if (!dirMap[key]) {
          let cleanTeacherName = teacher.replace(/លោកគ្រូ|អ្នកគ្រូ/g, '').trim();
          let avatarUrl = avatarMap[cleanTeacherName] || avatarMap[teacher] || null;
          
          dirMap[key] = {
              tab: `${cohort}-${cleanTeacherName}-${subject}`, 
              generation: generation,
              year: year,
              semester: semester,
              department: dept,
              major: major,
              subject: subject,
              teacher: teacher,
              avatarUrl: avatarUrl,
              filledWeeks: []
          };
      }
      
      if (!isNaN(week) && !dirMap[key].filledWeeks.includes(week)) {
          dirMap[key].filledWeeks.push(week);
      }
    });

    res.json({ success: true, data: Object.values(dirMap) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error loading directory" });
  }
});

// MAJORS AND FACULTY ROUTES STAY EXACTLY THE SAME...
router.put('/majors/:code', async (req, res) => {
  try {
      const originalCode = req.params.code;
      const { newCode, fullName } = req.body;
      const authClient = await auth.getClient();
      const sheets = google.sheets({ version: "v4", auth: authClient });

      const response = await sheets.spreadsheets.values.get({ spreadsheetId: SPREADSHEETS.TRACKING, range: "'Majors'!A:B" });
      const rows = response.data.values || [];
      const rowIndex = rows.findIndex(r => r[0] === originalCode);
      if (rowIndex === -1) return res.status(404).json({ success: false, message: "Code not found" });

      await sheets.spreadsheets.values.update({
          spreadsheetId: SPREADSHEETS.TRACKING,
          range: `'Majors'!A${rowIndex + 1}:B${rowIndex + 1}`, 
          valueInputOption: "USER_ENTERED",
          requestBody: { values: [[newCode, fullName]] }
      });
      res.json({ success: true, newCode });
  } catch (error) { res.status(500).json({ success: false, message: "Error updating major" }); }
});

router.put('/faculties/:code', async (req, res) => {
  try {
      const originalCode = req.params.code;
      const { newCode, fullName } = req.body;
      const authClient = await auth.getClient();
      const sheets = google.sheets({ version: "v4", auth: authClient });

      const response = await sheets.spreadsheets.values.get({ spreadsheetId: SPREADSHEETS.TRACKING, range: "'Faculties'!A:B" });
      const rows = response.data.values || [];
      const rowIndex = rows.findIndex(r => r[0] === originalCode);
      if (rowIndex === -1) return res.status(404).json({ success: false, message: "Code not found" });

      await sheets.spreadsheets.values.update({
          spreadsheetId: SPREADSHEETS.TRACKING,
          range: `'Faculties'!A${rowIndex + 1}:B${rowIndex + 1}`, 
          valueInputOption: "USER_ENTERED",
          requestBody: { values: [[newCode, fullName]] }
      });
      res.json({ success: true, newCode });
  } catch (error) { res.status(500).json({ success: false, message: "Error updating faculty" }); }
});

router.delete('/majors/:code', async (req, res) => {
  try {
      const codeToDelete = req.params.code;
      const authClient = await auth.getClient();
      const sheets = google.sheets({ version: "v4", auth: authClient });

      const response = await sheets.spreadsheets.values.get({ spreadsheetId: SPREADSHEETS.TRACKING, range: "'Majors'!A:B" });
      const rows = response.data.values || [];
      const rowIndex = rows.findIndex(r => r[0] === codeToDelete);
      if (rowIndex === -1) return res.status(404).json({ success: false, message: "Code not found" });

      await sheets.spreadsheets.values.clear({
          spreadsheetId: SPREADSHEETS.TRACKING,
          range: `'Majors'!A${rowIndex + 1}:B${rowIndex + 1}`
      });
      res.json({ success: true });
  } catch (error) { res.status(500).json({ success: false, message: "Error deleting major" }); }
});

router.delete('/faculties/:code', async (req, res) => {
  try {
      const codeToDelete = req.params.code;
      const authClient = await auth.getClient();
      const sheets = google.sheets({ version: "v4", auth: authClient });

      const response = await sheets.spreadsheets.values.get({ spreadsheetId: SPREADSHEETS.TRACKING, range: "'Faculties'!A:B" });
      const rows = response.data.values || [];
      const rowIndex = rows.findIndex(r => r[0] === codeToDelete);
      if (rowIndex === -1) return res.status(404).json({ success: false, message: "Code not found" });

      await sheets.spreadsheets.values.clear({
          spreadsheetId: SPREADSHEETS.TRACKING,
          range: `'Faculties'!A${rowIndex + 1}:B${rowIndex + 1}`
      });
      res.json({ success: true });
  } catch (error) { res.status(500).json({ success: false, message: "Error deleting faculty" }); }
});

module.exports = router;