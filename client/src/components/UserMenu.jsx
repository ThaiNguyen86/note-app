import React, { useContext, useState } from 'react';
import { Dropdown, Button } from 'react-bootstrap';
import { AuthContext } from '../context/AuthProvider';

export default function UserMenu() {
  const {
    user: { displayName, photoURL, auth },
  } = useContext(AuthContext);

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <div className="border border-gray-300 rounded-lg shadow">
      <Dropdown>
        {/* Tên người dùng và Avatar */}
        <Dropdown.Toggle
          variant="light"
          className="flex items-center"
        >
          <span className="text-gray-800 font-medium">{displayName}</span>
          <img
            alt="avatar"
            src={photoURL}
            className="w-6 h-6 rounded-full ml-2"
          />
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
