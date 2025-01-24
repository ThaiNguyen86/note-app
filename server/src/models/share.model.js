    const mongoose = require('mongoose');

    const shareNoteSchema = new mongoose.Schema({
        userId: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User'
        },
        userShareId: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User'
        },
        sessionKey: { 
            type: String
        },
        createdAt: {
            type: Date,
            default: Date.now 
        },
        updatedAt: {
            type: Date,
            default: Date.now 
        },
        expirationTime: { 
            type: Date 
        },
        maxAccess: { 
            type: Number,
            default: 1 
        },
        currentAccessCount: {
            type: Number,
            default: 0 
        }
    });

    const ShareNote = mongoose.model('ShareNote', shareNoteSchema);

    module.exports = ShareNote; 