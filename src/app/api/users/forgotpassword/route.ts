import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    try {

        const reqBody = await request.json();
        const { email } = reqBody as { email: String }

        let user = await User.findOne({email});

        if (!user) {
            return NextResponse.json({
                message: "User is not found!",
                success: false
            })
        }

        await sendEmail({email,emailType: "RESET",userId: String(user._id)})
        
        return NextResponse.json({
            message: "Successfylly send new password generating token",
            success: true
        })

        
    } catch (error: any) {
        return NextResponse.json({message: error.message},{status: 500})
    }
}