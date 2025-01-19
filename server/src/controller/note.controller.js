const Note = require('../models/note.model');

const { encryptNote, decryptNote, generateSharedKey } = require('../utils/encryption.util');

const createNote = (req, res) => {
    const { content, expiresAt } = req.body;
    
};

const getNote = (req, res) => {
    const { noteId } = req.params;
    
};

const shareNote = (req, res) => {
    const { noteId } = req.params;
    
};

const deleteNote = (req, res) => {
    const { noteId } = req.params;
};

module.exports = { createNote, getNote, shareNote, deleteNote};