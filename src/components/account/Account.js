import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Login } from './accountComponents/Login';
import { useAuth } from '../../utils/AuthContext';
import Profile from './accountComponents/Profile';
import AddBarber from './accountComponents/AddBarber';
import ViewBarbers from './accountComponents/ViewBarbers';
import AddService from './accountComponents/AddService';
import Calender from './accountComponents/Calender';

const Settings = () => {
    const [loginClick, setLoginClick] = useState(false);
    const [profileClick, setProfileClick] = useState(false);
    const [viewBarbersClick, setViewBarbersClick] = useState(false);
    const [addBarberClick, setAddBarberClick] = useState(false);
    const [addServiceClick, setAddServiceClick] = useState(false);
    const [calenderClick, setCalenderClick] = useState(false);

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
        setAddServiceClick(false);
        setCalenderClick(false);
        setViewBarbersClick(false);
    }

    const handleAddBarbersClick = () => {
        setAddBarberClick(true);
        setProfileClick(false);
        setAddServiceClick(false);
        setCalenderClick(false);
        setViewBarbersClick(false);
    }

    const handleAddServiceClick = () => {
        setAddServiceClick(true);
        setAddBarberClick(false);
        setProfileClick(false);
        setCalenderClick(false);
        setViewBarbersClick(false);
    }

    const handleCalenderClick = () => {
        setCalenderClick(true);
        setAddBarberClick(false);
        setProfileClick(false);
        setAddServiceClick(false);
        setViewBarbersClick(false);
    }

    const handleViewBarbersClick = () => {
        setViewBarbersClick(true);
        setAddBarberClick(false);
        setProfileClick(false);
        setAddServiceClick(false);
        setCalenderClick(false);
    }

    return (
        <div className='mt-10'>
            <Link to="/barbers" className='ml-12 border border-black px-5 py-2 rounded-lg hover:shadow-xl hover:bg-gray-200 transition-all duration-200 ease-in-out'>Back</Link>
            <div className=' flex flex-col lg:grid grid-cols-12 m-10 space-y-5 md:space-y-0'>
                <div className='flex flex-col col-span-3'>
                    <h1 className="text-4xl p-4">Settings</h1>
                    {user.loggedIn ? (
                        <div className='flex flex-col col-span-3 shadow-md rounded-md p-4 space-y-2 mt-10 max-h-80'>
                            <p className='bg-gray-100 hover:bg-gray-200 hover:cursor-pointer p-2 rounded-md hover:border-l-4 border-black' onClick={handleProfileClick}>Profile</p>
                            <p className='bg-gray-100 hover:bg-gray-200 hover:cursor-pointer p-2 rounded-md hover:border-l-4 border-black' onClick={handleCalenderClick}>Calender</p>
                            {user.loggedIn && user.role === "Admin" && <p className='bg-gray-100 hover:bg-gray-200 hover:cursor-pointer p-2 rounded-md hover:border-l-4 border-black' onClick={handleViewBarbersClick}>View Barbers</p>}
                            {user.loggedIn && user.role === "Admin" && <p className='bg-gray-100 hover:bg-gray-200 hover:cursor-pointer p-2 rounded-md hover:border-l-4 border-black' onClick={handleAddBarbersClick}>Add Barbers</p>}
                            <p className='bg-gray-100 hover:bg-gray-200 hover:cursor-pointer p-2 rounded-md hover:border-l-4 border-black' onClick={handleAddServiceClick}>Add Service</p>
                            <p className='bg-gray-100 hover:bg-gray-200 hover:cursor-pointer p-2 rounded-md hover:border-l-4 border-black' onClick={handleLogoutClick}>Logout</p>
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
                    {addServiceClick && <AddService />}
                    {calenderClick && <Calender />}
                    {viewBarbersClick && <ViewBarbers />}
                </div>
                {user.loggedIn && <button className='position relative col-span-1 h-10 bg-slate-300 rounded-md px-3 py-2' style={{minWidth: "75px"}} onClick={handleLogoutClick}>Logout</button>}
            </div>
        </div>
    )
}

export default Settings