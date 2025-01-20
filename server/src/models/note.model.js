const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', // Tham chiếu đến bảng User
        required: true // Đảm bảo rằng mỗi ghi chú đều phải có userId
    },
    title: {
        type: String,
        required: true // Tiêu đề là bắt buộc
    },
    content: {
        type: String, 
        required: true // Nội dung ghi chú là bắt buộc
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
