import React, {useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { useAuth } from '../context/AuthProvider';

export default function UserMenu() {
  const navigate = useNavigate();
  const {
    user,
    userLogout,
  } = useAuth();

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Thực hiện đăng xuất
  const handleLogout = () => {
    userLogout();  // Gọi method logout từ context
    setIsLoggingOut(true);
  };

  useEffect(() => {
    if (isLoggingOut) {
      navigate('/login');
    }
  }, [isLoggingOut, navigate]);
  return (
    <div className="h-full w-full flex justify-between">
      <h2 className="ml-2 text-transparent bg-clip-text bg-gradient-to-r from-emerald-900 to-yellow-800 font-bold text-2xl">Note App</h2>
      <Dropdown>
        {/* Tên người dùng và Avatar */}
        <Dropdown.Toggle
          variant="light"
          className="flex items-center"
        >
          <span className="text-gray-800 font-medium">{user?.user.username}</span>
        </Dropdown.Toggle>

        {/* Menu thả xuống */}
        <Dropdown.Menu align="end" className="mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Dropdown.Item
            onClick={handleLogout}
            className="hover:bg-gray-100 px-4 py-2 text-sm text-gray-700"
          >
            Logout
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
