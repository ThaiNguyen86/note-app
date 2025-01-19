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

const getNote = async (req, res) => {
    try {
        const { noteId } = req.params;
        const userId = req.userId;

        const note = await Note.findOne({ _id: noteId, userId });

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        res.status(200).json({
            message: 'Note retrieved successfully',
            note: {
                id: note._id,
                title: note.title,
                content: note.content,  
                iv: note.iv,    
                createdAt: note.createdAt,
                updatedAt: note.updatedAt
            }
        });
    } catch (error) {
        console.error("Error retrieving note:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

const shareNote = (req, res) => {
    const { noteId } = req.params;
    
};

const deleteNote = (req, res) => {
    const { noteId } = req.params;
};

module.exports = { createNote, getNote, shareNote, deleteNote};