import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../authContext'; // Custom hook
import useGoogleAuth from '../hooks/useGoogleAuth'; // Custom hook
import { googleLogout } from '@react-oauth/google';
import './navbar.css';

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn, user, setUser } = useAuth(); // Access authentication state and user data from the context
  const { handleLogin } = useGoogleAuth();

  const handleLogout = () => {
    googleLogout();
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('userToken');
  };

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
            <img alt="Twitter" src="/Icons/twitter.svg" className="footer-image" />
          </a>
        </div>
        {isLoggedIn ? (
          <button className="navbar-button login" onClick={handleLogout}>
            {user ? `Hello, ${user.email} (logout)` : 'Logout'} {/* Display user name */}
          </button>
        ) : (
          <button className="navbar-button login" onClick={handleLogin}>
            Login with Google
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
