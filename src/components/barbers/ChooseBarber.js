import React, { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { FiSettings } from "react-icons/fi"
import { Link } from 'react-router-dom';

const ChooseBarber = () => {
    const [barbers, setBarbers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosInstance.get('/barbers')
        .then(function (response) {
            setLoading(false);
            console.log(response.data);
            setBarbers(response.data);
          })
          .catch(function (error) {
            console.log(error);
            setLoading(false);
          });
    }, [])

    return (
        <div className='flex flex-col lg:grid grid-cols-12'>
            <div className='col-span-7 flex flex-col items-start md:mx-20 lg:ml-28'>
                {loading && (
                    <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-80">
                    <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                    </div>
                )}
                <Link to="/settings">
                    <FiSettings className='position fixed right-0 top-0 mt-4 mr-4 text-4xl text-gray-300'/>
                </Link>
                <div className='flex flex-row items-center space-x-2 mt-10'>
                    <Link to="/">
                        <p className='text-sm ml-4 text-gray-400 hover:text-black'>Home</p>
                    </Link>
                    <p className='text-sm text-gray-400'>/</p>
                    <p className='text-sm'>Barber</p>
                    <p className='text-sm text-gray-400'>/</p>
                    <p className='text-sm text-gray-400'>Service</p>
                    <p className='text-sm text-gray-400'>/</p>
                    <p className='text-sm text-gray-400'>Time</p>
                    <p className='text-sm text-gray-400'>/</p>
                    <p className='text-sm text-gray-400'>Book</p>
                </div>
                <h1 className='text-3xl ml-4 mt-2 mb-5'>Barbers</h1>
            
                <div className='grid grid-cols-2 lg:grid-cols-3 p-4 rounded-md justify-center items-center gap-6'>
                    {barbers.map((barber, i) => (
                        <Link
                            to="/ChooseService"
                                state={{ barberData: barber }}
                            key={i}
                        >
                            <div className='flex flex-col items-center min-h-[175px] border p-5 min-w-5 border-gray-300 rounded-md hover:shadow-xl hover:border-gray-100 ease-in-out duration-100 cursor-pointer'>
                                <img src={barber.imageURL} alt={barber.fName} className='w-20 h-20' />
                                <p className='mt-2'>{barber.fName} {barber.lName}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <div className='flex flex-col items-start justify-start col-span-5 my-5 h-28 lg:my-36 border-2 border-black rounded-lg p-4 mx-5 md:mx-24 lg:mr-10'>
                <div className='flex flex-col space-y-5 p-4'>
                    <h1 className='font-bold text-3xl'>A1 Barbershop</h1>
                </div>
            </div>
        </div>
    );
};

export default ChooseBarber;
