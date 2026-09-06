const mongoose = require('mongoose');

const twoFactorSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  secret: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TwoFactor', twoFactorSchema);
