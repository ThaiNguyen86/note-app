// server/helpers/auth.helper.js
const { generateRandomCode } = require('../utils/auth.util');
const User = require('../models/user.model');
const { sendEmail } = require('./email.helper');
const fs = require('fs');
const path = require('path');

const sendPasswordResetEmail = async (email) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Email không tồn tại');
    }

    const resetCode = generateRandomCode();
    user.resetPasswordToken = resetCode;
    user.resetPasswordExpires = Date.now() + 3600000; 
    await user.save();

    const templatePath = path.join(__dirname, '../templates/resetPasswordTemplate.html');
    let emailContent = fs.readFileSync(templatePath, 'utf-8');

    emailContent = emailContent.replace('{{resetCode}}', resetCode);

    const subject = 'Mã xác minh thay đổi mật khẩu';
    const text = 'Mã xác minh thay đổi mật khẩu của bạn là: ' + resetCode; 
    const html = emailContent;

    await sendEmail(email, subject, text, html);

    return resetCode;
};

module.exports = { sendPasswordResetEmail};
