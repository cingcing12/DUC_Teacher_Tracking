const express = require('express');
const router = express.Router();
const { google, auth, SPREADSHEETS } = require("../config/googleClient");
const { authenticator } = require('otplib');
const QRCode = require('qrcode');
const { v4: uuidv4 } = require('uuid');
const sseEmitter = require('../utils/sseEmitter');

// Hardcoded for teachers password changes
const TEACHER_DATA_SHEET_ID = "1wCRweEDDuNIZtXYq-qiOSIE-zYgvMQ2zA8m594DtevQ";
const TEACHER_DATA_TAB = "ទិន្នន័យលោកគ្រូអ្នកគ្រូ";

// Ensure tabs exist in Security spreadsheet
async function ensureSecurityTabs(sheets) {
  try {
    const res = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEETS.SECURITY });
    const existingTitles = res.data.sheets.map(s => s.properties.title);
    const requests = [];
    
    if (!existingTitles.includes('2FA')) {
      requests.push({ addSheet: { properties: { title: '2FA' } } });
    }
    if (!existingTitles.includes('Sessions')) {
      requests.push({ addSheet: { properties: { title: 'Sessions' } } });
    }
    
    if (requests.length > 0) {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SPREADSHEETS.SECURITY,
        requestBody: { requests }
      });
      
      // Initialize headers
      if (!existingTitles.includes('2FA')) {
        await sheets.spreadsheets.values.update({
          spreadsheetId: SPREADSHEETS.SECURITY,
          range: "'2FA'!A1:B1",
          valueInputOption: "USER_ENTERED",
          requestBody: { values: [['Email', 'Secret']] }
        });
      }
      if (!existingTitles.includes('Sessions')) {
        await sheets.spreadsheets.values.update({
          spreadsheetId: SPREADSHEETS.SECURITY,
          range: "'Sessions'!A1:G1",
          valueInputOption: "USER_ENTERED",
          requestBody: { values: [['SessionId', 'Email', 'Device', 'IP', 'Location', 'LastActive', 'Status']] }
        });
      }
    }
  } catch (error) {
    console.error("Error ensuring tabs:", error);
  }
}

// 1. Password change
router.put('/security/password', async (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body;
    if (!email || !currentPassword || !newPassword) return res.status(400).json({ success: false, message: 'All fields required' });

    const isValid = newPassword.length >= 8 && /[a-zA-Z]/.test(newPassword) && /\d/.test(newPassword) && /[\W_]/.test(newPassword);
    if (!isValid) {
      return res.status(400).json({ success: false, message: 'Password must be at least 8 characters long and contain a letter, a number, and a symbol.' });
    }

    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: authClient });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: TEACHER_DATA_SHEET_ID,
      range: `'${TEACHER_DATA_TAB}'!A2:Q`
    });

    const rows = response.data.values || [];
    let rowIndex = -1;

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const dbEmailRaw = String(row[10] || "").toLowerCase();
      const emailList = dbEmailRaw.replace(/\bor\b/gi, ',').replace(/[\/\|;]/g, ',').split(',').map(e => e.trim());
      const dbPassword = String(row[14] || "").trim();

      if (emailList.includes(email.toLowerCase().trim())) {
        if (dbPassword === currentPassword.trim()) {
          rowIndex = i + 2; // +2 because range starts at A2 and Sheets is 1-indexed
          break;
        } else {
          return res.status(401).json({ success: false, message: 'Current password incorrect' });
        }
      }
    }

    if (rowIndex === -1) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Update password in column O (which is column 15)
    await sheets.spreadsheets.values.update({
      spreadsheetId: TEACHER_DATA_SHEET_ID,
      range: `'${TEACHER_DATA_TAB}'!O${rowIndex}`,
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: [[newPassword]] }
    });

    res.json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get 2FA Status
router.get('/security/2fa/status', async (req, res) => {
  const email = req.query.email;
  if (!email) return res.status(400).json({ success: false, message: 'Email required' });

  try {
    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: authClient });
    await ensureSecurityTabs(sheets);
    
    const resGet = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEETS.SECURITY,
      range: "'2FA'!A:B"
    });
    const rows = resGet.data.values || [];
    const has2FA = rows.some(r => r[0] === email && r[1]);
    
    res.json({ success: true, enabled: has2FA });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error checking status' });
  }
});

// 2. Generate 2FA
router.post('/security/2fa/generate', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ success: false, message: 'Email required' });

  const secret = authenticator.generateSecret();
  const otpauth = authenticator.keyuri(email, 'DUC Tracking', secret);
  
  try {
    const qrCodeUrl = await QRCode.toDataURL(otpauth);
    res.json({ success: true, secret, qrCodeUrl });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error generating QR code' });
  }
});

// 3. Enable 2FA
router.post('/security/2fa/enable', async (req, res) => {
  const { email, secret, token } = req.body;
  if (!email || !secret || !token) return res.status(400).json({ success: false, message: 'All fields required' });

  try {
    const isValid = authenticator.verify({ token, secret });
    if (!isValid) return res.status(400).json({ success: false, message: 'Invalid 2FA code' });

    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: authClient });
    await ensureSecurityTabs(sheets);

    const resGet = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEETS.SECURITY,
      range: "'2FA'!A:B"
    });
    const rows = resGet.data.values || [];
    let rowIndex = -1;
    for (let i = 0; i < rows.length; i++) {
      if (rows[i][0] === email) {
        rowIndex = i + 1;
        break;
      }
    }

    if (rowIndex > -1) {
      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEETS.SECURITY,
        range: `'2FA'!A${rowIndex}:B${rowIndex}`,
        valueInputOption: "USER_ENTERED",
        requestBody: { values: [[email, secret]] }
      });
    } else {
      await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEETS.SECURITY,
        range: "'2FA'!A:B",
        valueInputOption: "USER_ENTERED",
        insertDataOption: "INSERT_ROWS",
        requestBody: { values: [[email, secret]] }
      });
    }

    res.json({ success: true, message: '2FA enabled successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// 3.5 Verify 2FA Login
router.post('/security/2fa/verify-login', async (req, res) => {
  const { email, token, teacherTemp, sessionInfo } = req.body;
  if (!email || !token || !teacherTemp || !sessionInfo) return res.status(400).json({ success: false, message: 'All fields required' });

  try {
    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: authClient });

    const resGet = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEETS.SECURITY,
      range: "'2FA'!A:B"
    });
    const rows = resGet.data.values || [];
    let secret = null;
    for (let i = 0; i < rows.length; i++) {
      if (rows[i][0] === email) {
        secret = rows[i][1];
        break;
      }
    }

    if (!secret) return res.status(400).json({ success: false, message: '2FA is not enabled' });
    
    const isValid = authenticator.verify({ token, secret });
    if (!isValid) return res.status(400).json({ success: false, message: 'Invalid 2FA code' });

    // Save Session Asynchronously
    sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEETS.SECURITY,
      range: "'Sessions'!A:G",
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: { values: [[sessionInfo.sessionId, email, sessionInfo.device, sessionInfo.ip, sessionInfo.location, sessionInfo.lastActive, 'ACTIVE']] }
    }).then(() => {
      // Notify other devices of the new session instantly with payload
      sseEmitter.emit('session_updated', { 
        teacherName: teacherTemp.nameKh,
        newSession: {
          sessionId: sessionInfo.sessionId,
          email: email,
          device: sessionInfo.device,
          ip: sessionInfo.ip,
          location: sessionInfo.location,
          lastActive: sessionInfo.lastActive,
          status: 'ACTIVE'
        }
      });
    }).catch(e => console.error("Could not save session", e));

    teacherTemp.sessionId = sessionInfo.sessionId;
    res.json({ success: true, message: "Login successful!", teacher: teacherTemp });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// 4. Disable 2FA
router.post('/security/2fa/disable', async (req, res) => {
  const { email, token } = req.body;
  if (!email || !token) return res.status(400).json({ success: false, message: 'Email and token required' });

  try {
    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: authClient });

    const resGet = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEETS.SECURITY,
      range: "'2FA'!A:B"
    });
    const rows = resGet.data.values || [];
    let secret = null;
    let rowIndex = -1;
    for (let i = 0; i < rows.length; i++) {
      if (rows[i][0] === email) {
        secret = rows[i][1];
        rowIndex = i;
        break;
      }
    }

    if (!secret) return res.status(400).json({ success: false, message: '2FA is not enabled' });
    
    const isValid = authenticator.verify({ token, secret });
    if (!isValid) return res.status(400).json({ success: false, message: 'Invalid 2FA code' });

    const sheetMeta = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEETS.SECURITY });
    const targetSheet = sheetMeta.data.sheets.find(s => s.properties.title === '2FA');
    
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SPREADSHEETS.SECURITY,
      requestBody: {
        requests: [{
          deleteDimension: {
            range: { sheetId: targetSheet.properties.sheetId, dimension: "ROWS", startIndex: rowIndex, endIndex: rowIndex + 1 }
          }
        }]
      }
    });

    res.json({ success: true, message: '2FA disabled successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// 5. Get Sessions
router.get('/security/sessions', async (req, res) => {
  const email = req.query.email;
  if (!email) return res.status(400).json({ success: false, message: 'Email required' });

  try {
    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: authClient });
    await ensureSecurityTabs(sheets);
    
    const resGet = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEETS.SECURITY,
      range: "'Sessions'!A2:G"
    });
    
    const rows = resGet.data.values || [];
    const sessions = rows
      .filter(r => r[1] === email && r[6] === 'ACTIVE')
      .map(r => ({
        sessionId: r[0],
        email: r[1],
        device: r[2],
        ip: r[3],
        location: r[4],
        lastActive: r[5]
      }));
      
    res.json({ success: true, sessions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// 6. Terminate Session
router.delete('/security/sessions/:sessionId', async (req, res) => {
  const { sessionId } = req.params;
  
  try {
    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: authClient });
    
    const resGet = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEETS.SECURITY,
      range: "'Sessions'!A:G"
    });
    
    const rows = resGet.data.values || [];
    let rowIndex = -1;
    for (let i = 0; i < rows.length; i++) {
      if (rows[i][0] === sessionId) {
        rowIndex = i + 1;
        break;
      }
    }
    
    if (rowIndex > -1) {
      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEETS.SECURITY,
        range: `'Sessions'!G${rowIndex}`,
        valueInputOption: "USER_ENTERED",
        requestBody: { values: [['TERMINATED']] }
      });
      
      // Fire SSE event to terminate this specific session
      sseEmitter.emit('terminate_session', sessionId);
      
      res.json({ success: true, message: 'Session terminated' });
    } else {
      res.status(404).json({ success: false, message: 'Session not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// SSE endpoint for sessions
router.get("/security/stream-session", async (req, res) => {
  const sessionId = req.query.sessionId;
  if (!sessionId) return res.status(400).json({ success: false, message: "Missing sessionId" });

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  // Send ping to keep connection alive
  const pingInterval = setInterval(() => {
    res.write(`:\n\n`);
  }, 15000);

  const listener = (targetSessionId) => {
    if (targetSessionId === sessionId) {
      res.write(`data: ${JSON.stringify({ type: 'TERMINATED' })}\n\n`);
    }
  };

  sseEmitter.on('terminate_session', listener);

  req.on('close', () => {
    clearInterval(pingInterval);
    sseEmitter.off('terminate_session', listener);
  });

  // Verify initial status immediately upon connection
  try {
    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: authClient });
    const resGet = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEETS.SECURITY,
      range: "'Sessions'!A:G"
    });
    
    const rows = resGet.data.values || [];
    let isTerminated = false;
    for (const r of rows) {
      if (r[0] === sessionId) {
        if (r[6] === 'TERMINATED') {
          isTerminated = true;
        }
        break;
      }
    }
    
    if (isTerminated) {
      res.write(`data: ${JSON.stringify({ type: 'TERMINATED' })}\n\n`);
    }
  } catch (error) {
    console.error("Failed to verify initial session status", error);
  }
});

module.exports = router;
