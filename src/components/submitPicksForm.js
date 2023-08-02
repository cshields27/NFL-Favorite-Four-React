import React, { useEffect, useState } from 'react';
import MatchupRow from './matchupRow';
import './submitPicksForm.css';

const SubmitPicksForm = () => {
  const [matchups, setMatchups] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({
    favorite: null,
    underdog: null,
    over: null,
    under: null,
  });

  useEffect(() => {
    // Fetch matchups data from the backend API
    const fetchMatchups = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/upcoming_week_matchups/');
        const data = await response.json();
        setMatchups(data.matchups);
      } catch (error) {
        console.error('Error fetching matchups:', error);
      }
    };

    fetchMatchups();
  }, []);

  const handleSelectOption = (optionType, matchupId) => {
    setSelectedOptions((prevSelectedOptions) => {
      const newSelectedOptions = { ...prevSelectedOptions };

      // Check if the option is already selected
      if (prevSelectedOptions[optionType] === matchupId) {
        newSelectedOptions[optionType] = null;
      } else {
        newSelectedOptions[optionType] = matchupId;
      }

      return newSelectedOptions;
    });
  };

  const isFormValid = () => {
    const { favorite, underdog, over, under } = selectedOptions;
    if (!favorite || !underdog || !over || !under) {
      return [false, 'Make 4 selections'];
    }
    if (favorite === underdog) {
      return [false, 'Underdog and favorite must be in different games'];
    } else if (over === under) {
      return [false, 'Over and under must be in different games'];
    }

    return [true, ''];
  };

  return (
    <div className="submit-picks-form">
      <div className="column-labels">
        <div className="label">Favorite</div>
        <div className="label">Spread</div>
        <div className="label">Underdog</div>
        <div className="label">Over/Under</div>
        <div className="label">Total</div>
      </div>
      <div className="matchup-rows">
        {matchups.map((matchup) => (
          <MatchupRow
            key={matchup.id}
            matchupId={matchup.id}
            homeTeam={matchup.home_team}
            awayTeam={matchup.away_team}
            spread={matchup.spread}
            overUnder={matchup.over_under}
            onSelect={(optionType) => handleSelectOption(optionType, matchup.id)}
            selectedOptions={selectedOptions || {}}
          />
        ))}
      </div>
      <button
        className="submit-button"
        disabled={!isFormValid()[0]}
        onClick={() => console.log(selectedOptions)}
      >
        {isFormValid()[0] ? 'Submit Picks' : isFormValid()[1]}
      </button>
    </div>
  );
};

export default SubmitPicksForm;
