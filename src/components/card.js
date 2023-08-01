import React from 'react';
import './card.css';

const Card = () => {
  return (
    <section className="card">
      <div className="card-image-container">
        <img
          alt="image"
          src="https://images.unsplash.com/photo-1528675025161-ea13b463cc02?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDJ8fHN1cGVyJTIwYm93bHxlbnwwfHx8fDE2OTA4NTAxNTN8MA&ixlib=rb-4.0.3&h=500"
          className="card-image"
        />
      </div>
      <div className="card-content">
        <h2 className="card-header">Put your football knowledge to the test</h2>
        <p className="card-description">
          Don't let your sharp picks get diluted in a pool where you're forced to pick every spread, losing your edge to a random coworker who lucked out on the Titans - Jags result. By only taking 4 picks a week, you have the flexibility to show everyone that You Know Ball.
        </p>
        <button className="card-learn button">
          <span className="card-text">Make Your Picks</span>
          <img
            alt="arrow"
            src="/Icons/arrow-2.svg"
            className="card-image-arrow"
          />
        </button>
      </div>
    </section>
  );
};

export default Card;