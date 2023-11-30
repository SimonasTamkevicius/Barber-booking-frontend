import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className='min-h-screen flex flex-row justify-center items-center' style={{ backgroundColor: "rgba(0, 0, 0, 0.2)", backgroundImage: "url(/barbershopBGImage.jpeg)" }}>
      <div className='flex flex-col items-center justify-center md:flex-row ml-10 space-y-5 md:space-x-5 border-4 bg-black bg-opacity-50 p-10'>
        <h1 className='text-5xl text-white animate-in'>A1 Barbershop</h1>
        <Link to="/barbers">
          <button className='border-2 border-black bg-white text-black p-4 rounded-md hover:text-white hover:border-white hover:bg-black transition-all duration-200 ease-in-out'><p className='text-2xl'>Book Now</p></button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
