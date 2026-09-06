const mongoose = require('mongoose');

const majorSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  fullName: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Major', majorSchema);
