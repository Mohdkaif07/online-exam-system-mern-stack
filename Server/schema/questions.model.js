const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
// Define the Exam schema


    const questionSchema = new mongoose.Schema({
        question_name: {
            type: String,
            required: true,
        },
        option_one: {
            type: String,
            required: true,
        },
        option_two: {
            type: String,
            required: true,
        },
        option_three: {
            type: String,
            required: true,
        },
        option_four: {
            type: String,
            required: true,
        },
        question_answer: {
            type: String,
            required: true,
        },
        exam_id: {
            type: String,
            required: true, // Change to Number if you want it to be a numeric ID
        },
        id: {
            type: String,
            default: uuidv4, // Automatically generate a unique ID
            unique: true
        },
        subject_name: {
            type: String,
            required: true,
        },
    }, { timestamps: true }); // Adds createdAt and updatedAt fields
    
    
// Create the Exam model
const questions = mongoose.model('questiondata', questionSchema);

module.exports = questions;
