import { createBrowserRouter, Outlet } from "react-router-dom";
import Home from "../pages/Home";
import LogIn from "../pages/LogIn";
import Register from "../pages/Register";
import AuthProvider from '../context/AuthProvider';
import ProtectedRoute from "./protectedRoute";
import ErrorPage from "../pages/Error";
import NoteList from "../components/NoteList";

const AuthLayout = () => {
    return <AuthProvider>
        <Outlet />
    </AuthProvider>
}

export default createBrowserRouter([
    {
        element: <AuthLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                element: <LogIn />,
                path: '/login',
            },
            {
                element: <Register />,
                path: '/register',
            },
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        element: <Home />,
                        path: '/',
                        children: [
                            {
                                element: <NoteList />,
                                path: `folders/:folderId`,
                                // children: [
                                //     {
                                //         element: <Note />,
                                //         path: `note/:noteId`,
                                //     }
                                // ]
                            }
                        ]
                    },
                ],
            },
        ]
    }
])