const express = require("express");
const router = express.Router();
const { google, auth, SPREADSHEETS } = require("../config/googleClient");
require("dotenv").config();

// GET & POST MAJORS
router.get('/majors', async (req, res) => {
  try {
      const authClient = await auth.getClient();
      const sheets = google.sheets({ version: "v4", auth: authClient });
      const response = await sheets.spreadsheets.values.get({ spreadsheetId: SPREADSHEETS.TRACKING, range: "'Majors'!A2:B" });
      const rows = response.data.values || [];
      const majorMap = {};
      rows.forEach(row => { if (row[0] && row[1]) majorMap[row[0]] = row[1]; });
      res.json({ success: true, data: majorMap });
  } catch (error) { res.status(500).json({ success: false, message: "Error fetching majors" }); }
});

router.post('/majors', async (req, res) => {
  try {
      const { code, fullName } = req.body;
      const authClient = await auth.getClient();
      const sheets = google.sheets({ version: "v4", auth: authClient });
      await sheets.spreadsheets.values.append({
          spreadsheetId: SPREADSHEETS.TRACKING, range: "'Majors'!A:B", valueInputOption: "USER_ENTERED", insertDataOption: "INSERT_ROWS", requestBody: { values: [[code, fullName]] }
      });
      res.json({ success: true, message: "Major added successfully!" });
  } catch (error) { res.status(500).json({ success: false, message: "Error adding major" }); }
});

// GET & POST FACULTIES
router.get('/faculties', async (req, res) => {
  try {
      const authClient = await auth.getClient();
      const sheets = google.sheets({ version: "v4", auth: authClient });
      const response = await sheets.spreadsheets.values.get({ spreadsheetId: SPREADSHEETS.TRACKING, range: "'Faculties'!A2:B" });
      const rows = response.data.values || [];
      const facultyMap = {};
      rows.forEach(row => { if (row[0] && row[1]) facultyMap[row[0]] = row[1]; });
      res.json({ success: true, data: facultyMap });
  } catch (error) { res.status(500).json({ success: false, message: "Error fetching faculties" }); }
});

router.post('/faculties', async (req, res) => {
  try {
      const { code, fullName } = req.body;
      const authClient = await auth.getClient();
      const sheets = google.sheets({ version: "v4", auth: authClient });
      await sheets.spreadsheets.values.append({
          spreadsheetId: SPREADSHEETS.TRACKING, range: "'Faculties'!A:B", valueInputOption: "USER_ENTERED", insertDataOption: "INSERT_ROWS", requestBody: { values: [[code, fullName]] }
      });
      res.json({ success: true, message: "Faculty added successfully!" });
  } catch (error) { res.status(500).json({ success: false, message: "Error adding faculty" }); }
});

// DELETE MAJOR
router.delete('/majors/:code', async (req, res) => {
  try {
      const { code } = req.params;
      const authClient = await auth.getClient();
      const sheets = google.sheets({ version: "v4", auth: authClient });
      
      const sheetMeta = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEETS.TRACKING });
      const targetSheet = sheetMeta.data.sheets.find(s => s.properties.title === 'Majors');
      if (!targetSheet) return res.status(404).json({ success: false, message: "Tab not found" });
      const sheetId = targetSheet.properties.sheetId;

      const response = await sheets.spreadsheets.values.get({ spreadsheetId: SPREADSHEETS.TRACKING, range: "'Majors'!A:A" });
      const rows = response.data.values || [];
      
      let rowIndex = -1;
      for (let i = 0; i < rows.length; i++) {
          if (rows[i][0] && rows[i][0].trim() === code.trim()) {
              rowIndex = i;
              break;
          }
      }

      if (rowIndex === -1) return res.status(404).json({ success: false, message: "Major not found" });

      await sheets.spreadsheets.batchUpdate({
          spreadsheetId: SPREADSHEETS.TRACKING,
          requestBody: {
              requests: [{
                  deleteDimension: {
                      range: { sheetId: sheetId, dimension: "ROWS", startIndex: rowIndex, endIndex: rowIndex + 1 }
                  }
              }]
          }
      });
      res.json({ success: true, message: "Major deleted successfully!" });
  } catch (error) { res.status(500).json({ success: false, message: "Error deleting major" }); }
});

// DELETE FACULTY
router.delete('/faculties/:code', async (req, res) => {
  try {
      const { code } = req.params;
      const authClient = await auth.getClient();
      const sheets = google.sheets({ version: "v4", auth: authClient });
      
      const sheetMeta = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEETS.TRACKING });
      const targetSheet = sheetMeta.data.sheets.find(s => s.properties.title === 'Faculties');
      if (!targetSheet) return res.status(404).json({ success: false, message: "Tab not found" });
      const sheetId = targetSheet.properties.sheetId;

      const response = await sheets.spreadsheets.values.get({ spreadsheetId: SPREADSHEETS.TRACKING, range: "'Faculties'!A:A" });
      const rows = response.data.values || [];
      
      let rowIndex = -1;
      for (let i = 0; i < rows.length; i++) {
          if (rows[i][0] && rows[i][0].trim() === code.trim()) {
              rowIndex = i;
              break;
          }
      }

      if (rowIndex === -1) return res.status(404).json({ success: false, message: "Faculty not found" });

      await sheets.spreadsheets.batchUpdate({
          spreadsheetId: SPREADSHEETS.TRACKING,
          requestBody: {
              requests: [{
                  deleteDimension: {
                      range: { sheetId: sheetId, dimension: "ROWS", startIndex: rowIndex, endIndex: rowIndex + 1 }
                  }
              }]
          }
      });
      res.json({ success: true, message: "Faculty deleted successfully!" });
  } catch (error) { res.status(500).json({ success: false, message: "Error deleting faculty" }); }
});

// ==========================================
// ADMIN AUTHENTICATION
// ==========================================
router.post('/admin/login', (req, res) => { // <-- Change to /admin/login here
  const { password } = req.body;
  
  // Verify against the .env file
  if (password === process.env.ADMIN_PASSWORD) {
    res.json({ success: true, message: "Authentication successful" });
  } else {
    res.status(401).json({ success: false, message: "Invalid Admin Password" });
  }
});

// ==========================================
// ADMIN TEACHER MANAGEMENT
// ==========================================
// HELPER: OBLITERATE SPACES FOR FUZZY MATCHING
// ==========================================
const normalizeText = (str) => {
    return String(str || "")
        .replace(/[\s\u200B-\u200D\uFEFF]/g, '') 
        .toLowerCase();
};

const TEACHER_DATA_SHEET_ID = "1wCRweEDDuNIZtXYq-qiOSIE-zYgvMQ2zA8m594DtevQ"; 
const TEACHER_DATA_TAB = "ទិន្នន័យលោកគ្រូអ្នកគ្រូ";

router.get('/admin/teachers', async (req, res) => {
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
          const cleanName = normalizeText(name.replace(/លោកគ្រូ|អ្នកគ្រូ|Dr\.|Dr/gi, ''));
          avatarMap[cleanName] = imgUrl;
          avatarMap[normalizeText(name)] = imgUrl;
        }
      });
    } catch (e) {}

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: TEACHER_DATA_SHEET_ID,
      range: `'${TEACHER_DATA_TAB}'!A4:P`
    });

    const rows = response.data.values || [];
    const teachers = rows.map((row, index) => {
      const nameKh = String(row[1] || "").trim();
      const normalizedName = normalizeText(nameKh.replace(/លោកគ្រូ|អ្នកគ្រូ|Dr\.|Dr/gi, ''));
      const avatarUrl = avatarMap[normalizedName] || avatarMap[normalizeText(nameKh)] || String(row[11] || "").trim();

      return {
        rowIndex: index + 4, // A4 is row 4
        id: String(row[0] || "").trim(),
        nameKh: nameKh,
        nameEn: String(row[2] || "").trim(),
        dob: String(row[3] || "").trim(),
        gender: String(row[4] || "").trim(),
        role: String(row[5] || "").trim(),
        classGrade: String(row[6] || "").trim(), // ថ្នាក់ទី
        degree: String(row[7] || "").trim(),
        major: String(row[8] || "").trim(),
        phone: String(row[9] || "").trim(),
        email: String(row[10] || "").trim(),
        avatarUrl: avatarUrl,
        joinDate: String(row[12] || "").trim(),
        cerNumber: String(row[13] || "").trim(),
        password: String(row[14] || "").trim(),
        isBlocked: String(row[15] || "").trim().toUpperCase() === "TRUE"
      };
    });

    res.json({ success: true, data: teachers });
  } catch (error) {
    console.error("Error fetching teachers in admin:", error);
    res.status(500).json({ success: false, message: "Error fetching teachers" });
  }
});

router.post('/admin/teachers/update', async (req, res) => {
  try {
    const { 
      rowIndex, nameKh, nameEn, dob, gender, role, classGrade, 
      degree, major, phone, email, avatarUrl, joinDate, 
      cerNumber, password, isBlocked 
    } = req.body;
    
    if (!rowIndex) return res.status(400).json({ success: false, message: "Row index required" });

    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: authClient });

    // Update Columns B through P
    const values = [
      [
        nameKh || "",         // B: Name Kh
        nameEn || "",         // C: Name En
        dob || "",            // D: DOB
        gender || "",         // E: Gender
        role || "",           // F: Role
        classGrade || "",     // G: Class Grade
        degree || "",         // H: Degree
        major || "",          // I: Major
        phone || "",          // J: Phone
        email || "",          // K: Email
        avatarUrl || "",      // L: Avatar URL
        joinDate || "",       // M: Join Date
        cerNumber || "",      // N: Cer Number
        password || "",       // O: Password
        isBlocked ? "TRUE" : "FALSE" // P: Blocked
      ]
    ];

    await sheets.spreadsheets.values.update({
      spreadsheetId: TEACHER_DATA_SHEET_ID,
      range: `'${TEACHER_DATA_TAB}'!B${rowIndex}:P${rowIndex}`,
      valueInputOption: "USER_ENTERED",
      requestBody: { values: values }
    });

    res.json({ success: true, message: "Teacher updated successfully!" });
  } catch (error) {
    console.error("Error updating teacher:", error);
    res.status(500).json({ success: false, message: "Error updating teacher" });
  }
});

router.post('/admin/teachers/add', async (req, res) => {
  try {
    const { 
      id, nameKh, nameEn, dob, gender, role, classGrade, 
      degree, major, phone, email, avatarUrl, joinDate, 
      cerNumber, password, isBlocked 
    } = req.body;

    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: authClient });

    // Fetch existing rows to calculate the next ID (ល.រ)
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: TEACHER_DATA_SHEET_ID,
      range: `'${TEACHER_DATA_TAB}'!A4:A`
    });
    
    const rows = response.data.values || [];
    let nextId = 1;
    if (rows.length > 0) {
      // Try to parse the last row's ID
      const lastRowIdStr = rows[rows.length - 1][0];
      const lastId = parseInt(lastRowIdStr);
      if (!isNaN(lastId)) {
        nextId = lastId + 1;
      } else {
        // Fallback to row count if parsing fails
        nextId = rows.length + 1;
      }
    }

    // Append to columns A through P
    const values = [
      [
        id || nextId,         // A: ID (ល.រ)
        nameKh || "",         // B: Name Kh
        nameEn || "",         // C: Name En
        dob || "",            // D: DOB
        gender || "",         // E: Gender
        role || "",           // F: Role
        classGrade || "",     // G: Class Grade
        degree || "",         // H: Degree
        major || "",          // I: Major
        phone || "",          // J: Phone
        email || "",          // K: Email
        avatarUrl || "",      // L: Avatar URL
        joinDate || "",       // M: Join Date
        cerNumber || "",      // N: Cer Number
        password || "",       // O: Password
        isBlocked ? "TRUE" : "FALSE" // P: Blocked
      ]
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: TEACHER_DATA_SHEET_ID,
      range: `'${TEACHER_DATA_TAB}'!A:P`,
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: { values: values }
    });

    res.json({ success: true, message: "Teacher added successfully!" });
  } catch (error) {
    console.error("Error adding teacher:", error);
    res.status(500).json({ success: false, message: "Error adding teacher" });
  }
});

router.delete('/admin/teachers/delete/:rowIndex', async (req, res) => {
  try {
    const { rowIndex } = req.params;
    if (!rowIndex) return res.status(400).json({ success: false, message: "Row index required" });

    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: authClient });

    const sheetMeta = await sheets.spreadsheets.get({ spreadsheetId: TEACHER_DATA_SHEET_ID });
    const targetSheet = sheetMeta.data.sheets.find(s => s.properties.title === TEACHER_DATA_TAB);
    if (!targetSheet) return res.status(404).json({ success: false, message: "Tab not found" });
    const sheetId = targetSheet.properties.sheetId;

    // Google Sheets API uses 0-based indexing for deleteDimension
    // The rowIndex passed from frontend is 1-based (A4 is row 4, meaning index 3 for deleteDimension)
    const index = parseInt(rowIndex) - 1;

    await sheets.spreadsheets.batchUpdate({
        spreadsheetId: TEACHER_DATA_SHEET_ID,
        requestBody: {
            requests: [{
                deleteDimension: {
                    range: { 
                        sheetId: sheetId, 
                        dimension: "ROWS", 
                        startIndex: index, 
                        endIndex: index + 1 
                    }
                }
            }]
        }
    });

    res.json({ success: true, message: "Teacher deleted successfully!" });
  } catch (error) {
    console.error("Error deleting teacher:", error);
    res.status(500).json({ success: false, message: "Error deleting teacher" });
  }
});

module.exports = router;