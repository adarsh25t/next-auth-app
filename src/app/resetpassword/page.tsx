"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ResetPassword() {

    const router = useRouter()
    const [password, setPassword] = useState<string | number>("")
    const [confirmPassword,SetConfirmPassword] = useState<string>("");
    const [loading,setloading] = useState<Boolean>(false);
    const [token,setToken] = useState<string>("")

    useEffect(() => {   
        const url = window.location.search.split("token=")[1];
        setToken(url);

    },[]) 

    const handleSubmit = async () => {
        try {
            setloading(true)
            const response = await axios.post('/api/users/resetpassword',{token,password})
            
            if (response.data.success) {
                setloading(false)
                router.push('/login')
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
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-control"
                                placeholder="Enter new paswword"
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="form-group">
                            <input
                                type="text"
                                value={confirmPassword}
                                onChange={(e) => SetConfirmPassword(e.target.value)}
                                className="form-control"
                                placeholder="Enter confirm password"
                            />
                        </div>
                    </div>
                </div>
                {!loading ? (<button onClick={handleSubmit} className="btn btn-block button-6">Submit
                </button>) : (<div className="loading_wrapper"><span className="loader_1"></span></div>)}
            </div>
            
        </div>
    )
}

