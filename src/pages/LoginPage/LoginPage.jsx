import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/auth.context";
import Modal from '../../components/Modal/Modal'; 
import '../../components/Modal/Modal.css'; 
import './LoginPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Confetti from 'react-canvas-confetti';
const API_URL = import.meta.env.VITE_API_URL;

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { storedToken, authenticateUser } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const requestBody = { email, password };
    axios
      .post(`${API_URL}/auth/login`, requestBody)
      .then(({ data }) => {
        console.log("response from the login", data);
        storedToken(data.authToken);
        setShowModal(true)
        return authenticateUser();
      })
      .then(() => {
        setTimeout(() => {
          navigate("/progress");
        }, 3000);
      })
      .catch((err) => {
        console.log("Error logging in", err);
        setErrorMessage("Failed to log in. Please check your credentials.");
      });
  };

  const handleTogglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="LoginPage">
      <h2>Login</h2>
      <form onSubmit={handleLoginSubmit}>
        <label>Email:</label>
        <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Password:</label>
        <div className="password-input-container">
          <input
            type={passwordVisible ? 'text' : 'password'}
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FontAwesomeIcon
            icon={passwordVisible ? faEyeSlash : faEye}
            className="eye-icon"
            onClick={handleTogglePasswordVisibility}
          />
        </div>

        <button type="submit">Login</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Don't have an account yet? <br /> 
        <Link to={"/signup"}>Sign Up</Link>
      </p>

      {showModal && (
        <Modal show={showModal} handleClose={() => setShowModal(false)}>
          <Confetti className="confetti-icon" />
          <p>Login successful! 🎉</p>
        </Modal>
      )}
    </div>
  );
};

export default LoginPage;
