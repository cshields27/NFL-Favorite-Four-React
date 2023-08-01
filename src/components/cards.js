import React from 'react'

import PropTypes from 'prop-types'

import './cards.css'

const Cards = (props) => {
  return (
    <section className="cards-cards">
      <div className="cards-card">
        <div className="cards-row">
          <div className="cards-main">
            <div className="cards-content">
              <h2 className="cards-header">{props.Header}</h2>
              <p className="cards-description">{props.Description}</p>
            </div>
            <button className="cards-learn button">
              <span className="cards-text">{props.text}</span>
              <img
                alt={props.image_alt1}
                src={props.image_src1}
                className="cards-image"
              />
            </button>
          </div>
          <img
            alt={props.image_alt}
            src={props.image_src}
            className="cards-image1"
          />
        </div>
      </div>
    </section>
  )
}

Cards.defaultProps = {
  image_alt: 'image',
  image_alt1: 'image',
  Header: 'Put your football knowledge to the test',
  Description:
    "Don't let your sharp picks get diluted in a pool where you're forced to pick every spread, losing your edge to a random coworker who lucked out on the Titans - Jags result. By only taking 4 picks a week, you have the flexibility to show everyone that You Know Ball.",
  image_src1: '/Icons/arrow-2.svg',
  text: 'Make Your Picks ',
  image_src:
    'https://images.unsplash.com/photo-1528675025161-ea13b463cc02?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDJ8fHN1cGVyJTIwYm93bHxlbnwwfHx8fDE2OTA4NTAxNTN8MA&ixlib=rb-4.0.3&h=500',
}

Cards.propTypes = {
  image_alt: PropTypes.string,
  image_alt1: PropTypes.string,
  Header: PropTypes.string,
  Description: PropTypes.string,
  image_src1: PropTypes.string,
  text: PropTypes.string,
  image_src: PropTypes.string,
}

export default Cards
