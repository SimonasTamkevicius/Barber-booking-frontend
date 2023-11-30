import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axiosInstance from '../../../api/axiosInstance';

const SingleAppointment = () => {
    const location = useLocation();
    const appointment = location.state ? location.state.appointment : null;
    const navigate = useNavigate();

    const handleDeleteClick = () => {
        axiosInstance.delete("/appointments", {
            data: {
                appointmentId: appointment._id,
            }
        })
            .then(response => {
                navigate("/settings");
            })
            .catch(error => {
                console.error("Error deleting appointment:", error);
            });
    };    
  return (
    <div className="mt-10">
        <Link to="/settings" className='ml-12 border border-black px-5 py-2 rounded-lg hover:shadow-xl hover:bg-gray-200 transition-all duration-200 ease-in-out'>Back</Link>
        <div className='flex justify-center items-center mt-32'>
        {appointment ? (
            <div className='border-2 border-black p-12 rounded-lg'>
                <h1 className="font-semibold text-4xl">{appointment.serviceTitle}</h1>
                <div className='flex flex-col space-y-3 mt-5'>
                    <p className='text-xl'><span className="font-semibold text-xl">Date:</span> {appointment.date}</p>
                    <p className='text-xl'><span className="font-semibold text-xl">Time:</span> {appointment.time}</p>
                    <p className='text-xl'><span className="font-semibold text-xl">Customer:</span> {appointment.customerFName} {appointment.customerLName}</p>
                    <p className='text-xl'><span className="font-semibold text-xl">Email:</span> {appointment.customerEmail}</p>
                    <p className='text-xl'><span className="font-semibold text-xl">Phone:</span> {appointment.customerPhone}</p>
                </div>
                <div className='flex justify-center mt-10'>
                    <button onClick={handleDeleteClick} className='border border-black px-4 py-2 rounded-xl hover:bg-black hover:text-white transition-all duration-200 ease-in-out'>Delete</button>
                </div>
            </div>
        ) : (
            <h1 className="not-found-message">Appointment not found</h1>
        )}
        </div>
    </div>
  )
}

export default SingleAppointment;