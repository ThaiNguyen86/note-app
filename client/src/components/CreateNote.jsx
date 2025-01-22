import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import { toast } from 'react-toastify';

const ClientSideEncryption = ({ onNoteCreated }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [encryptionKey, setEncryptionKey] = useState('');

  const sendEncryptedData = async () => {
    if (!title || !content || !encryptionKey) {
      toast.warning('Please enter title, content, and encryption key!');
      return;
    }

    try {
      const encryptedContent = CryptoJS.AES.encrypt(content, encryptionKey).toString();

      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Token not found. Please log in!');
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
      
      if (response.status === 201) {
        toast.success('Note created successfully!');
      }
      setTitle('');
      setContent('');
      setEncryptionKey('');
      if (onNoteCreated) {
        onNoteCreated();
      }
    } catch (error) {
      console.error('Error sending data:', error);
      toast.error('An error occurred. Please try again!');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4 fw-bold text-transparent bg-clip-text bg-gradient-to-b from-emerald-600 to-amber-600 text-xl">Create Note</h2>

        <div className="mb-3">
          <label className="form-label text-transparent bg-clip-text bg-gradient-to-b from-emerald-600 to-amber-600 font-semibold">
            Encryption Key: <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            value={encryptionKey}
            onChange={(e) => setEncryptionKey(e.target.value)}
            placeholder="Enter encryption key"
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label text-transparent bg-clip-text bg-gradient-to-b from-emerald-600 to-amber-600 font-semibold">
            Title: <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label text-transparent bg-clip-text bg-gradient-to-b from-emerald-600 to-amber-600 font-semibold">
            Content: <span style={{ color: "red" }}>*</span>
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter content"
            className="form-control"
            rows="5"
          ></textarea>
        </div>

        <div className="d-flex justify-content-end">
          <button onClick={sendEncryptedData} className="btn btn-primary btn-lg">
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientSideEncryption;