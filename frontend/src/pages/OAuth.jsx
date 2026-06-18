import { useEffect } from "react";
import { useActionData, useNavigate, useParams, useSearchParams } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default  function OAuthSuccess () {
  const [ searchParams ] = useSearchParams();
  const navigate = useNavigate();
  const {setUser,setToken} = useAuth();

  useEffect(() => {
    const func =async ()=>{
      const token = searchParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
      setToken(token);
    } else {
      navigate("/auth");
    }

    const response = await api.get("/users/me",{
    headers: {
      Authorization: `Bearer ${token}`,
    }}
);
    const data = response.data;
     if (token) {

      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      navigate("/dashboard");
    } else {
      navigate("/auth");
    }
    }
    func();
  }, []);

  return <div>Logging in...</div>;
}
