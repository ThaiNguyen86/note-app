// routes/exchangeKey.js
const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const crypto = require("crypto");

const generateKeyPair = () => {
    const { publicKey, privateKey } = crypto.generateKeyPairSync("ec", {
      namedCurve: "secp256k1",
    });
    return {
      publicKey: publicKey.export({ type: "spki", format: "pem" }),
      privateKey: privateKey.export({ type: "pkcs8", format: "pem" }),
    };
  };
  
  router.post("/exchange-key", async (req, res) => {
    const { publicKey, userId } = req.body;
    console.log(publicKey,userId)
    if (!publicKey || !userId) {
      return res.status(400).json({ message: "Thiếu publicKey hoặc userId" });
    }
  
    try {
      // Kiểm tra người dùng tồn tại
      let user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: "Người dùng không tồn tại" });
      }
  
      // Nếu người dùng chưa có publicKey, tạo và lưu vào cơ sở dữ liệu
      if (!user.publicKey) {
        const { publicKey: generatedPublicKey, privateKey } = generateKeyPair();
        user.publicKey = generatedPublicKey;  // Lưu publicKey vào cơ sở dữ liệu
        await user.save();
      }
  
      // Gửi publicKey của người dùng cho client
      res.json({ publicKey: user.publicKey });
    } catch (error) {
      console.error("Lỗi khi trao đổi khóa:", error);
      res.status(500).json({ message: "Lỗi máy chủ khi trao đổi khóa" });
    }
  });
  
  module.exports = router;
  