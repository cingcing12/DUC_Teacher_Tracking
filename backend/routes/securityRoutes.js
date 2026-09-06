const express = require('express');
const router = express.Router();
const { google, auth, SPREADSHEETS } = require("../config/googleClient");
const { authenticator } = require('otplib');
const QRCode = require('qrcode');
const { v4: uuidv4 } = require('uuid');
const sseEmitter = require('../utils/sseEmitter');
const TwoFactor = require('../models/TwoFactor');
const Session = require('../models/Session');
const Notification = require('../models/Notification');

// Hardcoded for teachers password changes
const TEACHER_DATA_SHEET_ID = "1wCRweEDDuNIZtXYq-qiOSIE-zYgvMQ2zA8m594DtevQ";
const TEACHER_DATA_TAB = "ទិន្នន័យលោកគ្រូអ្នកគ្រូ";

// Ensure tabs exist in Security spreadsheet
// 1. Password change
router.put('/security/password', async (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body;
    if (!email || !currentPassword || !newPassword) return res.status(400).json({ success: false, message: 'All fields required' });

    const isValid = newPassword.length >= 8 && /[a-zA-Z]/.test(newPassword) && /\d/.test(newPassword) && /[\W_]/.test(newPassword);
    if (!isValid) {
      return res.status(400).json({ success: false, message: 'Password must be at least 8 characters long and contain a letter, a number, and a symbol.' });
    }

    const record = await TwoFactor.findOne({ email });
    res.json({ success: true, enabled: !!record });
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

    await TwoFactor.findOneAndUpdate(
      { email },
      { secret },
      { upsert: true, new: true }
    );
    sseEmitter.emit('2fa_updated', { email, enabled: true });

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
    const record = await TwoFactor.findOne({ email });
    if (!record) return res.status(400).json({ success: false, message: '2FA is not enabled' });
    
    const isValid = authenticator.verify({ token, secret: record.secret });
    if (!isValid) return res.status(400).json({ success: false, message: 'Invalid 2FA code' });

    const notifId = uuidv4();
    const timestamp = new Date().toISOString();
    const title = 'New Device Login';
    const message = `Login detected on ${sessionInfo.device} from ${sessionInfo.location || 'Local Network'}`;

    await Promise.all([
      Session.create({
        sessionId: sessionInfo.sessionId,
        email: email,
        device: sessionInfo.device,
        ip: sessionInfo.ip,
        location: sessionInfo.location,
        lastActive: sessionInfo.lastActive,
        status: 'ACTIVE'
      }),
      Notification.create({
        id: notifId,
        email: email,
        sessionId: sessionInfo.sessionId,
        title: title,
        message: message,
        isUnread: true,
        timestamp: timestamp,
        isDeleted: false
      })
    ]).then(() => {
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
        },
        notification: {
          id: notifId,
          title,
          message,
          isUnread: true,
          timestamp
        }
      });
    }).catch(e => console.error("Background save failed:", e));

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
    const record = await TwoFactor.findOne({ email });
    if (!record) return res.status(400).json({ success: false, message: '2FA is not enabled' });
    
    const isValid = authenticator.verify({ token, secret: record.secret });
    if (!isValid) return res.status(400).json({ success: false, message: 'Invalid 2FA code' });

    await TwoFactor.deleteOne({ email });
    sseEmitter.emit('2fa_updated', { email, enabled: false });

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
    const sessions = await Session.find({ email, status: 'ACTIVE' });
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
    const session = await Session.findOneAndUpdate(
      { sessionId },
      { status: 'TERMINATED' }
    );
    
    if (session) {
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
    const session = await Session.findOne({ sessionId });
    if (!session || session.status === 'TERMINATED') {
      res.write(`data: ${JSON.stringify({ type: 'TERMINATED' })}\n\n`);
    }
  } catch (error) {
    console.error(error);
  }
});

// 7. Get Notifications
router.get('/security/notifications', async (req, res) => {
  const email = req.query.email;
  if (!email) return res.status(400).json({ success: false, message: 'Email required' });

  try {
    const notifications = await Notification.find({ email, isDeleted: false }).sort({ timestamp: -1 });
    res.json({ success: true, notifications });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// 8. Mark all Notifications as Read
router.put('/security/notifications/read', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ success: false, message: 'Email required' });

  try {
    const result = await Notification.updateMany(
      { email, isUnread: true, isDeleted: false },
      { isUnread: false }
    );
    
    if (result.modifiedCount > 0) {
      sseEmitter.emit('notifications_read', { email });
    }

    res.json({ success: true, message: 'Notifications marked as read' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// 9. Soft-delete a Notification
router.delete('/security/notifications/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const notification = await Notification.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true }
    );
    
    if (notification) {
      sseEmitter.emit('notification_deleted', { email: notification.email, id });
      res.json({ success: true, message: 'Notification deleted' });
    } else {
      res.status(404).json({ success: false, message: 'Notification not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
