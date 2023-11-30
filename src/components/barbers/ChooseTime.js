import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { FiSettings } from "react-icons/fi"

// Function to calculate and return an array of dates for a week
const getWeekDates = (currentDate, includeWeekends = false) => {
  const startDate = new Date(currentDate);
  const dates = [];
  let dayIndex = startDate.getDay();

  // Iterate to get the next 7 days (including the current day)
  for (let i = 0; i < 7; i++) {
    // Skip weekends if includeWeekends is false
    while (!includeWeekends && (dayIndex === 0 || dayIndex === 6)) {
      startDate.setDate(startDate.getDate() + 1);
      dayIndex = startDate.getDay();
    }

    const date = new Date(startDate);
    dates.push(date);

    startDate.setDate(startDate.getDate() + 1);
    dayIndex = startDate.getDay();
  }

  return dates;
};

const getHours = (opening, closing) => {
    const hours = [];
    for (let i = opening; i < closing; i++) {
        hours.push(i);
    }
    return hours;
};

const ChooseTime = () => {
    const location = useLocation();

    const barberData = location.state ? location.state.barberData : null;
    const service = location.state ? location.state.service : null;

    console.log(service);

    const currentDate = new Date();

    const [date, setDate] = useState(currentDate);

    let allWeekDates = getWeekDates(date, barberData.workWeekends === "yes");
    const allWorkHours = getHours(barberData.openingHour, barberData.closingHour);

    const formatDates = (dates) => {
        return dates.map((date) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
        });
    };

    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        axiosInstance.get("/appointments", {
            params: {
                barberId: barberData._id,
            }            
        })
        .then(response => {
            setAppointments(response.data);
        })
        .catch(error => {
            console.error("Error fetching appointments:", error);
        });
    },[barberData]);

    const [selectedDate, setSelectedDate] = useState(currentDate.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
    const [selectedYMDate, setSelectedYMDate] = useState([currentDate.toLocaleDateString(undefined, {month: 'long', year: 'numeric'})]);

    // Function to handle date selection
    const handleDateSelect = (selectedDate) => {
      setSelectedDate(selectedDate);
      const date = selectedDate.split(" ");
      const YMDate = [date[1], " ", date[3]];
      setSelectedYMDate(YMDate);
      const includeWeekends = barberData.workWeekends === "yes" ? true : false;
      allWeekDates = getWeekDates(selectedDate, includeWeekends);
    };

    const shortFormDate = (dateString) => {
      const dateParts = dateString.split(', ');

      const dayOfWeek = dateParts[0].substring(0, 3);

      const dayOfMonth = dateParts[1].split(' ')[1];
      const result = {dayOfWeek: dayOfWeek, dayOfMonth: dayOfMonth};
      return result;
    }

    const handlePreviousWeek = () => {
      const previousWeek = new Date(date);
      previousWeek.setDate(date.getDate() - 7);
      setDate(previousWeek);
      handleDateSelect(previousWeek.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
    }
  
    // Function to handle going to the next week
    const handleNextWeek = () => {
      const nextWeek = new Date(date);
      nextWeek.setDate(date.getDate() + 7);
      setDate(nextWeek);
      handleDateSelect(nextWeek.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
    }
    const handleCurrentDate = () => {
      setDate(currentDate);
      handleDateSelect(currentDate.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
      console.log(currentDate);
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
                <p className='text-sm text-black'>Time</p>
                <p className='text-sm text-gray-400'>/</p>
                <p className='text-sm text-gray-400'>Book</p>
            </div>
            <h2 className='text-3xl ml-4 mt-2 mb-5'>{selectedYMDate}</h2>
            <div className='flex flex-row justify-center items-center ml-44 space-x-2'>
              <RxCaretLeft className='text-3xl cursor-pointer' onClick={handlePreviousWeek} />
              <p onClick={handleCurrentDate} className='border border-black rounded-xl px-2 py-1 hover:bg-black hover:text-white transition-all duration-150 ease-in-out cursor-pointer'>Today</p>
              <RxCaretRight className='text-3xl cursor-pointer' onClick={handleNextWeek} />
            </div>
            <div className='flex flex-row justify-start space-x-5 md:space-x-10 my-10 ml-5'>
              {formatDates(allWeekDates).map((formattedDate, index) => (
                <div key={index}>
                  <h1
                    className={`cursor-pointer ${
                      selectedDate === formattedDate ? 'font-bold' : ''
                    }`}
                    onClick={() => handleDateSelect(formattedDate)}
                  >
                    <div className='flex flex-col justify-center items-center'>
                      <div className={`bg-black rounded-full w-10 h-10 flex justify-center items-center ${selectedDate === formattedDate && 'border-4 border-gray-300'}`}>
                        <p className='text-white'>{shortFormDate(formattedDate).dayOfMonth}</p>
                      </div>
                      <p>{shortFormDate(formattedDate).dayOfWeek}</p>
                    </div>
                  </h1>
                  {selectedDate === formattedDate && (
                    <div className='flex flex-col absolute left-26 lg:left-32'>
                      <h1 className='ml-0 mt-5 font-semibold'>{selectedDate.split(",")[0]}</h1>
                      {allWorkHours.map((hour, i) => (
                        appointments.some(
                          (appointment) =>
                              appointment.date === formattedDate && appointment.time === hour
                          ) ? (
                            null
                          ) : (
                          <Link key={i} to="/BookAppointment" state={{barberData: barberData, service: service, date: formattedDate, hour: hour}}>
                            <div className='flex flex-row justify-center items-center space-x-3 p-2 border rounded-md w-32 mt-2 border-gray-300 hover:shadow-xl hover:border-gray-100 ease-in-out duration-100 cursor-pointer'>
                              <p>{hour > 12 ? hour - 12 : hour} {hour < 12 ? "am" : "pm"}</p>
                              {hour < 8 || hour > 18 ? <BsFillMoonFill className='text-xl' /> : <BsFillSunFill />}
                            </div>
                          </Link>
                        )
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className='flex flex-col relative w-full items-start justify-start col-span-5 my-5 h-96 mt-[475px] lg:my-36 border-2 border-black rounded-lg p-4 mx-5 md:mx-24 lg:mr-10'>
                <div className='flex flex-col space-y-5 p-2'>
                    <h1 className='font-bold text-3xl'>A1 Barbershop</h1>
                    <div className='flex flex-col space-y-2'>
                        <h1 className='font-semibold'>Order Summary:</h1>
                        <div className='flex flex-row justify-between'>
                            <div className='flex flex-row space-x-2 mb-5'>
                              <img src={barberData.imageURL} alt={barberData.fName} className='w-12 rounded-lg bg-cover' />
                              <p>{barberData.fName} {barberData.lName}</p>
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

export default ChooseTime;