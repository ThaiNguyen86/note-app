import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import axios from 'axios';

const ClientSideEncryption = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [encryptionKey, setEncryptionKey] = useState('');

  // Hàm gửi dữ liệu đã mã hóa lên server
  const sendEncryptedData = async () => {
    if (!title || !content || !encryptionKey) {
      alert('Vui lòng nhập tiêu đề, nội dung và khóa mã hóa!');
      return;
    }

    try {
      // Mã hóa content
      const encryptedContent = CryptoJS.AES.encrypt(content, encryptionKey).toString();

      // Lấy token từ local storage
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Không tìm thấy token. Vui lòng đăng nhập!');
        return;
      }

      // Gửi dữ liệu lên server kèm token
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/notes/create`,
        {
          title, // Không mã hóa tiêu đề
          content: encryptedContent, // Nội dung đã mã hóa
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
        }
      );

      console.log(response.data.message || 'Dữ liệu đã được gửi thành công!');
      alert('Create note success');
      setTitle(''); 
      setContent(''); 
      setEncryptionKey('');
    } catch (error) {
      console.error('Lỗi khi gửi dữ liệu:', error);
      alert('Có lỗi xảy ra. Vui lòng thử lại!');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h2>Client-side Encryption</h2>

      <div style={{ marginBottom: '15px' }}>
        <label>Khóa mã hóa:</label>
        <input
          type="text"
          value={encryptionKey}
          onChange={(e) => setEncryptionKey(e.target.value)}
          placeholder="Nhập khóa mã hóa"
          style={{ width: '100%', padding: '8px', marginTop: '5px' }}
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label>Tiêu đề:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nhập tiêu đề"
          style={{ width: '100%', padding: '8px', marginTop: '5px' }}
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label>Nội dung:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Nhập nội dung"
          style={{ width: '100%', padding: '8px', marginTop: '5px', height: '100px' }}
        />
      </div>

      <button onClick={sendEncryptedData} style={{ padding: '10px 15px' }}>
        Gửi lên server
      </button>
    </div>
  );
};

export default ClientSideEncryption;
