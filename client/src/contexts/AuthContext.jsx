import { createContext, useState, useContext } from "react";
import axios from "axios";

// Tạo context cho Auth
const AuthContext = createContext();

// Hook custom để sử dụng AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider chứa thông tin người dùng và token
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        // Kiểm tra và lấy user từ localStorage nếu có
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [token, setToken] = useState(localStorage.getItem("token"));

    const login = async (email, password) => {
        try {
            // Gửi yêu cầu đăng nhập đến API
            const response = await axios.post("http://localhost:3000/api/user/login", { email, password });
            const { token, user } = response.data;  // Giả sử API trả về token và user

            // Lưu token và thông tin người dùng vào state và localStorage
            setToken(token);
            setUser(user);
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user)); // Lưu user dưới dạng JSON
        } catch (error) {
            throw new Error("Login failed");
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ token, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
