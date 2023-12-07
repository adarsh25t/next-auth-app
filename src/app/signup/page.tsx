"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignUp() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading,setloading] = useState<Boolean>(false);

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/api/users/signup", user);
      if (response.data.success) {
        router.push("/login");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="signup_wrapper">
      <div className="card p-3">
        <h4 className="card-title">Sign In</h4>
        <div className="row">
          <div className="col-sm-12">
            <div className="form-group">
              <input
                type="text"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                className="form-control"
                placeholder="User Name"
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12">
            <div className="form-group">
              <input
                type="text"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="form-control"
                placeholder="Email"
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12">
            <div className="form-group">
                <input
                    type="text"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    className="form-control"
                    placeholder="Password"
                />
            </div>
          </div>
        </div>

        {!loading ? (<button onClick={handleSubmit} className="btn btn-block button-6">Signup</button>) : 
        (<div className="loading_wrapper"><span className="loader_1"></span></div>)}
        <Link href={"/login"} className="link">already have an account?</Link>
      </div>
    </div>
  );
}
