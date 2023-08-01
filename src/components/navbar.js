import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar-container">
      <Link to="/" className="navbar-logo">
          NFL Favorite Four
      </Link>
      <div className="navbar-buttons">
        <button className="navbar-button">Leaderboard</button>
        <button className="navbar-button disabled">Leagues (Coming Soon)</button>
        <Link to="/about" className="navbar-button">
          About
        </Link>
        <div className="navbar-icon">
          <a
            href="https://twitter.com/connorshieldss"
            target="_blank"
            rel="noreferrer noopener"
            className="footer-twitter social button"
          >
            <img
              alt="Twitter"
              src="/Icons/twitter.svg"
              className="footer-image"
            />
          </a>
        </div>
        <button className="navbar-button login">Login</button>
      </div>
    </nav>
  );
};

export default Navbar;
