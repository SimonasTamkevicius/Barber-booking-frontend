import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import { FiSettings } from "react-icons/fi"

const ChooseService = () => {
    const location = useLocation();
    const barberData = location.state ? location.state.barberData : null;

    const [services, setServices] = useState([]);

    useEffect(() => {
        axiosInstance.get("/service", {
            params: {
                _id: barberData._id
            }
        })
        .then(response => {
            console.log(response.data);
            setServices(response.data);
        })
        .catch(error => {
            console.error("Error fetching services:", error);
        });
    },[barberData]);

  return (
    <div className='flex flex-col lg:grid grid-cols-12'>
        <div className='col-span-7 flex flex-col items-start md:ml-20 lg:ml-28'>
            <Link to="/settings">
                <FiSettings className='position fixed right-0 top-0 mt-4 mr-4 text-4xl text-gray-300'/>
            </Link>
            <div className='flex flex-row items-center space-x-2 mt-10'>
                <Link to="/">
                    <p className='text-sm ml-4 text-gray-400 hover:text-black'>Home</p>
                </Link>
                <p className='text-sm text-gray-400'>/</p>
                <Link to="/barbers">
                    <p className='text-sm text-gray-400 hover:text-black'>Barber</p>
                </Link>
                <p className='text-sm text-gray-400'>/</p>
                <p className='text-sm'>Service</p>
                <p className='text-sm text-gray-400'>/</p>
                <p className='text-sm text-gray-400'>Time</p>
                <p className='text-sm text-gray-400'>/</p>
                <p className='text-sm text-gray-400'>Book</p>
            </div>
            <h1 className='text-3xl ml-4 mt-2 mb-5'>Services</h1>
            <div className='grid grid-cols-2 lg:grid-cols-3 p-4 rounded-md items-center justify-center gap-6'>
                {services.length > 0 ? (
                        services.map((service, i) => {
                            return (
                                <Link to="/ChooseTime" key={i} state={{barberData: barberData, service: service}}>
                                    <div className='flex flex-col items-center min-h-[130px] min-w-[125px] p-3 border border-gray-300 rounded-md hover:shadow-xl hover:border-gray-100 ease-in-out duration-100 cursor-pointer'>
                                        <p className='font-semibold'>{service.title}</p>
                                        <p>1 hr</p>
                                        <p>${service.price}</p>
                                    </div>
                                </Link>
                            )
                        })
                ) : (
                    <p>No services</p>
                )}
            </div>
        </div>
        <div className='flex flex-col items-start justify-start col-span-5 my-5 h-96 lg:my-36 border-2 border-black rounded-lg p-4 mx-5 md:mx-24 lg:mr-10'>
            <div className='flex flex-col space-y-5 p-2'>
                <h1 className='font-bold text-3xl'>A1 Barbershop</h1>
                <div className='flex flex-col space-y-2'>
                    <h1 className='font-semibold'>Order Summary:</h1>
                    <div className='flex flex-row space-x-2'>
                        <img src={barberData.imageURL} alt={barberData.fName} className='w-12 rounded-lg bg-cover' />
                        <p>{barberData.fName} {barberData.lName}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ChooseService;