import React from 'react';
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import './about.css'
import './home.css'

const About = () => {
  return (
    <div className='home-container'>
      <Navbar></Navbar>
      <div className="about-content">
        <div className="about-card">
          <h2>About Us</h2>
          <p>
            NFL Favorite Four is a website that allows football fans to compete
            with each other by picking just a few selections: a favorite, an underdog, an over, and
            an under for each week's games. The goal is to showcase your football
            knowledge and strategic insights while having fun with friends and
            other fans.
          </p>
          <p>
            Whether you're a seasoned football expert or a casual fan, NFL
            Favorite Four is the perfect platform to put your knowledge to the
            test and enjoy the excitement of the NFL season.
          </p>
        </div>
        <div className="about-card">
          <h2>Contact Us</h2>
          <p>
            If you have any questions, feedback, or need assistance, feel free
            to reach out to us at:
          </p>
          <p>Email: connorjshields@alumni.nd.edu</p>
          {/* Add other contact information if needed */}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default About;
