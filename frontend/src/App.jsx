import { useEffect, useState } from "react"
import toast, {Toaster} from "react-hot-toast"
import { Route,Routes, useActionData, useNavigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Signup from "./pages/Signup.jsx";
import OAuthSuccess from "./pages/OAuth.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import HostDashboard from "./pages/host.jsx";
import AddProperty from "./pages/AddProperty.jsx";


const App = () => {
  const [loginState, setLoginState] = useState(true);

  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/oauth-success" element={<OAuthSuccess />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/host" element={<HostDashboard />} />
        <Route path="/host/addproperty" element={<AddProperty />} />

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