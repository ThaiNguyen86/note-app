import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

export default function FolderList({ folders }) {
  // State lưu trữ id của folder đang được chọn
  const [selectedFolderId, setSelectedFolderId] = useState(null);

  const handleFolderClick = (id) => {
    // Toggle giữa trạng thái đã chọn và chưa chọn
    setSelectedFolderId(prevSelectedFolderId => (prevSelectedFolderId === id ? null : id));
  };

  return (
    <div className="h-full w-full bg-custom-green p-2">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h5 className="font-bold text-xl text-white">Folders</h5>
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
        {/* Kiểm tra folders có phải là mảng và không rỗng */}
        {Array.isArray(folders) && folders.length > 0 ? (
          folders.map(({ id, name }) => (
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
          ))
        ) : (
          // Nếu folders rỗng hoặc không phải mảng, hiển thị thông báo "No Folders"
          <div className="text-center text-white font-semibold mt-4">No Folders Available</div>
        )}
      </ListGroup>
    </div>
  );
}
