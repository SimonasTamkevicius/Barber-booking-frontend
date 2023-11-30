import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../utils/AuthContext';
import axiosInstance from '../../../api/axiosInstance';
import { Link } from 'react-router-dom';
import { RxCaretRight, RxCaretLeft } from "react-icons/rx";

// Function to calculate and return an array of dates for a week
const getWeekDates = (currentDate, includeWeekends = false) => {
  const dayOfWeek = currentDate.getDay();
  const startDate = new Date(currentDate);
  startDate.setDate(currentDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1));

  const numDays = includeWeekends ? 7 : 5;

  const dates = [];
  for (let i = 0; i < numDays; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    dates.push(date);
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


const Calendar = () => {
  const { user } = useAuth();
  const currentDate = new Date();
  const [date, setDate] = useState(currentDate);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/appointments", {
        params: {
          barberId: user._id,
        },
      })
      .then((response) => {
        console.log(response.data);
        setAppointments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
      });
  }, [user._id]);

  const allWeekDates = getWeekDates(date, user.workWeekends === "yes");
  const allWorkHours = getHours(user.openingHour, user.closingHour);

  const formatDates = (dates) => {
    return dates.map((date) => {
      const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
      return date.toLocaleDateString(undefined, options);
    });
  };

  const handlePreviousWeek = () => {
    const previousWeek = new Date(date);
    previousWeek.setDate(date.getDate() - 7);
    setDate(previousWeek);
  }
  const handleNextWeek = () => {
    const nextWeek = new Date(date);
    nextWeek.setDate(date.getDate() + 7);
    setDate(nextWeek);
  }
  const handleCurrentDate = () => {
    setDate(currentDate);
    console.log(currentDate);
  }

  return (
    <div>
      <h2 className="ml-10 text-2xl font-bold">Calendar</h2>
      <div className='flex flex-row justify-center items-center space-x-2'>
        <RxCaretLeft className='text-3xl cursor-pointer' onClick={handlePreviousWeek} />
        <p onClick={handleCurrentDate} className='border border-black rounded-xl px-2 py-1 hover:bg-black hover:text-white transition-all duration-150 ease-in-out cursor-pointer'>Today</p>
        <RxCaretRight className='text-3xl cursor-pointer' onClick={handleNextWeek} />
      </div>
      <div className="flex flex-row justify-between items-center m-2 md:mx-10 md:mb-10">
        {formatDates(allWeekDates).map((formattedDate, index) => (
          <div key={index}>
            <p className='text-xs md:text-lg font-semibold max-w-[100px] h-14 md:h-20'>{formattedDate}</p>
            <div>
              {allWorkHours.map((hour) => {
                const bookedAppointment = appointments.find((apt) => apt.date === formattedDate && apt.time === hour);

                return (
                  <div key={`${formattedDate}-${hour}`}>
                    {bookedAppointment ? (
                      <Link to="/singleAppointment" className='text-xs md:text-lg' state={{ appointment: bookedAppointment }}>
                        <p className="border border-black hover:bg-gray-100 text-xs md:text-lg pb-2 md:pb-10 pl-1 pt-1 relative">
                          {hour}<svg className='absolute top-0' viewBox="0 0 40 20" style={{ verticalAlign: 'middle' }}><circle cx="35" cy="8" r="2" fill='#000' /></svg>
                        </p>
                      </Link>
                    ) : (
                      <p className="border border-black text-xs md:text-lg pb-2 md:pb-10 pl-1 pt-1">{hour}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;