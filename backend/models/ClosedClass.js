const mongoose = require('mongoose');

const closedClassSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true, index: true }
}, { timestamps: true });

module.exports = mongoose.model('ClosedClass', closedClassSchema);
