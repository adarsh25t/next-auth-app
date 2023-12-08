import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from 'bcryptjs';
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token,password } = reqBody as {token: string, password: string} 
        
        let user = await User.findOne({forgotPasswordToken: token, forgotPasswordTokenExpiry: { $gt: Date.now() }})

        if (!user) {
            return NextResponse.json({
                message: "Your token is not valid",
                success: false
            })
        }

        // HASH PASSWORD
        const salt = await bcryptjs.genSalt(10);
        const hashedpassword = await bcryptjs.hash(password,salt);

        user.forgotPasswordToken = undefined
        user.forgotPasswordTokenExpiry = undefined
        user.password = hashedpassword;
        await user.save()
        
        return NextResponse.json({
            message: "Successfully update your password",
            success: true
        });
        
    } catch (error: any) {
        return NextResponse.json({error: error.message},{status: 500})
    }
}
