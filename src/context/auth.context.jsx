import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;


const AuthContext = createContext();

const AuthContextWrapper = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null); 
  const nav = useNavigate();

  const storedToken = (token) => {
    localStorage.setItem("authToken", token);
  };

  const authenticateUser = async () => {
    const tokenFromLocalStorage = localStorage.getItem("authToken");
    try {
      const { data } = await axios.get(`${API_URL}/auth/verify`, {
        headers: { authorization: `Bearer ${tokenFromLocalStorage}` },
      });
      setCurrentUser(data.user);
      setIsLoading(false);
      setIsLoggedIn(true);
    } catch (error) {
      console.log("error authenticating user", error);
      setCurrentUser(null);
      setIsLoading(false);
      setIsLoggedIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    nav("/login");
    setCurrentUser(null);
    setIsLoggedIn(false);
    setAlertMessage("Logout successful"); 
  };

  useEffect(() => {
    authenticateUser();
  }, []);

 
  useEffect(() => {
    let alertTimer;
    if (alertMessage) {
      alertTimer = setTimeout(() => {
        setAlertMessage(null);
      }, 3000); 
    }
    return () => clearTimeout(alertTimer);
  }, [alertMessage]);

  return (
    <AuthContext.Provider
      value={{
        storedToken,
        handleLogout,
        currentUser,
        isLoading,
        isLoggedIn,
        authenticateUser,
        alertMessage, 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextWrapper };
