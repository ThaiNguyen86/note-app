const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: false },
    email: { type: String, required: true, unique: false },
    password: { type: String, required: true },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
}, {
    timestamps: true,
});

module.exports = mongoose.model('User', userSchema);
