import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";

function IsPrivate({ children }) {
  const { isLoading, isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  // If the page is still loading, show a loading indicator
  if (isLoading) {
    return <p> Loading...</p>;
  }

  // If the user is not logged in, redirect to the login page
  if (!isLoggedIn) {
    navigate("/login");
    return null; // Return null or a loading indicator while redirecting
  }

  // If the user is logged in
  return <div>{children}</div>;
}

export default IsPrivate;
