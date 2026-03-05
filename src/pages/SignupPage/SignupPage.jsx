import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from '../../components/Modal/Modal';
import '../../components/Modal/Modal.css';
import './SignupPage.css';
import Confetti from 'react-canvas-confetti';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
const API_URL = import.meta.env.VITE_API_URL;

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false); 
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

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
      setShowModal(true);
      setTimeout(() => navigate('/login'), 2500); 
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errorMessage) {
        setErrorMessage(err.response.data.errorMessage);
      } else {
        setErrorMessage('An error occurred during sign up. Please try again.');
      }
    }
  };

  const handleTogglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setImageFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };



  return (
    <div className="SignupPage">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignupSubmit}>
        <label>Name:</label>
        <input type="text" name="username" value={username} onChange={handleUsernameChange} required />

        <label>Email:</label>
        <input type="email" name="email" value={email} onChange={handleEmailChange} required />

        <label>Password:</label>
        <div className="password-input-container">
          <input
            type={passwordVisible ? 'text' : 'password'}
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <FontAwesomeIcon
            icon={passwordVisible ? faEyeSlash : faEye}
            className="eye-icon"
            onClick={handleTogglePasswordVisibility}
          />
        </div>

        <label>User Image:</label>
        <input type="file" name="image" onChange={handleImageChange} />

        {imagePreview && (
          <img src={imagePreview} alt="Preview" className="image-preview" />
        )}

        <button type="submit">Sign Up</button>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>

      <p>
        Already have an account? <br />
        <Link to="/login">Login</Link>
      </p>
      {showModal && (
        <Modal show={showModal} handleClose={() => setShowModal(false)}>
          <Confetti className="confetti-icon" />
          <p>Congratulations! You've signed up successfully!</p>
        </Modal>
      )}
    </div>
  );
};

export default SignupPage;
