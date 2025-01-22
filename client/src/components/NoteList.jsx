import React, { useState, useEffect } from "react";
import CryptoJS from "crypto-js";
import axios from "axios";
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

    const maxAccess = prompt("Vui lòng nhập số lần được phép truy cập ");
    if (isNaN(maxAccess) || maxAccess <= 0) {
      alert("số lần truy cập không hợp lệ. Vui lòng nhập một số lớn hơn 0!");
      return;
  }

    try {
        const note = notes[index];

        const { publicKey, privateKey } = generateKeyPair();

        const recipientPublicKey =  selectedUser.publicKey; 

        const decryptedContent = decryptContent(note.content, userKey);

        if (!decryptedContent) {
            alert("Không thể giải mã ghi chú. Vui lòng kiểm tra khóa!");
            return;
        }

        const sharedKey = computeSharedKey(privateKey, recipientPublicKey);

        const encryptedContent = CryptoJS.AES.encrypt(decryptedContent, sharedKey).toString();

        const expirationTime = new Date().getTime() + expirationInMinutes * 60 * 1000; 

        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/notes/share/create`,
            {
                sharedKey, 
                userId: selectedUser._id, 
                userShareId: getUserIdFromLocalStorage(), 
                expirationTime: expirationTime,
                maxAccess: maxAccess
            },
             {
              headers: { Authorization: `Bearer ${token}` },
            }
        );

        const shareNoteId = response.data.shareNote._id;
        const sharedURL = `${window.location.origin}/shared-note?id=${shareNoteId}&content=${encodeURIComponent(encryptedContent)}&expiresAt=${expirationTime}&maxAccess=${maxAccess}`;

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
    <div >
      <h2>Danh sách ghi chú</h2>

      {loading ? (
        <p>Đang tải ghi chú...</p>
      ) : notes.length === 0 ? (
        <p>Không có ghi chú nào.</p>
      ) : (
        <ul>
          {notes.map((note, index) => (
            <li
              key={index}
            >
              <h3>{note.title}</h3>
              <div>
                <label>Khóa giải mã:</label>
                <input
                  type="text"
                  value={decryptionKeys[index] || ""}
                  onChange={(e) => handleKeyChange(index, e.target.value)}
                  placeholder="Nhập khóa giải mã"
                />
              </div>
              <button
                onClick={() => handleDecrypt(index)}
              >
                Giải mã
              </button>
              <button
                onClick={() => deleteNote(note._id)}
              >
                Xóa
              </button>
              <div>
                <label>Chọn người nhận:</label>
                <select
                  onChange={(e) =>
                    setSelectedUser(users.find((user) => user._id === e.target.value))
                  }
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
              >
                Chia sẻ
              </button>
              {sharedURLs[index] && (
                <p>
                  URL chia sẻ:{" "}
                  <a href={sharedURLs[index]} target="_blank" rel="noopener noreferrer">
                    {sharedURLs[index]}
                  </a>
                </p>
              )}
              <p style={{ marginTop: "10px" }}>
                {decryptedNotes[index] || "Nội dung đã được mã hóa"}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NoteList;
