const User = require('../models/user.model');
const { hashPassword, comparePassword, generateJWT } = require('../utils/auth.util');
const { sendPasswordResetEmail } = require('../helpers/auth.helper');

const register = async (req, res) => {
    const { userName, email, password } = req.body;

    try {
        const emailExists = await User.findOne({ email });
        if (emailExists) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await hashPassword(password);
        const user = await User.create({ userName, email, password: hashedPassword });

        const token = generateJWT(user.id);
        res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};

const login = async (req, res) => {
    const { userName, email, password } = req.body;

    try {
        const user = await User.findOne({ $or: [{ userName }, { email }] });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isPasswordMatch = await comparePassword(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = generateJWT(user.id);
        res.setHeader('Authorization', `Bearer ${token}`);
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};

const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        await sendPasswordResetEmail(email);
        res.status(200).json({ message: 'Verification code sent to your email.' });
    } catch (error) {
        console.error('Error sending verification code:', error);
        res.status(400).json({ message: error.message });
    }
};

const verifyOtp = async (req, res) => {
    const { otp } = req.body;

    try {
        const user = await User.findOne({
            resetPasswordToken: otp,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        const token = generateJWT(user.id);
        res.setHeader('Authorization', `Bearer ${token}`);
        res.status(200).json({ message: 'OTP verified successfully', token });
    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({ message: 'Error verifying OTP', error: error.message });
    }
};

const resetPassword = async (req, res) => {
    const { newPassword } = req.body;

    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const hashedPassword = await hashPassword(newPassword);
        user.password = hashedPassword;

        await user.save();
        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ message: 'Error resetting password', error: error.message });
    }
};

module.exports = { register, login, forgotPassword, verifyOtp, resetPassword };
