// import {connect} from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
// import User from "../../models/userModel";
import { connectDatabase, User } from '../../lib/databaseConnections';

export async function POST(request: NextRequest){
    try {
        // await connectDatabase();
        const reqBody = await request.json()
        const {userId, password, username } = reqBody

        console.log(reqBody);

        // check if user already exists
        const user = await User.findOne({ where: { userId } })

        if(user){
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }

        //hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = await User.create({
            username,
            userId,
            password: hashedPassword,
          });

        // return res.status(201).json({ message: 'User registration successful', user: newUser });

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            newUser
        })
        
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}