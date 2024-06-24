"use client";
import React, { useContext, useState, useEffect } from 'react';
import { Updateuser } from '../services/userservice';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Header from '../components/header';

const UpdateUser = () => {
    const router = useRouter();
    const [user, setUser] = useState(null);

    useEffect(() => {
        let userData = localStorage.getItem("username");
        if (userData) {
            try {
                userData = JSON.parse(userData);
                setUser(userData);
            } catch (e) {
                console.error("Error parsing JSON from localStorage", e);
            }
        } else {
            router.push("/profile");
        }
    }, [router]);

    const updateuserform = async (event) => {
        event.preventDefault();

        try {
            const result = await Updateuser(user?._id, data);
            toast.success("User updated successfully!", {
                position: "top-center"
            });

            delete result.password;

            localStorage.setItem('username', JSON.stringify(result));
            router.push("/profileuser");
        } catch (error) {
            toast.error("Something went wrong!", {
                position: "top-center"
            });
        }
    }
    
    const [data, setData] = useState({
        email: "",
        name: "",
        joiningdate: "",
        role: ""
    });

    useEffect(() => {
        if (user) {
            setData({
                name: user.name || "",
                role: user.role || "",
                email: user.email || "",
                joiningdate: user.joiningdate || ""
            });
        }
    }, [user]);

    return (
        <div className='min-h-screen color bg-gray-100'>
            <Header/>
            <div className='container mx-auto p-4'>
                <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6">
                    <h1 className='text-3xl text-center mb-6'>Updation Form</h1>
                    <form onSubmit={updateuserform}>
                        <div className='mb-4'>
                            <label htmlFor="user_email" className='block text-lg font-medium mb-2'>E-mail</label>
                            <input
                                className='w-full p-3 rounded-lg border border-gray-300 focus:ring focus:ring-blue-500 focus:outline-none'
                                type="email"
                                placeholder="Enter Employee's E-mail"
                                id="user_email"
                                value={data.email}
                            />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="user_name" className='block text-lg font-medium mb-2'>Name</label>
                            <input
                                className='w-full p-3 rounded-lg border border-gray-300 focus:ring focus:ring-blue-500 focus:outline-none'
                                type="text"
                                placeholder="Enter Employee's Name"
                                id="user_name"
                                onChange={(event) => {
                                    setData({
                                        ...data,
                                        name: event.target.value,
                                    });
                                }}
                                value={data.name}
                            />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="user_joiningdate" className='block text-lg font-medium mb-2'>Joining Date</label>
                            <input
                                className='w-full p-3 rounded-lg border border-gray-300 focus:ring focus:ring-blue-500 focus:outline-none'
                                type="text"
                                placeholder="Enter Employee's Joining Date"
                                id="user_joiningdate"
                                onChange={(event) => {
                                    setData({
                                        ...data,
                                        joiningdate: event.target.value,
                                    });
                                }}
                                value={data.joiningdate}
                            />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="user_role" className='block text-lg font-medium mb-2'>Role</label>
                            <input
                                className='w-full p-3 rounded-lg border border-gray-300 focus:ring focus:ring-blue-500 focus:outline-none'
                                type="text"
                                placeholder="Enter Employee's Role"
                                id="user_role"
                                onChange={(event) => {
                                    setData({
                                        ...data,
                                        role: event.target.value,
                                    });
                                }}
                                value={data.role}
                            />
                        </div>
                        <div className='flex justify-center mt-6'>
                            <button
                                type='submit'
                                className='bg-blue-600 text-white font-medium rounded-lg text-sm px-5 py-2.5 mr-2 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300'
                            >
                                Update Employee
                            </button>
                            <button
                                type='button'
                                className='bg-gray-500 text-white font-medium rounded-lg text-sm px-5 py-2.5 mr-2 hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300'
                                onClick={() => {
                                    setData({
                                        name: user.name || "",
                                        role: user.role || "",
                                        email: user.email || "",
                                        joiningdate: user.joiningdate || ""
                                    });
                                }}
                            >
                                Reset
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UpdateUser;
