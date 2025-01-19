const Note = require('../models/note.model');

const { encryptNote, decryptNote, generateSharedKey } = require('../utils/encryption.util');

const createNote = async (req, res) => {
    try {
        const { title, content, iv } = req.body;
        const userId = req.userId;

        if (!content || !title) {
            return res.status(400).json({ message: "Title and content are required." });
        }

        const newNote = new Note({
            userId,
            title,
            content,  
            iv,     
            createdAt: new Date(),
            updatedAt: new Date()
        });

        await newNote.save();

        res.status(201).json({
            message: "Note created successfully!",
            note: {
                id: newNote._id,
                title: newNote.title,
                createdAt: newNote.createdAt
            }
        });
    } catch (error) {
        console.error("Error creating note:", error);
        res.status(500).json({ message: "Server error" });
    }
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