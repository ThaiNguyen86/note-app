import CryptoJS from 'crypto-js';

const secretKey = 'unique-client-side-key'; // Đảm bảo bí mật và duy nhất

// Mã hóa nội dung
export const encryptContent = (content) => {
  return CryptoJS.AES.encrypt(content, secretKey).toString();
};

// Giải mã nội dung
export const decryptContent = (encryptedContent) => {
  return CryptoJS.AES.decrypt(encryptedContent, secretKey).toString(CryptoJS.enc.Utf8);
};
