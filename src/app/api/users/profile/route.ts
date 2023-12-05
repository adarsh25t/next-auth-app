import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
    try {
        
        const userToken = await getDataFromToken(request);

        return NextResponse.json({
            message:"Successfully Get Profile",
            success: true,
            userid: userToken.id
        })

    } catch (error: any) {
        return NextResponse.json({error: error.message})
    }
}

