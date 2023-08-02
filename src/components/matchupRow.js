import React, { useState } from 'react';
import './matchupRow.css';

const getTeamLogoUrl = (teamName) => {
  // Convert the team name to lowercase and replace spaces with dashes
  const formattedTeamName = teamName.toLowerCase().replace(/\s+/g, '-');
  // Construct the URL based on the formatted team name
  return `/img/logos/${formattedTeamName}.png`;
};

const MatchupRow = ({ homeTeam, awayTeam, spread, overUnder }) => {
  const [selectedTeam, setSelectedTeam] = useState(null);

  const handleTeamSelect = (team) => {
    setSelectedTeam(team);
  };

  return (
    <div className="matchup-row">
      <div className="team">
        <img src={getTeamLogoUrl(awayTeam)} alt={awayTeam} className="team-logo" />
        <p className="team-name">{awayTeam}</p>
        {selectedTeam === awayTeam && <div className="selected-indicator"></div>}
      </div>
      <div className="spread">{spread}</div>
      <div className="team">
        <img src={getTeamLogoUrl(homeTeam)} alt={homeTeam} className="team-logo" />
        <p className="team-name">{homeTeam}</p>
        {selectedTeam === homeTeam && <div className="selected-indicator"></div>}
      </div>
      <div className="over-under">{overUnder}</div>
      {/* Add any other matchup row elements as needed */}
    </div>
  );
};

export default MatchupRow;
