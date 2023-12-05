"use client"
import axios from "axios"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface User {
    username: string,
    email: string
}

export default function UserProfile({params}: any) {

    const router = useRouter()
    const [user,setUser] = useState<User>({ email: '', username: '' })

    useEffect(() => {
        getProfile()
    },[])

    const getProfile = async () => {
        try {
            
            const respose = await axios.post('/api/users/userprofile',params);
            setUser(respose.data.data)

        } catch (error) {
            
        }
    }

    const logout = async () => {

        
    
        try {
    
            const respose = await axios.get('/api/users/logout');
            console.log(respose);
            if (respose.data.success) {
                router.push('/login')
            }
            
        } catch (error: any) {
            console.log(error);
            
        }
    }

    return(
        <div className="signup_wrapper">
            <h1>Profile</h1>
            <h1>username: {user.username}</h1>
            <h1>email: {user.email}</h1>

            <button onClick={logout}>Logout</button>
        </div>
    )
}