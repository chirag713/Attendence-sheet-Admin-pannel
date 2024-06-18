"use client";

import React, { useState, useEffect } from 'react';
import Header from '../components/header';
import { useRouter } from 'next/navigation';
import { Addtask, gettaskofuser } from '../services/taskservice';
import { toast } from 'react-toastify';
import ProfileCard from '../components/profilecard';
import TodaysAttendence from "../components/Today'sAttendence";

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
    <div className=' color pb-2'>
      <Header />
      {/* <div className=' sm:grid sm:grid-cols-12 font-bold text-2xl  '>
        <div className="lg:col-span-6 lg:col-start-4  md:col-span-8 md:col-start-3 sm:col-span-10 sm:col-start-2  ">
          <h1 className='m-2'>Name: {user?.name || "No user found"}</h1>
          <h1 className='m-2'>Role: {user?.role || "Add your role"}</h1>
          <h1 className='m-2'>Joining Date: {user?.joiningdate || "Add your Joining date"}</h1>
          <h1 className='m-2'>Unique ID: {user?._id}</h1>
          
          
        </div>
      </div> */}
      <ProfileCard />


      <div className="flex justify-center flex-col">
        <div className="flex justify-center ">
          <button className='bg-green-600 ml-2 py-2 my-2 px-3 rounded-lg hover:bg-green-800 ' onClick={updateuser}>
            Update Details of {user?.name}
          </button>
        </div>

        <div className="flex justify-center ">
          <button className='bg-green-600 mr-2 py-2 px-3 rounded-lg hover:bg-green-800 ml-2' onClick={toggleInputField}>
            Mark Today's Absent
          </button>
        </div>
      </div>
      <div >
        {showInput && (
          <div className='m-2 flex justify-center l'>
            <input
              type="date"
              value={date}
              onChange={handleDateChange}
              className='py-2 px-3 rounded-lg m-2'
            />
            <div className='flex justify-center'>
              <button className='bg-red-600 mt-3 py-2 px-3 h-9 rounded-lg hover:bg-red-800 ml-2' onClick={handleMarkAbsent}>
                Confirm
              </button>
            </div>
          </div>
        )}
      </div>

      <br /><br />

      <TodaysAttendence />
    </div>
  );
};

export default Page;
