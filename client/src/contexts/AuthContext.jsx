import { createContext, useState, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));

    const login = async (email, password) => {
        try {
            const response = await axios.post("http://localhost:3000/api/user/login", { email, password });
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
        } catch (error) {
            throw new Error("Login failed");
        }
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
