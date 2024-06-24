
import { Task } from "@/app/modals/task";


import { ConnectDb } from "@/app/helper/db";
// import { Task } from "@/app/modals/task";
import { NextResponse } from "next/server";

ConnectDb();

export async function GET(request , {params} ) {
    try {
        // Get today's date in the format dd/mm/yyyy

        const [day, month, year] = params.today.split('-');
        const todayFormatted = `${day}/${month}/${year}`;

        console.log(todayFormatted);

        console.log(params.today);

        // Find tasks where addeddate is today's date
        const tasks = await Task.find({ addeddate: todayFormatted });

        return NextResponse.json(tasks);
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Failed to fetch tasks",
            status: false
        });
    }
}