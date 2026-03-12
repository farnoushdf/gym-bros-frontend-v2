import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from '../../context/auth.context';
import logo from "../../assets/gym-icon.png";
import "./Navbar.css";

import { useLocation } from "react-router-dom";



const Navbar = () => {
  const { handleLogout, currentUser, alertMessage } = useContext(AuthContext);
  
const location = useLocation();
const isLandingPage = location.pathname === "/";

  return (
    !isLandingPage && (
      <nav className="navbar">
        <Link to="/home">
          <img
            src={logo}
            alt="Logo"
            className="navbar-logo"
            style={{ width: "50px", height: "auto" }}
          />
        </Link>

        <h1>GymBros</h1>

        {alertMessage && (
          <div className="alert">
            <p>{alertMessage}</p>
          </div>
        )}

        {currentUser ? (
          <div className="user-info">
            <div className="username-logout">
              {currentUser.userImage ? (
                <img
                  src={currentUser.userImage}
                  alt="Profile"
                  className="profile-image"
                  style={{ width: "30px", height: "30px", borderRadius: "50%", marginRight: "10px"}}
                />
              ) : (
                <div className="avatar">{currentUser.username.charAt(0)}</div>
              )}
              <span className="username">
                  Welcome! {currentUser.username}
              </span>
              <button className="logout" onClick={handleLogout}>
               / Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="username-logout">
            <Link to="/signup" className="auth-buttons">
              <button>Sign Up</button>
            </Link>
            <Link to="/login" className="auth-buttons">
              <button>Login</button>
            </Link>
          </div>
        )}
      </nav>
    )
  );
};

export default Navbar;
