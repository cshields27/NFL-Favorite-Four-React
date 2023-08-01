import React from 'react';
import { Link } from 'react-router-dom';
import './hero.css';

const Hero = () => {
  return (
    <section className="hero-hero">
      <div className="hero-heading">
        <h1 className="hero-header">Compete with fans across the NFL</h1>
        <p className="hero-caption">
          Invite friends and submit weekly picks for a favorite, an underdog, an over, and an under!
        </p>
      </div>
      <div className="hero-buttons">
        <Link to="/submit-picks" className="button">
            Submit Your Picks
        </Link>
        {/*<button className="hero-learn button-clean button">Learn more</button>*/}
      </div>
    </section>
  );
};

export default Hero;
