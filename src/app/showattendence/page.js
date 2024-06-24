"use client";
import React, { useEffect, useState } from 'react'
import Header from '../components/header'
import Taskcomponent from '../components/Taskcomponent'
import { toast } from 'react-toastify';
import { gettaskofuser } from '../services/taskservice';
import { useRouter } from 'next/navigation';

const page = () => {


    const router = useRouter();
    const [user, setUser] = useState(null);
    const [showInput, setShowInput] = useState(false);
    const [date, setDate] = useState('');
    const [tasks, setTasks] = useState([]);

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



    const gettask = async () => {

        try {

            const result = await gettaskofuser(user._id);

            setTasks([...result.reverse()]);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {

        //fetch attendence of user

        if (user) {
            gettask();
        }

    }, [user])


    const showthistask=(taskid)=>{
        router.push("/showtask/"+taskid);
    }





    return (
        <div>

            <div className=' min-h-screen color  '>
                <Header />

                <div className=' m-2 flex justify-center '>
                    <div className='py-5 ali  min-w-[70vw] max-w-[800px] sm:px-5 ' >
                        <h1 className='text-3xl mb-3 font-bold'>{user?.name}'s Sheet  ({tasks.length})</h1>
                        {tasks.map((task) => (
                            <div onClick={() => showthistask(task._id)} key={task._id} className='bg-white p-4 mb-4 hoverable-div rounded-lg shadow-md border border-gray-300'>
                                <div className="flex justify-between  items-center">
                                    <h2 className='text-xl font-semibold'>Date: {task.addeddate.substring(0, 10)}</h2>
                                    <p className='text-right font-bold'><span>
                                        {
                                            task.score === "Absent" ? "Absent" : "Present"
                                        }
                                    </span></p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default page
