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

  console.log(matchups)
  const handleSelectOption = (optionType, matchupId) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [optionType]: matchupId
    }));
  };

  return (
    <div className="submit-picks-form">
      <div className="matchup-rows">
        {matchups.map((matchup) => (
          <MatchupRow
            key={matchup.id}
            matchupId={matchup.id}
            homeTeam={matchup.home_team}
            awayTeam={matchup.away_team}
            spread={matchup.spread}
            overUnder={matchup.over_under}
            onSelect={(optionType) =>
              handleSelectOption(optionType, matchup.id)
            }
            selectedOptions={selectedOptions || {}}
          />
        ))}
      </div>
      <button className='submit-button' disabled={false} onClick={() => console.log(selec)}>Submit Picks</button>
    </div>
  );
};

export default SubmitPicksForm