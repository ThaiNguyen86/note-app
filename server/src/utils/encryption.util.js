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


//AES decryption
const decryptNote = (encryptedContent, key) => {
    const encryptedBytes = AES.utils.hex.toBytes(encryptedContent);
    const keyBytes = AES.utils.utf8.toBytes(key);
    const aesCtr = new AES.ModeOfOperation.ctr(keyBytes);
    const decryptedBytes = aesCtr.decrypt(encryptedBytes);
    return AES.utils.utf8.fromBytes(decryptedBytes);
};

// Diffie-Hellman key exchange (for end-to-end encryption)
const generateDHKeys = () => {
    const { privateKey, publicKey } = crypto.generateKeyPairSync('ec', { namedCurve: 'secp256k1' });
    return { privateKey, publicKey };
};

const generateSharedKey = (privateKey, otherPublicKey) => {
    const sharedKey = crypto.ecdhComputeSecret(privateKey, otherPublicKey);
    return sharedKey;
};

module.exports = { encryptNote, decryptNote, generateDHKeys, generateSharedKey };