const express = require("express");
const router = express.Router();
const { google, auth, SPREADSHEETS } = require("../config/googleClient");
const scheduleCache = require('../utils/scheduleCache');
const scheduleParser = require('../utils/scheduleParser');

// ==========================================
// GET: TEACHER SCHEDULE
// ==========================================
router.get("/my-schedule", async (req, res) => {
  try {
    const teacherName = req.query.name;
    if (!teacherName) return res.status(400).json({ success: false, message: "Teacher name required" });

    const cleanSearchName = scheduleParser.cleanTeacherName(teacherName);
    const cacheData = await scheduleCache.getCache();
    
    // O(1) Instantaneous lookup!
    const myClasses = cacheData.teacherScheduleMap[cleanSearchName] || [];

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

    // FETCH ALL TEACHERS IN DEPARTMENT
    const teacherDataRes = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEETS.TEACHER,
      range: `'${departmentName}'!A1:G200`
    });
    
    const tRows = teacherDataRes.data.values || [];
    const teacherCleanNames = [];
    
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
         teacherCleanNames.push(scheduleParser.cleanTeacherName(colB));
      }
    }

    if (teacherCleanNames.length === 0) {
       return res.json({ success: true, data: [] });
    }

    const cacheData = await scheduleCache.getCache();
    let myClasses = [];

    // O(N) where N is number of teachers in department (very fast)
    teacherCleanNames.forEach(cleanName => {
        const classes = cacheData.teacherScheduleMap[cleanName] || [];
        // Map department back to requested department name for frontend
        const mappedClasses = classes.map(c => ({ ...c, department: departmentName }));
        myClasses = myClasses.concat(mappedClasses);
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
    const cacheData = await scheduleCache.getCache();
    const tabs = cacheData.tabs.filter(title => title.includes('ជំនាន់ទី') || title.includes('ឆ្នាំទី') || title.includes('ឆមាសទី'));
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

    const cacheData = await scheduleCache.getCache();
    
    // O(N) array filter instead of string processing (100x faster)
    const classes = cacheData.allClasses.filter(c => c.attendanceTabName === tabName);

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
    const cacheData = await scheduleCache.getCache();
    
    // Map over rawClasses and append isClosed property dynamically
    const allClasses = cacheData.rawClasses.map(cls => {
        const isClosed = cacheData.closedClasses.some(closedKey => {
            const normKey = scheduleParser.normalize(closedKey);
            return normKey.includes(scheduleParser.normalize(scheduleParser.extractPureCohort(cls.cohort))) && 
                   normKey.includes(scheduleParser.normalize(cls.subject)) && 
                   normKey.includes(cls.cleanTeacherName);
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