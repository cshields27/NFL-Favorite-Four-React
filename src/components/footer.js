import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer-footer">
      <div className="footer-main">
      <Link to="/" className="footer-logo">
          NFL Favorite Four
      </Link>
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
        <Link to="/about" className="footer-link button-clean button">
          About
        </Link>
      </div>
      <span className="footer-copyright">
        © 2023 Favorite Four. All Rights Reserved.
      </span>
    </footer>
  );
};

export default Footer;
