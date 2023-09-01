import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../utils/AuthContext';

const Profile = () => {
    const { user } = useAuth();

    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setEmail(user.email);
        setFName(user.fName);
        setLName(user.lName);
        setRole(user.role);
        setLoading(false);
    }, [user.email, user.fName, user.lName, user.role])

  return (
    <div>
        <div className="flex flex-col items-center justify-center mt-10">
            {loading && (
                <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-80">
                    <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                </div>
            )}
            <h1 className='text-4xl mb-5'>Profile</h1>
            <form className="bg-white shadow-md rounded-md p-6">
                <div className='flex flex-row space-x-6'>
                    <div className='flex flex-col'>
                        <label htmlFor="fName" className="block font-medium mb-2">First name</label>
                        <input type="text" name="fName" id="fName" className="w-full p-2 border rounded-md mb-4" placeholder={fName} disabled />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="lName" className="block font-medium mb-2">Last name</label>
                        <input type="text" name="lName" id="lName" className="w-full p-2 border rounded-md mb-4" placeholder={lName} disabled />
                    </div>
                </div>
                <div className='flex flex-row space-x-6'>
                    <div className='flex flex-col'>
                        <label htmlFor="email" className="block font-medium mb-2">Email</label>
                        <input type="text" name="email" id="email" className="w-full p-2 border rounded-md mb-4" placeholder={email} disabled />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="role" className="block font-medium mb-2">Role</label>
                        <input type="text" name="role" id="role" className="w-full p-2 border rounded-md mb-4" placeholder={role} disabled />
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Profile