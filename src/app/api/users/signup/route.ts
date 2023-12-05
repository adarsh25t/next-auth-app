import { connect } from "@/dbConfig/dbConfig";
import User from '@/models/userModel'
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';


connect();

export async function POST(request: NextRequest) {
    try {

        const reqBody = await request.json();
        const { username, email, password } = reqBody as { username: string, email: string, password: string };

        // CHECK USER ALREADY EXISTS
        const user = await User.findOne({email});
        console.log("user is there",user);
        if (user) {
            return NextResponse.json({error: "user already exist"},{status: 400})
        }
    
        // HASH PASSWORD
        const salt = await bcryptjs.genSalt(10);
        const hashedpassword = await bcryptjs.hash(password,salt);
        
        // CREATE NEW USER
        const newUser = new User({
            username,
            email,
            password:hashedpassword
        });

        const savedUser = await newUser.save();
        
        return NextResponse.json({
            message:"Successfylly create new user",
            success: true,
            savedUser
        })
        
    } catch (error: any) {
        return NextResponse.json({error: error.message},{status: 500})
    }
}