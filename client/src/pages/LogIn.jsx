import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { AuthContext } from '../context/AuthProvider';


function LogIn() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { user } = useContext(AuthContext);
  const auth = getAuth();
  const navigate = useNavigate();

  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    const res = await signInWithPopup(auth, provider)
    console.log({ res });

  };

  if (user?.uid) {
    navigate('/');
    return;
  }

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center font-dm-sans font-medium bg-gradient-to-r from-emerald-300 to-amber-200 ">
      <ToastContainer />
      <div className="card shadow-lg p-4 w-100" style={{ maxWidth: '400px' }}>
        <h3 className="text-center font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-amber-700 mb-3 font-bold">
          Welcome to Note App
        </h3>
        <form>
          {/* Ô nhập Username */}
          <div className="mb-3">
            <label htmlFor="username" className="form-label text-transparent bg-clip-text bg-gradient-to-b from-emerald-700 to-amber-700 font-bold">Username <span style={{ color: 'red' }}>*</span></label>
            <FormControl
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your username"
              className="shadow-sm"
            />
          </div>

          {/* Ô nhập Password */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label text-transparent bg-clip-text bg-gradient-to-b from-emerald-700 to-amber-700 font-bold">Password <span style={{ color: 'red' }}>*</span></label>
            <InputGroup>
              <FormControl
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="shadow-sm"
              />
              <Button
                variant="outline-secondary"
                onClick={() => setShowPassword((prev) => !prev)}
                className="border border-transparent outline-none hover:bg-gray-100 shadow-sm"
              >
                <i className={`bi ${showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'} ${showPassword ? 'text-transparent bg-clip-text bg-gradient-to-b from-emerald-700 to-amber-700' : 'text-transparent bg-clip-text bg-gradient-to-b from-emerald-700 to-amber-700'}`}></i>
              </Button>
            </InputGroup>
          </div>
        </form>
        {/* Nút SIGN IN */}
        <button
          className="w-100 py-2 text-white font-semibold bg-gradient-to-r from-emerald-500 to-amber-500 hover:from-emerald-700 hover:to-amber-700 rounded-md mt-4"
          onClick={handleLoginWithGoogle}
        >
          SIGN IN
        </button>


        {/* Footer */}
        <div className="text-center mt-3 small">
          <span>New to Note App? </span>
          <a href="/register" className="hover:font-semibold font-medium text-decoration-none text-transparent bg-clip-text bg-gradient-to-b from-emerald-700 to-amber-700">
            Sign up here
          </a>
        </div>
        <div className="text-center text-muted small mt-3 ">
          © 2025 <strong className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-amber-700">Note App</strong>. All Rights Reserved.
        </div>
      </div>
    </div>
  );
};
export default LogIn;