const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const subjectSchema = new mongoose.Schema({
  subject_name: {
    type: String,
    required: true,
    trim: true,
  },
   id: {
    type: String,
    default: uuidv4, // Automatically generate a unique ID
    unique: true
   },
}, { timestamps: true });

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;
