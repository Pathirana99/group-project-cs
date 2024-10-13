import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './navigationBar.css';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import MenuIcon from '@mui/icons-material/Menu'; // Import the Menu icon
import Button from '@mui/material/Button';

export default function NavigationBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle the menu on mobile
  const [showNavBar, setShowNavBar] = useState(true); // State to manage visibility of navbar
  const [lastScrollY, setLastScrollY] = useState(0);  // Track last scroll position

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle menu state
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setShowNavBar(false); // Hide navbar when scrolling down
      } else {
        setShowNavBar(true); // Show navbar when scrolling up
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll); // Clean up event listener
    };
  }, [lastScrollY]); // Include lastScrollY in the dependency array

  return (
    <nav className={`nav ${showNavBar ? '' : 'hidden'}`}>
      <div className={`menu-icon ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <MenuIcon />
      </div>

      <div className="navbarlogo">
        <img src="/images/1.png" alt="logo" />
      </div>

      <ul className={`navbarLinks ${isMenuOpen ? 'open' : ''}`}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About us</Link></li>
        <li><Link to="/contact">Contact us</Link></li>
        <li><Link to="/login"><PersonOutlineIcon className="loginIcon" /></Link></li>
        <li><Link to="/postyouradd"><Button variant="contained">Post Your Add</Button></Link></li>
      </ul>
    </nav>
  );
}
