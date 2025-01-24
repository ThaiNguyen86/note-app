const { generateRandomCode } = require('../utils/auth.util');
const User = require('../models/user.model');
const { sendEmail } = require('./email.helper');
const fs = require('fs');
const path = require('path');
const crypto = require("crypto");

const sendPasswordResetEmail = async (email, expiryMinutes = 60) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Email does not exist');
  }

  const resetCode = generateRandomCode();
  user.resetPasswordToken = resetCode;
  
  // Calculate the expiration time based on the current time and expiryMinutes
  user.resetPasswordExpires = Date.now() + expiryMinutes * 60000 * 60;
  await user.save();
  
  const templatePath = path.join(__dirname, '../templates/resetPasswordTemplate.html');
  let emailContent = fs.readFileSync(templatePath, 'utf-8');

  // Replace {{resetCode}} and {{expiryTime}} in the email template
  emailContent = emailContent.replace('{{resetCode}}', resetCode)
                .replace('{{expiryTime}}', expiryMinutes); // pass the expiry minutes

  const subject = 'Password Reset Verification Code';
  const text = 'Your password reset verification code is: ' + resetCode;
  const html = emailContent;

  await sendEmail(email, subject, text, html);

  return resetCode;
};

const generateKeyPair = () => {
  const { publicKey, privateKey } = crypto.generateKeyPairSync("ec", {
    namedCurve: "secp256k1", // Choose SECP256k1 algorithm for EC keys
  });
  return {
    publicKey: publicKey.export({ type: "spki", format: "pem" }),
    privateKey: privateKey.export({ type: "pkcs8", format: "pem" }),
  };
  };
  
module.exports = { sendPasswordResetEmail, generateKeyPair };
