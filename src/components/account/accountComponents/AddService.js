import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../utils/AuthContext';
import axiosInstance from '../../../api/axiosInstance';

const AddService = () => {
    const { user } = useAuth();
    const [services, setServices] = useState([]);

    useEffect(() => {
        axiosInstance.get("/service", {
            params: {
                _id: user._id
            }
        })
        .then(response => {
            setServices(response.data);
        })
        .catch(error => {
            console.error("Error fetching services:", error);
        });
    }, [user._id]);

    return (
        <div className='m-5'>
            <div>
                <h1 className="text-center text-3xl">Current Services</h1>
                <div className='grid grid-cols-3 justify-center mt-10 space-x-5'>
                    {services.length > 0 ? (
                        services.map((service, i) => (
                            <div key={i} className='flex flex-col justify-center items-stretch col-span-1 border shadow-md rounded-md p-4 bg-gradient-to-br from-slate-50 to-slate-200 hover:shadow-lg hover:cursor-pointer'>
                                <p className='text-lg'>{service.title}</p>
                                <p>{service.length}</p>
                                <p>{service.description}</p>
                                <p>${service.price}</p>
                            </div>
                        ))
                    ) : (
                        <h1>You currently have no services created.</h1>
                    )}
                    <div className='flex justify-center items-center'>
                        <button className='border rounded-md shadow-md py-3 px-5 hover:bg-gray-100 transition-colors duration-100 ease-in-out'><p className='text-3xl'>+</p></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddService;
