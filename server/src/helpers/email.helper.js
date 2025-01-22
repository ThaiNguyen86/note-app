const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text, html) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
            user: process.env.EMAIL_USER, 
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: `"NoteApp Support" ${process.env.EMAIL_USER}`,
        to: to,
        subject: subject,
        text: text,   
        html: html,
    };

    await transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };
