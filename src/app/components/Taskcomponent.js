import React, { useState } from 'react';
import { MdEdit } from "react-icons/md";
import { updatetasklike } from '../services/taskservice';
import { toast } from 'react-toastify';

const Taskcomponent = ({ task }) => {
    const [editing, setEditing] = useState(false);
    const [tas, setTas] = useState({
        score: task.score
    });

    async function updatequestion() {
        await updatetasklike(task._id, tas);
        setEditing(false);
        toast.success("Task updated", {
            position: "top-center",
        });
    }

    return (
        <div className="my-3 shadow-lg mb-1 rounded hoverable-div border border-gray-300">
            <div className="p-3">
                <div className="flex justify-between">
                    <h1 className="text-2xl font-semibold">Date: {task.addeddate}</h1>
                    <div className="flex">
                        <span className="shadow-lg h-10 cursor-pointer rounded-full p-3 hover:bg-blue-400 mr-1" onClick={() => setEditing(!editing)}><MdEdit /></span>
                    </div>
                </div>
                <div className="flex justify-between mt-3">
                    <p className="font-bold">Task: {task.task}</p>
                </div>
                <div className="flex justify-between mt-3">
                    <p className="text-left font-semibold mb-2">Detail: <span>{task.details}</span></p>
                </div>
                <p className="text-right font-bold mb-2 pl-2">Performance: <span>{tas.score}</span></p>
            </div>

            {editing &&
                <div className="p-3">
                    <label htmlFor="task_task" className="block mb-2 text-lg font-semibold">Performance</label>
                    <input
                        type="text"
                        className="w-full p-3 rounded-lg text-gray-800 bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent border border-gray-300"
                        id="task_task"
                        name="task_task"
                        placeholder="Enter score"
                        onChange={(event) => setTas({ score: event.target.value })}
                        value={tas.score}
                    />
                    <div className="mt-3 flex justify-center">
                        <button
                            type="button"
                            className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-5 py-2"
                            onClick={updatequestion}
                        >
                            Update Score
                        </button>
                    </div>
                </div>
            }
        </div>
    );
}

export default Taskcomponent;
