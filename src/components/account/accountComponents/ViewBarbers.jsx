import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../api/axiosInstance';
import { useAuth } from '../../../utils/AuthContext';

const ViewBarbers = () => {
  const [barbers, setBarbers] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    axiosInstance
      .get("/barbers")
      .then(response => {
        console.log(response.data);
        setBarbers(response.data);
      })
      .catch(error => {
        console.error("Error fetching barbers:", error);
      });
  }, []); // Empty dependency array for initial fetch

  const handleDeleteClick = barberId => {
    axiosInstance
      .delete("/barbers", {
        data: {
          barberId: barberId,
        },
      })
      .then(response => {
        console.log(response.data);
        setBarbers(prevBarbers => prevBarbers.filter(barber => barber._id !== barberId));
      })
      .catch(error => {
        console.error("Error deleting barber:", error);
      });
  };

  return (
    <div className='mx-10'>
      <h2 className="flex justify-center items-center mb-10 text-2xl font-bold">Manage Barbers</h2>
      <div className='mx-5'>
        <table className="table-fixed">
          <thead>
            <tr>
              <th className="w-1/6 px-4 py-2">First Name</th>
              <th className="w-1/6 px-4 py-2">Last Name</th>
              <th className="w-1/6 px-4 py-2">Email</th>
              <th className="w-1/6 px-2 py-2">Works Weekends</th>
            </tr>
          </thead>
          <tbody>
            {barbers.map((barber, i) => (
              <tr key={i}>
                <td className="border px-4 py-2">{barber.fName}</td>
                <td className="border px-4 py-2">{barber.lName}</td>
                <td className="border px-4 py-2">{barber.email}</td>
                <td className="border px-4 py-2">{barber.workWeekends}</td>
                {user._id === barber._id ? (
                  <td className="border px-4 py-2 bg-white">
                    <button className="bg-white text-gray-300 font-bold py-2 px-4 rounded" disabled>Delete</button>
                  </td>
                ) : (
                  <td className="border px-4 py-2 bg-white hover:bg-black text-black hover:text-white transition-all duration-200 ease-in-out">
                    <button onClick={() => handleDeleteClick(barber._id)} className="font-bold py-2 px-4 rounded">
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewBarbers;
