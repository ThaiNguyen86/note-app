import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CryptoJS from 'crypto-js';
import axios from 'axios';

const ClientSideEncryption = ({ onNoteCreated }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [encryptionKey, setEncryptionKey] = useState('');

  const sendEncryptedData = async () => {
    if (!title || !content || !encryptionKey) {
      alert('Vui lòng nhập tiêu đề, nội dung và khóa mã hóa!');
      return;
    }

    try {
      const encryptedContent = CryptoJS.AES.encrypt(content, encryptionKey).toString();

      const token = localStorage.getItem('token');
      if (!token) {
        alert('Không tìm thấy token. Vui lòng đăng nhập!');
        return;
      }
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/notes/create`,
        {
          title, 
          content: encryptedContent,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      console.log(response.data.message || 'Dữ liệu đã được gửi thành công!');
      alert('Tạo ghi chú thành công!');
      setTitle(''); 
      setContent(''); 
      setEncryptionKey('');
      if (onNoteCreated) {
        onNoteCreated();
      }
    } catch (error) {
      console.error('Lỗi khi gửi dữ liệu:', error);
      alert('Có lỗi xảy ra. Vui lòng thử lại!');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4 fw-bold">Client-side Encryption</h2>

        <div className="mb-3">
          <label className="form-label">Khóa mã hóa:</label>
          <input
            type="text"
            value={encryptionKey}
            onChange={(e) => setEncryptionKey(e.target.value)}
            placeholder="Nhập khóa mã hóa"
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Tiêu đề:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Nhập tiêu đề"
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Nội dung:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Nhập nội dung"
            className="form-control"
            rows="5"
          ></textarea>
        </div>

        <div className="d-flex justify-content-end">
          <button onClick={sendEncryptedData} className="btn btn-primary btn-lg">
            Tạo
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientSideEncryption;
