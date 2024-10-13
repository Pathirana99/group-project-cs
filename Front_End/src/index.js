import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { createRoot } from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google'; // Import the provider

// Replace with your actual Google Client ID
const clientId = "1081104383563-f604lsn805sdta9q1auc9qu9e4cmp805.apps.googleusercontent.com";

const root = createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId={clientId}>  {/* Wrap App with GoogleOAuthProvider */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </GoogleOAuthProvider>
);
