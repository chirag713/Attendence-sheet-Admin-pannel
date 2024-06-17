

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