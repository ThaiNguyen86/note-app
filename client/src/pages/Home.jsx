import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import UserMenu from '../components/UserMenu';
import FolderList from '../components/FolderList';


const Home = () => {

    return (
        <div className='flex-col gap-4 m-8 ' >
            <div className='flex font-dm-sans gap-4 justify-end items-start' >
                <UserMenu />
            </div>
            <div className='flex font-dm-sans shadow-md border ' >

                <FolderList
                    folders={
                        [
                            { id: '1', name: 'Folder 1' },
                            { id: '2', name: 'Folder 2' },
                            { id: '3', name: 'Folder 3' },
                            { id: '4', name: 'Folder 4' },
                            { id: '5', name: 'Folder 5' },

                        ]}
                />
                <Outlet />
            </div>
        </div>

    );
};

export default Home;