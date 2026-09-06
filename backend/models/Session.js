const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  device: { type: String },
  ip: { type: String },
  location: { type: String },
  lastActive: { type: String },
  status: { type: String, enum: ['ACTIVE', 'PENDING_2FA', 'TERMINATED'], default: 'ACTIVE' },
  createdAt: { type: Date, default: Date.now }
});

sessionSchema.index({ email: 1, status: 1 });

module.exports = mongoose.model('Session', sessionSchema);
