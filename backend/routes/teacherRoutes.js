const express = require("express");
const router = express.Router();
const { google, auth, SPREADSHEETS } = require("../config/googleClient");
require("dotenv").config();
// Image Upload Dependencies
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

// 🔥 Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

// Setup Multer for temporary file storage
const upload = multer({ dest: 'uploads/' });

// ==========================================
// 🔥 SMART PHONE NORMALIZERS
// ==========================================
// Strips spaces and leading zeros for a single number
const normalizePhone = (phone) => {
  if (!phone) return "";
  return String(phone).replace(/\s+/g, '').replace(/^0+/, '');
};

// Splits a cell by slash or comma and normalizes all numbers inside it
const getNormalizedPhoneArray = (phoneStr) => {
  if (!phoneStr) return [];
  return String(phoneStr)
    .split(/[\/,;|]/) // Splits by slash, comma, semicolon, or pipe
    .map(p => normalizePhone(p))
    .filter(p => p !== "");
};

// ==========================================
// HELPER: GET AVATAR URL
// ==========================================
async function getAvatarUrl(sheets, nameKh, phone) {
  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEETS.TRACKING,
      range: "'Avatars'!A2:C500", 
    });
    const rows = res.data.values;
    if (!rows) return null;

    // Normalize incoming data
    const inputPhones = getNormalizedPhoneArray(phone);
    const cleanInputName = nameKh ? String(nameKh).trim() : "";

    for (const row of rows) {
      const sheetNameKh = row[0] ? String(row[0]).trim() : "";
      const sheetPhones = getNormalizedPhoneArray(row[1]);
      
      // Check if ANY phone matches
      const hasPhoneMatch = inputPhones.some(p => sheetPhones.includes(p));

      if (sheetNameKh === cleanInputName && hasPhoneMatch) {
        return row[2]; 
      }
    }
    return null;
  } catch (error) {
    return null; 
  }
}

// ==========================================
// GET DEPARTMENTS
// ==========================================
router.get("/departments", async (req, res) => {
  try {
    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: authClient });

    const response = await sheets.spreadsheets.get({
      spreadsheetId: SPREADSHEETS.TEACHER,
    });
    const sheetNames = response.data.sheets
      .map((sheet) => sheet.properties.title)
      .filter((name) => !name.toLowerCase().includes("schedule") && !name.toLowerCase().includes("year"));

    res.json({ success: true, data: sheetNames });
  } catch (error) {
    res.status(500).json({ success: false, message: "Could not load tabs" });
  }
});

// ==========================================
// GET TEACHERS (WITH BULLETPROOF DYNAMIC SCANNER & CREDIT/HOUR)
// ==========================================
router.get("/teachers", async (req, res) => {
  try {
    const tabName = req.query.tab;
    if (!tabName) return res.status(400).json({ success: false, message: "No tab provided" });

    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: authClient });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEETS.TEACHER,
      range: `'${tabName}'!A1:BM500`, 
    });
    const rows = response.data.values;
    if (!rows || rows.length < 5) return res.json({ success: true, data: [] });

    let allAvatars = [];
    try {
      const avatarRes = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEETS.TRACKING,
        range: "'Avatars'!A2:C500",
      });
      allAvatars = avatarRes.data.values || [];
    } catch(e) {}

    let yearRowIdx = -1;
    let semRowIdx = -1;
    let headerRowIdx = -1;

    for (let r = 1; r < Math.min(8, rows.length); r++) {
        const rowStr = rows[r].join("").replace(/\s+/g, '').toLowerCase();
        
        if (yearRowIdx === -1 && (rowStr.includes("ឆ្នាំទី") || rowStr.includes("year1") || rowStr.includes("yeari"))) yearRowIdx = r;
        if (semRowIdx === -1 && (rowStr.includes("ឆមាសទី") || rowStr.includes("sem1") || rowStr.includes("semester1"))) semRowIdx = r;
        if (headerRowIdx === -1 && (rowStr.includes("អង់គ្លេស") || rowStr.includes("english") || rowStr.includes("មុខវិជ្ជា"))) headerRowIdx = r;
    }

    if (yearRowIdx === -1) yearRowIdx = 1;
    if (semRowIdx === -1) semRowIdx = 2;
    if (headerRowIdx === -1) headerRowIdx = 3;

    const yearRow = rows[yearRowIdx] || []; 
    const semRow = rows[semRowIdx] || [];  
    const headerRow = rows[headerRowIdx] || []; 

    const parseYearSem = (text) => {
        if (!text) return null;
        const str = String(text).toUpperCase();
        if (str.includes('IV') || str.includes('៤') || str.includes('4')) return 4;
        if (str.includes('III') || str.includes('៣') || str.includes('3')) return 3;
        if (str.includes('II') || str.includes('២') || str.includes('2')) return 2;
        if (str.includes('I') || str.includes('១') || str.includes('1')) return 1;
        return null;
    };

    const dynamicSubjectColumns = [];
    let currentYear = 1;
    let currentSem = 1;

    for (let c = 7; c < 65; c++) {
        const yText = yearRow[c] ? String(yearRow[c]).replace(/\s+/g, '') : "";
        const sText = semRow[c] ? String(semRow[c]).replace(/\s+/g, '') : "";
        const hText = headerRow[c] ? String(headerRow[c]).replace(/\s+/g, '').toLowerCase() : "";

        if (yText.includes("ឆ្នាំទី") || yText.toLowerCase().includes("year")) {
            const y = parseYearSem(yText);
            if (y) currentYear = y;
        }
        if (sText.includes("ឆមាសទី") || sText.toLowerCase().includes("sem")) {
            const s = parseYearSem(sText);
            if (s) currentSem = s;
        }

        // 🔥 FIX: Only trigger on the starting Subject Column (Ignore Khmer to prevent duplicates)
        if ((hText.includes("អង់គ្លេស") || hText.includes("english") || hText.includes("eng") || hText.includes("មុខវិជ្ជា")) && !hText.includes("ខ្មែរ") && !hText.includes("khmer")) {
            
            let engCol = c;
            let khCol = c + 1;
            let creditCol = c + 2;
            let hourCol = c + 3;

            // 🔥 FIX: Smartly scan the next 5 columns to find the EXACT position of Credit and Hour
            for(let offset = 0; offset <= 5; offset++) {
                const scanText = String(headerRow[c + offset] || "").replace(/\s+/g, '').toLowerCase();
                if(scanText.includes("ខ្មែរ") || scanText.includes("khmer")) khCol = c + offset;
                if(scanText.includes("ក្រេឌីត") || scanText.includes("credit") || scanText.includes("ក្រេឌិត")) creditCol = c + offset;
                if(scanText.includes("ម៉ោង") || scanText.includes("hour")) hourCol = c + offset;
            }

            if (!dynamicSubjectColumns.some(col => col.cols[0] === engCol)) {
                dynamicSubjectColumns.push({
                    cols: [engCol, khCol], 
                    creditCol: creditCol,
                    hourCol: hourCol,
                    year: currentYear,
                    sem: currentSem
                });
            }
            
            // 🔥 FIX: Fast-forward the loop so it doesn't accidentally read the Khmer/Credit columns as a new subject!
            c = Math.max(khCol, creditCol, hourCol);
        }
    }

    const subjectColumns = dynamicSubjectColumns.length > 0 ? dynamicSubjectColumns : [
      { cols: [7, 8], creditCol: 9, hourCol: 10, year: 1, sem: 1 },
      { cols: [12, 13], creditCol: 14, hourCol: 15, year: 1, sem: 2 },
      { cols: [17, 18], creditCol: 19, hourCol: 20, year: 2, sem: 1 },
      { cols: [22, 23], creditCol: 24, hourCol: 25, year: 2, sem: 2 },
      { cols: [29, 30], creditCol: 31, hourCol: 32, year: 3, sem: 1 },
      { cols: [34, 35], creditCol: 36, hourCol: 37, year: 3, sem: 2 },
      { cols: [39, 40], creditCol: 41, hourCol: 42, year: 4, sem: 1 },
      { cols: [44, 45], creditCol: 46, hourCol: 47, year: 4, sem: 2 },
    ];

    const teachers = [];
    let currentClassGroup = "General";

    for (let i = 4; i < rows.length; i++) {
      const row = rows[i];
      const colA = row[0] ? String(row[0]).trim() : "";
      const colB = row[1] ? String(row[1]).trim() : "";
      const colC = row[2] ? String(row[2]).trim() : "";
      const colD = row[3] ? String(row[3]).trim() : "";
      const colE = row[4] ? String(row[4]).trim() : "";
      const colF = row[5] ? String(row[5]).trim() : "";
      
      const rawRowPhone = row[6] ? String(row[6]).trim() : "N/A";
      const rowPhones = getNormalizedPhoneArray(rawRowPhone);

      const potentialHeader = colB || colA;
      const isJustANumber = !isNaN(potentialHeader) && potentialHeader !== "";

      if (potentialHeader && !isJustANumber && !colC && !colD && !colE && !colF && colB !== "ឈ្មោះគ្រូបង្រៀន") {
        currentClassGroup = potentialHeader;
        continue;
      }

      if (colB && colB !== "ឈ្មោះគ្រូបង្រៀន" && colB !== "No Name") {
        
        let avatarUrl = null;
        for (const av of allAvatars) {
           const avPhones = getNormalizedPhoneArray(av[1]);
           const hasPhoneMatch = avPhones.some(p => rowPhones.includes(p));
           const avNameKh = av[0] ? String(av[0]).trim() : "";
           const targetNameKh = colB.trim();
           
           if (avNameKh === targetNameKh && hasPhoneMatch) {
              avatarUrl = av[2]; break;
           }
        }

        const subjects = [];
        subjectColumns.forEach(({ cols, creditCol, hourCol, year, sem }) => {
          const eng = row[cols[0]] ? String(row[cols[0]]).trim() : "";
          const kh = row[cols[1]] ? String(row[cols[1]]).trim() : "";
          
          const credit = row[creditCol] ? String(row[creditCol]).trim() : "";
          const hour = row[hourCol] ? String(row[hourCol]).trim() : "";

          // Only save if there's actually a subject name
          if ((eng || kh) && (isNaN(eng) || isNaN(kh))) {
              subjects.push({ eng, kh, credit, hour, year, sem });
          }
        });

        teachers.push({
          id: colA,
          nameKh: colB,
          nameEn: colC,
          gender: colD,
          degree: colE || "N/A",
          major: colF || "N/A",
          phone: rawRowPhone,
          avatarUrl: avatarUrl,
          subjects,
          classGroup: currentClassGroup,
        });
      }
    }
    res.json({ success: true, data: teachers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error reading sheet data" });
  }
});

// ==========================================
// 🔥 NEW: API UPDATE ROUTE FOR TEACHERS (Profile & Curriculum)
// ==========================================
router.post("/update-teacher", async (req, res) => {
  try {
    const { tab, teacher } = req.body;
    if (!tab || !teacher || !teacher.nameKh) {
      return res.status(400).json({ success: false, message: "Missing required data" });
    }

    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: authClient });

    // 1. Fetch the sheet to find the exact row
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEETS.TEACHER,
      range: `'${tab}'!A1:BM500`,
    });
    const rows = response.data.values;
    if (!rows) return res.status(404).json({ success: false, message: "Sheet not found" });

    // 2. Find the target row by matching the Khmer Name
    let targetRowIdx = -1;
    for (let i = 4; i < rows.length; i++) {
      const rowNameKh = rows[i][1] ? String(rows[i][1]).trim() : "";
      if (rowNameKh === teacher.nameKh) {
        targetRowIdx = i;
        break;
      }
    }
    if (targetRowIdx === -1) return res.status(404).json({ success: false, message: "Teacher not found in spreadsheet" });

    // 3. Scan Headers to map out every single available column for Year/Semester
    let yearRowIdx = -1, semRowIdx = -1, headerRowIdx = -1;
    for (let r = 0; r < Math.min(8, rows.length); r++) {
      const rowStr = rows[r].join("").replace(/\s+/g, '').toLowerCase();
      if (yearRowIdx === -1 && (rowStr.includes("ឆ្នាំទី") || rowStr.includes("year"))) yearRowIdx = r;
      if (semRowIdx === -1 && (rowStr.includes("ឆមាសទី") || rowStr.includes("sem"))) semRowIdx = r;
      if (headerRowIdx === -1 && (rowStr.includes("អង់គ្លេស") || rowStr.includes("english") || rowStr.includes("មុខវិជ្ជា"))) headerRowIdx = r;
    }

    if (yearRowIdx === -1) yearRowIdx = 1;
    if (semRowIdx === -1) semRowIdx = 2;
    if (headerRowIdx === -1) headerRowIdx = 3;

    const yearRow = rows[yearRowIdx] || [];
    const semRow = rows[semRowIdx] || [];
    const headerRow = rows[headerRowIdx] || [];

    const parseYS = (txt) => {
        const str = String(txt||"").toUpperCase().replace(/\s+/g,'');
        const match = str.match(/([១-៩1-9IV+])/);
        if (!match) return null;
        let val = match[1];
        const khToAr = {'១':'1','២':'2','៣':'3','៤':'4','៥':'5','៦':'6'};
        if (khToAr[val]) return khToAr[val];
        if (val === 'IV') return '4'; if (val === 'III') return '3'; if (val === 'II') return '2'; if (val === 'I') return '1';
        return val;
    };

    // slots object stores empty columns grouped by year and semester
    const slots = {}; 
    let currentYear = 1, currentSem = 1;

    for (let c = 7; c < 65; c++) {
      if (yearRow[c] && yearRow[c].includes("ឆ្នាំ")) currentYear = parseYS(yearRow[c]) || currentYear;
      if (semRow[c] && semRow[c].includes("ឆមាស")) currentSem = parseYS(semRow[c]) || currentSem;

      const hText = String(headerRow[c]||"").replace(/\s+/g, '').toLowerCase();
      if ((hText.includes("អង់គ្លេស") || hText.includes("english") || hText.includes("eng") || hText.includes("មុខវិជ្ជា")) && !hText.includes("ខ្មែរ") && !hText.includes("khmer")) {
          let engCol = c, khCol = c + 1, creditCol = c + 2, hourCol = c + 3;
          for(let offset = 0; offset <= 5; offset++) {
              const scanText = String(headerRow[c + offset] || "").replace(/\s+/g, '').toLowerCase();
              if(scanText.includes("ខ្មែរ") || scanText.includes("khmer")) khCol = c + offset;
              if(scanText.includes("ក្រេឌីត") || scanText.includes("credit") || scanText.includes("ក្រេឌិត")) creditCol = c + offset;
              if(scanText.includes("ម៉ោង") || scanText.includes("hour")) hourCol = c + offset;
          }

          if (!slots[currentYear]) slots[currentYear] = {};
          if (!slots[currentYear][currentSem]) slots[currentYear][currentSem] = [];

          slots[currentYear][currentSem].push({ engCol, khCol, creditCol, hourCol });
          c = Math.max(khCol, creditCol, hourCol); 
      }
    }

    // 4. Build the new pristine row! Wipe curriculum but save the user's basic info
    const newRowData = new Array(65).fill("");
    const oldRow = rows[targetRowIdx];
    
    // Write new Basic Information (Cols 0-6)
    newRowData[0] = teacher.id || oldRow[0] || "";
    newRowData[1] = teacher.nameKh || oldRow[1] || "";
    newRowData[2] = teacher.nameEn || oldRow[2] || "";
    newRowData[3] = teacher.gender || oldRow[3] || "";
    newRowData[4] = teacher.degree || oldRow[4] || "";
    newRowData[5] = teacher.major || oldRow[5] || "";
    newRowData[6] = teacher.phone || oldRow[6] || "";

    // 5. Fill in the subjects exactly where they belong!
    const usedSlots = {};
    if (teacher.subjects && Array.isArray(teacher.subjects)) {
      for (const sub of teacher.subjects) {
        const y = String(sub.year).trim();
        const s = String(sub.sem).trim();
        
        if (slots[y] && slots[y][s]) {
          if (!usedSlots[`${y}-${s}`]) usedSlots[`${y}-${s}`] = 0;
          const slotIdx = usedSlots[`${y}-${s}`];
          
          if (slotIdx < slots[y][s].length) {
            const slot = slots[y][s][slotIdx];
            newRowData[slot.engCol] = sub.eng || "";
            newRowData[slot.khCol] = sub.kh || "";
            newRowData[slot.creditCol] = sub.credit || "";
            newRowData[slot.hourCol] = sub.hour || "";
            
            usedSlots[`${y}-${s}`]++;
          }
        }
      }
    }

    // Preserve any trailing data past col 65 if it exists in the original sheet
    for(let i=65; i<oldRow.length; i++) {
       newRowData.push(oldRow[i]);
    }

    // 6. Blast the updated row into Google Sheets
    const sheetRowNumber = targetRowIdx + 1; // Convert array index to Google Sheets row number
    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEETS.TEACHER,
      range: `'${tab}'!A${sheetRowNumber}:BM${sheetRowNumber}`,
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [newRowData] }
    });

    res.json({ success: true, message: "Teacher updated perfectly in Google Sheets!" });
  } catch(error) {
    console.error("Update error:", error);
    res.status(500).json({ success: false, message: "Server error during update" });
  }
});

// ==========================================
// SECURE LOGIN
// ==========================================
router.post("/login", async (req, res) => {
  try {
    const { name, phone } = req.body;
    if (!name || !phone) return res.status(400).json({ success: false, message: "Name and Phone required" });

    const cleanInputName = name.trim();
    const cleanInputPhone = normalizePhone(phone);

    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: authClient });

    const response = await sheets.spreadsheets.get({
      spreadsheetId: SPREADSHEETS.TEACHER,
    });
    const sheetNames = response.data.sheets.map((sheet) => sheet.properties.title);

    let loggedInTeacher = null;

    for (const tab of sheetNames) {
      if (tab.toLowerCase().includes("schedule") || tab.toLowerCase().includes("year")) continue;

      const sheetData = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEETS.TEACHER,
        range: `'${tab}'!A5:G500`,
      });
      const rows = sheetData.data.values;
      if (!rows) continue;

      for (const row of rows) {
        const nameKh = row[1] ? row[1].trim() : "";
        const nameEn = row[2] ? row[2].trim() : "";
        const rawRowPhone = row[6] ? String(row[6]).trim() : "";
        const sheetPhones = getNormalizedPhoneArray(rawRowPhone);

        if ((nameKh === cleanInputName || nameEn.toLowerCase() === cleanInputName.toLowerCase()) && sheetPhones.includes(cleanInputPhone)) {
          
          const avatarUrl = await getAvatarUrl(sheets, nameKh, rawRowPhone);

          loggedInTeacher = { nameKh, nameEn, department: tab, phone: rawRowPhone, avatarUrl };
          break;
        }
      }
      if (loggedInTeacher) break;
    }

    if (loggedInTeacher) res.json({ success: true, teacher: loggedInTeacher });
    else res.status(401).json({ success: false, message: "Invalid credentials" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error during login" });
  }
});

// ==========================================
// UPLOAD AVATAR & SAVE TO "Avatars" TAB
// ==========================================
router.post("/upload-avatar", upload.single("image"), async (req, res) => {
  try {
    const { nameKh, phone } = req.body; 
    if (!req.file) return res.status(400).json({ success: false, message: "No image provided" });

    // Normalize inputs
    const inputPhones = getNormalizedPhoneArray(phone);
    const cleanInputName = nameKh ? String(nameKh).trim() : "";

    const result = await cloudinary.uploader.unsigned_upload(req.file.path, "duc_avatar_upload");
    fs.unlinkSync(req.file.path);
    const imageUrl = result.secure_url;

    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: authClient });

    const response = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEETS.TRACKING });
    const allTabs = response.data.sheets;
    let tabExists = false;

    for (const tab of allTabs) {
      if (tab.properties.title === "Avatars") { tabExists = true; break; }
    }

    if (!tabExists) {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SPREADSHEETS.TRACKING,
        requestBody: { requests: [{ addSheet: { properties: { title: "Avatars" } } }] }
      });
      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEETS.TRACKING,
        range: "'Avatars'!A1:C1",
        valueInputOption: "USER_ENTERED",
        requestBody: { values: [["Name (Khmer)", "Phone Number", "Cloudinary Image URL"]] }
      });
    }

    const getRes = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEETS.TRACKING,
      range: "'Avatars'!A2:C500",
    });
    const rows = getRes.data.values || [];
    let rowIndex = -1;

    for (let i = 0; i < rows.length; i++) {
      const sheetNameKh = rows[i][0] ? String(rows[i][0]).trim() : "";
      const sheetPhones = getNormalizedPhoneArray(rows[i][1]);
      
      const hasPhoneMatch = inputPhones.some(p => sheetPhones.includes(p));

      // 🔥 Exact bulletproof matching prevents duplication
      if (sheetNameKh === cleanInputName && hasPhoneMatch) {
        rowIndex = i + 2; 
        break;
      }
    }

    if (rowIndex !== -1) {
      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEETS.TRACKING,
        range: `'Avatars'!C${rowIndex}`,
        valueInputOption: "USER_ENTERED",
        requestBody: { values: [[imageUrl]] },
      });
    } else {
      await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEETS.TRACKING,
        range: "'Avatars'!A:C",
        valueInputOption: "USER_ENTERED",
        requestBody: { values: [[cleanInputName, phone, imageUrl]] },
      });
    }

    res.json({ success: true, imageUrl, message: "Avatar updated successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error during upload" });
  }
});

// ==========================================
// SET APP AVATAR (DIRECT URL UPDATE)
// ==========================================
router.post("/update-avatar-url", async (req, res) => {
  try {
    const { nameKh, phone, avatarUrl } = req.body;
    if (!nameKh || !phone || !avatarUrl) return res.status(400).json({ success: false, message: "Missing data" });

    // Normalize inputs
    const inputPhones = getNormalizedPhoneArray(phone);
    const cleanInputName = nameKh ? String(nameKh).trim() : "";

    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: authClient });

    const response = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEETS.TRACKING });
    const allTabs = response.data.sheets;
    let tabExists = false;

    for (const tab of allTabs) {
      if (tab.properties.title === "Avatars") { tabExists = true; break; }
    }

    if (!tabExists) {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SPREADSHEETS.TRACKING,
        requestBody: { requests: [{ addSheet: { properties: { title: "Avatars" } } }] }
      });
      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEETS.TRACKING,
        range: "'Avatars'!A1:C1",
        valueInputOption: "USER_ENTERED",
        requestBody: { values: [["Name (Khmer)", "Phone Number", "Cloudinary Image URL"]] }
      });
    }

    const getRes = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEETS.TRACKING,
      range: "'Avatars'!A2:C500",
    });
    const rows = getRes.data.values || [];
    let rowIndex = -1;

    for (let i = 0; i < rows.length; i++) {
      const sheetNameKh = rows[i][0] ? String(rows[i][0]).trim() : "";
      const sheetPhones = getNormalizedPhoneArray(rows[i][1]);
      
      const hasPhoneMatch = inputPhones.some(p => sheetPhones.includes(p));

      // 🔥 Exact bulletproof matching prevents duplication
      if (sheetNameKh === cleanInputName && hasPhoneMatch) {
        rowIndex = i + 2; 
        break;
      }
    }

    if (rowIndex !== -1) {
      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEETS.TRACKING,
        range: `'Avatars'!C${rowIndex}`,
        valueInputOption: "USER_ENTERED",
        requestBody: { values: [[avatarUrl]] },
      });
    } else {
      await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEETS.TRACKING,
        range: "'Avatars'!A:C",
        valueInputOption: "USER_ENTERED",
        requestBody: { values: [[cleanInputName, phone, avatarUrl]] },
      });
    }

    res.json({ success: true, message: "App Avatar updated successfully!" });
  } catch (error) {
    console.error("Update Avatar URL Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;