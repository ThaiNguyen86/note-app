import React, { useEffect, useState } from 'react';
import CryptoJS from 'crypto-js';
import 'bootstrap/dist/css/bootstrap.min.css';

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
    <div className="container mt-5">
      <div className="card shadow p-4" style={{ maxWidth: "800px", margin: "auto" }}>
        <h2 className="text-center mb-4 fw-bold">Ghi chú chia sẻ</h2>
        {loading ? (
          <p className="text-center text-secondary">Đang tải ghi chú...</p>
        ) : expired ? (
          <p className="text-center text-danger">Ghi chú đã hết hạn và không thể truy cập nữa.</p>
        ) : decryptedContent ? (
          <>
            <h4 className="text-start fw-bold">Nội dung giải mã:</h4>
            <p className="text-start">{decryptedContent}</p>
          </>
        ) : (
          <p className="text-center text-muted">Không thể hiển thị ghi chú này.</p>
        )}
      </div>
    </div>
  );
  
};

export default NoteShare;
