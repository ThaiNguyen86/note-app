import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children }) => {
    const { token } = useAuth();
    
    useEffect(() => {
        if (!token && !window.hasShownAuthToast) {
            toast.info("You need to login to access this page");
            window.hasShownAuthToast = true; // Đánh dấu rằng thông báo đã hiển thị
        }
    }, [token]);
    

    if (!token) {
        window.hasShownAuthToast = false;
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
