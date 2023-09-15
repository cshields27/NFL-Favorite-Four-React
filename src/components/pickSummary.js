import React from 'react';
import { getTeamLogoUrl } from './matchupRow'; // Import the function to get the team logo URL
import './pickSummary.css'

const getTeamNamesFromPicks = (userPicks, matchups) => {
  const getFavoriteTeam = (matchup) => (matchup.spread <= 0 ? matchup.home_team : matchup.away_team);
  const getUnderdogTeam = (matchup) => (matchup.spread <= 0 ? matchup.away_team : matchup.home_team);

  const favoriteMatchup = matchups.find((matchup) => matchup.id === userPicks.favorite_pick);
  const underdogMatchup = matchups.find((matchup) => matchup.id === userPicks.underdog_pick);
  const overMatchup = matchups.find((matchup) => matchup.id === userPicks.over_pick);
  const underMatchup = matchups.find((matchup) => matchup.id === userPicks.under_pick);

  const favoriteTeam = favoriteMatchup ? getFavoriteTeam(favoriteMatchup) : '';
  const underdogTeam = underdogMatchup ? getUnderdogTeam(underdogMatchup) : '';
  const overHomeTeam = overMatchup ? overMatchup.home_team : '';
  const overAwayTeam = overMatchup ? overMatchup.away_team : '';
  const underHomeTeam = underMatchup ? underMatchup.home_team : '';
  const underAwayTeam = underMatchup ? underMatchup.away_team : '';

  return {
    favoriteTeam,
    underdogTeam,
    overHomeTeam,
    overAwayTeam,
    underHomeTeam,
    underAwayTeam,
    favoriteMatchup,
    underdogMatchup,
    overMatchup,
    underMatchup,
  };
};

const PickSummary = ({ userPicks, matchups, currentWeek}) => {
  const {
    favoriteTeam,
    underdogTeam,
    overHomeTeam,
    overAwayTeam,
    underHomeTeam,
    underAwayTeam,
    favoriteMatchup,
    underdogMatchup,
    overMatchup,
    underMatchup,
  } = getTeamNamesFromPicks(userPicks, matchups);

  return (
    <div className="pick-summary">
      <h2 className="pick-summary-text"> You're all set for Week {currentWeek}! </h2>
      <div className="pick-summary-row">
        <div className="pick-summary-item">
          <div className="pick-summary-label">Favorite</div>
          <div className="pick-summary-team">
            <img src={getTeamLogoUrl(favoriteTeam)} alt={favoriteTeam} className="team-logo" />
            <p>-{Math.abs(favoriteMatchup.spread)}</p>
          </div>
        </div>
        <div className="pick-summary-item">
          <div className="pick-summary-label">Underdog</div>
          <div className="pick-summary-team">
            <img src={getTeamLogoUrl(underdogTeam)} alt={underdogTeam} className="team-logo" />
            <p>+{Math.abs(underdogMatchup.spread)}</p>
          </div>
        </div>
        <div className="pick-summary-item">
          <div className="pick-summary-label">Over</div>
          <div className="pick-summary-team">
            <img src={getTeamLogoUrl(overHomeTeam)} alt={overHomeTeam} className="team-logo-over-under" />
            <img src={getTeamLogoUrl(overAwayTeam)} alt={overAwayTeam} className="team-logo-over-under" />
            <p>{overMatchup.over_under}</p>
          </div>
        </div>
        <div className="pick-summary-item">
          <div className="pick-summary-label">Under</div>
          <div className="pick-summary-team">
            <img src={getTeamLogoUrl(underHomeTeam)} alt={underHomeTeam} className="team-logo-over-under" />
            <img src={getTeamLogoUrl(underAwayTeam)} alt={underAwayTeam} className="team-logo-over-under" />
            <p>{underMatchup.over_under}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PickSummary;