import React from 'react';
import PropTypes from 'prop-types';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer-footer">
      <div className="footer-main">
        <h2 className="footer-logo">NFL Favorite Four</h2>
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
        <button className="footer-link button-clean button">About</button>
      </div>
      <span className="footer-copyright">
        © 2023 Favorite Four. All Rights Reserved.
      </span>
    </footer>
  );
};

export default Footer;
