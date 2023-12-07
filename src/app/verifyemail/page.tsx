"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, {useState,useEffect } from "react";

export default function VerifyEmail() {

    const router = useRouter()
    const [token,setToken] = useState<String>('');
    const [loading,setloading] = useState<Boolean>(false);

    useEffect(() => {
        const url = window.location.search.split("token=")[1];
        setToken(url);

    },[])

    const handleVerify = async () => {
        try {
            setloading(true)
            const respose = await axios.post('/api/users/verifyemail',{token});
            if (respose.data.success) {
                setloading(false)
                router.push('/login')
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <div className="signup_wrapper">
            {!loading ? 
                <button className="btn btn-info" onClick={handleVerify}>Verify Your Email</button> : 
                (<div className="loading_wrapper"><span className="loader_1"></span></div>)
            }
        </div>
    )
}