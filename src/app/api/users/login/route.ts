import { connect } from "@/dbConfig/dbConfig";
import User from '@/models/userModel'
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken'



connect();

export async function POST(request: NextRequest) {
    try {

        const regBody = await request.json();
        const {email,password} = regBody as { email: string, password: string};
        
        // USER IS EXIST OR NOT
        const user = await User.findOne({email});
        if (!user) {
            return NextResponse.json({error: "user is not there!"})
        }

        // COMPARE THE PASSWORDS
        const passwordMatch = await bcryptjs.compare(password, user.password);
        
        if (!passwordMatch) {
            return NextResponse.json({error: "password is not there!"})
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token = await jwt.sign(tokenData, "hello", { expiresIn: "1d" });


        let response =  NextResponse.json({
            message:"Successfully Login",
            success: true,
            user
        })

        response.cookies.set("token", token, {httpOnly: true})
        return response;

    } catch (error: any) {
        return NextResponse.json({error: error.message},{status: 500})
    }
}