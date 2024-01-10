// import {connect} from "@/dbConfig/dbConfig";
// import User from "../../models/userModel";
// import { connectDatabase, User } from '../../lib/databaseConnections';
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from '../../lib/pool';



//through connection pool 
interface User {
    userId: string;
    password: string;
  }
  
  export async function POST(req: NextRequest, res: NextResponse) {
    if (req.method !== 'POST') {
      return NextResponse.json({ message: 'Methods Not Allowed' }, {status:405});
    }
  
    const reqBody = await req.json()
    const {userId, password} = reqBody;
    console.log(userId);

    try {
      const [userData] = await pool.query(
        'SELECT login_id, password FROM m_staff WHERE login_id = ?',
        [userId]
      ) as unknown as [User];
      
     //console.log(userData[0].login_id);
      if (!userData[0]) {
        // User not found
        return NextResponse.json({ message: 'Invalid username or password' }, {status : 401});
      }
  
      const user = userData[0];
      // Compare the entered password with the hashed password from the database
      const passwordMatch = await bcryptjs.compare(password, user.password);
  
      if (!passwordMatch) {
        // Passwords do not match
        return NextResponse.json({ message: 'Invalid username or password' }, {status :401});
      }
  
      // Passwords match, login successful
      return NextResponse.json({ message: 'Login successful',  }, {status :200});
    } catch (error) {
      console.error('Database Error:', error);
      return NextResponse.json({ message: 'Internal Server Error' }, {status :500});
    }
  }





//using My logic 
//export async function POST(request: NextRequest){
    // try {
    //     await connectDatabase();
    //     const reqBody = await request.json()
    //     const {userId, password} = reqBody;
    //     console.log(reqBody);

    //     //check if user exists
    //     const user = await User.findOne({ where: { userId } })
    //     if(!user){
    //         return NextResponse.json({error: "User does not exist"}, {status: 400})
    //     }
    //     console.log("user exists");
        
        
        //check if password is correct
        // const validPassword = await bcryptjs.compare(password, user.password)

        // if(!validPassword){
        //     return NextResponse.json({error: "Invalid password"}, {status: 400})
        // }
        // console.log(user);
        
        //create token data
        // const tokenData = {
        //     userId: user.userId
        // }
        //create token
    //     const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1h"})

    //     const response = NextResponse.json({
    //         message: "Login successful",
    //         success: true,
    //     })
    //     response.cookies.set("token", token, {
    //         httpOnly: true, 
            
    //     })
    //     return response;

    // } catch (error: any) {
    //     return NextResponse.json({error: error.message}, {status: 500})
    // }
//}