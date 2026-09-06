const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // Using id to match existing UUID logic
  email: { type: String, required: true },
  sessionId: { type: String },
  title: { type: String },
  message: { type: String },
  isUnread: { type: Boolean, default: true },
  timestamp: { type: String },
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

notificationSchema.index({ email: 1, isDeleted: 1, timestamp: -1 });

module.exports = mongoose.model('Notification', notificationSchema);
