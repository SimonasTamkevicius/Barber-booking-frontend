import React, { useEffect, useState } from 'react';
import { Login } from './accountComponents/Login';
import { useAuth } from '../../utils/AuthContext';
import Profile from './accountComponents/Profile';
import AddBarber from './accountComponents/AddBarber';

const Settings = () => {
    const [loginClick, setLoginClick] = useState(false);
    const [profileClick, setProfileClick] = useState(false);
    const [addBarberClick, setAddBarberClick] = useState(false);

    const { user, logoutUser } = useAuth();

    useEffect(() => {
        if (user.loggedIn) {
            setProfileClick(true);
        }
    }, [user.loggedIn]);

    const handleLoginClick = () => {
        setLoginClick(true);
    }

    const handleLogoutClick = () => {
        logoutUser();
        setProfileClick(false);
        window.location.reload();
    }

    const handleProfileClick = () => {
        setProfileClick(true);
        setAddBarberClick(false);
    }

    const handleAddBarbersClick = () => {
        setAddBarberClick(true);
        setProfileClick(false);
    }

    return (
        <div>
            <div className='grid grid-cols-12 m-10'>
                <div className='flex flex-col col-span-3'>
                    <h1 className="text-4xl p-4">Settings</h1>
                    {user.loggedIn ? (
                        <div className='flex flex-col col-span-3 shadow-md rounded-md p-4 space-y-2 mt-10 max-h-72'>
                            <p className='hover:bg-gray-200 hover:cursor-pointer p-2 rounded-md hover:border-l-4 border-black' onClick={handleProfileClick}>Profile</p>
                            {user.loggedIn && user.role === "Admin" && <p className='hover:bg-gray-200 hover:cursor-pointer p-2 rounded-md hover:border-l-4 border-black' onClick={handleAddBarbersClick}>Add Barbers</p>}
                            <p className='hover:bg-gray-200 hover:cursor-pointer p-2 rounded-md hover:border-l-4 border-black'>Menu option 4</p>
                            <p className='hover:bg-gray-200 hover:cursor-pointer p-2 rounded-md hover:border-l-4 border-black' onClick={handleLogoutClick}>Logout</p>
                        </div>
                    ) : (
                        <div className='flex flex-col col-span-3 shadow-md rounded-md p-4 space-y-2 mt-10' style={{maxHeight: "140px", minWidth: "175px"}}>
                            <p className='hover:bg-gray-200 hover:cursor-pointer p-2 rounded-md' onClick={handleLoginClick}>Log in</p>
                        </div>
                    )}
                </div>
                <div className='flex col-span-8 justify-center items-center'>
                    {loginClick && <Login />}
                    {profileClick && <Profile />}
                    {addBarberClick && <AddBarber />}
                </div>
                {user.loggedIn && <button className='position relative col-span-1 h-10 bg-slate-300 rounded-md px-3 py-2' style={{minWidth: "75px"}} onClick={handleLogoutClick}>Logout</button>}
            </div>
        </div>
    )
}

export default Settings