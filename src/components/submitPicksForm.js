import React, { useEffect, useState } from 'react';
import MatchupRow from './matchupRow';
import './submitPicksForm.css';

const SubmitPicksForm = () => {
  const [matchups, setMatchups] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});

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

  const handleSelectOption = (optionType, selectedOption, matchupId) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [matchupId]: {
        ...prevSelectedOptions[matchupId],
        [optionType]: selectedOption,
      },
    }));
  };

  return (
    <div className="submit-picks-form">
      <div className="matchup-rows">
        {matchups.map((matchup) => (
          <MatchupRow
            key={matchup.id}
            homeTeam={matchup.home_team}
            awayTeam={matchup.away_team}
            spread={matchup.spread}
            overUnder={matchup.over_under}
            onSelect={(optionType, selectedOption) =>
              handleSelectOption(optionType, selectedOption, matchup.id)
            }
            selectedOptions={selectedOptions[matchup.id] || {}}
          />
        ))}
      </div>
      {/* Add any other form elements and buttons here */}
    </div>
  );
};

export default SubmitPicksForm;
