import { Navigate } from 'react-router-dom';

// PrivateRoute component to protect routes
const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('authToken'); // Check if the user is authenticated
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
