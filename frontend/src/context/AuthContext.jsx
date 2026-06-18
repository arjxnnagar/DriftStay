import React, { children,useEffect, useState, useContext,createContext } from 'react'
import api from '../api/axios';

const AuthContext = createContext();

export const useAuth = ()=>{
  return useContext(AuthContext);
}

const AuthProvider = ({children}) => {

    const [user,setUser] = useState(null);
    const [token,setToken] = useState(null);
    const [isLoading,setIsLoading] = useState(true);

    useEffect(()=>{
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");

        if(storedUser && storedToken){
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
        api.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
        }
        setIsLoading(false);
    },[])

  return (
    <AuthContext.Provider value={{user,token,setUser,setToken}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider