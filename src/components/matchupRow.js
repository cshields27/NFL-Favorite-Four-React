import React from 'react';
import './matchupRow.css';

const getTeamLogoUrl = (teamName) => {
  // Convert the team name to lowercase and replace spaces with dashes
  const formattedTeamName = teamName.toLowerCase().replace(/\s+/g, '-');
  // Construct the URL based on the formatted team name
  return `/img/logos/${formattedTeamName}.png`;
};

const MatchupRow = ({ homeTeam, awayTeam, spread, overUnder, onSelect, selectedOptions }) => {
  const isHomeTeamFavorite = spread < 0;
  const isHomeTeamSelected =
    (selectedOptions.favorite === homeTeam && isHomeTeamFavorite) ||
    (selectedOptions.underdog === homeTeam && !isHomeTeamFavorite);

  const isAwayTeamSelected =
    (selectedOptions.favorite === awayTeam && !isHomeTeamFavorite) ||
    (selectedOptions.underdog === awayTeam && isHomeTeamFavorite);

  const handleTeamSelect = (team) => {
    // Check if the selected team is a favorite or an underdog
    const isFavorite = spread < 0 ? team === homeTeam : team === awayTeam;
    const isUnderdog = spread < 0 ? team === awayTeam : team === homeTeam;

    // If the selected team is a favorite and is different from the currently selected favorite,
    // update the selected favorite
    if (isFavorite && selectedOptions.favorite !== team) {
      onSelect('favorite', team);
    }

    // If the selected team is an underdog and is different from the currently selected underdog,
    // update the selected underdog
    if (isUnderdog && selectedOptions.underdog !== team) {
      onSelect('underdog', team);
    }

    // If the selected team is neither a favorite nor an underdog, reset the selections
    if (!isFavorite && !isUnderdog) {
      onSelect('favorite', null);
      onSelect('underdog', null);
    }
  };

  const renderSpread = () => {
    const spreadToFavorite = isHomeTeamFavorite ? spread : -spread;
    return spreadToFavorite < 0 ? spreadToFavorite : `+${spreadToFavorite}`;
  };

  return (
    <div className="matchup-row">
      {isHomeTeamFavorite ? (
        <>
          <div
            className={`team ${isHomeTeamSelected ? 'selected' : ''}`}
            onClick={() => handleTeamSelect(homeTeam)}
          >
            <img src={getTeamLogoUrl(homeTeam)} alt={homeTeam} className="team-logo" />
            <p className="team-name">{homeTeam}</p>
          </div>
          <div className="spread">{renderSpread()}</div>
          <div
            className={`team ${isAwayTeamSelected ? 'selected' : ''}`}
            onClick={() => handleTeamSelect(awayTeam)}
          >
            <img src={getTeamLogoUrl(awayTeam)} alt={awayTeam} className="team-logo" />
            <p className="team-name">{awayTeam}</p>
          </div>
        </>
      ) : (
        <>
          <div
            className={`team ${isAwayTeamSelected ? 'selected' : ''}`}
            onClick={() => handleTeamSelect(awayTeam)}
          >
            <img src={getTeamLogoUrl(awayTeam)} alt={awayTeam} className="team-logo" />
            <p className="team-name">{awayTeam}</p>
          </div>
          <div className="spread">{renderSpread()}</div>
          <div
            className={`team ${isHomeTeamSelected ? 'selected' : ''}`}
            onClick={() => handleTeamSelect(homeTeam)}
          >
            <img src={getTeamLogoUrl(homeTeam)} alt={homeTeam} className="team-logo" />
            <p className="team-name">{homeTeam}</p>
          </div>
        </>
      )}
      <div className="over-under-options">
        <div
          className={`over ${selectedOptions.over === homeTeam ? 'selected' : ''}`}
          onClick={() => onSelect('over', homeTeam)}
        >
          Over
        </div>
        <div
          className={`under ${selectedOptions.under === awayTeam ? 'selected' : ''}`}
          onClick={() => onSelect('under', awayTeam)}
        >
          Under
        </div>
      </div>
      <div>Total: {overUnder}</div>
      {/* Add any other matchup row elements as needed */}
    </div>
  );
};

export default MatchupRow;
