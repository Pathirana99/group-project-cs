import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockIcon from '@mui/icons-material/Lock';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import CloseIcon from '@mui/icons-material/Close';
import { GoogleLogin } from '@react-oauth/google'; // Import from @react-oauth/google
import './signup.css';

export default function Signup() {
  const [name, setName] = useState(''); // State for name input
  const [email, setEmail] = useState(''); // State for email input
  const [password, setPassword] = useState(''); // State for password input
  const [confirmPassword, setConfirmPassword] = useState(''); // State for confirm password
  const [error, setError] = useState(''); // State for error messages
  const navigate = useNavigate();

  // Handle close action, navigating to the previous page
  const handleClose = () => {
    navigate(-1); // Go back to the previous page
  };

  // Navigate to the login page when the sign-in button is clicked
  const handleSignin = () => {
    navigate('/login'); // Navigate to your login page
  };

  // Function to handle Google Sign up success
  const handleGoogleSuccess = (response) => {
    console.log('Google sign-up successful:', response);
    localStorage.setItem('authToken', 'google-auth-token');
    navigate('/');  // Navigate to the home page after successful signup
  };

  // Function to handle Google Sign up failure
  const handleGoogleFailure = (error) => {
    console.log('Google sign-up failed:', error);
    // Handle failed sign-up here
  };

  // Handle name, email, password, and confirm password form submission
  const handleSignup = (e) => {
    e.preventDefault();

    // Clear previous error messages
    setError('');

    // Validate if password and confirm password match
    if (password !== confirmPassword) {
      setError('Passwords do not match'); // Set error message
      return;
    }

    // Simulate the sign-up process if all fields are filled and passwords match
    if (email === 'test@example.com' && password && name) {
      console.log('Sign up successful');
      // Store authentication token in localStorage
      localStorage.setItem('authToken', 'email-signup-token');

      // Navigate to the home page or close the signup page
      navigate('/');
    } else {
      console.log('Sign up failed. Please fill in all fields.');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup">
        <div className="signup-left">
          <img src="/images/1.png" alt="logo" className="logo" />
          <p className="signin-text">Already have an account?</p>
          <button className="signin-button" onClick={handleSignin}>SIGN IN</button>
             </div>

        <div className="signup-right">
          <CloseIcon className="close-icon" onClick={handleClose} />
          <div className="signup-right-signin">
            <p className="signin-text">Already have an account?</p>
            <button className="signin-button" onClick={handleSignin}>SIGN IN</button>
          </div>
          <h2 className="signup-header">Sign up Here</h2>

          {/* Display error message if any */}
          {error && <p className="error-message">{error}</p>}

          <form onSubmit={handleSignup}>
            <div className="input">
              <input
                type="text"
                placeholder="Name"
                className="input-field"
                value={name}
                onChange={(e) => setName(e.target.value)} // Update name state
              />
              <PersonOutlineIcon className="icon" />
              <input
                type="email"
                placeholder="Email"
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Update email state
              />
              <MailOutlineIcon className="icon" />
              <input
                type="password"
                placeholder="Password"
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Update password state
              />
              <LockIcon className="icon" />

              {/* Confirm Password Field */}
              <input
                type="password"
                placeholder="Confirm Password"
                className="input-field"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)} // Update confirm password state
              />
              <LockIcon className="icon" />
            </div>
            <button type="submit" className="signup-button">SIGN UP</button>
          </form>
          <div className="or-divider"><span>OR</span></div>

          {/* Google Sign-up using @react-oauth/google */}
          <div className="google-signup">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleFailure}
            render={({ onClick, disabled }) => (
              <button onClick={onClick} disabled={disabled} className="google-signup-button">
                <img src="/images/1.2.png" alt="Google logo" className="googlelogo" />
                Google
              </button>
            )}
          />
          </div>
        </div>
      </div>
    </div>
  );
}
