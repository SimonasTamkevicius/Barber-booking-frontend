import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../api/axiosInstance';
import { useAuth } from '../../../utils/AuthContext';

const AddBarber = () => {
    const { user, loginUser } = useAuth();

    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState(null);
    const [selectedImageName, setSelectedImageName] = useState('');

    const navigate = useNavigate();

    const handleChange = (e) => {
        if(e.target.name === "fName") {
            setFName(e.target.value);
        } else if (e.target.name === "lName") {
            setLName(e.target.value);
        } else if (e.target.name === "email") {
            setEmail(e.target.value);
        } else if (e.target.name === "password") {
            setPassword(e.target.value);
        }
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImage(file);
        setSelectedImageName(file.name);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('fName', fName);
        formData.append('lName', lName);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('image', image);

        axiosInstance.post("/barbers", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then(function (response) {
            console.log(response.data);
            loginUser(response.data.role, response.data.token, response.data._id, response.data.fName, response.data.lName, response.data.email)
            navigate("/barbers");
          })
          .catch(function (error) {
            console.log(error);
          }); 
    }
    useEffect(() => {
        console.log(user);
    }, [user])

    return (
        <div className='flex flex-col justify-center items-center m-10 max-w-xl'>
            <h1 className='text-4xl'>Add Barber</h1>
            <form onSubmit={handleSubmit} className='bg-white p-8 rounded-lg shadow-md'>
                <label className='text-md font-semibold mb-2'>First name</label>
                <input type='text' value={fName} name='fName' placeholder='Enter first name' onChange={handleChange} className='input-field' />
                <label className='text-md font-semibold mb-2'>Last name</label>
                <input type='text' value={lName} name='lName' placeholder='Enter last name' onChange={handleChange} className='input-field' />
                <label className='text-md font-semibold mb-2'>Email</label>
                <input type='text' value={email} name='email' placeholder='Enter email' onChange={handleChange} className='input-field' />
                <label className='text-md font-semibold mb-2'>Password</label>
                <input type='password' value={password} name='password' placeholder='Enter password' onChange={handleChange} className='input-field' />
                <label className='text-md font-semibold mb-2'>Image</label>
                <div className='flex items-center'>
                    <input type='file' id='imageInput' name='image' onChange={handleImageChange} className='hidden' />
                    <label htmlFor='imageInput' className='bg-gray-400 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-500 transition-colors duration-150 ease-in-out'>
                        Choose Image
                    </label>
                    <span className='ml-3'>{selectedImageName}</span>
                </div>
                <div className='flex flex-row w-full justify-end'>
                    <button type='submit' className='mt-4 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors duration-150 ease-in-out'>
                        Add Barber
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddBarber;