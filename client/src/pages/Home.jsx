import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import UserMenu from '../components/UserMenu';
import FolderList from '../components/FolderList';


const Home = () => {

    return (
        <div className=" w-full flex flex-col">
            {/* User Menu with Fixed Position */}
            <div className="bg-white p-2 flex justify-end items-start fixed top-0 left-0 right-0 z-10 shadow-md">
                <UserMenu />
            </div>
            {/* Main Content */}
            <div className="flex flex-row mt-14 ">  {/* Adjust the padding-top for the UserMenu */}
                {/* Folder List with Scroll */}
                <div className="w-1/4">
                    <FolderList
                        folders={[
                            { id: '1', name: 'Folder 1' },
                            { id: '2', name: 'Folder 2' },
                            { id: '3', name: 'Folder 3' },
                            { id: '4', name: 'Folder 4' },
                            { id: '5', name: 'Folder 5' },


                        ]}
                    />
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
