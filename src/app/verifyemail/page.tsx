"use client";
import axios from "axios";
import React, {useState,useEffect } from "react";

export default function verifyEmail() {

    const [token,setToken] = useState<String>('');

    useEffect(() => {
        const url = window.location.search.split("token=")[1];
        setToken(url);

    },[])

    const handleVerify = async () => {
        try {
            
        console.log(token);
         const respose = await axios.post('/api/users/verifyemail',{token});
         console.log(respose);
         
            
        } catch (error) {
            
        }
    }

    return(
        <div className="signup_wrapper">
            <button className="btn btn-info" onClick={handleVerify}>Verify Your Email</button>
        </div>
    )
}