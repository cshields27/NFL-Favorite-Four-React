import React from 'react'

import PropTypes from 'prop-types'

import './footer.css'

const Footer = (props) => {
  return (
    <footer className="footer-footer">
      <div className="footer-main">
        <div className="footer-branding">
          <div className="footer-heading">
            <h2 className="footer-logo">{props.Logo}</h2>
          </div>
          <div className="footer-socials">
            <a
              href={props.link_Twitter1}
              target="_blank"
              rel="noreferrer noopener"
              className="footer-twitter social button"
            >
              <img
                alt={props.image_alt2}
                src={props.image_src2}
                className="footer-image"
              />
            </a>
          </div>
        </div>
        <div className="footer-container">
          <div className="footer-links">
            <div className="footer-list">
              <div className="footer-items"></div>
            </div>
            <div className="footer-list1"></div>
          </div>
        </div>
        <div className="footer-socials1">
          <a
            href={props.link_Twitter}
            target="_blank"
            rel="noreferrer noopener"
            className="footer-twitter1 social button"
          >
            <img
              alt={props.image_alt}
              src={props.image_src}
              className="footer-image1"
            />
          </a>
          <a
            href={props.link_Discord}
            target="_blank"
            rel="noreferrer noopener"
            className="footer-discord social button"
          >
            <img
              alt={props.image_alt1}
              src={props.image_src1}
              className="footer-image2"
            />
          </a>
        </div>
      </div>
      <div className="footer-container1">
        <div className="footer-container2">
          <button className="footer-link button-clean button">
            {props.Link}
          </button>
          <button className="footer-link1 button-clean button">
            <span>
              <span>Contact</span>
              <br></br>
            </span>
          </button>
        </div>
      </div>
      <span className="footer-copyright">{props.Copyright}</span>
    </footer>
  )
}

Footer.defaultProps = {
  link_Twitter: 'https://twitter.com',
  image_src1: '/Icons/discord.svg',
  Link: 'About',
  image_src: '/Icons/twitter.svg',
  Logo: 'NFL Favorite Four',
  link_Discord: 'https://discord.com',
  image_alt1: 'image',
  image_alt2: 'image',
  image_alt: 'image',
  image_src2: '/Icons/twitter.svg',
  Copyright: '© 2023 Favorite Four. All Rights Reserved.',
  link_Twitter1: 'https://twitter.com',
}

Footer.propTypes = {
  link_Twitter: PropTypes.string,
  image_src1: PropTypes.string,
  Link: PropTypes.string,
  image_src: PropTypes.string,
  Logo: PropTypes.string,
  link_Discord: PropTypes.string,
  image_alt1: PropTypes.string,
  image_alt2: PropTypes.string,
  image_alt: PropTypes.string,
  image_src2: PropTypes.string,
  Copyright: PropTypes.string,
  link_Twitter1: PropTypes.string,
}

export default Footer
