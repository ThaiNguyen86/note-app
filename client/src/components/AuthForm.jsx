import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import { useAuth } from "../contexts/AuthContext";

const AuthForm = ({ isLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isLogin) {
                await login(email, password);
                navigate("/dashboard");
            } else {
                await axios.post(`${import.meta.env.VITE_API_URL}/user/register`, { email, password, username });
                navigate("/login");
            }
        } catch (error) {
            console.error("Error during request:", error);
            alert("Đã có lỗi xảy ra. Vui lòng thử lại.");
        }
    };

    const handleForgotPassword = () => {
        
        navigate("/forgot-password");
    };

    return (
        <form onSubmit={handleSubmit}>
         
            {!isLogin && (
                <input
                    type="text"
                    placeholder="Tên người dùng"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            )}
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">{isLogin ? "Đăng nhập" : "Đăng ký"}</button>
            
            {isLogin && (
                <div>
                    <button type="button" onClick={handleForgotPassword}>
                        Quên mật khẩu?
                    </button>
                </div>
            )}
        </form>
    );
};

export default AuthForm;
