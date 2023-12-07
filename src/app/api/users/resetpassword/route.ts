import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token,password } = reqBody as {token: string, password: string | number} 
        
        let user = await User.findOne({forgotPasswordToken: token, forgotPasswordTokenExpiry: { $gt: Date.now() }})

        if (!user) {
            return NextResponse.json({
                message: "Your token is not valid",
                success: false
            })
        }


        // user.forgotPasswordToken = undefined
        // user.forgotPasswordTokenExpiry = undefined

        // await user.save()

        return NextResponse.json({
            message: "Successfully update your password",
            success: true
        });
        
    } catch (error: any) {
        return NextResponse.json({error: error.message},{status: 500})
    }
}
