import React, { useEffect, useState } from 'react';
import MatchupRow from './matchupRow';
import { useAuth } from '../authContext';
import './submitPicksForm.css';

const SubmitPicksForm = (props) => {
  const { user } = useAuth();
  const [selectedOptions, setSelectedOptions] = useState({
    favorite: null,
    underdog: null,
    over: null,
    under: null,
  });

  useEffect(() => {
    if (props.userPicks) {
      setSelectedOptions({
        favorite: props.userPicks.favorite_pick,
        underdog: props.userPicks.underdog_pick,
        over: props.userPicks.over_pick,
        under: props.userPicks.under_pick,
      });
    }
  }, [props.userPicks]);

  const handleSubmitPicks = async () => {
    try {
      // Check if the form is valid before submitting
      const [isValid, errorMessage] = isFormValid();
      if (!isValid) {
        console.error('Form is not valid:', errorMessage);
        return;
      }
      console.log(selectedOptions)
      // Send the selected options to the backend API
      const response = await fetch('http://127.0.0.1:8000/api/weekly_picks/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${user.token}`, // Pass the user token as authorization header
        },
        body: JSON.stringify({
          favorite_pick: selectedOptions.favorite,
          underdog_pick: selectedOptions.underdog,
          over_pick: selectedOptions.over,
          under_pick: selectedOptions.under,
          week_number: props.currentWeek,
        }),
      });
  
      if (response.ok) {
        // Picks submitted successfully
        console.log('Picks submitted successfully!');
      } else {
        // Error submitting picks
        console.error('Error submitting picks:', response);
      }
    } catch (error) {
      console.error('Error submitting picks:', error);
    }
  };

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
        {props.matchups.map((matchup) => (
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
        onClick={handleSubmitPicks}
      >
        {isFormValid()[0] ? 'Submit Picks' : isFormValid()[1]}
      </button>
    </div>
  );
};

export default SubmitPicksForm;
