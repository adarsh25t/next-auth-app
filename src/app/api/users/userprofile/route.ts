import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    try {
        
        const reqBody = await request.json();
        const {id} = reqBody as {id: string}
        
        const user = await User.findById(id).select("-password")

        return NextResponse.json({
            message:"Successfully Get Profile",
            success: true,
            data: user
        })

    } catch (error: any) {
        return NextResponse.json({error: error.message})
    }
}