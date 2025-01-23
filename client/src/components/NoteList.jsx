import React, { useState, useEffect } from "react";
import CryptoJS from "crypto-js";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
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
        console.error("Error fetching data from server:", error);
        toast.error("Unable to load notes or user list. Please try again!");
      } finally {
        setLoading(false);
      }
    };

    fetchNotesAndUsers();
  }, [token, refresh]);

  const deleteNote = async (noteId) => {
    try {
      const res = await axios.delete(`${import.meta.env.VITE_API_URL}/notes/${noteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 200) {
        setNotes(notes.filter(note => note._id !== noteId));
        toast.success("Note deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Unable to delete note. Please try again!");
    }
  };

  const decryptContent = (encryptedContent, key) => {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedContent, key);
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      console.error("Error decrypting:", error);
      return "Unable to decrypt content";
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
      toast.warning("Please enter the decryption key!");
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
      toast.warning("Please select a recipient to share the note!");
      return;
    }

    const userKey = prompt("Please enter your key to decrypt the note:");

    if (!userKey) {
      toast.error("Invalid key. Please try again!");
      return;
    }

    const time = prompt("Please enter the expiration time (in minutes):");

    const expirationInMinutes = parseInt(time, 10);
    if (isNaN(expirationInMinutes) || expirationInMinutes <= 0) {
      toast.error("Invalid time. Please enter a number greater than 0!");
      return;
    }

    const maxAccess = prompt("Please enter the number of allowed accesses:");
    if (isNaN(maxAccess) || maxAccess <= 0) {
      toast.error("Invalid number of accesses. Please enter a number greater than 0!");
      return;
    }

    try {
      const note = notes[index];

      const { publicKey, privateKey } = generateKeyPair();

      const recipientPublicKey = publicKey; 

      const decryptedContent = decryptContent(note.content, userKey);

      if (!decryptedContent) {
        toast.error("Cannot decrypt note. Please try again!");
        return;
      }

      const sharedKey = computeSharedKey(privateKey, recipientPublicKey);

      const encryptedContent = CryptoJS.AES.encrypt(decryptedContent, sharedKey).toString();
      console.log("Note after decryption and re-encryption:", encryptedContent);

      const expirationTime = new Date().getTime() + expirationInMinutes * 60 * 1000;

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/notes/share/create`,
        {
          sharedKey, 
          userId: selectedUser._id, 
          userShareId: getUserIdFromLocalStorage(), 
          expirationTime: expirationTime,
          maxAccess: maxAccess,
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

      toast.success("Note shared successfully!");
    } catch (error) {
      console.error("Error", error);
      toast.error("Cannot share note. Please try again!");
    }
  };

  return (
    <div className="container">
      <ToastContainer autoClose={1500} />
      <h2 className="text-center mb-4 text-transparent bg-clip-text bg-gradient-to-b from-sky-600 to-amber-600 font-bold text-xl">Note List</h2>

      {loading ? (
        <p className="text-center text-secondary">Loading notes...</p>
      ) : notes.length === 0 ? (
        <p className="text-center text-muted">No notes available.</p>
      ) : (
        <div className="row">
          {notes.map((note, index) => (
            <div
              key={index}
              className="col-md-6 col-lg-4 mb-4"
            >
              <div className="card shadow border-primary">
                <div className="card-body">
                  <h3 className="card-title text-dark">Title: {note.title}</h3>
                  <div className="mb-3">
                    <label className="form-label">Decryption Key:</label>
                    <input
                      type="text"
                      value={decryptionKeys[index] || ""}
                      onChange={(e) => handleKeyChange(index, e.target.value)}
                      placeholder="Enter decryption key"
                      className="form-control"
                    />
                  </div>
                  <div className="d-flex justify-content-between">
                    <button
                      onClick={() => handleDecrypt(index)}
                      className="btn bg-custom-green hover:bg-custom-green2 text-white mt-3"
                    >
                      Decrypt
                    </button>
                    <button
                      onClick={() => deleteNote(note._id)}
                      className="btn btn-danger mt-3"
                    >
                      Delete
                    </button>
                  </div>
                  <div className="mt-3">
                    <label className="form-label">Select Recipient:</label>
                    <select
                      onChange={(e) =>
                        setSelectedUser(users.find((user) => user._id === e.target.value))
                      }
                      className="form-select"
                    >
                      <option value="">--Select Recipient--</option>
                      {users.map((user) => (
                        <option key={user._id} value={user._id}>
                          {user.username} ({user.email})
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={() => handleShare(index)}
                    className="btn bg-custom-green hover:bg-custom-green2 text-white mt-3"
                  >
                    Share
                  </button>
                  {sharedURLs[index] && (
                    <p className="mt-2">
                      Share URL:{" "}
                      <a href={sharedURLs[index]} target="_blank" rel="noopener noreferrer">
                        {sharedURLs[index]}
                      </a>
                    </p>
                  )}
                  <p className="mt-3 text-secondary">
                    {decryptedNotes[index] || "Content is encrypted"}
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
