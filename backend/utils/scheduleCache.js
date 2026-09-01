const { google, auth, SPREADSHEETS } = require("../config/googleClient");

class ScheduleCache {
  constructor() {
    this.facultiesList = [];
    this.majorsList = [];
    this.tabs = [];
    this.attendanceData = []; // [{ tabName: '...', rows: [...] }]
    this.closedClasses = [];
    this.lastFetchTime = 0;
    this.CACHE_TTL = 1000 * 60 * 30; // 30 minutes
    this.isFetching = false;
    this.fetchPromise = null;
  }

  async fetchFreshData() {
    if (this.isFetching) return this.fetchPromise;
    this.isFetching = true;

    this.fetchPromise = (async () => {
      try {
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

        const attendanceData = attendanceDataRes.data.valueRanges.map((rangeData, index) => {
            return {
                tabName: tabs[index],
                rows: rangeData.values || []
            };
        });

        // Assign to cache
        this.facultiesList = facultiesList;
        this.majorsList = majorsList;
        this.closedClasses = closedClasses;
        this.tabs = tabs;
        this.attendanceData = attendanceData;
        this.lastFetchTime = Date.now();

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
    if (Date.now() - this.lastFetchTime > this.CACHE_TTL) {
      await this.fetchFreshData();
    }
    return {
      facultiesList: this.facultiesList,
      majorsList: this.majorsList,
      closedClasses: this.closedClasses,
      tabs: this.tabs,
      attendanceData: this.attendanceData
    };
  }

  // Manually update closed classes to avoid full re-fetch on simple toggle
  updateClosedClasses(newClosedClasses) {
    this.closedClasses = newClosedClasses;
  }

  // Invalidate cache manually (e.g. when mapping variables are updated)
  invalidateCache() {
    this.lastFetchTime = 0;
  }
}

const scheduleCache = new ScheduleCache();
module.exports = scheduleCache;
