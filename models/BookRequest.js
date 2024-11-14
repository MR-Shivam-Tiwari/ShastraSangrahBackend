// models/BookRequest.js
const mongoose = require('mongoose');

const bookRequestSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  bookName: {
    type: String,
  },
  authorName: {
    type: String,
  },
  hasData: {
    type: Boolean,
  },
  wantsToHelp: {
    type: Boolean,
  },
  additionalInfo: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('BookRequest', bookRequestSchema);
