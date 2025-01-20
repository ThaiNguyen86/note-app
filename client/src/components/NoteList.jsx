import React, { useState, useEffect } from "react";
import CryptoJS from "crypto-js";
import axios from "axios";
import { generateKeyPair, computeSharedKey , encryptNote} from "../utils/encryption.jsx"; // Hàm hỗ trợ DH

const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const [users, setUsers] = useState([]);  // Danh sách người dùng
  const [decryptionKeys, setDecryptionKeys] = useState({});
  const [decryptedNotes, setDecryptedNotes] = useState({});
  const [sharedURLs, setSharedURLs] = useState({});  // Lưu URL chia sẻ cho từng ghi chú
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // Người dùng được chọn để chia sẻ

  // Fetch notes và users từ server
  useEffect(() => {
    const fetchNotesAndUsers = async () => {
      const token = localStorage.getItem("token");
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
  }, []);
  

  // Hàm giải mã nội dung
  const decryptContent = (encryptedContent, key) => {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedContent, key);
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      console.error("Lỗi khi giải mã:", error);
      return "Không thể giải mã nội dung";
    }
  };

  // Cập nhật khóa giải mã
  const handleKeyChange = (index, key) => {
    setDecryptionKeys((prevKeys) => ({
      ...prevKeys,
      [index]: key,
    }));
  };

  // Giải mã nội dung khi nhấn nút
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
  
    // User input key for decryption
    const userKey = prompt("Vui lòng nhập khóa của bạn để giải mã ghi chú:");
  
    if (!userKey) {
      alert("Khóa không hợp lệ. Vui lòng thử lại!");
      return;
    }
  
    try {
      const note = notes[index];
      const { publicKey, privateKey } = generateKeyPair();
      
      // Gửi publicKey của bạn đến người nhận và nhận lại publicKey của họ
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/exchange-key`,
        { publicKey, userId: selectedUser._id }
      );
      const recipientPublicKey = response.data.publicKey;
      
      // Giải mã ghi chú với khóa mà người dùng nhập
      const decryptedContent = decryptContent(note.content, userKey);
  
      // Nếu giải mã thất bại, dừng lại
      if (!decryptedContent) {
        alert("Không thể giải mã ghi chú. Vui lòng kiểm tra khóa!");
        return;
      }
  
      // Tạo shared key từ privateKey của người gửi và publicKey của người nhận
      const sharedKey = computeSharedKey(privateKey, recipientPublicKey);
      
      // Mã hóa ghi chú đã giải mã với shared key
      const encryptedContent = CryptoJS.AES.encrypt(decryptedContent, sharedKey).toString();
      console.log("Ghi chú sau khi giải mã và mã hóa lại:", encryptedContent);
  
      // Tạo URL chia sẻ
      const sharedURL = `${window.location.origin}/shared-note?content=${encodeURIComponent(
        encryptedContent
      )}&key=${encodeURIComponent(sharedKey)}`;
  
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
