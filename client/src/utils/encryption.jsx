import CryptoJS from "crypto-js";


export const generateKeyPair = () => {
  const privateKey = CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Base64);
  const publicKey = CryptoJS.HmacSHA256(privateKey, 'shared-secret').toString(CryptoJS.enc.Base64);

  return {
    privateKey,
    publicKey,
  };
};

export const computeSharedKey = (privateKey, recipientPublicKey) => {
  const sharedKey = CryptoJS.HmacSHA256(privateKey + recipientPublicKey, 'shared-secret').toString(CryptoJS.enc.Base64);

  return sharedKey;
};

export const encryptNote = (noteContent, sharedKey) => {
  return CryptoJS.AES.encrypt(noteContent, sharedKey).toString();
};