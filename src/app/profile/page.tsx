"use client"
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast/headless";


export default function ProfilePage() {

    const router = useRouter();
    const [userid, setUserid] = useState(null)

    useEffect(() => {
        getUserProfile()
    },[])

    const getUserProfile = async () => {
        try {

            const response = await axios.get('/api/users/profile');
            setUserid(response.data.userid)
            
        } catch (error: any) {
            toast.error(error.message)
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
            <a href={`/profile/${userid}`} className="button-60">View Profile</a>
{/*             
            <button onClick={logout} className="button-39">Logout</button> */}
        </div>
    )
}