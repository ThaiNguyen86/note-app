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

const verifyResetToken = async (token) => {
    const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
        throw new Error('Token không hợp lệ hoặc đã hết hạn');
    }

    return true;
};


const resetPassword = async (token, newPassword) => {
    const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
        throw new Error('Token không hợp lệ hoặc đã hết hạn');
    }

    const hashedPassword = await hashPassword(newPassword);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return 'Mật khẩu đã được thay đổi thành công!';
};

module.exports = { sendPasswordResetEmail, verifyResetToken, resetPassword };
