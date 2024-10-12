const mongoose = require("mongoose");


const User = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, }, // Ensure email is unique
    password: { type: String, required: true },
    resetToken: { type: String }, // Field for reset token
    resetTokenExpiration: { type: Date } // Field for token expiration
  },
  { collection: 'user-data' } // Corrected typo
);




const model = mongoose.model('UserData', User);

// console.log(User)
module.exports = model;