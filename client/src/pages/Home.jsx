import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import UserMenu from '../components/UserMenu';
import FolderList from '../components/FolderList';
import { getAllFolders } from '../services/api';

const Home = () => {
    const [folders, setFolders] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state for API request

    const fetchListFolder = async () => {
        try {
            const res = await getAllFolders();
            console.log({ res });
            if (res) {
                setFolders(res.folder);
            }
        } catch (error) {
            console.log({ error });
        } finally {
            setLoading(false); // Stop loading when the API call is complete
        }
    };

    useEffect(() => {
        fetchListFolder();
    }, []);

    return (
        <div className="w-full flex flex-col">
            {/* User Menu with Fixed Position */}
            <div className="bg-white p-2 flex justify-end items-start fixed top-0 left-0 right-0 z-10 shadow-md">
                <UserMenu />
            </div>

            {/* Main Content */}
            <div className="flex flex-row mt-14"> {/* Adjust the padding-top for the UserMenu */}
                {/* Folder List with Scroll */}
                <div className="w-1/4">
                    {/* Display loading indicator or Folder List */}
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <FolderList folders={folders} />
                    )}
                </div>

                {/* Outlet for main content */}
                <div className="w-3/4 h-full overflow-hidden">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Home;
