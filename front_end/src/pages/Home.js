import React from 'react'
import "./home.css";
import NavigationBar from '../components/NavigationBar';

export default function Home() {
  return (
    <div className="homePage">
      <div className="homepage-container">
        <div className="navBar">
          <NavigationBar />
        </div> 
      </div> 
    </div>
  )
}
