// server/models/Note.js
const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, required: true },
    isShared: { type: Boolean, default: false },
    accessCode: { type: String, default: '' },
});

module.exports = mongoose.model('Note', noteSchema);
