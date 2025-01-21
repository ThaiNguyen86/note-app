import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

export default function FolderList({ folders: initialFolders }) {
  // State lưu trữ danh sách folders
  const [folders, setFolders] = useState(initialFolders);
  // State lưu trữ id của folder đang được chọn
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  // State lưu trữ tên folder mới
  const [newFolderName, setNewFolderName] = useState(''); 
  // State để hiển thị modal
  const [showModal, setShowModal] = useState(false); 

  const handleFolderClick = (id) => {
    // Toggle giữa trạng thái đã chọn và chưa chọn
    setSelectedFolderId((prevSelectedFolderId) => (prevSelectedFolderId === id ? null : id));
  };

  const handleAddFolder = () => {
    // Tạo folder mới với id giả định (sử dụng timestamp hoặc UUID nếu cần)
    const newFolder = {
      id: Date.now().toString(), // Tạo id tạm thời
      name: newFolderName,
    };

    // Cập nhật danh sách folders
    setFolders((prevFolders) => [...prevFolders, newFolder]);
    setNewFolderName(''); // Reset tên folder mới
    setShowModal(false); // Đóng modal
  };

  return (
    <div className="h-full w-full bg-custom-green p-2">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h5 className="font-bold text-xl text-white">Folders</h5>
        <button onClick={() => setShowModal(true)}>📂➕</button>
      </div>

      {/* Folder List with Scroll */}
      <ListGroup
        className="overflow-y-auto h-screen text-left px-2"
        style={{
          scrollbarWidth: 'none', // Firefox
          msOverflowStyle: 'none', // Internet Explorer/Edge
          overflowY: 'scroll', // Ensure scrolling works
        }}
      >
        {folders.map(({ id, name }) => (
          <Link
            key={id}
            to={`folders/${id}`}
            className="no-underline"
            onClick={() => handleFolderClick(id)} // Cập nhật trạng thái khi click vào folder
          >
            <Card
              className={`mb-2 ${selectedFolderId === id ? 'bg-custom-yellow' : ''} hover:bg-custom-yellow transition-all duration-200`} // Thêm class cho folder được chọn
            >
              <Card.Body className="p-3">
                <Card.Text 
                  className={`text-lg font-semibold ${selectedFolderId === id ? 'text-black' : 'text-gray-600'}`} // Điều kiện cho tên folder
                >
                  {name}
                </Card.Text>
              </Card.Body>
            </Card>
          </Link>
        ))}
      </ListGroup>

      {/* Modal for Adding Folder */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded shadow-lg">
            <h3 className="text-lg font-bold mb-2">Add New Folder</h3>
            <input
              type="text"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              placeholder="Enter folder name"
              className="border p-2 w-full mb-4"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleAddFolder}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
