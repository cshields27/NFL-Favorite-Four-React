import React from 'react'

import PropTypes from 'prop-types'

import './hero.css'

const Hero = (props) => {
  return (
    <section className="hero-hero">
      <div className="hero-heading">
        <h1 className="hero-header">{props.Header}</h1>
        <p className="hero-caption">{props.Caption}</p>
      </div>
      <div className="hero-buttons">
        <button className="button">{props.View}</button>
        <button className="hero-learn button-clean button">
          {props.Learn}
        </button>
      </div>
    </section>
  )
}

Hero.defaultProps = {
  View: 'Start a League',
  Caption:
    'Invite friends and submit weekly picks for a favorite, an underdog, an over, and an under!',
  Learn: 'Learn more',
  Header: 'Compete with fans across the NFL',
}

Hero.propTypes = {
  View: PropTypes.string,
  Caption: PropTypes.string,
  Learn: PropTypes.string,
  Header: PropTypes.string,
}

export default Hero
