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
// GET TEACHERS (WITH BULLETPROOF DYNAMIC SCANNER)
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

    const yearRow = rows[1] || []; 
    const semRow = rows[2] || [];  
    const headerRow = rows[3] || []; 

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
        const yText = yearRow[c] ? String(yearRow[c]) : "";
        const sText = semRow[c] ? String(semRow[c]) : "";
        const hText = headerRow[c] ? String(headerRow[c]).trim() : "";

        if (yText.includes("ឆ្នាំ") || yText.toLowerCase().includes("year")) {
            const y = parseYearSem(yText);
            if (y) currentYear = y;
        }
        if (sText.includes("ឆមាស") || sText.toLowerCase().includes("sem")) {
            const s = parseYearSem(sText);
            if (s) currentSem = s;
        }
        if (hText.includes("អង់គ្លេស") || hText.toLowerCase().includes("english")) {
            dynamicSubjectColumns.push({
                cols: [c, c + 1], 
                year: currentYear,
                sem: currentSem
            });
        }
    }

    const subjectColumns = dynamicSubjectColumns.length > 0 ? dynamicSubjectColumns : [
      { cols: [7, 8], year: 1, sem: 1 },
      { cols: [12, 13], year: 1, sem: 2 },
      { cols: [17, 18], year: 2, sem: 1 },
      { cols: [22, 23], year: 2, sem: 2 },
      { cols: [29, 30], year: 3, sem: 1 },
      { cols: [34, 35], year: 3, sem: 2 },
      { cols: [39, 40], year: 4, sem: 1 },
      { cols: [44, 45], year: 4, sem: 2 },
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
        subjectColumns.forEach(({ cols, year, sem }) => {
          const eng = row[cols[0]] ? String(row[cols[0]]).trim() : "";
          const kh = row[cols[1]] ? String(row[cols[1]]).trim() : "";
          if ((eng || kh) && (isNaN(eng) || isNaN(kh))) {
              subjects.push({ eng, kh, year, sem });
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
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;