"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";



export default function ForgotPassword() {

    const router = useRouter()
    const [email,setEmail] = useState('');
    const [loading,setloading] = useState<Boolean>(false);
    const [message,setMessage] = useState<String>('')

    const handleSubmit = async () => {
        try {
            setloading(true)
            const response = await axios.post('/api/users/forgotpassword',{email})
            console.log(response);
            
            if (response.data.success) {
                setloading(false)
                setMessage("update password token send to your email")
            }
            
            
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <div className="signup_wrapper">
            <div className="card p-3">
            <div className="row">
                <div className="col-sm-12">
                    <div className="form-group">
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            placeholder="Enter your email"
                        />
                    </div>
                </div>
                </div>
                {!loading ? (<button className="btn btn-block button-6" onClick={handleSubmit} disabled={message !== '' ? true : false}>{message === '' ? "Submit" : message}
                </button>) : (<div className="loading_wrapper"><span className="loader_1"></span></div>)}
            </div>
            
        </div>
    )
}