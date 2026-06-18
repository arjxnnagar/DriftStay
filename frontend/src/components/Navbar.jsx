import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import api from "../api/axios.js";


export default function Navbar() {
    const navigate = useNavigate();
    const {user,token} = useAuth();

    const becomeHost = async  ()=>{
      const confirmation = confirm("Are you sure you want to become a host?");
      if(confirmation){
        const response = await api.post("/users/makehost");
        localStorage.setItem("user",JSON.stringify(response.data.user));
        navigate("/host");
      }
    }


  return (
    <header className="w-full bg-white border-b">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-xl font-semibold tracking-tight cursor-pointer" onClick={()=>navigate("/")}>DriftStay</h1>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center space-x-6 text-sm text-gray-600">
          <a href="/" className="hover:text-black">
            Home
          </a>
          <a href="/explore" className="hover:text-black">
            Explore
          </a>
          <a href="/about" className="hover:text-black">
            About
          </a>
          <a
            className="hover:text-black cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </a>
        </nav>

        {/* Auth Buttons */}

        {user && token ? (
          <div>
            {user.role == "HOST" ? (
              <button className="bg-black text-white text-sm px-4 py-2 rounded-full hover:opacity-90 cursor-pointer"
              onClick={()=>navigate("/host")}>
                Host Dashboard
              </button>
            ) : (
              <button
                className="bg-black text-white text-sm px-4 py-2 rounded-full hover:opacity-90 cursor-pointer"
                onClick={() => becomeHost()}
              >
                Become a host
              </button>
            )}
          </div>
        ) : (
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate("/auth")}
              className="text-sm text-gray-600 hover:text-black cursor-pointer"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/auth")}
              className="bg-black text-white text-sm px-4 py-2 rounded-full hover:opacity-90 cursor-pointer"
            >
              Signup
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
