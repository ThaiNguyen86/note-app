import CryptoJS from "crypto-js";

export const encryptNote = (note, key) => {
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(note), key).toString();
    return encrypted;
};

export const decryptNote = (encryptedNote, key) => {
    const bytes = CryptoJS.AES.decrypt(encryptedNote, key);
    const originalNote = bytes.toString(CryptoJS.enc.Utf8);
    return originalNote;
};
