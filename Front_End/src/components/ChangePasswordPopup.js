import React, { useState } from 'react';
import '../pages/login.css';
import CloseIcon from '@mui/icons-material/Close';

export default function ChangePasswordPopup({ onClose }) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Function to check if passwords match
  const passwordsMatch = password === confirmPassword && password.length > 0;

  const handleReset = () => {
    if (passwordsMatch) {
      // Here you would typically update the password in the backend
      onClose();
    } else {
      console.log("Passwords do not match or are empty.");
    }
  };

  return (
    <div className="popup-container">
      <div className="popup">
        <CloseIcon className="close-popup" onClick={onClose} />
        <h2>Change Password</h2>
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />
        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="input-field"
        />
        <button
          className={`confirm-button ${passwordsMatch ? 'active' : ''}`} // Conditional class
          onClick={handleReset}
          disabled={!passwordsMatch} // Disable button if passwords do not match
        >
          Reset Password
        </button>
      </div>
    </div>
  );
}
