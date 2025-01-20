import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  
  const isAuthenticated = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    
   
    navigate('/');
  };

  return (
    <header className="header">
      <h1>Secure Notes</h1>
      <nav>
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/">Home</Link>
          </li>
          {isAuthenticated ? (
            <>
              <li className="nav-item">
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link to="/notes">My Notes</Link>
              </li>
              <li className="nav-item">
                <Link to="/" onClick={handleLogout}>Logout</Link> 
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
