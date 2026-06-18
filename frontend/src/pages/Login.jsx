import React, { useEffect, useState } from "react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import api from "../api/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login({ loginState, setLoginState }) {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {user,token,setUser,setToken} = useAuth();

  const handleGoogleLogin = async () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/users/google`;
  };

  useEffect(()=>{
    if(user && token){
      navigate("/dashboard");
    }
  },[])


  const handleSubmit = async (e)=>{
    e.preventDefault();
    setLoading(true);

    try {
        const  response  = await api.post("/users/login",{
          email,
          password,
        });
        const data = response.data;
        const token = data.token;
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } catch (err) {
          toast.error(err.message);
      } finally {
          setLoading(false);
      }
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-200">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Welcome Back
        </h2>

        {/* OAuth Buttons */}
        <div className="space-y-3 mb-6">
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 border py-2 rounded-lg hover:bg-gray-100"
          >
            <FaGoogle />
            Continue with Google
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center my-4">
          <hr className="grow border-gray-300" />
          <span className="px-3 text-gray-500 text-sm">OR</span>
          <hr className="grow border-gray-300" />
        </div>

        {/* Traditional Login */}
        <form className="space-y-4" onSubmit={(e)=>handleSubmit(e)}>
          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg hover:opacity-90"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-4">
          Don't have an account?{" "}
          <span
            className="text-black cursor-pointer"
            onClick={() => setLoginState(!loginState)}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}
