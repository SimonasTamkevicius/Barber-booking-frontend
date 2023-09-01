import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className='min-h-screen flex flex-row justify-center items-center' style={{ backgroundImage: "url(/barbershopBGImage.jpeg)" }}>
      <div className='flex flex-row ml-10 space-x-5'>
        <h1 className='text-5xl text-white animate-scale-in'>A1 Barbershop</h1>
        <Link to="/barbers">
          <button className='bg-gray-400 p-4 rounded-md hover:bg-gray-300 transition-colors duration-400 ease-in-out'><p className='text-2xl'>Book Now</p></button>
        </Link>
      </div>
    </div>
  )
}

export default HomePage;
