
import React from 'react'
import { Link } from 'react-router-dom';
import "./navigationBar.css";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Button from '@mui/material/Button';

export default function NavigationBar() {
  return (
    <nav className="nav">
        <div className="navbarlogo">
            <img src="/images/1.png" alt="logo"/>
        </div>
        <ul className="navbarLinks">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About us</Link></li>
        <li><Link to="/contact">Contact us</Link></li>
        <li><Link to="/login"><PersonOutlineIcon className="loginIcon"/></Link></li>
        <li><Link to="/postyouradd"><Button variant="postAdd">Post Your Add</Button></Link></li>
      </ul>

       

    </nav>
  )
}
