import React,{useState} from "react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import toast from "react-hot-toast"
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Signup({ loginState, setLoginState }) {

    const [email,setEmail] = useState("");
    const [name, setName] = useState("");
    const [password,setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const {setUser,setToken} = useAuth();

  const handleGoogleSignup = async () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/users/google`;
  };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        const  response  = await api.post("/users/signup", {
          name,
          email,
          password,
        });
        const data = response.data;
        const token = data.token;
        setUser(data.newUser);
        setToken(data.token);
        localStorage.setItem("user", JSON.stringify(data.newUser));
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-200">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Create Account
        </h2>

        {/* OAuth Signup */}
        <div className="space-y-3 mb-6">
          <button
            onClick={handleGoogleSignup}
            className="w-full flex items-center justify-center gap-3 border py-2 rounded-lg hover:bg-gray-100 transition"
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

        {/* Email Signup */}
        <form className="space-y-4" onSubmit={(e)=>handleSubmit(e)}>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-black"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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
            Create Account
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-4">
          Already have an account?{" "}
          <span
            className="text-black cursor-pointer font-medium"
            onClick={() => setLoginState(!loginState)}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
