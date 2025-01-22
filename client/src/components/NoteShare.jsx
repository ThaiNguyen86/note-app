import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';

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
                    setError('Public key not found!');
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
        <div>
            <h1>Shared Note</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            {sharedBy && (
                <div>
                    <p><strong>Shared by:</strong> {sharedBy.username}</p>
                    <p><strong>Email:</strong> {sharedBy.email}</p>
                </div>
            )}
            
            {noteContent ? (
                <div>
                    <p><strong>Note Content:</strong></p>
                    <pre>{noteContent}</pre>
                </div>
            ) : (
                <p>No content to display.</p>
            )}
        </div>
    );
};

export default NoteShare;
