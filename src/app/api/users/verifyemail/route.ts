import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token } = reqBody as {token: string} 
        
        console.log(token);
        
        let user = await User.findOne({verifyToken: token, verifyTokenExpiry: { $lt: Date.now() }})

        console.log("user------",user);

        if (!user) {
            return NextResponse.json({
                message: "Your token is not valid",
                success: false
            })
        }

        
        

        return NextResponse.json({
            message: "Successfully verify your email",
            success: true
        });
        
    } catch (error: any) {
        return NextResponse.json({error: error.message},{status: 500})
    }
}
