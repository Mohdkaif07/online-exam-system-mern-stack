const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const examSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuidv4, // Automatically generate a unique ID
    unique: true
},
  exam_name: {
    type: String,
    required: true,
    trim: true,
  },
  exam_desc: {
    type: String,
    required: true,
    trim: true,
  },
  exam_date: {
    type: Date,
    required: true,
  },
  exam_marks: {
    type: Number,
    required: true,
  },
  exam_totalQuestion: {
    type: Number,
    required: true,
  },
  exam_passMarks: {
    type: Number,
    required: true,
  },
  exam_level: {
    type: String,
    required: true,
    enum: ['Easy', 'Medium', 'Hard'], // You can specify allowed levels
  },
}, { timestamps: true });

const Exam = mongoose.model('Exam', examSchema);

module.exports = Exam;
