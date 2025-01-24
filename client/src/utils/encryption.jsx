import CryptoJS from "crypto-js";


export const generateKeyPair = () => {
  const privateKey = CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Base64);
  const publicKey = CryptoJS.HmacSHA256(privateKey, 'shared-secret').toString(CryptoJS.enc.Base64);

  return {
    publicKeySender: publicKey, 
    privateKeySender: privateKey,
    publicKeyReceive: publicKey, 
    privateKeyReceive: privateKey
  };
};

export const computeSharedKey = (privateKey, publicKey) => {
  const sharedKey = CryptoJS.HmacSHA256(privateKey + publicKey, 'shared-secret').toString(CryptoJS.enc.Base64);
  return sharedKey;
};

export const encryptNote = (noteContent, sharedKey) => {
  return CryptoJS.AES.encrypt(noteContent, sharedKey).toString();
};