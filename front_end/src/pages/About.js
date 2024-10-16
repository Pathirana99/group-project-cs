import React from 'react'
import './about.css';

export default function About() {
  return (
    <div>
      
      <div className="about-container">
      <h1>ABOUT US</h1>
      <p className="intro-text">
        Welcome to Bdoor, your trusted solution for managing boarding facilities efficiently and effectively.
        Whether you're managing a student dormitory, a hostel, or a residential facility, our system is designed to streamline your operations and enhance the experience for both administrators and residents.
      </p>

      <div className="cards-container">
        <div className="card">
          <h2>MISSION</h2>
          <p>
            Our goal is to use cutting-edge technology to streamline and simplify boarding facility management so that administrators can easily oversee operations and residents can enjoy a smooth living environment. From room assignment to billing and communication, we are dedicated to offering a user-friendly, safe, and all-inclusive platform that tackles the particular difficulties faced by boarding facility managers.
          </p>
        </div>

        <div className="card">
          <h2>VISION</h2>
          <p>
            Our vision is to become the leading solution for boarding facility management across the globe, empowering managers and residents with intuitive, reliable, and scalable tools. We aim to revolutionize how boarding facilities operate by integrating cutting-edge technology that enhances efficiency, communication, and satisfaction.
          </p>
        </div>

        <div className="card">
          <h2>ACHIEVEMENTS</h2>
          <p>
            Since our inception, we have successfully partnered with numerous boarding facilities, helping streamline their management processes and improve resident satisfaction. Our system has processed thousands of room allocations and payments, ensuring efficient operations for facility managers.
          </p>
        </div>
      </div>
    </div>

    </div>
  )
}