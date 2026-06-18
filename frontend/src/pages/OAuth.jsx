import { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import api from "../api/axios";

export default  function OAuthSuccess () {
  const [ searchParams ] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const func =async ()=>{
      const token = searchParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
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
      navigate("/dashboard");
    } else {
      navigate("/auth");
    }
    }
    func();
  }, []);

  return <div>Logging in...</div>;
}
