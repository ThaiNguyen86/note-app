import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext"; // Import useAuth from AuthContext
import avatar from './avatar.jpg'; // Import avatar.jpg file
import { toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


const Header = () => {
    const { user, logout } = useAuth(); // Get user info and logout function from AuthContext
    const handleLogout = () => {
        const res = logout(); // Call logout function from AuthContext
        if (res.success) {
            console.log("Logout successful!", res);
            toast.success("Logout successful!");
            window.location.reload();
        } else {
            toast.error("Logout failed!");
        }
    };

    return (

        <nav className="bg-custom-green shadow-lg ">
            <div className="container mx-auto flex justify-between items-center py-2">
                <div className="flex items-center space-x-8">
                    <Link className="text-white hover:!text-custom-yellow font-bold text-xl transition-colors duration-300" to="/">NoteApp</Link>
                    <Link className="text-white hover:!text-custom-yellow font-semibold transition-colors duration-300 hover:font-bold" to="/">Home</Link>
                    <Link className="text-white hover:!text-custom-yellow font-semibold transition-colors duration-300 hover:font-bold" to="/dashboard">My Notes</Link>
                </div>
                <div className="flex items-center">
                    <div className="flex items-center">
                        {user ? (
                            <>
                                <button
                                    className="text-white hover:!text-custom-yellow font-semibold rounded-md px-4 py-2 transition duration-300 ease-in-out hover:font-bold"
                                    onClick={handleLogout}
                                >
                                    LogOut
                                </button>
                                <img
                                    src={avatar}
                                    alt="Avatar"
                                    className="rounded-full w-10 h-10 object-cover border-2 border-white ml-4"
                                />
                                <span className="text-white font-medium ml-2">{user.username}</span>
                            </>
                        ) : (
                            <Link
                                to="/register"
                                className="text-white hover:!text-custom-yellow font-semibold rounded-md px-4 py-2 transition duration-300 ease-in-out hover:font-bold"
                            >
                                Register
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
