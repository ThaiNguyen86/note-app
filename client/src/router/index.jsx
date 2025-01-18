import { createBrowserRouter, Outlet } from "react-router-dom";
import Home from "../pages/Home";
import LogIn from "../pages/LogIn";
import Register from "../pages/Register";
import AuthProvider from "../context/AuthProvider";
import ProtectedRoute from "./ProtectedRoute"; // Ensure this handles proper redirection
import ErrorPage from "../pages/Error";
import NoteList from "../components/NoteList";
import Note from "../components/Note";

// Layout dùng để bao quanh các routes đã được bảo vệ
const AuthLayout = () => {
  return <Outlet />;
};

export default createBrowserRouter([
  {
    element: <AuthLayout />, // AuthLayout bao quanh các routes
    errorElement: <ErrorPage />, // Định nghĩa trang lỗi khi có sự cố
    children: [
      {
        element: <LogIn />, // Trang login không cần bảo vệ
        path: '/login',
      },
      {
        element: <Register />, // Trang đăng ký không cần bảo vệ
        path: '/register',
      },
      {
        element: <ProtectedRoute />, // Cần bảo vệ cho các route bên trong
        children: [
          {
            element: <Home />, // Home là trang chính sau khi đăng nhập
            path: '/',
            children: [
              {
                element: <NoteList />, // Trang danh sách ghi chú theo thư mục
                path: 'folders/:folderId', // Sử dụng dynamic parameter folderId
                children: [
                  {
                    element: <Note />, // Trang ghi chú cụ thể
                    path: 'note/:noteId', // Sử dụng dynamic parameter noteId
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);