import React, { useState } from 'react';
import '../pages/login.css';
import CloseIcon from '@mui/icons-material/Close';

export default function ForgotPasswordPopup({ onClose, onNext }) {
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);

  const validateEmail = (email) => {
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const emailInput = e.target.value;
    setEmail(emailInput);
    setIsEmailValid(validateEmail(emailInput));
  };

  const handleConfirm = () => {
    // Here you would typically send the email to the backend to trigger the code sending process
    onNext();
  };

  return (
    <div className="popup-container">
      <div className="popup">
        <CloseIcon className="close-popup" onClick={onClose} />
        <h2>Forgot Password</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
          className="input-field"
        />
        <button
          className={`confirm-button ${isEmailValid ? 'active' : ''}`} // Conditional class
          onClick={handleConfirm}
          disabled={!isEmailValid} // Disable button if email is invalid
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
