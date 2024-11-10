const mongoose = require('mongoose');

const bugReportSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  phone: { type: String },
  screenshot: { type: String }, // URL to the screenshot image
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Middleware to update `updatedAt` field on save
bugReportSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('BugReport', bugReportSchema);
