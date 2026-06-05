const express = require("express");
const router = express.Router();
const { google, auth, SPREADSHEETS } = require("../config/googleClient");

// Image Upload Dependencies
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

// 🔥 Configure Cloudinary (Replace with your actual keys from Cloudinary Dashboard)
cloudinary.config({
  cloud_name: 'dsruankj0',
  api_key: '834654164388182',
  api_secret: 'ZHxYDhHuUOU1FFV5Yd-kgbtCjuk'
});

// Setup Multer for temporary file storage
const upload = multer({ dest: 'uploads/' });

// ==========================================
// HELPER: GET AVATAR URL
// ==========================================
// This fetches the image URL from the "Avatars" tab in the Tracking Spreadsheet
async function getAvatarUrl(sheets, nameKh, phone) {
  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEETS.TRACKING,
      range: "'Avatars'!A2:C500", // A=NameKh, B=Phone, C=URL
    });
    const rows = res.data.values;
    if (!rows) return null;

    for (const row of rows) {
      if (row[0] === nameKh && row[1] === phone) {
        return row[2]; // Return the URL
      }
    }
    return null;
  } catch (error) {
    return null; // Tab might not exist yet, that's fine
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

    // Fetch the data
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEETS.TEACHER,
      range: `'${tabName}'!A1:BM500`, // Grabbing up to BM (65 columns) just to be safe
    });
    const rows = response.data.values;
    if (!rows || rows.length < 5) return res.json({ success: true, data: [] });

    // Fetch Avatars
    let allAvatars = [];
    try {
      const avatarRes = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEETS.TRACKING,
        range: "'Avatars'!A2:C500",
      });
      allAvatars = avatarRes.data.values || [];
    } catch(e) {}

    // ==========================================
    // 🔥 BULLETPROOF DYNAMIC COLUMN SCANNER
    // ==========================================
    const yearRow = rows[1] || []; 
    const semRow = rows[2] || [];  
    const headerRow = rows[3] || []; 

    // Ultra-safe parser for Years/Semesters (Handles Khmer, Arabic, and Roman Numerals)
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

    // 🔥 THE FIX: Hardcode the max scan distance to 65 columns (BM) so we never stop early!
    for (let c = 7; c < 65; c++) {
        const yText = yearRow[c] ? String(yearRow[c]) : "";
        const sText = semRow[c] ? String(semRow[c]) : "";
        const hText = headerRow[c] ? String(headerRow[c]).trim() : "";

        // Update Year if found
        if (yText.includes("ឆ្នាំ") || yText.toLowerCase().includes("year")) {
            const y = parseYearSem(yText);
            if (y) currentYear = y;
        }

        // Update Semester if found
        if (sText.includes("ឆមាស") || sText.toLowerCase().includes("sem")) {
            const s = parseYearSem(sText);
            if (s) currentSem = s;
        }

        // Hunt for the English Subject Column
        if (hText.includes("អង់គ្លេស") || hText.toLowerCase().includes("english")) {
            dynamicSubjectColumns.push({
                cols: [c, c + 1], // +1 automatically assumes Khmer subject is right next to it
                year: currentYear,
                sem: currentSem
            });
        }
    }

    // Fallback just in case the sheet is totally blank on row 4
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

    // Read the actual teachers
    for (let i = 4; i < rows.length; i++) {
      const row = rows[i];
      const colA = row[0] ? String(row[0]).trim() : "";
      const colB = row[1] ? String(row[1]).trim() : "";
      const colC = row[2] ? String(row[2]).trim() : "";
      const colD = row[3] ? String(row[3]).trim() : "";
      const colE = row[4] ? String(row[4]).trim() : "";
      const colF = row[5] ? String(row[5]).trim() : "";
      const rowPhone = row[6] ? String(row[6]).trim() : "N/A";

      const potentialHeader = colB || colA;
      const isJustANumber = !isNaN(potentialHeader) && potentialHeader !== "";

      if (potentialHeader && !isJustANumber && !colC && !colD && !colE && !colF && colB !== "ឈ្មោះគ្រូបង្រៀន") {
        currentClassGroup = potentialHeader;
        continue;
      }

      if (colB && colB !== "ឈ្មោះគ្រូបង្រៀន" && colB !== "No Name") {
        
        let avatarUrl = null;
        for (const av of allAvatars) {
           if (av[0] === colB && av[1] === rowPhone) {
              avatarUrl = av[2]; break;
           }
        }

        const subjects = [];
        subjectColumns.forEach(({ cols, year, sem }) => {
          const eng = row[cols[0]] ? String(row[cols[0]]).trim() : "";
          const kh = row[cols[1]] ? String(row[cols[1]]).trim() : "";
          // Only save if text is present and it is not just a raw number (like hours)
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
          phone: rowPhone,
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
        const rowPhone = row[6] ? row[6].trim() : "";

        if ((nameKh === name.trim() || nameEn.toLowerCase() === name.trim().toLowerCase()) && rowPhone === phone.trim()) {
          
          // 🔥 Teacher found! Now fetch their avatar from the Tracking sheet
          const avatarUrl = await getAvatarUrl(sheets, nameKh, rowPhone);

          loggedInTeacher = { nameKh, nameEn, department: tab, phone: rowPhone, avatarUrl };
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
    const { nameKh, phone } = req.body; // No longer need department
    if (!req.file) return res.status(400).json({ success: false, message: "No image provided" });

    // 1. Upload the image to Cloudinary (Unsigned)
    const result = await cloudinary.uploader.unsigned_upload(
      req.file.path, 
      "duc_avatar_upload"
    );

    fs.unlinkSync(req.file.path);
    const imageUrl = result.secure_url;

    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: authClient });

    // 2. Ensure "Avatars" tab exists in TRACKING spreadsheet
    const response = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEETS.TRACKING });
    const allTabs = response.data.sheets;
    let tabExists = false;

    for (const tab of allTabs) {
      if (tab.properties.title === "Avatars") { tabExists = true; break; }
    }

    // If it doesn't exist, create it and add headers
    if (!tabExists) {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SPREADSHEETS.TRACKING,
        requestBody: {
          requests: [{ addSheet: { properties: { title: "Avatars" } } }]
        }
      });
      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEETS.TRACKING,
        range: "'Avatars'!A1:C1",
        valueInputOption: "USER_ENTERED",
        requestBody: { values: [["Name (Khmer)", "Phone Number", "Cloudinary Image URL"]] }
      });
    }

    // 3. Check if user already has an image stored
    const getRes = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEETS.TRACKING,
      range: "'Avatars'!A2:C500",
    });
    const rows = getRes.data.values || [];
    let rowIndex = -1;

    for (let i = 0; i < rows.length; i++) {
      if (rows[i][0] === nameKh && rows[i][1] === phone) {
        rowIndex = i + 2; // Offset for header (A1)
        break;
      }
    }

    if (rowIndex !== -1) {
      // User exists, UPDATE their row
      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEETS.TRACKING,
        range: `'Avatars'!C${rowIndex}`,
        valueInputOption: "USER_ENTERED",
        requestBody: { values: [[imageUrl]] },
      });
    } else {
      // User is new, APPEND a new row
      await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEETS.TRACKING,
        range: "'Avatars'!A:C",
        valueInputOption: "USER_ENTERED",
        requestBody: { values: [[nameKh, phone, imageUrl]] },
      });
    }

    res.json({ success: true, imageUrl, message: "Avatar updated successfully!" });

  } catch (error) {
    console.error("Upload Error:", error);
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

    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: authClient });

    // 1. Check if "Avatars" tab exists
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

    // 2. Check if user already has a row
    const getRes = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEETS.TRACKING,
      range: "'Avatars'!A2:C500",
    });
    const rows = getRes.data.values || [];
    let rowIndex = -1;

    for (let i = 0; i < rows.length; i++) {
      if (rows[i][0] === nameKh && rows[i][1] === phone) {
        rowIndex = i + 2; 
        break;
      }
    }

    // 3. Update or Append
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
        requestBody: { values: [[nameKh, phone, avatarUrl]] },
      });
    }

    res.json({ success: true, message: "App Avatar updated successfully!" });
  } catch (error) {
    console.error("Update Avatar URL Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;