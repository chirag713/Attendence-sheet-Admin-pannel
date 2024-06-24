

import { ConnectDb } from "@/app/helper/db";
import { Task } from "@/app/modals/task";
import { NextResponse } from "next/server";

ConnectDb();

export async function POST(request) {
    // fetch user detail from request

    const { userId, addeddate } = await request.json();


    console.log(userId, addeddate);

    let task="...";
    let details="..."
    let score="Absent"

    // create user object with user model

    const newtask = new Task({
        task,
        details,
        userId,
        addeddate,
        score
    })

    try {

        // newuser.password = await bcrypt.hash(newuser.password, parseInt(process.env.BCRYPT_SALT))

        // console.log(newuser);


        // save the object to database 
        const creatednewtask = await newtask.save();

        const response = NextResponse.json(
            newtask,
            {
                status: 201,
            }
        )

        console.log("Task succesfully saved");

        return response;
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Failed to save task",
            status: false
        }, {
            status: 500,
        })
    }
}


export async function GET(request) {
    let tasks = [];
    try {
        // Get today's date in the format dd/mm/yyyy
        const today = new Date().toLocaleDateString('en-GB');
        console.log(today);

        // Find tasks where addedate is today's date
        tasks = await Task.find({ addeddate: today });

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Failed to fetch tasks",
            status: false
        });
    }

    return NextResponse.json(tasks);
}
