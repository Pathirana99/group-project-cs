import React from 'react'
import "./home.css";
import NavigationBar from '../components/NavigationBar';
import HeroSection from '../components/Home/HeroSection';
import ComfortSection from '../components/Home/ComfortSection';
import CardSection from '../components/Home/CardSection';
import Footer from '../components/Footer';


export default function Home() {
  return (
    <div className="homePage">
      <div className="homepage-container">
        
        <div className="navBar">
          <NavigationBar />
        </div>

        <div className="hero">
          <HeroSection/>
        </div>

        <div className="comfort">
          <ComfortSection/>
        </div>

        <div className="cards">
          <CardSection/>
        </div>

        <div className="footer">
          <Footer/>
        </div>

          
       </div>
      </div> 
      
  
  )
}