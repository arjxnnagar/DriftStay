import { useState } from "react"
import {Toaster} from "react-hot-toast"
import { Route,Routes } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Signup from "./pages/Signup.jsx";
import OAuthSuccess from "./pages/OAuth.jsx";
import Dashboard from "./pages/Dashboard.jsx";


const App = () => {
  const [loginState, setLoginState] = useState(true);

  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/oauth-success" element={<OAuthSuccess />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route
          path="/auth"
          element={
            loginState ? (
              <Login loginState={loginState} setLoginState={setLoginState} />
            ) : (
              <Signup loginState={loginState} setLoginState={setLoginState} />
            )
          }
        />
        {/* <Route path="*" element={}/> */}
      </Routes>
    </>
  );
}

export default App