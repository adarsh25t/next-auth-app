"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast/headless";

export default function LoginPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading,setloading] = useState<Boolean>(false);

  const handleSubmit = async () => {
    try {
        setloading(true)
        const response = await axios.post("/api/users/login", user);
        if (response.data.success) {
            router.push("/profile");
        }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
        setloading(false)
    }
  };

  return (
    <div className="signup_wrapper">
      <div className="card p-3">
        <h4 className="card-title">Sign Up</h4>
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

        {!loading ? (<button onClick={handleSubmit} className="btn btn-block button-6">
          Login
        </button>) : (<div className="loading_wrapper"><span className="loader_1"></span></div>)}
        <Link href={"/signup"} className="link">Create new account</Link>
        <Link href={"/forgotPassword"} className="link">Forgot password</Link>
      </div>
    </div>
  );
}
