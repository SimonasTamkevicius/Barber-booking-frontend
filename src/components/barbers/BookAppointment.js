import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import { Link } from 'react-router-dom';
import { FiSettings } from "react-icons/fi"
import { FaCheck } from "react-icons/fa";

const BookAppointment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { barberData, service, date, hour } = location.state;
  const [booked, setBooked] = useState(false);

  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleChange = (e) => {
    if (e.target.name === "fName") {
        setFName(e.target.value);
    }
    else if (e.target.name === "lName") {
        setLName(e.target.value);
    }
    else if (e.target.name === "email") {
        setEmail(e.target.value);
    }
    else if (e.target.name === "phone") {
        setPhone(e.target.value);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("barberID", barberData._id);
    formData.append("serviceID", service._id);
    formData.append("serviceTitle", service.title);
    formData.append("serviceLength", 1);
    formData.append("servicePrice", service.price);
    formData.append("date", date);
    formData.append("time", parseInt(hour));
    formData.append("customerFName", fName);
    formData.append("customerLName", lName);
    formData.append("customerEmail", email);
    formData.append("customerPhone", phone);

    axiosInstance.post("/appointments", formData, {
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then((response) => {
        console.log(response.data);
        setBooked(true);
        setFName('');
        setLName('');
        setEmail('');
        setPhone('');
    })
    .catch(err => {
        console.log(err);
    })
  }

  const shortFormDate = (dateString) => {
    const dateParts = dateString.split(', ');

    const dayOfWeek = dateParts[0].substring(0, 3);

    const dayOfMonth = dateParts[1].split(' ')[1];
    const result = {dayOfWeek: dayOfWeek, dayOfMonth: dayOfMonth};
    return result;
  }

  const handleDoneClick = () => {
    navigate("/");
  }
  
  return (
    <div>
        <Link to="/settings">
            <FiSettings className='position fixed right-0 top-0 mt-4 mr-4 text-4xl text-gray-300'/>
        </Link>
        <div className='flex flex-col lg:grid grid-cols-12'>
            <div className='col-span-7 flex flex-col items-start md:ml-20 lg:ml-28'>
                <div className='flex flex-row items-center space-x-2 mt-10'>
                    <Link to="/">
                        <p className='text-sm ml-4 text-gray-400 hover:text-black'>Home</p>
                    </Link>
                    <p className='text-sm text-gray-400'>/</p>
                    <Link to="/barbers">
                        <p className='text-sm text-gray-400 hover:text-black'>Barber</p>
                    </Link>
                    <p className='text-sm text-gray-400'>/</p>
                    <Link to="/ChooseService" state={{barberData: barberData}}>
                        <p className='text-sm text-gray-400 hover:text-black'>Service</p>
                    </Link>
                    <p className='text-sm text-gray-400'>/</p>
                    <Link to="/ChooseTime" state={{barberData: barberData, service: service}}>
                        <p className='text-sm text-gray-400 hover:text-black'>Time</p>
                    </Link>
                    <p className='text-sm text-gray-400'>/</p>
                    <p className='text-sm text-black'>Book</p>
                </div>
                {!booked ? (
                    <div className='flex flex-col items-start-start space-y-5 ml-5 w-full'>
                        <h2 className='text-3xl mt-2 mb-5'>Book</h2>
                        <form className='w-2/3' onSubmit={handleSubmit}>
                            <div className='flex flex-col justify-start'>
                                <label>First Name</label>
                                <input type='text' value={fName} name='fName' className='border border-black focus:outline-none rounded-md mb-4 p-2' placeholder='Enter first name' onChange={handleChange} required />
                                <label>Last Name</label>
                                <input type='text' value={lName} name='lName' className='border border-black focus:outline-none rounded-md mb-4 p-2' placeholder='Enter last name' onChange={handleChange} required />
                                <label>Email</label>
                                <input type='email' value={email} name='email' className='border border-black focus:outline-none rounded-md mb-4 p-2' placeholder='Enter email' onChange={handleChange} required />
                                <label>Phone Number</label>
                                <input type='number' value={phone} name='phone' className='border border-black focus:outline-none rounded-md mb-4 p-2' placeholder='Enter phone number' onChange={handleChange} required />
                                <div className='flex w-full justify-end'>
                                    <button className='border border-black hover:bg-black px-4 py-2 rounded-xl hover:text-white bg-white text-black transition-all duration-200 ease-in-out' type='submit'>Book</button>
                                </div>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div className='flex flex-col items-start space-y-5 ml-5'>
                        <h2 className='text-3xl mt-2 mb-5'>Book</h2>
                        <div className='flex justify-center mt-10'>
                            <p className='text-2xl'>Thank you for booking!</p>
                        </div>
                        <div className="ml-20 border-2 rounded-full border-gray-400 p-5 animated-check">
                            <FaCheck className="text-4xl text-white" />
                        </div>
                        <div className='ml-20'>
                            <button onClick={handleDoneClick} className='border border-black rounded-xl hover:text-white hover:bg-black transition-all duration-200 ease-in-out py-2 px-4'>Done</button>
                        </div>
                    </div>
                )}
            </div>
            <div className='flex flex-col relative items-start justify-start col-span-5 my-10 h-96 lg:my-36 border-2 border-black rounded-lg p-4 mx-5 md:mx-24 lg:mr-10'>
                <div className='flex flex-col space-y-5 p-2'>
                    <h1 className='font-bold text-3xl'>A1 Barbershop</h1>
                    <div className='flex flex-col space-y-2'>
                        <h1 className='font-semibold'>Order Summary:</h1>
                        <div className='flex flex-row justify-between'>
                            <div className='flex flex-col'>
                                <div className='flex flex-row space-x-2 mb-1'>
                                    <img src={barberData.imageURL} alt={barberData.fName} className='w-12 rounded-lg bg-cover' />
                                    <p>{barberData.fName} {barberData.lName}</p>
                                </div>
                                <p className='text-xs'>{shortFormDate(date).dayOfWeek}. {shortFormDate(date).dayOfMonth} at {hour <= 12 ? hour : hour - 12}{hour < 12 ? "am" : "pm"}</p>
                            </div>
                            <p>${service.price}</p>
                        </div>
                        <div className='flex flex-row justify-between'>
                            <p className='font-semibold'>{service.title}</p>
                            <p>${service.price}</p>
                        </div>
                        <hr/>
                        <div className='flex flex-row justify-between'>
                            <p className='font-semibold'>Tax</p>
                            <p>${Math.round(service.price * 0.13, 2)}</p>
                        </div>
                        <hr/>
                        <div className='flex flex-row justify-between'>
                            <p className='font-semibold'>Total</p>
                            <p>${Math.round(service.price * 1.13, 2)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default BookAppointment;
