"use client"
import React, { useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { updatetasklike } from '../services/taskservice';
import { toast } from 'react-toastify';

const Taskcomponent = ({ task }) => {

    const [editing, setEditing] = useState(false);

    function showedit(taskid) {
        setEditing(!editing);
    }

    const [titl, settitle] = useState(task.task);
    const [conten, setcontent] = useState(task.details);
    const [taskscore, settaskscore] = useState(task.score);


    async function updatequestion() {
        settaskscore(tas.score);
        await updatetasklike(task._id , tas);
        setEditing(false);
        toast.success("Task updated", {
            position: "top-center",
        })

        console.log("helo");
    }

    const [tas, setTas] = useState({
        score:task.score
    });
    return (
        <div className={`  my-3 shadow-lg mb-1 rounded hoverable-div `} style={{ border: '1px solid black' }} >
            <div className='p-3  '>
                <div className="flex justify-between">
                    <h1 className='text-2xl font-semibold '> Date : {task.addeddate.substring(0, 10)}</h1>
                    <div className="flex">
                        <span className=' shadow-lg h-10  cursor-pointer rounded-full p-3 hover:bg-blue-400 mr-1 ' onClick={() => showedit(task._id)} ><MdEdit /></span>    
                    </div>
                </div>
                <div className="flex justify-between mt-3">
                    <p className='font-bold'>Task : {titl}</p>

                </div>
                <div className="flex justify-between mt-3">
                    <p className='text-left font-semibold mb-2'>  Detail : <span>{conten}</span></p>
                   
                </div>
                <p className='text-right font-bold mb-2 pl-2'>Performance : <span>{taskscore}</span></p>
            </div>

            {editing ?
                <div>
                    <form action="#" className='pb-5 mx-1' >
                        <div className="mt-4">
                            <label htmlFor="task_task" className='block mb-2 text-2xl'>Performance</label>
                            <input type="text"
                                className='w-full p-2  rounded-full text-white bg-gray-800 focus:ring-gray-400 border border-gray-600'
                                id="task_task"
                                name="task_task"
                                placeholder='Give score'
                                onChange={(event) => {
                                    setTas({
                                        score: event.target.value,
                                    })
                                }}
                                value={tas.score}
                            />
                        </div>
                        <div className='mt-4 flex justify-center'>
                            <button type='button' className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' onClick={() => updatequestion(task._id, tas)} > Give score  </button>
                        </div>

                        {/* {JSON.stringify(tas)} */}
                    </form>
                </div>
                : ""}
        </div>
    )
}

export default Taskcomponent
