import CryptoJS from 'crypto-js';
import nacl from 'tweetnacl';
import naclUtil from 'tweetnacl-util';

// Generate Diffie-Hellman key pair
const generateDHKeys = () => {
  const keyPair = nacl.box.keyPair(); // Generate key pair
  const publicKey = naclUtil.encodeBase64(keyPair.publicKey); // Base64 encode public key
  const privateKey = naclUtil.encodeBase64(keyPair.secretKey); // Base64 encode private key
  return { publicKey, privateKey };
};

// Hàm tạo shared key (Diffie-Hellman)
const generateSharedKey = (partnerPublicKey, privateKey) => {
  try {
    // Decode from Base64 to Uint8Array
    console.log("Partner Public Key (Base64):", partnerPublicKey);
    console.log("Private Key (Base64):", privateKey);

    const publicKeyUint8 = naclUtil.decodeBase64(partnerPublicKey);
    const privateKeyUint8 = naclUtil.decodeBase64(privateKey);

    console.log("Decoded Public Key Length:", publicKeyUint8.length);
    console.log("Decoded Private Key Length:", privateKeyUint8.length);

    // Ensure the public key is the correct length (32 bytes)
    if (publicKeyUint8.length !== nacl.box.publicKeyLength) {
      throw new Error("Invalid public key size");
    }

    // Ensure the private key is the correct length (32 bytes)
    if (privateKeyUint8.length !== nacl.box.secretKeyLength) {
      throw new Error("Invalid private key size");
    }

    // Generate shared key
    const sharedKey = nacl.box.before(publicKeyUint8, privateKeyUint8);

    // Convert shared key to Base64 to be used for AES encryption
    return naclUtil.encodeBase64(sharedKey); // Return shared key as Base64
  } catch (error) {
    console.error("Error generating shared key:", error);
    throw error;
  }
};

// Encrypt note content using AES and shared key
const encryptNote = (content, sharedKey) => {
  // Convert sharedKey from Base64 to WordArray before using in AES encryption
  const sharedKeyWordArray = CryptoJS.enc.Base64.parse(sharedKey);
  const encryptedContent = CryptoJS.AES.encrypt(content, sharedKeyWordArray).toString();
  return encryptedContent;
};

// Decrypt note content using AES and shared key
const decryptNote = (encryptedContent, sharedKey) => {
  // Convert sharedKey from Base64 to WordArray before using in AES decryption
  const sharedKeyWordArray = CryptoJS.enc.Base64.parse(sharedKey);
  const bytes = CryptoJS.AES.decrypt(encryptedContent, sharedKeyWordArray);
const decryptedContent = bytes.toString(CryptoJS.enc.Utf8);
  
  if (!decryptedContent) {
    throw new Error("Decryption failed");
  }
  
  return decryptedContent;
};

export { generateDHKeys, generateSharedKey, encryptNote, decryptNote };
