import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { InputGroup, FormControl, Button } from "react-bootstrap";

const AuthForm = ({ isLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUserName] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isLogin) {
                const res = await login(email, password);
                if (res.status === 200) {
                    toast.success("Login successful!");
                    setTimeout(() => {
                        navigate("/dashboard");
                    }, 1000);
                } else {
                    toast.error("Login failed!");
                }
            } else {
                const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/register`, { email, password, username });
                console.log("res", res);
                if (res.status === 201) {
                    toast.success("Registration successful!");
                    setTimeout(() => {
                        navigate("/login");
                    }, 1000);
                } else {
                    toast.error("Registration failed!");
                }
            }
        } catch (error) {
            console.error("An error occurred: ", error);
            toast.error("An error occurred. Please try again.");
        }
    };

    const handleForgotPassword = () => {
        navigate("/forgot-password");
    };

    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center font-dm-sans font-medium bg-gradient-to-b from-sky-300 to-amber-100">
            <div className="card shadow-lg p-4 w-100" style={{ maxWidth: '400px' }}>
                <h3 className="text-center font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-sky-700 to-amber-700 mb-3">
                    {isLogin ? "Welcome to Note App" : "Register for Note App"}
                </h3>
                <form onSubmit={handleSubmit}>
                    {/* Username Field (only for registration) */}
                    {!isLogin && (
                        <div className="mb-3">
                            <label
                                htmlFor="username"
                                className="form-label text-transparent bg-clip-text bg-gradient-to-b from-sky-700 to-amber-700 font-bold"
                            >
                                Username <span style={{ color: "red" }}>*</span>
                            </label>
                            <FormControl
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUserName(e.target.value)}
                                placeholder="Enter your username"
                                className="shadow-sm"
                                required
                            />
                        </div>
                    )}

                    {/* Email Field */}
                    <div className="mb-3">
                        <label
                            htmlFor="email"
                            className="form-label text-transparent bg-clip-text bg-gradient-to-b from-sky-700 to-amber-700 font-bold"
                        >
                            Email <span style={{ color: "red" }}>*</span>
                        </label>
                        <FormControl
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="shadow-sm"
                            required
                        />
                    </div>

                    {/* Password Field */}
                    <div className="mb-3">
                        <label
                            htmlFor="password"
                            className="form-label text-transparent bg-clip-text bg-gradient-to-b from-sky-700 to-amber-700 font-bold"
                        >
                            Password <span style={{ color: "red" }}>*</span>
                        </label>
                        <InputGroup>
                            <FormControl
                                type={showPassword ? "text" : "password"}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="shadow-sm"
                                required
                            />
                            <Button
                                variant="outline-secondary"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="border border-transparent outline-none hover:bg-gray-100 shadow-sm"
                            >
                                <i
                                    className={`bi ${showPassword ? "bi-eye-slash-fill" : "bi-eye-fill"} text-transparent bg-clip-text bg-gradient-to-b from-sky-700 to-amber-700`}
                                ></i>
                            </Button>
                        </InputGroup>
                    </div>

                    {/* Submit Button */}
                    <button
                        className="w-100 py-2 text-white font-semibold bg-gradient-to-r from-sky-500 to-amber-500 hover:from-sky-700 hover:to-amber-700 rounded-md mt-4"
                        type="submit"
                    >
                        {isLogin ? "LOG IN" : "REGISTER"}
                    </button>
                </form>

                {/* Additional Links */}
                {isLogin && (
                    <div className="text-center mt-3">
                        <button
                            type="button"
                            onClick={handleForgotPassword}
                            className="hover:font-semibold font-medium text-decoration-none text-transparent bg-clip-text bg-gradient-to-b from-sky-700 to-amber-700"
                        >
                            Forgot password?
                        </button>
                    </div>
                )}

                <div className="text-center mt-3 small">
                    {isLogin ? (
                        <span>
                            New to Note App?{' '}
                            <a href="/register" className="hover:font-semibold font-medium text-decoration-none text-transparent bg-clip-text bg-gradient-to-b from-sky-700 to-amber-700">
                                Register here
                            </a>
                        </span>
                    ) : (
                        <span>
                            Already have an account?{' '}
                            <a href="/login" className="hover:font-semibold font-medium text-decoration-none text-transparent bg-clip-text bg-gradient-to-b from-sky-700 to-amber-700">
                                Log in here
                            </a>
                        </span>
                    )}
                </div>

                {/* Footer */}
                <div className="text-center text-muted small mt-3">
                    © 2025 <strong className="text-transparent bg-clip-text bg-gradient-to-r from-sky-700 to-amber-700">Note App</strong>. All Rights Reserved.
                </div>
            </div>
        </div>
    );
};

export default AuthForm;
