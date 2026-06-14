import React from "react";
import { FaGoogle, FaGithub } from "react-icons/fa";

export default function Login({ loginState, setLoginState }) {
  const handleGoogleLogin = () => {

  };

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
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-black"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-black"
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
