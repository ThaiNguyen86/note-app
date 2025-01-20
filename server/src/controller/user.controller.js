const User = require('../models/user.model');
const { hashPassword, comparePassword, generateJWT,verifyJWT } = require('../utils/auth.util');
const { sendPasswordResetEmail } = require('../helpers/auth.helper');

const register = async (req, res) => {
    const { username, email, password } = req.body;
    console.log(username, email, password )
    try {
        const emailExists = await User.findOne({ email });
        if (emailExists) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await hashPassword(password);
        const user = await User.create({ username, email, password: hashedPassword });

        const token = generateJWT(user.id);
        res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(email,password)

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isPasswordMatch = await comparePassword(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = generateJWT(user.id);

        const { password: _, ...userWithoutPassword } = user.toObject();

        res.setHeader('Authorization', `Bearer ${token}`);
        res.status(200).json({ message: 'Login successful', token, user: userWithoutPassword });
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
    const { email, otp } = req.body;
    try {
        const user = await User.findOne({
            email, 
            resetPasswordToken: otp,
            resetPasswordExpires: { $gt: new Date() }, 
        });
        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        const authToken = generateJWT(user.id);
        res.setHeader('Authorization', `Bearer ${authToken}`);
        res.status(200).json({ success: true,message: 'OTP verified successfully', authToken });
    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({ message: 'Error verifying OTP', error: error.message });
    }
};

const resetPassword = async (req, res) => {
    const { newPassword } = req.body;

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Token is required" });
    }

    const authToken = authHeader.split(" ")[1];

    try {
        let decoded;
        try {
            decoded = verifyJWT(authToken); 
        } catch (error) {
            return res.status(401).json({ message: "Invalid or expired token" });
        }

        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const hashedPassword = await hashPassword(newPassword);
        user.password = hashedPassword;

        await user.save();
        res.status(200).json({ success: true, message: "Password reset successfully" });
    } catch (error) {
        console.error("Error resetting password:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 });
        res.status(200).json({ success: true, users });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ success: false, message: "Error fetching users" });
    }
};


module.exports = { register, login, forgotPassword, verifyOtp, resetPassword,getUsers };
