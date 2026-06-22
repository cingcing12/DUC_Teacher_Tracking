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

// 🔥 UPGRADED: Smart Section Preserver! (Keeps -A or -B, drops teacher names)
const extractPureCohort = (str) => {
    if (!str) return '';
    let s = String(str).trim();
    
    // If it matches DUC format: G1-DSM, G2-ACT-A, etc.
    if (/^G\d+-/i.test(s)) {
        const parts = s.split('-');
        if (parts.length >= 3) {
            let pure = `${parts[0]}-${parts[1]}`;
            // If the 3rd part is small (1-3 letters, like A, B, M1), KEEP IT!
            if (/^[a-zA-Z0-9]{1,3}$/.test(parts[2])) {
                pure += `-${parts[2]}`;
            }
            return pure.toUpperCase();
        }
        return s.toUpperCase(); // For basic formats like G3-DEE
    }
    
    return s; // Fallback for non-standard formats
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

const noCache = (req, res, next) => {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate, max-age=0');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
};

// ==========================================
// 🔥 HELPER: OBLITERATE SPACES FOR FUZZY MATCHING
// ==========================================
const normalizeText = (str) => {
    return String(str || "")
        .replace(/[\s\u200B-\u200D\uFEFF]/g, '') 
        .toLowerCase();
};

// ==========================================
// 🔥 HELPER: STRICT VISUAL ATTENDANCE VALIDATOR + PAINTER
// ==========================================
const markVisualAttendance = async (sheets, cohort, subject, teacher, date, status) => {
    try {
        const dateObj = new Date(date);
        const monthNum = String(dateObj.getMonth() + 1).padStart(2, '0');
        const targetDay = parseInt(dateObj.getDate());
        
        const KHMER_MONTHS = {
            "01": "មករា", "02": "កុម្ភៈ", "03": "មីនា", "04": "មេសា", "05": "ឧសភា", "06": "មិថុនា",
            "07": "កក្កដា", "08": "សីហា", "09": "កញ្ញា", "10": "តុលា", "11": "វិច្ឆិកា", "12": "ធ្នូ"
        };
        const khmerMonth = normalizeText(KHMER_MONTHS[monthNum]);

        const genMatch = String(cohort).match(/G(\d+)/i);
        let targetGenKhmerStr = null;
        if (genMatch) {
            const khmerNums = ["០","១","២","៣","៤","៥","៦","៧","៨","៩"];
            const genKhmer = genMatch[1].split('').map(n => khmerNums[parseInt(n)]).join('');
            targetGenKhmerStr = `ជំនាន់ទី${genKhmer}`; 
        }

        const sheetMeta = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEETS.ATTENDANCE });
        const tabs = sheetMeta.data.sheets; 

        let targetSheetId = null;
        let targetTabTitle = null;
        let targetRowIndex = -1;
        let targetColIndex = -1;

        const cleanTeacher = normalizeText(String(teacher).replace(/លោកគ្រូ|អ្នកគ្រូ|Dr\.|Dr/gi, ''));
        const cleanSubject = normalizeText(subject);
        const cleanCohort = normalizeText(String(cohort).replace(/^g\d+-/i, ''));

        for (const tab of tabs) {
            const tabTitle = tab.properties.title;
            const normalizedTitle = normalizeText(tabTitle);

            if (targetGenKhmerStr && !normalizedTitle.includes(normalizeText(targetGenKhmerStr))) {
                continue; 
            }

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

            let bestRowMatch = -1;
            let fallbackRowMatch = -1;

            for (let r = 7; r < rows.length; r++) { 
                if (!rows[r]) continue;
                const rowSubject = normalizeText(rows[r][2]); 
                const rowTeacher = normalizeText(rows[r][3]); 
                const rowCohortClean = normalizeText(rows[r][6]).replace(/^g\d+-/i, '');

                if (rowSubject === cleanSubject && rowTeacher.includes(cleanTeacher)) {
                    if (fallbackRowMatch === -1) fallbackRowMatch = r;
                    if (rowCohortClean.includes(cleanCohort) || cleanCohort.includes(rowCohortClean)) {
                        bestRowMatch = r;
                        break;
                    }
                }
            }

            targetRowIndex = bestRowMatch !== -1 ? bestRowMatch : fallbackRowMatch;

            if (targetRowIndex !== -1) {
                targetSheetId = tab.properties.sheetId;
                targetTabTitle = tabTitle;
                let blockHeaderRowIdx = -1;
                
                for (let i = targetRowIndex; i >= 6; i--) {
                    if (!rows[i]) continue;
                    const checkStr = normalizeText(rows[i][0]) + normalizeText(rows[i][1]) + normalizeText(rows[i][2]);
                    if (checkStr.includes("ថ្ងៃ") || /monday|tuesday|wednesday|thursday|friday|saturday|sunday/i.test(checkStr)) {
                        blockHeaderRowIdx = i;
                        break;
                    }
                }

                if (blockHeaderRowIdx !== -1) {
                    const dayRow = rows[blockHeaderRowIdx];
                    for (let c = 7; c < Math.max(dayRow.length, 100); c++) {
                        const dayCell = String(dayRow[c] || "").trim();
                        if (dayCell !== "" && !isNaN(dayCell) && monthMap[c] === khmerMonth) {
                            if (parseInt(dayCell) === targetDay) {
                                targetColIndex = c;
                                break;
                            }
                        }
                    }
                }
                if (targetColIndex !== -1) break; 
            }
        }

        if (targetRowIndex === -1 || targetColIndex === -1) {
            return { success: false, message: `The date ${date} does not match the scheduled days for this class!` };
        }

        let bgRed = 1, bgGreen = 1, bgBlue = 1; 
        let txtRed = 0, txtGreen = 0, txtBlue = 0; 

        if (status === "✓") {
            bgRed = 0.2; bgGreen = 0.66; bgBlue = 0.33; 
            txtRed = 1; txtGreen = 1; txtBlue = 1; 
        } else if (status === "A") {
            bgRed = 0.8; bgGreen = 0.0; bgBlue = 0.0; 
            txtRed = 1; txtGreen = 1; txtBlue = 1; 
        } else if (status === "") {
            bgRed = 1; bgGreen = 1; bgBlue = 1; 
        }

        const requests = [{
            updateCells: {
                range: {
                    sheetId: targetSheetId,
                    startRowIndex: targetRowIndex,
                    endRowIndex: targetRowIndex + 1,
                    startColumnIndex: targetColIndex,
                    endColumnIndex: targetColIndex + 1
                },
                rows: [{
                    values: [{
                        userEnteredValue: { stringValue: status },
                        userEnteredFormat: {
                            backgroundColor: { red: bgRed, green: bgGreen, blue: bgBlue },
                            textFormat: { foregroundColor: { red: txtRed, green: txtGreen, blue: txtBlue }, bold: true },
                            horizontalAlignment: "CENTER",
                            verticalAlignment: "MIDDLE"
                        }
                    }]
                }],
                fields: "userEnteredValue,userEnteredFormat(backgroundColor,textFormat,horizontalAlignment,verticalAlignment)"
            }
        }];

        await sheets.spreadsheets.batchUpdate({
            spreadsheetId: SPREADSHEETS.ATTENDANCE,
            requestBody: { requests }
        });

        return { success: true };

    } catch (error) {
        console.error("Error marking visual attendance:", error);
        return { success: false, message: "System error while verifying the class date." };
    }
};

// ==========================================
// POST: TRACK LESSON
// ==========================================
router.post("/track-lesson", async (req, res) => {
  try {
    const { teacherNameKh, department, subject, cohort, room, week, date, startTime, endTime, lessonNo, hours, content, notes, year, semester } = req.body;
    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: authClient });

    const visualRes = await markVisualAttendance(sheets, cohort, subject, teacherNameKh, date, "✓");
    if (!visualRes.success) {
        return res.status(400).json({ success: false, message: visualRes.message });
    }

    const pureCohort = extractPureCohort(cohort);
    let fullMajorName = pureCohort; 
    let fullFacultyName = department || "Unknown Department"; 

    const genMatch = pureCohort.match(/G(\d+)/i);
    const generation = genMatch ? `ជំនាន់ទី ${genMatch[1]}` : "Unknown";

    let formattedYear = String(year || "?").trim();
    if (formattedYear === "1") formattedYear = "ឆ្នាំសិក្សាមូលដ្ឋាន";
    else if (formattedYear === "2") formattedYear = "ឆ្នាំទី២";
    else if (formattedYear === "3") formattedYear = "ឆ្នាំទី៣";
    else if (formattedYear === "4") formattedYear = "ឆ្នាំទី៤";

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
      fullFacultyName, fullMajorName, generation, formattedYear, semester || "?", subject, pureCohort, teacherNameKh, week, safeDate, safeStartTime, safeEndTime, lessonNo, content, hours, notes || "", room               
    ]];

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEETS.TRACKING,
      range: `'${MASTER_TAB}'!A:Q`,
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: { values: rowData },
    });

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
    const querySubject = normalizeText(subject); 
    
    let targetTeacher = teacher ? normalizeText(teacher.replace(/លោកគ្រូ|អ្នកគ្រូ|Dr\.|Dr/gi, '')) : "";
    if (!targetTeacher && cohort.includes('-')) {
        const parts = String(cohort).split('-');
        if (parts.length >= 4) targetTeacher = normalizeText(parts[3].replace(/លោកគ្រូ|អ្នកគ្រូ|Dr\.|Dr/gi, ''));
    }

    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: authClient });

    const forceFresh = req.query.fresh === 'true';
    const rows = await getMasterRows(sheets, forceFresh); 
    
    const history = [];
    let totalMinutes = 0;

    rows.forEach(row => {
      const dbCohort = extractPureCohort(row[6]).trim().toLowerCase();
      const dbSubject = normalizeText(row[5]); 
      const dbTeacher = normalizeText(row[7]);

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
    const querySubject = normalizeText(subject);
    let targetTeacher = teacher ? normalizeText(teacher.replace(/លោកគ្រូ|អ្នកគ្រូ|Dr\.|Dr/gi, '')) : "";

    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: authClient });

    const rows = await getMasterRows(sheets);
    let rowIndex = -1;
    let existingData = [];

    for (let i = 0; i < rows.length; i++) {
      const dbCohort = extractPureCohort(rows[i][6]).trim().toLowerCase();
      const dbSubject = normalizeText(rows[i][5]);
      const dbTeacher = normalizeText(rows[i][7]);

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
    const oldDate = String(existingData[9] || "").replace(/'/g, "").trim();
    const safeDate = date ? `'${date}` : existingData[9] || "";
    const safeStartTime = startTime ? `'${startTime}` : existingData[10] || "";
    const safeEndTime = endTime ? `'${endTime}` : existingData[11] || "";

    const newDate = date ? String(date).trim() : oldDate;
    
    if (oldDate && newDate && oldDate !== newDate) {
        const visualRes = await markVisualAttendance(sheets, cohort, subject, teacher, newDate, "✓");
        if (!visualRes.success) {
            return res.status(400).json({ success: false, message: visualRes.message });
        }
        await markVisualAttendance(sheets, cohort, subject, teacher, oldDate, ""); 
    } else {
        await markVisualAttendance(sheets, cohort, subject, teacher, newDate, "✓");
    }

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
    const { cohort, week, subject, teacher, date } = req.query;
    
    const pureCohort = extractPureCohort(cohort).trim().toLowerCase();
    const querySubject = normalizeText(subject);
    let targetTeacher = teacher ? normalizeText(teacher.replace(/លោកគ្រូ|អ្នកគ្រូ|Dr\.|Dr/gi, '')) : "";

    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: authClient });

    const rows = await getMasterRows(sheets);
    let rowIndex = -1;
    let deletedDate = "";

    for (let i = 0; i < rows.length; i++) {
      const dbCohort = extractPureCohort(rows[i][6]).trim().toLowerCase();
      const dbSubject = normalizeText(rows[i][5]);
      const dbTeacher = normalizeText(rows[i][7]);
      const dbDate = String(rows[i][9] || "").replace(/'/g, "").trim(); 

      if (dbCohort === pureCohort && dbSubject === querySubject && String(rows[i][8]) == String(week)) {
          let isMatch = true;
          if (targetTeacher && !dbTeacher.includes(targetTeacher)) isMatch = false;
          if (date && dbDate !== String(date).trim()) isMatch = false; 

          if (isMatch) {
              rowIndex = i + 2; 
              deletedDate = dbDate;
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

    if (deletedDate) {
        await markVisualAttendance(sheets, cohort, subject, teacher, deletedDate, ""); 
    }
    
    res.json({ success: true, message: "Deleted successfully" });
  } catch (error) { 
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" }); 
  }
});

// ==========================================
// GET: ADMIN TRACKING DIRECTORY
// ==========================================
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
      const cohort = extractPureCohort(row[6]).trim(); 
      const teacher = String(row[7] || "Unknown Teacher");
      const week = parseInt(row[8], 10);

      const key = `${cohort}_${subject}_${teacher}`;
      
      if (!dirMap[key]) {
          let cleanTeacherName = teacher.replace(/លោកគ្រូ|អ្នកគ្រូ|Dr\.|Dr/gi, '').trim();
          let avatarUrl = avatarMap[cleanTeacherName] || avatarMap[teacher] || null;
          
          dirMap[key] = {
              tab: `${cohort}-${cleanTeacherName}-${subject}`, 
              cohort: cohort,
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

module.exports = router;