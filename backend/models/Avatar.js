const mongoose = require('mongoose');

const avatarSchema = new mongoose.Schema({
  nameKh: { type: String, required: true, index: true },
  nameEn: { type: String },
  phone: { type: String },
  avatarUrl: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Avatar', avatarSchema);
