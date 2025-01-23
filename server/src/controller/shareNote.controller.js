    const ShareNote = require("../models/share.model")

    const createShareNote = async (req, res) => {
        try {
            const {userId ,userShareId, sharedKey, expirationTime, maxAccess} = req.body;
            if (!userId || !userShareId || !sharedKey || !expirationTime || !maxAccess) {
                return res.status(400).json({ message: "Thiếu thông tin cần thiết để chia sẻ ghi chú" });
            }
            const shareNote = new ShareNote({
                userId,
                userShareId,
                publicKey: sharedKey,
                expirationTime,
                maxAccess: maxAccess
            });
            await shareNote.save();
            res.status(201).json({ message: "Chia sẻ ghi chú thành công", shareNote });

        } catch (error) {
            console.error("Lỗi khi tạo ShareNote:", error);
            res.status(500).json({ message: "Lỗi khi tạo ShareNote" });
        }
    };

    const getShareNote = async (req, res) => {
        try {
            const { id } = req.params;
            const userId = req.userId;
            if (!id || !userId) {
                return res.status(400).json({ message: "Thiếu id hoặc userId để truy cập ghi chú" });
            }
    
            const shareNote = await ShareNote.findById(id);
            if (!shareNote) {
                return res.status(404).json({ message: "Không tìm thấy ghi chú được chia sẻ" });
            }
            const currentTime = new Date();
            if (currentTime > new Date(shareNote.expirationTime)) {
                
                await ShareNote.findByIdAndDelete(id);
                return res.status(410).json({ message: "Liên kết chia sẻ đã hết hạn" });
            }
    
            if (shareNote.currentAccessCount >= shareNote.maxAccess) {
                await ShareNote.findByIdAndDelete(id); 
                return res.status(403).json({ message: "Số lần truy cập tối đa đã bị vượt quá, ghi chú đã bị xóa" });
            }
    
            if (shareNote.userShareId.toString() === userId) {
               
                res.status(200).json({ message: "Lấy ghi chú thành công", shareNote });
            } else if (shareNote.userId.toString() === userId) {
                
                shareNote.currentAccessCount += 1;
                await shareNote.save();
                res.status(200).json({ message: "Lấy ghi chú thành công", shareNote });
            } else {
                return res.status(403).json({ message: "Bạn không có quyền truy cập ghi chú này" });
            }
        } catch (error) {
            console.error("Lỗi khi lấy ShareNote:", error);
            res.status(500).json({ message: "Lỗi khi lấy ShareNote" });
        }
    };
    

    module.exports = { createShareNote ,getShareNote};