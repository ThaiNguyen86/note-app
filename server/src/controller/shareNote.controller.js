const ShareNote = require("../models/share.model");

const createShareNote = async (req, res) => {
    try {
        const { shareNoteId, expirationTime, maxAccess } = req.body;
        
        const shareNote = await ShareNote.findById(shareNoteId);

        shareNote.expirationTime = expirationTime;
        shareNote.maxAccess = maxAccess;
        
        await shareNote.save();
        res.status(201).json({ message: "Share note created successfully", shareNote });

    } catch (error) {
        console.error("Error creating ShareNote:", error);
        res.status(500).json({ message: "Error creating ShareNote" });
    }
};

const getShareNote = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId;
        if (!id || !userId) {
            return res.status(400).json({ message: "Missing id or userId to access the note" });
        }

        const shareNote = await ShareNote.findById(id);
        if (!shareNote) {
            return res.status(404).json({ message: "Shared note not found" });
        }
        const currentTime = new Date();
        if (currentTime > new Date(shareNote.expirationTime)) {
            
            await ShareNote.findByIdAndDelete(id);
            return res.status(410).json({ message: "Share link has expired" });
        }

        if (shareNote.currentAccessCount >= shareNote.maxAccess) {
            await ShareNote.findByIdAndDelete(id); 
            return res.status(403).json({ message: "Maximum access count exceeded, note has been deleted" });
        }

        if (shareNote.userShareId.toString() === userId) {
           
            res.status(200).json({ message: "Note retrieved successfully", shareNote });
        } else if (shareNote.userId.toString() === userId) {
            
            shareNote.currentAccessCount += 1;
            await shareNote.save();
            res.status(200).json({ message: "Note retrieved successfully", shareNote });
        } else {
            return res.status(403).json({ message: "You do not have permission to access this note" });
        }
    } catch (error) {
        console.error("Error retrieving ShareNote:", error);
        res.status(500).json({ message: "Error retrieving ShareNote" });
    }
};

module.exports = { createShareNote, getShareNote };
