import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useNavigate hook
import ForgotPasswordPopup from '../components/ForgotPasswordPopup';
import EnterCodePopup from '../components/EnterCodePopup';
import ChangePasswordPopup from '../components/ChangePasswordPopup';
import './login.css';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockIcon from '@mui/icons-material/Lock';
import CloseIcon from '@mui/icons-material/Close';
import { GoogleLogin } from '@react-oauth/google'; // Import from @react-oauth/google

export default function Login() {
  const [step, setStep] = useState(null);
  const navigate = useNavigate(); // Initialize navigate function
  const [email, setEmail] = useState(''); // State for email input
  const [password, setPassword] = useState('');
  const location = useLocation(); 

   // Get the page the user was trying to access before being redirected to login
   const redirectTo = location.state?.from?.pathname || '/';  // Defaults to home page if no previous page

  const openForgotPassword = () => setStep('forgot');
  const openEnterCode = () => setStep('code');
  const openChangePassword = () => setStep('change');
  const closePopup = () => setStep(null);

  // Function to handle Google Login success
  const handleGoogleSuccess = (response) => {
    console.log('Google login successful:', response);
    localStorage.setItem('authToken', 'google-auth-token');
    navigate(redirectTo);  // Navigate to the intended page after successful login
  };

  // Function to handle Google Login failure
  const handleGoogleFailure = (error) => {
    console.log('Google login failed:', error);
    // Handle failed login here
  };

  // Function to go back to the previous page
  const handleClose = () => {
    navigate(-1); // Navigates back to the previous page
  };

  // Handle email/password form submission
  const handleSignIn = (e) => {
    e.preventDefault();

    // Simulate email/password authentication process
    if (email === 'test@example.com' && password === 'password') {
      console.log('Email login successful');

      // Store authentication token in localStorage
      localStorage.setItem('authToken', 'email-auth-token');

      // Navigate to the home page or close the login page
      navigate(redirectTo);
    } else {
      console.log('Login failed. Incorrect email or password.');
    }
  };

  return (
    <div className="login-container">
      <div className="login">
        <div className="login-left">
          <img src="/images/1.png" alt="logo" className="logo"/>
          <p className="signup-text">Don't have an account?</p>
          <button className="signup-button">SIGN UP</button>
          <img src="/images/1.1.png" alt="login vector" className='vectorimage1'/>
        </div>

        <div className="login-right">
          {/* Update CloseIcon to use handleClose on click */}
          <CloseIcon className="close-icon" onClick={handleClose} />
          <div className="login-right-signup">
            <p className="signup-text">Don't have an account?</p>
            <button className="signup-button">SIGN UP</button>
          </div>
          <h2 className="signin-header">Sign in Here</h2>
          <form onSubmit={handleSignIn}>
            <div className="input">
              <input type="email" placeholder="Email" className="input-field" value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state
              />
              <MailOutlineIcon className="icon"/>
              <input type="password" placeholder="Password" className="input-field" 
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state
            />
              <LockIcon className="icon"/>
            </div>
            <div className="input-field-container">
              <button type="button" className="forgot-password" onClick={openForgotPassword}>Forget Your Password?</button>
            </div>
            <button type="submit" className="signin-button">SIGN IN</button>
          </form>
          <div className="or-divider"><span>OR</span></div>
          
          {/* Use GoogleLogin from @react-oauth/google */}
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleFailure}
            render={({ onClick, disabled }) => (
              <button onClick={onClick} disabled={disabled} className="google-signin-button">
                <img src="/images/1.2.png" alt="Google logo" className="googlelogo"/>
                Google
              </button>
            )}
          />
        </div>
      </div>

      {step === 'forgot' && <ForgotPasswordPopup onClose={closePopup} onNext={openEnterCode} />}
      {step === 'code' && <EnterCodePopup onClose={closePopup} onNext={openChangePassword} />}
      {step === 'change' && <ChangePasswordPopup onClose={closePopup} />}
    </div>
  );
}
