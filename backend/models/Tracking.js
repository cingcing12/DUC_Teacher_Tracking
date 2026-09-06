const mongoose = require('mongoose');

const trackingSchema = new mongoose.Schema({
  department: { type: String, default: "Unknown Department" },
  major: { type: String, default: "Unknown Major" },
  generation: { type: String, default: "Unknown Generation" },
  year: { type: String, default: "?" },
  semester: { type: String, default: "?" },
  subject: { type: String, required: true },
  cohort: { type: String, required: true },
  teacher: { type: String, required: true },
  week: { type: Number, required: true },
  date: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  lessonNo: { type: String },
  content: { type: String },
  hours: { type: String },
  notes: { type: String },
  room: { type: String },
  createdAt: { type: Date, default: Date.now }
});

// Indexes for fast searching (since they search by cohort, subject, teacher)
trackingSchema.index({ cohort: 1, subject: 1, teacher: 1 });
trackingSchema.index({ teacher: 1 });
trackingSchema.index({ week: -1 });

module.exports = mongoose.model('Tracking', trackingSchema);
