const { generateDHKeys, generateSharedKey } = require('../utils/encryption.util');

const getSharedKey = (req, res) => {
    const { clientPublicKey } = req.body;
    const { publicKey: serverPublicKey, privateKey: serverPrivateKey } = generateDHKeys();
    const sharedKey = generateSharedKey(serverPrivateKey, clientPublicKey);
    res.json({ serverPublicKey, sharedKey });
};

module.exports = { getSharedKey };