const express = require('express');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const crypto = require('crypto'); // For generating tokens
const User = require('./schema/user.model'); // Import your user model
const router = express.Router();
require('dotenv').config();

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send('User not found');
    }

    // Generate a reset token
    const token = crypto.randomBytes(32).toString('hex');
    user.resetToken = token;
    user.resetTokenExpiration = Date.now() + 3600000; // 1 hour expiration
    await user.save();

    // Set up email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Use your email provider
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send the email
    const mailOptions = {
      from: 'process.env.EMAIL_USER',
      to: email,
      subject: 'Password Reset',
      text: `You requested a password reset. Click the link to reset your password: 
      http://localhost:3000/reset-password/${token}`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).send('Reset link sent to your email.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error sending email');
  }
});



router.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  console.log('Received token:', token);
  console.log('New password:', newPassword);

  try {
      // Find user by reset token
      const user = await User.findOne({
          resetToken: token,
          resetTokenExpiration: { $gt: Date.now() }, // Check if the token is still valid
      });
     console.log(user);
      if (!user) {
          return res.status(400).send('Invalid or expired token');
      }

      // Hash the new password before saving
      const hashedPassword = await bcrypt.hash(newPassword, 10); // Hash with 10 salt rounds
      user.password = hashedPassword; // Update the password
      user.resetToken = undefined; // Clear the reset token
      user.resetTokenExpiration = undefined; // Clear the expiration
      await user.save(); // Save the user

      res.status(200).send('Password has been reset successfully.');
  } catch (error) {
      console.error('Error resetting password:', error);
      res.status(500).send('Error resetting password');
  }
});
  
  module.exports = router;
  
