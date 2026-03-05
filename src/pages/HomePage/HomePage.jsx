import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from '../../components/Modal/Modal'; 
import '../../components/Modal/Modal.css'; 
import './HomePage.css';
import fitnessImage from "../../assets/fitness-image.png";
import { AuthContext } from '../../context/auth.context';
const API_URL = import.meta.env.VITE_API_URL;

const HomePage = () => {
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const { storedToken, authenticateUser } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(AuthContext);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    const image = e.target.image.files[0];
    const formData = new FormData();
    formData.append('imageUrl', image);
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };
      await axios.post(`${API_URL}/auth/signup`, formData, config);
      setAlertMessage('Signup successful! Please log in.');
      setShowSignupModal(false);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errorMessage) {
        setErrorMessage(err.response.data.errorMessage);
      } else {
        setErrorMessage('An error occurred during sign up. Please try again.');
      }
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const requestBody = { email, password };
    axios
      .post(`${API_URL}/auth/login`, requestBody)
      .then(({ data }) => {
        console.log("response from the login", data);
        storedToken(data.authToken);
        return authenticateUser();
      })
      .then(() => {
        console.log("Login successful");
        // nav("/profile");
        navigate("/progress");
      })
      .catch((err) => {
        console.log("Error logging in", err);
        setErrorMessage("Failed to log in. Please check your credentials.");
      });
  };

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
    <div className="homepage">
      {alertMessage && <div className="alert-message">{alertMessage}</div>}

      <h1>Start Your Fitness Journey Today!</h1>
      <div className="auth-links">
        <button onClick={() => setShowSignupModal(true)}>Sign Up</button>
        <button onClick={() => setShowLoginModal(true)}>Login</button>
      </div>
      <img src={fitnessImage} alt="Fitness" />
      <div className="content-section">
        <div className="card">
          <h2>What is Fitness?</h2>
          <p>
            Fitness is more than just a workout; it's a lifestyle that enhances your
            physical and mental well-being. It's about feeling great inside and out.
          </p>
        </div>

        <div className="card">
          <h2>How We Help</h2>
          <p>
            Discover personalized workout routines, expert nutrition tips, and tools to
            track your progress. Whether you're into cardio, strength training, or yoga,
            we've got you covered.
          </p>
        </div>

        <div className="card">
          <h2>Join Us</h2>
          <p>
            Join our vibrant community of fitness enthusiasts and beginners. Start your
            journey today and live a healthier, more active life with GymBros!
          </p>
        </div>
      </div>

      <Modal show={showSignupModal} handleClose={() => setShowSignupModal(false)}>
        <h2>Sign Up</h2>
        <div className="form-container">
          <form onSubmit={handleSignupSubmit}>
            <label>Your Name:</label>
            <input type="text" name="username" value={username} onChange={handleUsernameChange} required />

            <label>Email Address:</label>
            <input type="email" name="email" value={email} onChange={handleEmailChange} required />

            <label>Password:</label>
            <input type="password" name="password" value={password} onChange={handlePasswordChange} required />

            <label>Profile Picture:</label>
            <input type="file" name="image" />

            <button type="submit">Sign Up</button>

            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </form>
        </div>
        <p>
          Already have an account? <br />
          <Link to="/login" onClick={() => {
            setShowSignupModal(false);
            setShowLoginModal(true);
          }}>Login</Link>
        </p>
      </Modal>

      <Modal show={showLoginModal} handleClose={() => setShowLoginModal(false)}>
        <h2>Login</h2>
        <div className="form-container">
          <form onSubmit={handleLoginSubmit}>
            <label>Email Address:</label>
            <input type="email" name="email" value={email} onChange={handleEmailChange} required />

            <label>Password:</label>
            <input type="password" name="password" value={password} onChange={handlePasswordChange} required />

            <button type="submit">Login</button>

            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </form>
        </div>
        <p>
          Don't have an account? <br />
          <Link to="/signup" onClick={() => {
            setShowLoginModal(false);
            setShowSignupModal(true);
          }}>Sign Up</Link>
        </p>
      </Modal>
    </div>
  );
};

export default HomePage;
