// const mongoose = require('mongoose');

// const resultSchema = new mongoose.Schema({
//     result_status: {
//         type: String,
//         required: true,
//     },
//     result_score: {
//         type: Number, // Changed to Number to match the value
//         required: true,
//     },
//     user_email: {
//         type: String,
//         required: true,
//         match: /.+\@.+\..+/ // Optional: regex to validate email format
//     },
//     exam_date: {
//         type: Date,
//         required: true,
//         // Optional: you can parse the date string if needed
//         default: Date.now
//     },
//     exam_name: {
//         type: String,
//         required: true,
//     },
//     total_marks: {
//         type: Number, // Changed to Number
//         required: true,
//     },
//     exam_id: {
//         type: Number, // Changed to Number
//         required: true,
//     },
//     total_Questions: { // Fixed spelling to 'total_Questions'
//         type: Number, // Changed to Number
//         required: true,
//     },
//     id: { // Consider renaming to 'result_id' to avoid confusion with built-in '_id'
//         type: Number,
//         required: true,
//     },
// });

// // Create the model
// const Result = mongoose.model('Result', resultSchema);

// module.exports = Result;


const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    result_status: {
        type: String,
        required: true,
    },
    result_score: {
        type: Number, // Change to Number if it's a numeric score
        required: true,
    },
    user_email: {
        type: String,
        required: true,
    },
    exam_date: {
        
        type: Date,
        default: Date.now,
        
    },
    exam_name: {
        type: String,
        required: true,
    },
    total_marks: {
        type: Number,
        required: true,
    },
    exam_id: {
        type: String,
        required: true,
    },
    total_Question: {
        type: Number,
        required: true,
    },
});

const Result = mongoose.model('Result', resultSchema);
module.exports = Result;

