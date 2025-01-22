import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
    const navigate = useNavigate();
    const { currentUser, logout } = useAuth(); // Lấy thông tin người dùng và hàm logout từ AuthContext
    const avatarUrl = "https://via.placeholder.com/40"; // Thay đường dẫn này bằng ảnh thực tế nếu có

    const handleLogout = () => {
        logout(); // Gọi hàm logout từ AuthContext
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">NoteApp</Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav w-100 d-flex justify-content-around">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/dashboard">Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/mynotes">My Notes</Link>
                        </li>
                    </ul>
                    <div className="d-flex align-items-center">
                        <button
                            className="btn btn-outline-light me-3"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                        <img
                            src={avatarUrl}
                            alt="Avatar"
                            className="rounded-circle me-2"
                            style={{ width: "40px", height: "40px", objectFit: "cover" }}
                        />
                        <span className="text-white">{currentUser?.username || "User"}</span>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
