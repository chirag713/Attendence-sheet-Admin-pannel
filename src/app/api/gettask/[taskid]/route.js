


import { NextResponse } from "next/server";
import { ConnectDb } from "@/app/helper/db";
import { Task } from "@/app/modals/task";

ConnectDb();


//Get user

export async function GET(request, { params }) {
    const { taskid } = params;
    // console.log(userid);

    try {
        
        const tasks=await Task.findById(taskid)

        return NextResponse.json(tasks);
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Failed to get tasks",
            status: false
        })
    }
}


