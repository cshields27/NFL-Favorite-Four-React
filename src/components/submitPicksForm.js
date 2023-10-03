import React, { useEffect, useState } from 'react';
import MatchupRow from './matchupRow';
import useGoogleAuth from '../hooks/useGoogleAuth';
import { useAuth } from '../authContext';
import { useAlert } from 'react-alert'
import './submitPicksForm.css';
import config from '../config'

const SharePicksModal = ({ isVisible, onClose, onShare }) => {
  if (!isVisible) return null;

  const handleBackdropClick = (e) => {
    onClose();
  };

  const handleContentClick = (e) => {
    e.stopPropagation();  // Prevents the click from reaching the backdrop
  };

  return (
    <div className={`modal-background ${isVisible ? 'active' : ''}`} onClick={handleBackdropClick}>
      <div className="modal-content" onClick={handleContentClick}>
        <button className="close-button" onClick={onClose}>X</button>
        <p>Picks are in! Share them?</p>
        <button className="share-button" onClick={onShare}>Share</button>
      </div>
    </div>
  );
};


const SubmitPicksForm = (props) => {
  const alert = useAlert()
  const { isLoggedIn, user } = useAuth();
  const { handleLogin } = useGoogleAuth();
  const [hasAlertBeenShown, setHasAlertBeenShown] = useState(false);
  const [manualChanges, setManualChanges] = useState(0);
  const [mustSubmit, setMustSubmit] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const [selectedOptions, setSelectedOptions] = useState({
    favorite: null,
    underdog: null,
    over: null,
    under: null,
  });

  const setupUnloadListener = () => {
    window.addEventListener('beforeunload', warnUser);
  };
  const removeUnloadListener = () => {
      window.removeEventListener('beforeunload', warnUser);
  };
  const warnUser = (event) => {
      const message = 'You have unsaved changes! Are you sure you want to leave?';
      event.returnValue = message;
      return message;
  };

  useEffect(() => {
    const numNonNullOptions = Object.values(selectedOptions).filter(option => option !== null).length;

    if (numNonNullOptions === 4 && mustSubmit)
        setupUnloadListener();
    else
        removeUnloadListener();

    return () => {
        removeUnloadListener();
    };
  }, [selectedOptions, mustSubmit]);

  useEffect(() => {
    const numNonNullOptions = Object.values(selectedOptions).filter(option => option !== null).length;

    if (manualChanges > 0 && numNonNullOptions === 4 && !hasAlertBeenShown) {
        alert.show("Press submit to lock in your picks!");
        setHasAlertBeenShown(true);
    }
  }, [selectedOptions]);

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

      // Send the selected options to the backend API
      const picks = JSON.stringify({
        favorite_pick: selectedOptions.favorite,
        underdog_pick: selectedOptions.underdog,
        over_pick: selectedOptions.over,
        under_pick: selectedOptions.under,
        week_number: props.currentWeek,
      })
      
      const response = await fetch(`${config.API_URL}/api/weekly_picks/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${user.token}`, // Pass the user token as authorization header
        },
        body: picks,
      });

      if (response.ok) {
        // Picks submitted successfully
        console.log('Picks submitted successfully!');
        sessionStorage.setItem(`userPicks-${user.id}`, picks);
        props.onPicksUpdate();
        //alert.show('Picks submitted!')
        setModalVisible(true);
        window.scrollTo(0, 0);
        setMustSubmit(false);
      } else {
        // Error submitting picks
        const errorData = await response.json();
        alert.error(errorData.message);
        console.error('Error submitting picks:', response);
      }
    } catch (error) {
      console.error('Error submitting picks:', error);
    }
  };

  const getMatchupDetails = (matchupId) => {
    return props.matchups.find(matchup => matchup.id === matchupId);
  }

  const ss = (teamName) => {
    return teamName.split(' ').splice(-1)[0]
  }

  const handleShare = () => {
    const weekNumber = props.currentWeek;
    // Extract and format the selected picks
    const favoriteMatchup = getMatchupDetails(selectedOptions.favorite);
    const underdogMatchup = getMatchupDetails(selectedOptions.underdog);
    const overMatchup = getMatchupDetails(selectedOptions.over);
    const underMatchup = getMatchupDetails(selectedOptions.under);

    const message = `My Favorite Four for Week ${weekNumber}!\n
❗ ​Favorite: ${favoriteMatchup.spread <= 0 ? ss(favoriteMatchup.home_team) : ss(favoriteMatchup.away_team)} -${Math.abs(favoriteMatchup.spread)} vs ${favoriteMatchup.spread <= 0 ? ss(favoriteMatchup.away_team) : ss(favoriteMatchup.home_team)}
🎲 ​Underdog: ${underdogMatchup.spread <= 0 ? ss(underdogMatchup.away_team) : ss(underdogMatchup.home_team)} +${Math.abs(underdogMatchup.spread)} vs ${underdogMatchup.spread <= 0 ? ss(underdogMatchup.home_team) : ss(underdogMatchup.away_team)}
🎉 Over: ${ss(overMatchup.away_team)} vs ${ss(overMatchup.home_team)} o ${overMatchup.over_under}
🥱 ​Under: ${ss(underMatchup.away_team)} vs ${ss(underMatchup.home_team)} u ${underMatchup.over_under}`;

    if (navigator.share) {
      navigator.share({
        title: 'Favorite Four Picks',
        text: message,
        url: 'https://favefour.com',
      });
    } else {
      navigator.clipboard.writeText(message+'\n\nhttps://favefour.com').then(() => {
        alert.show('Copied results to clipboard');
      });
    }
  
    // After sharing, close the modal
    setModalVisible(false);
  };  

  const hasStartedMatchup = (matchupId) => {
    const matchup = props.matchups.find((m) => m.id === matchupId);
    if (matchup) {
      const startTime = new Date(matchup.start_time); // Convert start_time string to a Date object
      const currentTime = new Date();
      return startTime <= currentTime || matchup.is_scored; // Check if the matchup has started
    }
    return false;
  };

  const handleSelectOption = (optionType, matchupId) => {
    // Cannot swap to or from started matchups
    // Check if the current selected option is for a matchup that has started
    const selectedOptionMatchup = selectedOptions[optionType];
    if (selectedOptionMatchup && hasStartedMatchup(selectedOptionMatchup)) {
      return;
    }

    // Check if the newly picked matchup has started
    if (hasStartedMatchup(matchupId)) {
      return;
    }

    setSelectedOptions((prevSelectedOptions) => {
      const newSelectedOptions = { ...prevSelectedOptions };

      // Check if the option is already selected
      if (prevSelectedOptions[optionType] === matchupId) {
        newSelectedOptions[optionType] = null;
      } else {
        newSelectedOptions[optionType] = matchupId;
      }

      // disallow favorite and underdog in same matchup, same with over/under
      if (optionType == 'favorite' && prevSelectedOptions['underdog'] == matchupId)
        newSelectedOptions['underdog'] = null
      if (optionType == 'underdog' && prevSelectedOptions['favorite'] == matchupId)
        newSelectedOptions['favorite'] = null
      if (optionType == 'over' && prevSelectedOptions['under'] == matchupId)
        newSelectedOptions['under'] = null
      if (optionType == 'under' && prevSelectedOptions['over'] == matchupId)
        newSelectedOptions['over'] = null

      setManualChanges(1);
      setMustSubmit(true);
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
      { isLoggedIn ?
        (<button className="submit-button" disabled={!isFormValid()[0]} onClick={handleSubmitPicks}>
          {isFormValid()[0] ? 'Submit Picks' : isFormValid()[1]}
        </button>
        ) : 
        (<button onClick={handleLogin} className="login-button">
            Login with Google to Submit Picks
        </button>)
      }
      <SharePicksModal 
        isVisible={isModalVisible} 
        onClose={() => setModalVisible(false)} 
        onShare={handleShare} 
      />
      <div className="column-labels">
        <div className="label">Favorite</div>
        <div className="label">Spread</div>
        <div className="label">Underdog</div>
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
            hasStarted={hasStartedMatchup(matchup.id)}
          />
        ))}
      </div>
      { isLoggedIn ?
        (<button className="submit-button" disabled={!isFormValid()[0]} onClick={handleSubmitPicks}>
          {isFormValid()[0] ? 'Submit Picks' : isFormValid()[1]}
        </button>
        ) : 
        (<button onClick={handleLogin} className="login-button">
            Login with Google to Submit Picks
        </button>)
      }
    </div>
  );
};

export default SubmitPicksForm;
