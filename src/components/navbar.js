import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../authContext'; // Custom hook
import useGoogleAuth from '../hooks/useGoogleAuth'; // Custom hook
import { googleLogout } from '@react-oauth/google';
import { useAlert } from 'react-alert';
import './navbar.css';

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn, user, setUser } = useAuth(); // Access authentication state and user data from the context
  const { handleLogin } = useGoogleAuth();
  const alert = useAlert();

  const handleLogout = () => {
    googleLogout();
    setIsLoggedIn(false);
    setUser(null);
    alert.success('Logged out.');
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
            {user ? `Logout ${user.email}` : 'Logout'} {/* Display user name */}
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
