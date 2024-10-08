import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './navigationBar.css';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import MenuIcon from '@mui/icons-material/Menu'; // Import the Menu icon
import Button from '@mui/material/Button';

export default function NavigationBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle the menu on mobile

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle menu state
  };

  return (
    <nav className="nav">

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
