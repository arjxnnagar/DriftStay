import React from "react";
import { useNavigate } from "react-router-dom";


export default function Navbar() {
    const navigate = useNavigate();
  return (
    <header className="w-full bg-white border-b">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-xl font-semibold tracking-tight">DriftStay</h1>

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
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate("/login")}
            className="text-sm text-gray-600 hover:text-black cursor-pointer"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/login")}
            className="bg-black text-white text-sm px-4 py-2 rounded-full hover:opacity-90 cursor-pointer"
          >
            Signup
          </button>
        </div>
      </div>
    </header>
  );
}
