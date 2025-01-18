import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";  // Sử dụng context thay cho localStorage

export default function ProtectedRoute() {
    const { user } = useAuth();  // Lấy user từ context

    if (!user) {  // Nếu người dùng không tồn tại (chưa đăng nhập)
        return <Navigate to="/login" />;  // Chuyển hướng đến trang login
    }

    return <Outlet />;  // Hiển thị trang con nếu đã đăng nhập
}
