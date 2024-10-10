import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import ForgotPasswordPopup from '../components/ForgotPasswordPopup';
import EnterCodePopup from '../components/EnterCodePopup';
import ChangePasswordPopup from '../components/ChangePasswordPopup';
import './login.css';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockIcon from '@mui/icons-material/Lock';
import CloseIcon from '@mui/icons-material/Close';
import { GoogleLogin } from 'react-google-login';

export default function Login() {
  const [step, setStep] = useState(null);
  const navigate = useNavigate(); // Initialize navigate function

  const openForgotPassword = () => setStep('forgot');
  const openEnterCode = () => setStep('code');
  const openChangePassword = () => setStep('change');
  const closePopup = () => setStep(null);

  const handleGoogleSuccess = (response) => {
    console.log('Google login successful:', response);
    // Handle successful login here
  };

  const handleGoogleFailure = (response) => {
    console.log('Google login failed:', response);
    // Handle failed login here
  };

  // Function to go back to the previous page
  const handleClose = () => {
    navigate(-1); // Navigates back to the previous page
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
          <form>
            <div className="input">
            <input type="email" placeholder="Email" className="input-field" />
            <MailOutlineIcon className="icon"/>
            <input type="password" placeholder="Password" className="input-field" />
            <LockIcon className="icon"/>
            </div>
            <div className="input-field-container">
              <button type="button" className="forgot-password" onClick={openForgotPassword}>Forget Your Password?</button>
            </div>
            <button type="submit" className="signin-button">SIGN IN</button>
          </form>
          <div className="or-divider"><span>OR</span></div>
          <GoogleLogin
            clientId="YOUR_GOOGLE_CLIENT_ID"
            buttonText="Google"
            onSuccess={handleGoogleSuccess}
            onFailure={handleGoogleFailure}
            cookiePolicy={'single_host_origin'}
            render={renderProps => (
              <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="google-signin-button">
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
