import React, { useState, useEffect } from 'react';
import { useAuth } from '../authContext';
import { getTeamLogoUrl } from './matchupRow';
import config from '../config';
import './profile.css';

const Profile = () => {
  const { user } = useAuth();
  const [isLoadingUserPicks, setIsLoadingUserPicks] = useState(false);
  const [isLoadingUserRecords, setIsLoadingUserRecords] = useState(false);
  const [recordData, setRecordData] = useState({});
  const [weeklyPicks, setWeeklyPicks] = useState([]);

  useEffect(() => {
    if (user){
      setIsLoadingUserPicks(true);
      fetchAllUserPicks();

      setIsLoadingUserRecords(true);
      fetchUserRecords();
    }
  }, [user]);
  
  const fetchAllUserPicks = async () => {
    const storedUserPicks = sessionStorage.getItem(`userPicks_${user.id}`);
    if (storedUserPicks) {
      setWeeklyPicks(JSON.parse(storedUserPicks));
    } 
    else {
      try {
        const response = await fetch(`${config.API_URL}/api/fetch_all_user_picks/`, {
          headers: {
            Authorization: `Token ${user.token}`,
          }
        });
        const data = await response.json();
        setWeeklyPicks(data);
        sessionStorage.setItem(`userPicks_${user.id}`, JSON.stringify(data));
      } catch (error) {
        console.error("There was an error fetching the user's picks:", error);
      }
    }
    setIsLoadingUserPicks(false);
  };

  const fetchUserRecords = async () => {
    const storedUserRecords = sessionStorage.getItem(`userRecords_${user.id}`);
    if (storedUserRecords) {
      setRecordData(JSON.parse(storedUserRecords));
    } 
    else {
      try {
        const response = await fetch(`${config.API_URL}/api/fetch_user_records/`, {
          headers: {
            Authorization: `Token ${user.token}`,
          }
        });
        const data = await response.json();
        setRecordData(data);
        sessionStorage.setItem(`userRecords_${user.id}`, JSON.stringify(data));
      } catch (error) {
        console.error("There was an error fetching the user's records:", error);
      }
    }
    setIsLoadingUserRecords(false);
  };
  
  if (!user) {
    return (
      <div className="profile-container">
        <p className="profile-p">Please log in to view your profile.</p>
      </div>
    );
  }

  const Spinner = () => (
    <div className="spinner-container">
      <div className="spinner"></div>
      <p className="profile-p">Loading user data...</p>
    </div>
  );
  if (isLoadingUserPicks || isLoadingUserRecords) {
    return <Spinner />;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>{user.email.split('@')[0]}</h1>
      </div>
      <div className="record-section">
        {Object.entries(recordData).map(([key, value]) => (
          <div key={key} className="record-card">
            <h2>{key.charAt(0).toUpperCase() + key.slice(1)}</h2>
            <p>{value.wins}-{value.losses}</p>
            <p>{(value.wins + value.losses > 0) ? (value.wins / (value.wins + value.losses)).toFixed(3).slice(1) : (0).toFixed(3).slice(1)}</p>
          </div>
        ))}
      </div>
      <div className="profile-weekly-picks-section">
        {weeklyPicks.length ? weeklyPicks.map((week, index) => (
          <div key={index} className="profile-weekly-pick">
            <h3>Week {week.weekNumber}</h3>
            <div className="profile-picks-container">
              <img className={`profile-pick-favorite ${week.favoriteStatus}`}
                src={getTeamLogoUrl(week.favoriteTeam)} 
                alt={`${week.favoriteTeam} logo`}
              />
              <img className={`profile-pick-underdog ${week.underdogStatus}`}
                src={getTeamLogoUrl(week.underdogTeam)} 
                alt={`${week.underdogTeam} logo`}
              />
              <div className={`profile-pick-over ${week.overStatus}`}>
                <img className="profile-pick-over-home" 
                  src={getTeamLogoUrl(week.overHomeTeam)} 
                  alt={`${week.overHomeTeam} logo`} 
                />
                <img className="profile-pick-over-away" 
                  src={getTeamLogoUrl(week.overAwayTeam)} 
                  alt={`${week.overAwayTeam} logo`} 
                />
              </div>
              <div className={`profile-pick-under ${week.underStatus}`}>
                <img className="profile-pick-under-home" 
                  src={getTeamLogoUrl(week.underHomeTeam)} 
                  alt={`${week.underHomeTeam} logo`} 
                />
                <img className="profile-pick-under-away" 
                  src={getTeamLogoUrl(week.underAwayTeam)} 
                  alt={`${week.underAwayTeam} logo`} 
                />
              </div>
            </div>
          </div>
        )) : <p className="profile-p">No picks submitted for this week.</p>}
      </div>
    </div>
  );
}

export default Profile;
