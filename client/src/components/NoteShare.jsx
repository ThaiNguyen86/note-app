import React, { useEffect, useState } from 'react';
import CryptoJS from 'crypto-js';

const NoteShare = () => {
  const [decryptedContent, setDecryptedContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const decryptNoteFromURL = () => {
      const params = new URLSearchParams(window.location.search);
      const encryptedContent = params.get('content');
      const sharedKey = params.get('key');
      const expirationTime = params.get('expiresAt');

      console.log('Encrypted Content:', encryptedContent);  
      console.log('Shared Key:', sharedKey);  
      console.log('Expiration Time:', expirationTime);  

      if (encryptedContent && sharedKey && expirationTime) {
        const currentTime = new Date().getTime();
        const isExpired = currentTime > parseInt(expirationTime, 10); 

        if (isExpired) {
          setExpired(true);
          setLoading(false);
        } else {
          const decrypted = decryptContent(encryptedContent, sharedKey);
          if (decrypted === "Không thể giải mã nội dung") {
            setDecryptedContent(null);
          } else {
            setDecryptedContent(decrypted);
          }
          setLoading(false);
        }
      } else {
        alert("Dữ liệu chia sẻ không hợp lệ");
        setLoading(false);
      }
    };

    decryptNoteFromURL();
  }, []);

  const decryptContent = (encryptedContent, key) => {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedContent, key);
      const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
      if (!decryptedText) {
        throw new Error('Invalid decryption result');
      }
      return decryptedText;
    } catch (error) {
      console.error("Lỗi khi giải mã:", error);
      return "Không thể giải mã nội dung";
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h2>Ghi chú chia sẻ</h2>
      {loading ? (
        <p>Đang tải ghi chú...</p>
      ) : expired ? (
        <p>Ghi chú đã hết hạn và không thể truy cập nữa.</p>
      ) : decryptedContent ? (
        <p>{decryptedContent}</p>
      ) : (
        <p>Không thể hiển thị ghi chú này.</p>
      )}
    </div>
  );
};

export default NoteShare;
