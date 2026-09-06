const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  fullName: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Faculty', facultySchema);
