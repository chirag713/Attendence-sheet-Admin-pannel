
"use client";
import React, { useContext, useState, useEffect } from 'react'
import { Updateuser } from '../services/userservice';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

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
            const result = await Updateuser(user?._id , data);
            toast.success("User created Updated !!..", {
                position: "top-center"
            });

            delete result.password;
            
            localStorage.setItem('username', JSON.stringify(result));
            // router.push("/profile");


        } catch (error) {
            toast.error("Something went wrong !!..", {
                position: "top-center"
            });
        }
    }

    const [data, setData] = useState({
        email: "",
        name: "",
        joiningdate: "",
        role:""
    });
    return (
        <div>
            <div className='container grid grid-cols-12 '>
                <div className="  col-span-10 col-start-2  lg:col-span-4 lg:col-start-5  md:col-span-6 md:col-start-4 sm:col-span-8 sm:col-start-3 ">
                    <div className='py-5' >
                        <h1 className='text-3xl text-center'>Updation Form</h1>
                        <form action="#" className='mt-5' onSubmit={updateuserform}  >
                            <div className='mt-3'>
                                <label htmlFor="user_email" className='block mb-2 text-2xl font-medium'>E-mail</label>
                                <input className='w-full p-3 text-white rounded-3xl ps-2 bg-gray-800 focus:ring-gray-400 border border-gray-600' type="email" placeholder=" Enter Employee's E-mail " id="user_email"
                                    onChange={(event) => {
                                        setData({
                                            ...data,
                                            email: event.target.value,
                                        })
                                    }}
                                    value={data.email}
                                />
                            </div>
                            <div className='mt-3'>
                                <label htmlFor="user_name" className='block mb-2 text-2xl font-medium'>Name</label>
                                <input className='w-full p-3  text-white rounded-3xl ps-2 bg-gray-800 focus:ring-gray-400 border border-gray-600' type="text" placeholder=" Enter Employee's Name " id="user_name"
                                    onChange={(event) => {
                                        setData({
                                            ...data,
                                            name: event.target.value,
                                        })
                                    }}
                                    value={data.name}
                                />
                            </div>
                            <div className='mt-3'>
                                <label htmlFor="user_joiningdate" className='block mb-2 text-2xl font-medium'>Joining Date</label>
                                <input className='w-full p-3  text-white rounded-3xl ps-2 bg-gray-800 focus:ring-gray-400 border border-gray-600' type="text" placeholder=" Enter Employee's Joining Date " id="user_joiningdate"
                                    onChange={(event) => {
                                        setData({
                                            ...data,
                                            joiningdate: event.target.value,
                                        })
                                    }}
                                    value={data.joiningdate}
                                />
                            </div>
                            <div className='mt-3'>
                                <label htmlFor="user_role" className='block mb-2 text-2xl font-medium'>Role</label>
                                <input className='w-full p-3  text-white rounded-3xl ps-2 bg-gray-800 focus:ring-gray-400 border border-gray-600' type="text" placeholder=" Enter Employee's Role " id="user_role"
                                    onChange={(event) => {
                                        setData({
                                            ...data,
                                            role: event.target.value,
                                        })
                                    }}
                                    value={data.role}
                                />
                            </div>
                            <div className='mt-4 flex justify-center'>
                                <button type='submit' className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' >Update Employee </button>
                                <button type='button' className='text-white bg-gray-500 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
                                    onClick={(event) => {
                                        setData({
                                            email: "",
                                            name: "",
                                            joiningdate: "",
                                            role:"",
                                        })
                                    }}
                                    value={data.status}
                                >Reset</button>
                            </div>
                            {JSON.stringify(data)};
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateUser