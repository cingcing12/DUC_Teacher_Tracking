const { google, auth, SPREADSHEETS } = require("../config/googleClient");
const scheduleParser = require("./scheduleParser");

class ScheduleCache {
  constructor() {
    this.facultiesList = [];
    this.majorsList = [];
    this.tabs = [];
    this.closedClasses = [];
    
    // 🔥 NEW: Pre-computed Maps for O(1) instantaneous lookups
    this.rawClasses = [];
    this.allClasses = [];
    this.teacherScheduleMap = {}; 
    this.departmentScheduleMap = {};

    this.isFetching = false;
    this.fetchPromise = null;

    // 🔥 NEW: Background Sync (Every 10 minutes)
    this.SYNC_INTERVAL = 1000 * 60 * 10;
    
    // Start background sync immediately
    this.fetchFreshData().catch(e => console.error("Initial Cache Load Failed", e));
    setInterval(() => {
        this.fetchFreshData().catch(e => console.error("Background Sync Failed", e));
    }, this.SYNC_INTERVAL);
  }

  async fetchFreshData() {
    if (this.isFetching) return this.fetchPromise;
    this.isFetching = true;

    this.fetchPromise = (async () => {
      try {
        console.log("🔄 Background Sync: Fetching fresh data from Google Sheets...");
        const authClient = await auth.getClient();
        const sheets = google.sheets({ version: "v4", auth: authClient });

        // 1. Fetch Faculties & Majors
        let facultiesList = [];
        let majorsList = [];
        try {
            const facRes = await sheets.spreadsheets.values.get({ spreadsheetId: SPREADSHEETS.TRACKING, range: "'Faculties'!A2:B" });
            facultiesList = facRes.data.values || [];
        } catch (e) { console.error("Could not fetch Faculties:", e.message); }
        
        try {
            const majRes = await sheets.spreadsheets.values.get({ spreadsheetId: SPREADSHEETS.TRACKING, range: "'Majors'!A2:B" });
            majorsList = majRes.data.values || [];
        } catch (e) { console.error("Could not fetch Majors:", e.message); }

        // 2. Fetch Closed Classes
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

        // 3. Fetch Tabs
        const sheetMeta = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEETS.ATTENDANCE });
        const tabs = sheetMeta.data.sheets.map(s => s.properties.title);

        // 4. Fetch All Tab Data
        const ranges = tabs.map(t => `'${t}'!A1:G200`);
        const attendanceDataRes = await sheets.spreadsheets.values.batchGet({
            spreadsheetId: SPREADSHEETS.ATTENDANCE,
            ranges: ranges
        });

        // 🔥 5. PRE-COMPUTE EVERYTHING IN BACKGROUND
        let rawClasses = [];
        attendanceDataRes.data.valueRanges.forEach((rangeData, index) => {
            const tabName = tabs[index];
            const rows = rangeData.values || [];
            const classesInTab = scheduleParser.parseAttendanceTab(tabName, rows, facultiesList, majorsList);
            rawClasses = rawClasses.concat(classesInTab);
        });

        const activeClasses = scheduleParser.filterClosedClasses(rawClasses, closedClasses);
        
        // Build O(1) Maps
        const teacherMap = {};
        const deptMap = {};
        
        activeClasses.forEach(cls => {
            // Teacher Map
            if (!teacherMap[cls.cleanTeacherName]) teacherMap[cls.cleanTeacherName] = [];
            teacherMap[cls.cleanTeacherName].push(cls);
            
            // Department Map
            if (cls.department && cls.department !== "?") {
                if (!deptMap[cls.department]) deptMap[cls.department] = [];
                deptMap[cls.department].push(cls);
            }
        });

        // Assign to cache
        this.facultiesList = facultiesList;
        this.majorsList = majorsList;
        this.closedClasses = closedClasses;
        this.tabs = tabs;
        this.rawClasses = rawClasses;
        this.allClasses = activeClasses;
        this.teacherScheduleMap = teacherMap;
        this.departmentScheduleMap = deptMap;

        console.log("✅ Background Sync Complete: Data mapped into RAM.");
        return true;
      } catch (err) {
        console.error("Failed to fetch schedule data for cache:", err);
        throw err;
      } finally {
        this.isFetching = false;
        this.fetchPromise = null;
      }
    })();

    return this.fetchPromise;
  }

  async getCache() {
    // If it's the very first time (cold boot) and it's fetching, wait for it.
    if (this.tabs.length === 0 && this.isFetching) {
        await this.fetchPromise;
    }
    
    // Otherwise return instantly from RAM! No expiration checks on request!
    return {
      facultiesList: this.facultiesList,
      majorsList: this.majorsList,
      closedClasses: this.closedClasses,
      tabs: this.tabs,
      rawClasses: this.rawClasses,
      allClasses: this.allClasses,
      teacherScheduleMap: this.teacherScheduleMap,
      departmentScheduleMap: this.departmentScheduleMap
    };
  }

  // Manually update closed classes to avoid full re-fetch on simple toggle
  updateClosedClasses(newClosedClasses) {
    this.closedClasses = newClosedClasses;
    // Re-filter memory directly without calling Google Sheets
    this.allClasses = scheduleParser.filterClosedClasses(this.rawClasses, newClosedClasses);
    
    const teacherMap = {};
    const deptMap = {};
    
    this.allClasses.forEach(cls => {
        if (!teacherMap[cls.cleanTeacherName]) teacherMap[cls.cleanTeacherName] = [];
        teacherMap[cls.cleanTeacherName].push(cls);
        
        if (cls.department && cls.department !== "?") {
            if (!deptMap[cls.department]) deptMap[cls.department] = [];
            deptMap[cls.department].push(cls);
        }
    });
    
    this.teacherScheduleMap = teacherMap;
    this.departmentScheduleMap = deptMap;
  }

  // Allow forceful refresh
  invalidateCache() {
    this.fetchFreshData().catch(e => console.error("Manual refresh failed", e));
  }
}

const scheduleCache = new ScheduleCache();
module.exports = scheduleCache;
