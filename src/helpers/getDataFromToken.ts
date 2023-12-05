import { NextRequest, NextResponse } from "next/server"
import jwt from 'jsonwebtoken'



export async function getDataFromToken(request: NextRequest){
    try {

        const token = request.cookies.get('token')?.value || "";
        const decodedToken = await jwt.verify(token,'hello');

        return decodedToken;
        
    } catch (error: any) {
        return NextResponse.json({error: error.message})
    }
}