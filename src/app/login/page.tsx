"use client"
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast/headless";


export default function LoginPage() {

    const router = useRouter()
    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const handleSubmit = async () => {
        try {

            const response = await axios.post("/api/users/login",user);
            console.log(response.data);
            
            if (response.data.success) {
                router.push('/profile')
            }
            
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    return (
        <div className="signup_wrapper">
            <h1>Login page</h1>
            <label htmlFor="email">Email</label>
            <input
                type="text"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
            />

            <label htmlFor="email">Password</label>
            <input
                type="text"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <button onClick={handleSubmit}>Login</button>
            <Link href={'/signup'}>Create new account</Link>
        </div>
    )
}