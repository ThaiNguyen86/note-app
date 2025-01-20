const AES = require('aes-js');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// AES encryption
const encryptNote = (content, key) => {
    const textBytes = AES.utils.utf8.toBytes(content);
    const keyBytes = AES.utils.utf8.toBytes(key);
    const aesCtr = new AES.ModeOfOperation.ctr(keyBytes);
    const encryptedBytes = aesCtr.encrypt(textBytes);
    return AES.utils.hex.fromBytes(encryptedBytes);
};

// Tạo khóa Diffie-Hellman
const generateDHKeys = () => {
    const diffieHellman = crypto.createDiffieHellman(2048);
    diffieHellman.generateKeys();
    const publicKey = diffieHellman.getPublicKey('hex');
    const privateKey = diffieHellman.getPrivateKey('hex');
    return { publicKey, privateKey, diffieHellman };
};

// Tạo khóa chia sẻ từ khóa Diffie-Hellman
const generateSharedKey = (privateKey, publicKey) => {
    const diffieHellman = crypto.createDiffieHellman(2048);
    diffieHellman.setPrivateKey(Buffer.from(privateKey, 'hex'));
    diffieHellman.setPublicKey(Buffer.from(publicKey, 'hex'));
    return diffieHellman.computeSecret('hex');
};


module.exports = { encryptNote, generateDHKeys, generateSharedKey };