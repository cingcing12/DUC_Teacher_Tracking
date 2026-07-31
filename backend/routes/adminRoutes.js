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
module.exports = router;