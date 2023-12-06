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
    const [user,setUser] = useState<User>({ email: '', username: '' });
    const [loading,setLoading] = useState<Boolean>(true)

    useEffect(() => {
        getProfile()
    },[])

    const getProfile = async () => {
        try {
            const respose = await axios.post('/api/users/userprofile',params);
            setUser(respose.data.data)
        } catch (error) {
        }finally {
            setLoading(false);
        }
    }

    const logout = async () => {

        try {
            const respose = await axios.get('/api/users/logout');
            if (respose.data.success) {
                router.push('/login')
            }
            
        } catch (error: any) {
            console.log(error);
        } 
    }

    return(
        <div className="signup_wrapper">
            {!loading ?(<div>
                <h2>Profile</h2>
                <h3>username: {user.username}</h3>
                <h3>email: {user.email}</h3>
            </div>) : (<span className="loader"></span>)
            }

            {!loading && <button onClick={logout} className="button-39">Logout</button>}
        </div>
    )
}