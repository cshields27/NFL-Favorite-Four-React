import React from 'react';
import { Link } from 'react-router-dom';
import useFirebaseAuth from '../hooks/useFirebaseAuth';
import './navbar.css';

const Navbar = () => {
  const { user, handleLogin, handleLogout } = useFirebaseAuth();

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
        {user ? (
          <button className='navbar-button login' onClick={handleLogout}>
            Logout {user.displayName} {user.uid}
          </button>
        ) : (
          <button className='navbar-button login' onClick={handleLogin}>
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
