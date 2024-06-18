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





    return (
        <div>

            <div className=' min-h-screen color  '>
                <Header />

                <div className=' m-2 flex justify-center '>
                    <div className='py-5 ali  min-w-[70vw] max-w-[800px] sm:px-5 ' >
                        <h1 className='text-3xl mb-3 font-bold'>{user?.name}'s Sheet  ({tasks.length})</h1>
                        {tasks.map((task) => (
                            <Taskcomponent task={task} key={task._id} />
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default page
