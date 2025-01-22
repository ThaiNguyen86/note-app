const Note = require('../models/note.model');


let notes = [];

const createNote = async (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ message: "Invalid data" });
    }

    try {
        const note = new Note({
            title,
            content,
            userId: req.userId,
        });

        await note.save();

        res.status(201).json({ message: "Note created successfully" });
    } catch (error) {
        console.error("Error creating note:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getNote = (req, res) => {
    const noteId = req.params.id;
    const note = notes[noteId];

    if (!note) {
        return res.status(404).json({ message: 'Note not found' });
    }

    const currentTime = new Date();
    if (currentTime > new Date(note.metadata.expirationTime)) {
        return res.status(400).json({ message: 'Access expired' });
    }

    if (note.metadata.accessCount >= note.metadata.maxAccessCount) {
        return res.status(400).json({ message: 'Max access count reached' });
    }

    note.metadata.accessCount += 1;
    res.json({ message: 'Note accessed successfully', noteContent: note.content });
};


const getNotes = async (req, res) => {
    const notes = await Note.find({ userId: req.userId});
    res.json(notes);
};

const deleteNote = async (req, res) => {
    try {
        const noteId = req.params.noteId;
        const deletedNote = await Note.findByIdAndDelete(noteId);

        if (!deletedNote) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy ghi chú',
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Xoá ghi chú thành công',
            deletedNote,
        });
    } catch (error) {
        console.error('Có lỗi khi đang xoá ghi chú:', error);
        return res.status(500).json({
            success: false,
            message: 'Lỗi máy chủ khi xoá ghi chú',
        });
    }
};


module.exports = { createNote, getNote, getNotes, deleteNote };