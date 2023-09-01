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
        <div className='min-h-screen flex flex-col justify-center items-center' style={{
            backgroundImage: "url(/barbersBG.jpg)",
            backgroundSize: 'cover',
            backgroundBlendMode: 'overlay',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}>
        {loading && (
            <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-80">
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            </div>
        )}
            <Link to="/settings">
                <FiSettings className='position fixed right-0 top-0 mt-4 mr-4 text-4xl text-gray-300'/>
            </Link>
            <h1 className='text-white text-5xl mt-10 mb-5'>Barbers</h1>
        
            <div className='grid grid-cols-2 bg-gray-400 p-4 rounded-md justify-center gap-2'>
                {barbers.map((barber, i) => (
                    <div key={i} className='flex flex-col items-center p-3 border rounded-md hover:shadow-lg hover:border-black ease-in-out duration-100 cursor-pointer'>
                        <img src={barber.imageURL} alt={barber.fName} className='w-20 h-20' />
                        <p className='mt-2'>{barber.fName} {barber.lName}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChooseBarber;
