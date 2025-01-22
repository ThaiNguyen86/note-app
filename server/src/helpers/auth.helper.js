const { generateRandomCode } = require('../utils/auth.util');
const User = require('../models/user.model');
const { sendEmail } = require('./email.helper');
const fs = require('fs');
const path = require('path');
const crypto = require("crypto");

const sendPasswordResetEmail = async (email, expiryMinutes = 60) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Email không tồn tại');
    }

    const resetCode = generateRandomCode();
    user.resetPasswordToken = resetCode;
    
    // Tính thời gian hết hạn dựa trên thời gian hiện tại và thời gian hết hạn (expiryMinutes)
    user.resetPasswordExpires = Date.now() + expiryMinutes * 60000 * 60;
    await user.save();
    
    const templatePath = path.join(__dirname, '../templates/resetPasswordTemplate.html');
    let emailContent = fs.readFileSync(templatePath, 'utf-8');

    // Thay thế {{resetCode}} và {{expiryTime}} trong email template
    emailContent = emailContent.replace('{{resetCode}}', resetCode)
                                .replace('{{expiryTime}}', expiryMinutes); // truyền số phút hết hạn vào

    const subject = 'Mã xác minh thay đổi mật khẩu';
    const text = 'Mã xác minh thay đổi mật khẩu của bạn là: ' + resetCode;
    const html = emailContent;

    await sendEmail(email, subject, text, html);

    return resetCode;
};

const generateKeyPair = () => {
    const { publicKey, privateKey } = crypto.generateKeyPairSync("ec", {
      namedCurve: "secp256k1", // Chọn thuật toán SECP256k1 cho khóa EC
    });
    return {
      publicKey: publicKey.export({ type: "spki", format: "pem" }),
      privateKey: privateKey.export({ type: "pkcs8", format: "pem" }),
    };
  };
  


module.exports = { sendPasswordResetEmail,generateKeyPair};
