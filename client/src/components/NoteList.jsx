// Cài đặt thư viện CryptoJS và Axios trước khi chạy mã này:
// npm install crypto-js axios

import React, { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';
import axios from 'axios';

const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const [decryptionKeys, setDecryptionKeys] = useState({});

  // Fetch notes từ server với token xác thực
  useEffect(() => {
    const fetchNotes = async () => {
      const token = localStorage.getItem('token'); // Lấy token từ localStorage hoặc nguồn lưu trữ khác
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/notes`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNotes(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu từ server:', error);
      }
    };

    fetchNotes();
  }, []);

  // Hàm giải mã content
  const decryptContent = (encryptedContent, key) => {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedContent, key);
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      console.error('Lỗi khi giải mã:', error);
      return 'Không thể giải mã nội dung';
    }
  };

  // Hàm cập nhật khóa giải mã cho từng ghi chú
  const handleKeyChange = (index, key) => {
    setDecryptionKeys((prevKeys) => ({
      ...prevKeys,
      [index]: key,
    }));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <h2>Danh sách ghi chú</h2>

      {notes.length === 0 ? (
        <p>Không có ghi chú nào.</p>
      ) : (
        <ul>
          {notes.map((note, index) => (
            <li key={index} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
              <h3>{note.title}</h3>
              <div style={{ marginBottom: '10px' }}>
                <label>Khóa giải mã:</label>
                <input
                  type="text"
                  value={decryptionKeys[index] || ''}
                  onChange={(e) => handleKeyChange(index, e.target.value)}
                  placeholder="Nhập khóa giải mã"
                  style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                />
              </div>
              <p>{decryptContent(note.content, decryptionKeys[index] || '')}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NoteList;
