import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../utils/AuthContext';
import axiosInstance from '../../../api/axiosInstance';
import { ImCancelCircle } from "react-icons/im";
import { AiFillDelete, AiOutlineCheck } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx"

const AddService = () => {
    const { user } = useAuth();
    const [services, setServices] = useState([]);
    const [addServiceClick, setAddServiceClick] = useState(false);

    const [title, setTitle] = useState('');
    const [descritption, setDescription] = useState('');
    const [price, setPrice] = useState();

    const [deleteConfirmation, setDeleteConfirmation] = useState(null);

    const [message, setMessage] = useState('');


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

    const handleAddServiceClick = () => {
        setAddServiceClick(!addServiceClick);
    }

    const handleChange = (e) => {
        switch (e.target.name) {
            case "title":
                setTitle(e.target.value);
                break;
            case "description":
                setDescription(e.target.value);
                break;
            case "price":
                setPrice(e.target.value);
                break;
            default:
                break;
        }
    }    

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("title", title);
        formData.append("description", descritption);
        formData.append("price", price);
        formData.append("barberID", user._id)
        
        axiosInstance.post("/service", formData, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            setAddServiceClick(false);
            setMessage(response.data.message)
            setTimeout(() => {
                setMessage('');
                window.location.reload();
            }, 2000)
        })
        .catch(err => {
            console.error("Error creating service:", err);
            setMessage(err.message);
            setTimeout(() => {
                setMessage('');
            }, 2000)
        })
    }

    const handleDeleteConfirmation = (serviceID) => {
        setDeleteConfirmation(serviceID);
    }

    const handleDeleteService = (serviceID) => {
        axiosInstance.delete("/service", {
            data: {
                serviceID: serviceID,
            },
        })
        .then(response => {
            console.log(response.data.message);
            setDeleteConfirmation(null);
            setMessage(response.data.message);
    
            // Display the message for 3 seconds (adjust the time as needed)
            setTimeout(() => {
                window.location.reload(); // Reload the window
                setMessage(''); // Clear the message
            }, 3000);
        })
        .catch(error => {
            console.error("Error deleting service:", error);
            setMessage(error.message);
    
            // Display the error message for 3 seconds (adjust the time as needed)
            setTimeout(() => {
                setMessage(''); // Clear the message
            }, 3000);
        });
    }
    
    const handleCancelDelete = () => {
        setDeleteConfirmation(null);
    }   

    return (
        <div className='m-5'>
            <div>
                <h1 className="text-center text-3xl">Current Services</h1>
                {message && (
                    (message === "Successfully deleted the service." || message.startsWith("Service created")) ? (
                        <div className="bg-green-100 text-green-700 p-2 rounded-md mb-4 mt-5">
                            {message}
                        </div>
                    ) : (
                        (message === "Service could not be found." || (message.startsWith && message.startsWith("Error")) || message === "A service with the same title already exists.") ? (
                            <div className="bg-red-100 text-red-700 p-2 rounded-md mb-4">
                                {message}
                            </div>
                        ) : (
                            null
                        )
                    )
                )}
                <div className='flex flex-wrap md:grid grid-cols-3 gap-5 mt-10'>
                    {services.length > 0 ? (
                        services.map((service, i) => (
                            <div
                                key={i}
                                className={`flex flex-col relative w-full justify-center items-stretch col-span-1 border shadow-md rounded-md p-4 bg-gradient-to-br from-slate-50 to-slate-200 hover:shadow-lg hover:cursor-pointer max-h-52`}
                            >
                                {deleteConfirmation === service._id && (
                                    <div className="flex items-center absolute top-2 right-2 space-x-1 opacity-100 z-10">
                                        <button onClick={() => handleDeleteService(service._id)}><AiOutlineCheck className={`text-2xl rounded-md p-1 ${deleteConfirmation === service._id ? 'bg-green-300 hover:bg-green-400' : ''}`} /></button>
                                        <button onClick={handleCancelDelete}><RxCross1 className={`text-2xl rounded-md p-1 ${deleteConfirmation === service._id ? 'bg-red-300 hover:bg-red-400' : ''}`} /></button>
                                    </div>
                                )}
                                {!deleteConfirmation && (
                                    <button onClick={() => handleDeleteConfirmation(service._id)} className="absolute top-2 right-2"><AiFillDelete className='text-xl' /></button>
                                )}
                                <div className={`${deleteConfirmation != null && deleteConfirmation === service._id && 'opacity-50'}`}>
                                    <p className='text-lg'>{service.title}</p>
                                    <p>{service.length} hour</p>
                                    <p>{service.description}</p>
                                    <p>${service.price}</p>
                                </div>
                            </div>
                        ))
                    ) : <p>You have no services yet.</p>}
                    <div className='w-full col-span-1 flex flex-col justify-center items-center border shadow-md rounded-md bg-gradient-to-br from-slate-50 to-slate-200'>
                        {addServiceClick ? (
                            <div>
                                <div className='flex justify-end mr-7 pt-1'>
                                    <button onClick={handleAddServiceClick}><ImCancelCircle className='text-2xl' /></button>
                                </div>
                                <form className='space-y-3 p-3' onSubmit={handleSubmit}>
                                    <div className='flex flex-col px-3'>
                                        <label>Title</label>
                                        <input type='text' name='title' value={title} placeholder='Enter title' className='p-1 rounded' onChange={handleChange} required />
                                    </div>
                                    <div className='flex flex-col px-3'>
                                        <label>Description</label>
                                        <textarea type='' name='description' value={descritption} placeholder='Enter description' className='p-1 rounded' onChange={handleChange} required />
                                    </div>
                                    <div className='flex flex-col px-3'>
                                        <label>Price</label>
                                        <input type='number' name='price' value={price} placeholder='Enter price' className='p-1 rounded' onChange={handleChange} required />
                                    </div>
                                    <div className='flex justify-end px-3'>
                                        <button type='submit' className='bg-blue-200 hover:shadow-md px-2 py-1 rounded'>Save</button>
                                    </div>
                                </form>
                            </div>
                        ) : (
                            <div className='flex justify-center items-center border rounded-md shadow-md py-2 my-14 mx-28 px-4 hover:cursor-pointer hover:bg-gradient-to-br from-gray-100 to-gray-300 transition-colors duration-100 ease-in-out' onClick={handleAddServiceClick}>
                                <p className='text-3xl'>+</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddService;
