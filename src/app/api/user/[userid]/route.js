import { ConnectDb } from "@/app/helper/db";
import { User } from "@/app/modals/user";
import { NextResponse } from "next/server";

ConnectDb();

export async function PUT(request, { params }) {
    try {
        const { userid } = params;
        const { email, name, joiningdate, role } = await request.json();

        // Find the user by ID
        let user = await User.findById(userid);

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found",
            }, {
                status: 404, // Not Found
            });
        }

        // Update user properties
        user.name = name;
        user.email = email;
        user.joiningdate = joiningdate;
        user.role = role;

        // Save the updated user to the database
        const updatedUser = await user.save();

        return NextResponse.json(updatedUser);

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Error in updating",
        }, {
            status: 500, // Internal Server Error
        });
    }
}

export async function DELETE(request, { params }) {
    try {
        const { userid } = params;

        // Find the user by ID and delete
        const user = await User.findByIdAndDelete(userid);

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found",
            }, {
                status: 404, // Not Found
            });
        }

        return NextResponse.json({
            success: true,
            message: "User deleted successfully",
        });

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Error in deleting",
        }, {
            status: 500, // Internal Server Error
        });
    }
}
