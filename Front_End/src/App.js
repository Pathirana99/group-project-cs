import React, { useState, useEffect }from 'react';
import { Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import PostYourAdd from './pages/PostYourAdd';
import ProtectedRoute from './components/ProtectedRoute';
import Loader from './components/Loader';
import OwnerProfile from './pages/OwnerProfile';
import ListPlaces from './pages/ListPlaces';
import MoreDetails from './pages/MoreDetails';

function App() {
  
  const [loading, setLoading] = useState(true);  // State to manage loader visibility

  // Simulate a page load or fetch data, then hide the loader
  useEffect(() => {
    // Mimic page load or data fetching with a timeout (you can replace this with real fetch calls)
    const timer = setTimeout(() => {
      setLoading(false);  // Hide loader after 2 seconds (or when your data is loaded)
    }, 2000);

    return () => clearTimeout(timer);  // Cleanup the timer
  }, []);

  const isAuthenticated = localStorage.getItem('authToken') !== null;
  // If loading is true, display the loader
  if (loading) {
    return <Loader />;
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/postyouradd" element={<ProtectedRoute element={<PostYourAdd />} isAuthenticated={isAuthenticated} />} />
      <Route path="/ownerprofile" element={<OwnerProfile />} />
      <Route path="/list-places" element={<ListPlaces />} />
      <Route path="/more-details/:placeId" element={<MoreDetails />} />
    </Routes>
  );
}

export default App;
