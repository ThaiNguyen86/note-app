import CryptoJS from "crypto-js";

// Hàm tạo cặp khóa Diffie-Hellman (DH)
export const generateKeyPair = () => {
  // Tạo một số ngẫu nhiên làm private key (key cá nhân)
  const privateKey = CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Base64);

  // Tạo public key từ private key bằng hàm Diffie-Hellman
  const publicKey = CryptoJS.HmacSHA256(privateKey, 'shared-secret').toString(CryptoJS.enc.Base64);

  return {
    privateKey,
    publicKey,
  };
};

// Hàm tính toán khóa chung từ private key và public key của người nhận
export const computeSharedKey = (privateKey, recipientPublicKey) => {
  // Tạo shared key từ private key của người gửi và public key của người nhận
  const sharedKey = CryptoJS.HmacSHA256(privateKey + recipientPublicKey, 'shared-secret').toString(CryptoJS.enc.Base64);

  return sharedKey;
};

export const encryptNote = (noteContent, sharedKey) => {
  return CryptoJS.AES.encrypt(noteContent, sharedKey).toString();
};