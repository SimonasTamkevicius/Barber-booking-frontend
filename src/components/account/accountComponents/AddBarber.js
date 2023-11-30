import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../api/axiosInstance';
import { useAuth } from '../../../utils/AuthContext';

const AddBarber = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);
  const [selectedImageName, setSelectedImageName] = useState('');
  const [workWeekends, setWorkWeekends] = useState('yes');
  const [openingHour, setOpeningHour] = useState('');
  const [closingHour, setClosingHour] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'fName') {
      setFName(value);
    } else if (name === 'lName') {
      setLName(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'openingHour') {
      setOpeningHour(value);
    } else if (name === 'closingHour') {
      setClosingHour(value);
    }
  };

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
    formData.append('workWeekends', workWeekends);
    formData.append('openingHour', openingHour);
    formData.append('closingHour', closingHour);

    axiosInstance
      .post('/barbers', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(function (response) {
        console.log(response.data);
        navigate('/barbers');
      })
      .catch(function (error) {
        console.error(error);
        // Handle errors here, e.g., set an error state and display an error message to the user.
      });
  };

  return (
    <div className='flex flex-col justify-center items-center m-10 max-w-xl'>
      <h1 className='text-4xl'>Add Barber</h1>
      <form onSubmit={handleSubmit} className='bg-white p-8 rounded-lg shadow-md'>
        <label className='text-md font-semibold mb-2'>First name</label>
        <input
          type='text'
          value={fName}
          name='fName'
          placeholder='Enter first name'
          onChange={handleChange}
          className='input-field'
          required
        />
        <label className='text-md font-semibold mb-2'>Last name</label>
        <input
          type='text'
          value={lName}
          name='lName'
          placeholder='Enter last name'
          onChange={handleChange}
          className='input-field'
          required
        />
        <label className='text-md font-semibold mb-2'>Email</label>
        <input
          type='text'
          value={email}
          name='email'
          placeholder='Enter email'
          onChange={handleChange}
          className='input-field'
          required
        />
        <label className='text-md font-semibold mb-2'>Password</label>
        <input
          type='password'
          value={password}
          name='password'
          placeholder='Enter password'
          onChange={handleChange}
          className='input-field'
          required
        />
        <label className='text-md font-semibold mb-2'>Image</label>
        <div className='flex items-center'>
          <input
            type='file'
            id='imageInput'
            name='image'
            onChange={handleImageChange}
            className='hidden'
          />
          <label
            htmlFor='imageInput'
            className='bg-gray-400 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-500 transition-colors duration-150 ease-in-out'
          >
            Choose Image
          </label>
          <span className='ml-3'>{selectedImageName}</span>
        </div>
        <div className='flex flex-col mt-5'>
          <label className='text-md font-semibold'>Work Weekends?</label>
          <div className='mt-2'>
            <input
              className='hover:cursor-pointer'
              type='radio'
              name='workWeekends'
              value='yes'
              id='yesRadio'
              checked={workWeekends === 'yes'}
              onChange={() => setWorkWeekends('yes')}
            />
            <label className='mr-3' htmlFor='yesRadio'>
              Yes
            </label>
            <input
              className='hover:cursor-pointer'
              type='radio'
              name='workWeekends'
              value='no'
              id='noRadio'
              checked={workWeekends === 'no'}
              onChange={() => setWorkWeekends('no')}
            />
            <label htmlFor='noRadio'>No</label>
          </div>
        </div>
        <div className='flex flex-col'>
          <div className='flex flex-col space-y-2'>
            <label className='text-md font-semibold mt-5'>Opening Hour (24 hour clock)</label>
            <input
              className='border rounded w-16'
              type='number'
              name='openingHour'
              value={openingHour}
              onChange={handleChange}
            />
          </div>
          <div className='flex flex-col space-y-2'>
            <label className='text-md font-semibold mt-5'>Closing Hour (24 hour clock)</label>
            <input
              className='border rounded w-16'
              type='number'
              name='closingHour'
              value={closingHour}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className='flex flex-row w-full justify-end'>
          <button
            type='submit'
            className='mt-4 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors duration-150 ease-in-out'
          >
            Add Barber
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBarber;
