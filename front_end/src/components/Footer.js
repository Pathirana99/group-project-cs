import React from 'react';
import './footer.css';
import { Link } from 'react-router-dom';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { Facebook, Instagram, LinkedIn } from '@mui/icons-material'; // Import MUI icons

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img src="/images/1.png" alt="Bdoor Logo" />
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
          <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About us</Link></li>
        <li><Link to="/contact">Contact us</Link></li>
        <li><Link to="/login"><PersonOutlineIcon className="loginIcon" /></Link></li>
        <li><Link to="/postyouradd">Post Your Add</Link></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>Contact</h4>
          <p>Email: <a href="mailto:Bdoor@gmail.com">Bdoor@gmail.com</a></p>
          <p>Phone: <a href="tel:+94718535288">(+94) 718535288</a></p>
          <p>Address: No.64, Main Street, Matara</p>
        </div>

        <div className="footer-social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <Facebook fontSize="large" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <Instagram fontSize="large" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <LinkedIn fontSize="large" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
