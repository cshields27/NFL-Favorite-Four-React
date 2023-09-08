import React from 'react';
import './submitPicksForm.css';

export const getTeamLogoUrl = (teamName) => {
  // Convert the team name to lowercase and replace spaces with dashes
  const formattedTeamName = teamName.toLowerCase().replace(/\s+/g, '-');
  // Construct the URL based on the formatted team name
  return `/img/logos/${formattedTeamName}.png`;
};

const MatchupRow = ({ matchupId, homeTeam, awayTeam, spread, overUnder, onSelect, selectedOptions, hasStarted }) => {
  const isHomeTeamFavorite = spread <= 0;
  const isHomeTeamSelected =
    (selectedOptions.favorite === matchupId && isHomeTeamFavorite) ||
    (selectedOptions.underdog === matchupId && !isHomeTeamFavorite);

  const isAwayTeamSelected =
    (selectedOptions.favorite === matchupId && !isHomeTeamFavorite) ||
    (selectedOptions.underdog === matchupId && isHomeTeamFavorite);
  
  const renderSpread = () => {
    const spreadToFavorite = isHomeTeamFavorite ? spread : -spread;
    return spreadToFavorite <= 0 ? (spreadToFavorite == 0 ? 'PK' : spreadToFavorite) : `+${spreadToFavorite}`;
  };

  return (
    <div className={`matchup-row ${hasStarted ? 'started' : ''}`}>
      {isHomeTeamFavorite ? (
        <>
          <div
            className={`team ${isHomeTeamSelected ? 'selected' : ''}`}
            onClick={() => onSelect('favorite')}
          >
            <img src={getTeamLogoUrl(homeTeam)} alt={homeTeam} className="team-logo" />
            <p className="team-name">{homeTeam.split(' ').splice(-1)[0]} (H)</p>
          </div>
          <div className="spread">{renderSpread()}</div>
          <div
            className={`team ${isAwayTeamSelected ? 'selected' : ''}`}
            onClick={() => onSelect('underdog')}
          >
            <img src={getTeamLogoUrl(awayTeam)} alt={awayTeam} className="team-logo" />
            <p className="team-name">{awayTeam.split(' ').splice(-1)[0]} (A)</p>
          </div>
        </>
      ) : (
        <>
          <div
            className={`team ${isAwayTeamSelected ? 'selected' : ''}`}
            onClick={() => onSelect('favorite')}
          >
            <img src={getTeamLogoUrl(awayTeam)} alt={awayTeam} className="team-logo" />
            <p className="team-name">{awayTeam.split(' ').splice(-1)[0]} (A)</p>
          </div>
          <div className="spread">{renderSpread()}</div>
          <div
            className={`team ${isHomeTeamSelected ? 'selected' : ''}`}
            onClick={() => onSelect('underdog')}
          >
            <img src={getTeamLogoUrl(homeTeam)} alt={homeTeam} className="team-logo" />
            <p className="team-name">{homeTeam.split(' ').splice(-1)[0]} (H)</p>
          </div>
        </>
      )}
      <div className="over-under-options">
        <div
          className={`over ${selectedOptions.over === matchupId ? 'selected' : ''}`}
          onClick={() => onSelect('over')}
        >
          Over
        </div>
        <div
          className={`under ${selectedOptions.under === matchupId ? 'selected' : ''}`}
          onClick={() => onSelect('under')}
        >
          Under
        </div>
      </div>
      <div> {overUnder}</div>
      {/* Add any other matchup row elements as needed */}
    </div>
  );
};

export default MatchupRow;