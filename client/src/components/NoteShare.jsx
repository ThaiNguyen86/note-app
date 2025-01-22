import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import 'bootstrap/dist/css/bootstrap.min.css';

const NoteShare = () => {
    const [noteContent, setNoteContent] = useState('');
    const [sharedBy, setSharedBy] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const shareNoteId = urlParams.get('id');
        const encryptedContent = urlParams.get('content');
        const expiresAt = urlParams.get('expiresAt');

        const user = localStorage.getItem('user');

        if (!shareNoteId || !encryptedContent || !expiresAt) {
            setError('Invalid sharing information!');
            setIsLoading(false);
            return;
        }

        if (new Date().getTime() > parseInt(expiresAt)) {
            setError('This note has expired!');
            setIsLoading(false);
            return;
        }
        const token = localStorage.getItem('token');
        axios.get(`${import.meta.env.VITE_API_URL}/notes/share/${shareNoteId}/${user._id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`, 
            }
        })
            .then((response) => {
                const { publicKey, userShareId } = response.data.shareNote;
                
                if (!publicKey) {
                    setIsLoading(false);
                    return;
                }

                axios.get(`${import.meta.env.VITE_API_URL}/user/${userShareId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                    .then((userResponse) => {
                        const user = userResponse.data.user;
                        setSharedBy(user);
                    })
                    .catch((error) => {
                        console.error("Error fetching user details:", error);
                        setError('Unable to retrieve user information!');
                    });

                const decryptedContent = decryptContent(encryptedContent, publicKey);

                if (decryptedContent === "Unable to decrypt content") {
                    setError('Unable to decrypt the note!');
                } else {
                    setNoteContent(decryptedContent);
                }
            })
            .catch((error) => {
                console.error("Error fetching shared information:", error);
                setError('Unable to retrieve shared note details!');
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    const decryptContent = (content, publicKey) => {
        try {
            const bytes = CryptoJS.AES.decrypt(content, publicKey);
            return bytes.toString(CryptoJS.enc.Utf8);
        } catch (error) {
            console.error("Decryption error:", error);
            return "Unable to decrypt content";
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-5">
          <div className="card shadow p-4" style={{ maxWidth: "800px", margin: "auto" }}>
            <h1 className="text-center mb-4 fw-bold">Shared Note</h1>
      
            {error && (
              <p className="text-center text-danger fw-bold">{error}</p>
            )}
      
            {sharedBy && (
              <div className="mb-4">
                <p className="mb-1">
                  <strong>Shared by:</strong> {sharedBy.username}
                </p>
                <p className="mb-0">
                  <strong>Email:</strong> {sharedBy.email}
                </p>
              </div>
            )}
      
            {noteContent ? (
              <div className="mt-3">
                <p className="fw-bold">Note Content:</p>
                <div 
                  className="bg-light p-3 rounded border" 
                  style={{
                    wordBreak: "break-word", // Tự động xuống dòng khi gặp từ quá dài
                    whiteSpace: "pre-wrap", // Hiển thị định dạng xuống dòng từ nội dung
                    overflowWrap: "break-word", // Hỗ trợ thêm cho trình duyệt cũ
                  }}
                >
                  {noteContent}
                </div>
              </div>
            ) : (
              <p className="text-center text-muted">No content to display.</p>
            )}
          </div>
        </div>
      );
          
};


export default NoteShare;
