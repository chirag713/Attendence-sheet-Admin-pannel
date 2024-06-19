import { ConnectDb } from "@/app/helper/db";
import { User } from "@/app/modals/user";
import { NextResponse } from "next/server";


ConnectDb();

export async function PUT(request, { params }) {

    try {

        const { userid } = params;
        const { email , name , joiningdate , role } = await request.json();


        // Find the task by ID
        let taska = await User.findById(userid);

        if (!taska) {
            return NextResponse.json({
                success: false,
                message: "Task not found",
            }, {
                status: 404, // Not Found
            });
        }

        console.log(joiningdate);

        // Update task properties
        taska.name=name;
        taska.email=email;
        taska.joiningdate=joiningdate;
        taska.role=role

        // Save the updated task to the database

        console.log(taska);
        const updatedTask = await taska.save();

        return NextResponse.json(updatedTask);

    } catch (error) {
        console.log(error);
        return getresponsemessage("Error in updating !!..", 500, false);
    }
}