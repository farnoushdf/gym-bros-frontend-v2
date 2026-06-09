import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL || "https://gym-bros-backend-v2.onrender.com";


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

  const authenticateUser = async (token) => {
    const tokenFromLocalStorage = token || localStorage.getItem("authToken");

    if (!tokenFromLocalStorage) {
      setCurrentUser(null);
      setIsLoading(false);
      setIsLoggedIn(false);
      return;
    }

    try {
      const { data } = await axios.get(`${API_URL}/auth/verify`, {
        headers: { Authorization: `Bearer ${tokenFromLocalStorage}` },
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
