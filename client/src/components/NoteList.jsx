import React, { useState, useEffect } from "react";
import CryptoJS from "crypto-js";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { generateKeyPair, computeSharedKey } from "../utils/encryption.jsx";

const NoteList = ({ refresh }) => {
  const [notes, setNotes] = useState([]);
  const [users, setUsers] = useState([]);
  const [decryptionKeys, setDecryptionKeys] = useState({});
  const [decryptedNotes, setDecryptedNotes] = useState({});
  const [sharedURLs, setSharedURLs] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const token = localStorage.getItem("token");

  const getUserIdFromLocalStorage = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user._id) {
        return user._id;  
    }
    return null;  
};

  useEffect(() => {
    const fetchNotesAndUsers = async () => {

      setLoading(true);
      try {
        const [notesResponse, usersResponse] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/notes`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${import.meta.env.VITE_API_URL}/user`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setNotes(notesResponse.data);
        setUsers(usersResponse.data.users);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu từ server:", error);
        alert("Không thể tải ghi chú hoặc danh sách người dùng. Vui lòng thử lại!");
      } finally {
        setLoading(false);
      }
    };

    fetchNotesAndUsers();
  }, [token, refresh]);

  const deleteNote = async (noteId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/notes/${noteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(notes.filter(note => note._id !== noteId));
    } catch (error) {
      console.error("Lỗi khi xoá ghi chú:", error);
      alert("Không thể xoá ghi chú. Vui lòng thử lại!");
    }
  };

  const decryptContent = (encryptedContent, key) => {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedContent, key);
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      console.error("Lỗi khi giải mã:", error);
      return "Không thể giải mã nội dung";
    }
  };

  const handleKeyChange = (index, key) => {
    setDecryptionKeys((prevKeys) => ({
      ...prevKeys,
      [index]: key,
    }));
  };

  const handleDecrypt = (index) => {
    const note = notes[index];
    const key = decryptionKeys[index];
    if (!key) {
      alert("Vui lòng nhập khóa giải mã!");
      return;
    }
    const decrypted = decryptContent(note.content, key);
    setDecryptedNotes((prevDecrypted) => ({
      ...prevDecrypted,
      [index]: decrypted,
    }));
  };

  const handleShare = async (index) => {
    if (!selectedUser) {
        alert("Vui lòng chọn người nhận để chia sẻ ghi chú!");
        return;
    }

    const userKey = prompt("Vui lòng nhập khóa của bạn để giải mã ghi chú:");

    if (!userKey) {
        alert("Khóa không hợp lệ. Vui lòng thử lại!");
        return;
    }

    const time = prompt("Vui lòng nhập thời gian hết hạn (số phút):");

    const expirationInMinutes = parseInt(time, 10);
    if (isNaN(expirationInMinutes) || expirationInMinutes <= 0) {
        alert("Thời gian không hợp lệ. Vui lòng nhập một số lớn hơn 0!");
        return;
    }

    try {
        const note = notes[index];

        const { publicKey, privateKey } = generateKeyPair();

        const recipientPublicKey = publicKey; 

        const decryptedContent = decryptContent(note.content, userKey);

        if (!decryptedContent) {
            alert("Không thể giải mã ghi chú. Vui lòng kiểm tra khóa!");
            return;
        }

        const sharedKey = computeSharedKey(privateKey, recipientPublicKey);

        const encryptedContent = CryptoJS.AES.encrypt(decryptedContent, sharedKey).toString();
        console.log("Ghi chú sau khi giải mã và mã hóa lại:", encryptedContent);

        const expirationTime = new Date().getTime() + expirationInMinutes * 60 * 1000; 

        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/notes/share/create`,
            {
                sharedKey, 
                userId: selectedUser._id, 
                userShareId: getUserIdFromLocalStorage(), 
                expirationTime: expirationTime
            },
             {
              headers: { Authorization: `Bearer ${token}` },
            }
        );

        const shareNoteId = response.data.shareNote._id;
        const sharedURL = `${window.location.origin}/shared-note?id=${shareNoteId}&content=${encodeURIComponent(encryptedContent)}&expiresAt=${expirationTime}&maxAccess=1`;

        setSharedURLs((prevURLs) => ({
            ...prevURLs,
            [index]: sharedURL,
        }));

       
        alert("Ghi chú đã được chia sẻ thành công!");
    } catch (error) {
        console.error("Lỗi khi chia sẻ ghi chú:", error);
        alert("Không thể chia sẻ ghi chú. Vui lòng thử lại!");
    }
};


  return (
    <div className="container">
      <h2 className="text-center mb-4 fw-bold">Danh sách ghi chú</h2>

      {loading ? (
        <p className="text-center text-secondary">Đang tải ghi chú...</p>
      ) : notes.length === 0 ? (
        <p className="text-center text-muted">Không có ghi chú nào.</p>
      ) : (
        <div className="row">
          {notes.map((note, index) => (
            <div
              key={index}
              className="col-md-6 col-lg-4 mb-4"
            >
              <div className="card shadow border-primary">
                <div className="card-body">
                  <h3 className="card-title text-dark">Tiêu đề: {note.title}</h3>
                  <div className="mb-3">
                    <label className="form-label">Khóa giải mã:</label>
                    <input
                      type="text"
                      value={decryptionKeys[index] || ""}
                      onChange={(e) => handleKeyChange(index, e.target.value)}
                      placeholder="Nhập khóa giải mã"
                      className="form-control"
                    />
                  </div>
                  <div className="d-flex justify-content-between">
                    <button
                      onClick={() => handleDecrypt(index)}
                      className="btn btn-primary mt-3"
                    >
                      Giải mã
                    </button>
                    <button
                      onClick={() => deleteNote(note._id)}
                      className="btn btn-danger mt-3"
                    >
                      Xóa
                    </button>
                  </div>
                  <div className="mt-3">
                    <label className="form-label">Chọn người nhận:</label>
                    <select
                      onChange={(e) =>
                        setSelectedUser(users.find((user) => user._id === e.target.value))
                      }
                      className="form-select"
                    >
                      <option value="">--Chọn người nhận--</option>
                      {users.map((user) => (
                        <option key={user._id} value={user._id}>
                          {user.username} ({user.email})
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={() => handleShare(index)}
                    className="btn btn-primary mt-3"
                  >
                    Chia sẻ
                  </button>
                  {sharedURLs[index] && (
                    <p className="mt-2">
                      URL chia sẻ:{" "}
                      <a href={sharedURLs[index]} target="_blank" rel="noopener noreferrer">
                        {sharedURLs[index]}
                      </a>
                    </p>
                  )}
                  <p className="mt-3 text-secondary">
                    {decryptedNotes[index] || "Nội dung đã được mã hóa"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NoteList;
