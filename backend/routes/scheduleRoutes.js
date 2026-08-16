const express = require("express");
const router = express.Router();
const { google, auth, SPREADSHEETS } = require("../config/googleClient");
const fs = require('fs');
const path = require('path');

// ==========================================
// HELPER: EXTRACT PURE COHORT
// ==========================================
const extractPureCohort = (str) => {
    if (!str) return '';
    let s = String(str).trim();
    if (/^G\d+-/i.test(s)) {
        const parts = s.split('-');
        if (parts.length >= 3) {
            let pure = `${parts[0]}-${parts[1]}`;
            if (/^[a-zA-Z0-9]{1,3}$/.test(parts[2])) {
                pure += `-${parts[2]}`;
            }
            return pure.toUpperCase();
        }
        return s.toUpperCase();
    }
    return s;
};

// ==========================================
// HELPER: FUZZY MATCHER
// ==========================================
const normalize = (str) => {
  return String(str || "").replace(/\s+/g, '').toLowerCase();
};

// ==========================================
// HELPER: EXTRACT METADATA FROM TAB NAME
// ==========================================
const extractTabMeta = (tabName) => {
    let generation = "?";
    let year = "?";
    let semester = "?";

    const khmerToArabic = {'១':'1','២':'2','៣':'3','៤':'4','៥':'5','៦':'6','៧':'7','៨':'8','៩':'9','០':'0'};
    const parseNum = (str) => {
        if (!str) return "?";
        let match = str.match(/([០-៩1-9])/);
        if (match) return khmerToArabic[match[1]] || match[1];
        return "?";
    };

    if (tabName.includes("ជំនាន់ទី")) {
        const genPart = tabName.split("ជំនាន់ទី")[1].trim().split(" ")[0];
        generation = parseNum(genPart);
    }
    
    if (tabName.includes("ឆ្នាំសិក្សាមូលដ្ឋាន") || tabName.includes("ឆ្នាំទី១")) {
        year = "1";
    } else if (tabName.includes("ឆ្នាំទី")) {
        const yrPart = tabName.split("ឆ្នាំទី")[1].trim().split(" ")[0];
        year = parseNum(yrPart);
    }

    if (tabName.includes("ឆមាសទី")) {
        const semPart = tabName.split("ឆមាសទី")[1].trim().split(" ")[0];
        semester = parseNum(semPart);
    }

    return { generation, year, semester };
};

// ==========================================
// HELPER: PARSE ATTENDANCE TAB ROWS
// ==========================================
const mapDayToEnglish = (khmerOrMixed) => {
    const s = khmerOrMixed.toLowerCase();
    if (s.includes('ច័ន្ទ') || s.includes('monday')) return 'Monday';
    if (s.includes('អង្គារ') || s.includes('tuesday')) return 'Tuesday';
    if (s.includes('ពុធ') || s.includes('wednesday')) return 'Wednesday';
    if (s.includes('ព្រហស្បតិ៍') || s.includes('thursday')) return 'Thursday';
    if (s.includes('សុក្រ') || s.includes('friday')) return 'Friday';
    if (s.includes('សៅរ៍') || s.includes('saturday')) return 'Saturday';
    if (s.includes('អាទិត្យ') || s.includes('sunday')) return 'Sunday';
    return khmerOrMixed.split("-")[0].trim();
};

const parseAttendanceTab = (rows, tabMeta, filterTeacherObj, filterTeachersArray, fallbackDepartment, facultiesList, fetchAll = false) => {
    const classes = [];
    if (!rows || rows.length < 7) return classes;

    let currentDay = "Unknown";
    
    // Row 6 (index 5) has headers. Data starts from index 6.
    for (let i = 6; i < rows.length; i++) {
        const row = rows[i];
        if (!row || row.length === 0) continue;

        const colA = String(row[0] || "").trim();
        const colB = String(row[1] || "").trim();
        
        if (colA.includes("ថ្ងៃ") || /monday|tuesday|wednesday|thursday|friday|saturday|sunday/i.test(colA)) {
            currentDay = mapDayToEnglish(colA); 
            continue;
        }
        
        if (colB && colB.includes(":")) {
            const time = colB;
            const subject = String(row[2] || "").trim();
            const teacher = String(row[3] || "").trim();
            const room = String(row[4] || "").trim();
            const major = String(row[5] || "").trim();
            const group = String(row[6] || "").trim();
            
            if (!subject || !teacher) continue;
            
            const cleanRowTeacher = normalize(teacher);
            
            let isMatch = false;
            let matchedTeacherName = teacher; 
            
            if (fetchAll) {
                isMatch = true;
            } else if (filterTeacherObj) {
                // /my-schedule logic
                if (cleanRowTeacher.includes(filterTeacherObj.cleanName)) {
                    isMatch = true;
                }
            } else if (filterTeachersArray) {
                // /department-schedule logic
                const matched = filterTeachersArray.find(t => cleanRowTeacher.includes(t.cleanName) && t.cleanName.length > 2);
                if (matched) {
                    isMatch = true;
                    matchedTeacherName = matched.originalName;
                }
            }
            
            if (isMatch) {
                classes.push({
                    scheduleType: "Attendance Tab",
                    day: currentDay,
                    time: time,
                    room: room,
                    group: group,
                    subject: subject,
                    generation: tabMeta.generation,
                    year: tabMeta.year,
                    semester: tabMeta.semester,
                    department: (() => {
                        if (fallbackDepartment) return fallbackDepartment;
                        if (facultiesList && facultiesList.length > 0) {
                            const normalizedGroup = String(group || '').replace(/-/g, '').toLowerCase();
                            const match = facultiesList.find(r => r[0] && normalizedGroup.includes(String(r[0]).toLowerCase()));
                            if (match && match[1]) return String(match[1]).trim();
                        }
                        return "?"; // Force it to missing so teacher cannot track it!
                    })(),
                    teacherName: matchedTeacherName
                });
            }
        }
    }
    return classes;
};

// ==========================================
// GET: TEACHER SCHEDULE
// ==========================================
router.get("/my-schedule", async (req, res) => {
  try {
    const teacherName = req.query.name;
    if (!teacherName) return res.status(400).json({ success: false, message: "Teacher name required" });

    const cleanSearchName = normalize(teacherName.replace(/លោកគ្រូ|អ្នកគ្រូ|បណ្ឌិត|សាស្ត្រាចារ្យ|Dr\./g, ""));
    const filterTeacherObj = { cleanName: cleanSearchName };

    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: authClient });

    let facultiesList = [];
    try {
        const facRes = await sheets.spreadsheets.values.get({ spreadsheetId: SPREADSHEETS.TRACKING, range: "'Faculties'!A2:B" });
        facultiesList = facRes.data.values || [];
    } catch (e) {
        console.error("Could not fetch Faculties:", e.message);
    }

    // 1. Fetch tabs from ATTENDANCE spreadsheet
    const sheetMeta = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEETS.ATTENDANCE });
    const tabs = sheetMeta.data.sheets.map(s => s.properties.title);
    
    // 2. Fetch all tab data
    const ranges = tabs.map(t => `'${t}'!A1:G200`);
    const attendanceDataRes = await sheets.spreadsheets.values.batchGet({
      spreadsheetId: SPREADSHEETS.ATTENDANCE,
      ranges: ranges
    });

    let myClasses = [];

    // 3. Process each tab
    attendanceDataRes.data.valueRanges.forEach((rangeData, index) => {
        const tabName = tabs[index];
        const rows = rangeData.values || [];
        const tabMeta = extractTabMeta(tabName);
        
        const classesInTab = parseAttendanceTab(rows, tabMeta, filterTeacherObj, null, null, facultiesList);
        myClasses = myClasses.concat(classesInTab);
    });

    // 4. Filter out closed classes
    let closedClasses = [];
    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEETS.TRACKING,
            range: "'ClosedClasses'!A:A"
        });
        const rows = response.data.values || [];
        closedClasses = rows.map(r => r[0]).filter(c => c && c !== "Class Key");
    } catch (e) {
        console.error("Tab ClosedClasses might not exist yet", e.message);
    }

    if (closedClasses.length > 0) {
        myClasses = myClasses.filter(cls => {
            const pureCohort = extractPureCohort(cls.group);
            const cleanTName = normalize(cls.teacherName.replace(/លោកគ្រូ|អ្នកគ្រូ|បណ្ឌិត|សាស្ត្រាចារ្យ|Dr\./g, ""));
            
            const isClosed = closedClasses.some(closedKey => {
                const normKey = normalize(closedKey);
                return normKey.includes(normalize(pureCohort)) && 
                       normKey.includes(normalize(cls.subject)) && 
                       normKey.includes(cleanTName);
            });
            return !isClosed;
        });
    }

    res.json({ success: true, data: myClasses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error reading schedule" });
  }
});

// ==========================================
// GET: DEPARTMENT SCHEDULE FOR SUBSTITUTE
// ==========================================
router.get("/department-schedule", async (req, res) => {
  try {
    const departmentName = req.query.department;
    if (!departmentName) return res.status(400).json({ success: false, message: "Department required" });

    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: authClient });

    // 1. FETCH ALL TEACHERS IN DEPARTMENT
    const teacherDataRes = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEETS.TEACHER,
      range: `'${departmentName}'!A1:G200`
    });
    
    const tRows = teacherDataRes.data.values || [];
    const teacherNames = [];
    
    for (let i = 4; i < tRows.length; i++) {
      const row = tRows[i] || [];
      const colA = row[0] ? String(row[0]).trim() : "";
      const colB = row[1] ? String(row[1]).trim() : "";
      const colC = row[2] ? String(row[2]).trim() : "";
      const colD = row[3] ? String(row[3]).trim() : "";
      
      const potentialHeader = colB || colA;
      const isJustANumber = !isNaN(potentialHeader) && potentialHeader !== "";

      if (potentialHeader && !isJustANumber && !colC && !colD && colB !== "ឈ្មោះគ្រូបង្រៀន") {
         continue; // It's a category header
      }
      
      if (colB && colB !== "ឈ្មោះគ្រូបង្រៀន" && colB !== "No Name") {
         teacherNames.push({
            originalName: colB,
            cleanName: normalize(colB.replace(/លោកគ្រូ|អ្នកគ្រូ|បណ្ឌិត|សាស្ត្រាចារ្យ|Dr\./g, ""))
         });
      }
    }

    if (teacherNames.length === 0) {
       return res.json({ success: true, data: [] });
    }

    // 2. Fetch tabs from ATTENDANCE spreadsheet
    const sheetMeta = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEETS.ATTENDANCE });
    const tabs = sheetMeta.data.sheets.map(s => s.properties.title);
    
    // 3. Fetch all tab data
    const ranges = tabs.map(t => `'${t}'!A1:G200`);
    const attendanceDataRes = await sheets.spreadsheets.values.batchGet({
      spreadsheetId: SPREADSHEETS.ATTENDANCE,
      ranges: ranges
    });

    let myClasses = [];

    // 4. Process each tab
    attendanceDataRes.data.valueRanges.forEach((rangeData, index) => {
        const tabName = tabs[index];
        const rows = rangeData.values || [];
        const tabMeta = extractTabMeta(tabName);
        
        const classesInTab = parseAttendanceTab(rows, tabMeta, null, teacherNames, departmentName);
        myClasses = myClasses.concat(classesInTab);
    });

    res.json({ success: true, data: myClasses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error reading department schedule" });
  }
});

// ==========================================
// GET: ALL ATTENDANCE TABS
// ==========================================
router.get("/attendance-tabs", async (req, res) => {
  try {
    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: authClient });
    const sheetMeta = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEETS.ATTENDANCE });
    const tabs = sheetMeta.data.sheets
      .map(s => s.properties.title)
      .filter(title => title.includes('ជំនាន់ទី') || title.includes('ឆ្នាំទី') || title.includes('ឆមាសទី'));
    res.json({ success: true, data: tabs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching tabs" });
  }
});

// ==========================================
// GET: TAB SCHEDULE FOR SUBSTITUTE
// ==========================================
router.get("/tab-schedule", async (req, res) => {
  try {
    const tabName = req.query.tabName;
    if (!tabName) return res.status(400).json({ success: false, message: "Tab name required" });

    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: authClient });

    let facultiesList = [];
    try {
        const facRes = await sheets.spreadsheets.values.get({ spreadsheetId: SPREADSHEETS.TRACKING, range: "'Faculties'!A2:B" });
        facultiesList = facRes.data.values || [];
    } catch (e) {
        console.error("Could not fetch Faculties:", e.message);
    }

    const rangeData = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEETS.ATTENDANCE,
      range: `'${tabName}'!A1:G200`
    });

    const rows = rangeData.data.values || [];
    const tabMeta = extractTabMeta(tabName);
    
    const classes = parseAttendanceTab(rows, tabMeta, null, null, null, facultiesList, true);

    res.json({ success: true, data: classes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error reading tab schedule" });
  }
});

// ==========================================
// GET: ALL ATTENDANCE CLASSES (FOR ADMIN MANAGE CLASSES)
// ==========================================
router.get("/all-attendance-classes", async (req, res) => {
  try {
    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: authClient });

    // 1. Fetch tabs from ATTENDANCE spreadsheet
    const sheetMeta = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEETS.ATTENDANCE });
    const tabs = sheetMeta.data.sheets.map(s => s.properties.title);
    
    // 2. Fetch all tab data
    const ranges = tabs.map(t => `'${t}'!A1:G200`);
    const attendanceDataRes = await sheets.spreadsheets.values.batchGet({
      spreadsheetId: SPREADSHEETS.ATTENDANCE,
      ranges: ranges
    });

    let allClasses = [];

    // 3. Process each tab
    attendanceDataRes.data.valueRanges.forEach((rangeData, index) => {
        const tabName = tabs[index];
        const rows = rangeData.values || [];
        const tabMeta = extractTabMeta(tabName);
        
        const classesInTab = parseAttendanceTab(rows, tabMeta, null, null, null, null, true);
        
        const mappedClasses = classesInTab.map(c => ({
            ...c,
            cohort: c.group,
            teacher: c.teacherName,
            attendanceTabName: tabName,
            key: `${extractPureCohort(c.group)}_${c.subject}_${c.teacherName}`
        }));

        allClasses = allClasses.concat(mappedClasses);
    });

    // 4. Map isClosed status
    let closedClasses = [];
    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEETS.TRACKING,
            range: "'ClosedClasses'!A:A"
        });
        const rows = response.data.values || [];
        closedClasses = rows.map(r => r[0]).filter(c => c && c !== "Class Key");
    } catch (e) {
        console.error("Tab ClosedClasses might not exist yet", e.message);
    }

    allClasses = allClasses.map(cls => {
        const pureCohort = extractPureCohort(cls.cohort);
        const cleanTName = normalize(cls.teacher.replace(/លោកគ្រូ|អ្នកគ្រូ|បណ្ឌិត|សាស្ត្រាចារ្យ|Dr\./g, ""));
        const isClosed = closedClasses.some(closedKey => {
            const normKey = normalize(closedKey);
            return normKey.includes(normalize(pureCohort)) && 
                   normKey.includes(normalize(cls.subject)) && 
                   normKey.includes(cleanTName);
        });
        return { ...cls, isClosed };
    });

    res.json({ success: true, data: allClasses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error reading all attendance classes" });
  }
});

module.exports = router;