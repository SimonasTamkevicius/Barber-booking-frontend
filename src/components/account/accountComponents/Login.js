import React, { useState } from 'react';
import axiosInstance from '../../../api/axiosInstance';
import { useAuth } from '../../../utils/AuthContext';

export const Login = () => {
    const { loginUser } = useAuth();

    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleChange = (e) => {
        if (e.target.name === "email") {
            setEmail(e.target.value);
        } else if (e.target.name === "password") {
            setPassword(e.target.value);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);

        setLoading(true);
        
        axiosInstance.post("/login", formData, {
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(function(response) {
            console.log(response);
            const { _id, fName, lName, email, role, accessToken, workWeekends, openingHour, closingHour } = response.data;
            console.log(accessToken);
            loginUser(role, accessToken, _id, fName, lName, email, workWeekends, openingHour, closingHour);
            setLoading(false);
            window.location.reload();
        })
        .catch (function (error) {
            setLoading(false)
            console.log(error);
            window.location.reload();
        })
        .finally (() => {
            setLoading(false)
        })
    }

  return (
    <div className="flex flex-col items-center justify-center mt-10">
        {loading && (
            <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-80">
                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            </div>
        )}
        <h1 className='text-4xl mb-5'>Login</h1>
      <form className="bg-white shadow-md rounded-md p-6" onSubmit={handleSubmit}>
        <label htmlFor="email" className="block font-medium mb-2">Email</label>
        <input type="text" name="email" id="email" className="w-full p-2 border rounded-md mb-4" onChange={handleChange} required />

        <label htmlFor="password" className="block font-medium mb-2">Password</label>
        <input type="password" name="password" id="password" className="w-full p-2 border rounded-md mb-4" onChange={handleChange} required />
        <div className='flex justify-end'>
            <button type="submit" className="border border-black text-black p-2 rounded-md hover:bg-black hover:text-white transition-all duration-200 ease-in-out">Login</button>
        </div>
      </form>
    </div>
  );
};
