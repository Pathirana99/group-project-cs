import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ element, isAuthenticated }) => {
  const location = useLocation();  // Get the current location (the page the user was trying to access)

  if (!isAuthenticated) {
    // If the user is not authenticated, save the page they were trying to access and redirect to login
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // If authenticated, render the component (e.g., PostYourAdd)
  return element;
};

export default ProtectedRoute;
