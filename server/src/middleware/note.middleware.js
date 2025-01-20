const Note = require('../models/note.model');

const checkTimeSensitiveAccess = async (req, res, next) => {
    const { noteId } = req.params;
    const note = await Note.findById(noteId);

    if (!note) {
        return res.status(404).json({ message: 'Note not found' });
    }

    const currentTime = new Date();

    // Kiểm tra xem ghi chú có hết hạn chưa
    if (note.expirationTime && currentTime > note.expirationTime) {
        return res.status(403).json({ message: 'This note has expired' });
    }

    // Kiểm tra số lượt truy cập
    if (note.accessCount >= note.maxAccess) {
        return res.status(403).json({ message: 'Maximum access limit reached' });
    }

    // Tăng số lượt truy cập
    note.accessCount += 1;
    await note.save();

    req.note = note;  // Lưu ghi chú vào req để có thể sử dụng tiếp
    next();
};

module.exports = { checkTimeSensitiveAccess };
