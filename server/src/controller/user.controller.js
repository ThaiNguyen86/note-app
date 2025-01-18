const User = require('../models/user.model');
const { hashPassword, comparePassword, generateToken } = require('../utils/auth.util');
const { sendPasswordResetEmail, verifyResetToken, resetPassword } = require('../helpers/auth.helper');


const register = async (req, res) => {
    const { userName, email, password } = req.body;

    const emailExists = await User.findOne({ email });
    if (emailExists) {
        return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await hashPassword(password);

    try {
        const user = await User.create({ userName, email, password: hashedPassword });
        const token = generateToken(user.id);
        res.status(201).json({ token });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(400).json({ message: 'Error registering user' });
    }
};


const login = async (req, res) => {
    const { userName, email, password } = req.body;

    const user = await User.findOne({ $or: [{ userName }, { email }] });

    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const cmpPass = await comparePassword(password, user.password);
    if (!cmpPass) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user.id);
    res.json({ token });
};

const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const resetCode = await sendPasswordResetEmail(email);
        res.status(200).json({ message: 'Mã xác minh đã được gửi tới email của bạn.' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const verifyToken = async (req, res) => {
    const { token } = req.body;

    try {
        await verifyResetToken(token);  
        res.status(200).json({ message: 'Token hợp lệ.' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const resetPasswordController = async (req, res) => { 
    const { token, newPassword } = req.body;

    try {
        const message = await resetPassword(token, newPassword);  
        res.status(200).json({ message });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { register, login, forgotPassword, verifyToken, resetPasswordController }; 
