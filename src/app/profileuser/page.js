"use client";

import React, { useState, useEffect } from 'react';
import Header from '../components/header';
import { useRouter } from 'next/navigation';
import { Addtask, gettaskofuser } from '../services/taskservice';
import { toast } from 'react-toastify';
import Taskcomponent from '../components/Taskcomponent';

const Page = () => {
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

      setTasks([...result]);

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

  const updateuser = () => {
    router.push("/updateuserpage");
  };

  const toggleInputField = () => {
    setShowInput(!showInput);
  };

  const handleDateChange = (event) => {

    setDate(event.target.value);
  };
  const handleMarkAbsent = async () => {



    const taskdata = {
      userId: user?._id,
      addeddate: date,
    }

    try {
      const result = await Addtask(taskdata);
      toast.success("Employee Marked as absent successfully !!..", {
        position: "top-center"
      });


      gettask();

      setShowInput(!showInput);



    } catch (error) {
      toast.error("Something went wrong !!..", {
        position: "top-center"
      });
    }

  };

  return (
    <div className='bg-gray-300'>
      <Header />
      <div className=' sm:grid sm:grid-cols-12 font-bold text-2xl  '>
        <div className="lg:col-span-6 lg:col-start-4  md:col-span-8 md:col-start-3 sm:col-span-10 sm:col-start-2  ">
          <h1 className='m-2'>Name: {user?.name || "No user found"}</h1>
          <h1 className='m-2'>Role: {user?.role || "Add your role"}</h1>
          <h1 className='m-2'>Joining Date: {user?.joiningdate || "Add your Joining date"}</h1>
          <h1 className='m-2'>Unique ID: {user?._id}</h1>
          <button className='bg-green-600 py-2 px-3 rounded-lg hover:bg-green-800 m-2' onClick={updateuser}>
            Update Details of {user?.name}
          </button>
          <br />
          <button className='bg-green-600 py-2 px-3 rounded-lg hover:bg-green-800 ml-2' onClick={toggleInputField}>
            Mark Today's Absent
          </button>
          {showInput && (
            <div className='m-2'>
              <input
                type="date"
                value={date}
                onChange={handleDateChange}
                className='py-2 px-3 rounded-lg m-2'
              />
              <button className='bg-red-600 py-2 px-3 rounded-lg hover:bg-red-800 ml-2' onClick={handleMarkAbsent}>
                Confirm
              </button>
            </div>
          )}
        </div>
      </div>
      <br /><br />
      <div className=' m-2 flex justify-center '>
        <div className='py-5 ali  min-w-[70vw] max-w-[800px] px-10  sm:px-5 ' >
          <h1 className='text-3xl mb-3 font-bold'>{user?.name}'s Sheet  ({tasks.length})</h1>
          {tasks.map((task) => (
            <Taskcomponent task={task} key={task._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
