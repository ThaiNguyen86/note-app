const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');


const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};


const comparePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
};


const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};


const generateRandomCode = () => {
    const code = crypto.randomInt(100000, 1000000);
    return code.toString(); 
};


module.exports = { hashPassword, comparePassword, generateToken, generateRandomCode};
