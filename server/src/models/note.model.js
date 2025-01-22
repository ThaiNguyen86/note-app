const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    title: {
        type: String,
        required: true 
    },
    content: {
        type: String, 
        required: true 
    },
    createdAt: {
        type: Date,
        default: Date.now 
    },
    updatedAt: {
        type: Date,
        default: Date.now 
    },
    expirationTime: { type: Date },  
    accessCount: { type: Number, default: 0 }, 
    maxAccess: { type: Number}  
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
