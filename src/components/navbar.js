import React from 'react';
import './navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar-container">
      <div className="navbar-logo">NFL Favorite Four</div>
      <div className="navbar-buttons">
        <button className="navbar-button">Leaderboard</button>
        <button className="navbar-button disabled">Leagues (Coming Soon)</button>
        <button className="navbar-button">About</button>
        <div className="navbar-icon">
          <a
            href="https://twitter.com"
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
