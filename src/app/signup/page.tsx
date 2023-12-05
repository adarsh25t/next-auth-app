"use client"
import Link from "next/link"
import React, { use, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast"



export default function SignUp() {
    
    const router = useRouter()
    const [user,setUser] = useState({
        username:"",
        email:"",
        password:""
    });

    const handleSubmit = async () => {
       try {
            const response = await axios.post("/api/users/signup",user);
            if (response.data.success) {
                router.push('/login')
            }
            
       } catch (error: any) {
            toast.error(error.message)
       }
    }


    return(
        <div className="signup_wrapper">
            <h1>signup</h1>
            <label htmlFor="username">User Name</label>
            <input 
                type="text" 
                value={user.username}
                onChange={(e) => setUser({...user,username: e.target.value})}
            />

            <label htmlFor="email">Email</label>
            <input 
                type="text" 
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
            />

            <label htmlFor="password">Password</label>
            <input 
                type="text" 
                value={user.password}
                onChange={(e) => setUser({...user,password:e.target.value})}
            />

            <button onClick={handleSubmit}>Signup</button>
            <Link href={'/login'}>already have an account?</Link>
        </div>
    )
}