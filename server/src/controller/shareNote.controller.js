const ShareNote = require("../models/share.model");

const createShareNote = async (req, res) => {
    try {
        const { userId, userShareId, sharedKey, expirationTime } = req.body;
        if (!userId || !userShareId || !sharedKey || !expirationTime) {
            return res.status(400).json({ message: "Missing required information to share note" });
        }
        const shareNote = new ShareNote({
            userId,
            userShareId,
            publicKey: sharedKey,
            expirationTime
        });
        await shareNote.save();
        res.status(201).json({ message: "Note shared successfully", shareNote });

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
            return res.status(400).json({ message: "Missing id or userId to access note" });
        }

        const shareNote = await ShareNote.findById(id);

        if (!shareNote) {
            return res.status(404).json({ message: "Shared note not found" });
        }

        const currentTime = new Date();
        if (currentTime > new Date(shareNote.expirationTime)) {
            return res.status(410).json({ message: "Share link has expired" });
        }

        if (shareNote.userId.toString() == userId || shareNote.userShareId.toString() == userId) {
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