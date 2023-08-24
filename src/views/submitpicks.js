import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import PickSummary from '../components/pickSummary';
import { useAuth } from '../authContext';
import SubmitPicksForm from '../components/submitPicksForm';
import config from '../config'
import './submitpicks.css';

const SubmitPicks = () => {
  const { isLoggedIn, user } = useAuth(); // Access authentication state and user data from the context
  const [matchups, setMatchups] = useState([]);
  const [currentWeek, setCurrentWeek] = useState(null);
  const [userPicks, setUserPicks] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      setUserPicks(null);

      const cachedMatchups = sessionStorage.getItem('matchups');
      if (cachedMatchups) {
        console.log('got matchups from cache');
        setMatchups(JSON.parse(cachedMatchups));
        setCurrentWeek(sessionStorage.getItem('currentWeek'));
      } 
      else {
        console.log('fetching matchups from API');
        setIsLoading(true);
        const matchupsResponse = await fetch(`${config.API_URL}/api/upcoming_week_matchups/`);
        const matchupsData = await matchupsResponse.json();
        setMatchups(matchupsData.matchups);
        setCurrentWeek(matchupsData.week_number);
        setIsLoading(false);
        sessionStorage.setItem('matchups', JSON.stringify(matchupsData.matchups));
        sessionStorage.setItem('currentWeek', matchupsData.week_number);
      }

      if (user && isLoggedIn) {
        const cachedUserPicks = sessionStorage.getItem(`userPicks-${user.id}`);
        if (cachedUserPicks) {
          setUserPicks(JSON.parse(cachedUserPicks));
          console.log('got picks from cache');
        }
        else {
          console.log('retrieving user picks from API');
          const userPicksResponse = await fetch(`${config.API_URL}/api/user_picks_for_next_week/`, {
            headers: {
              Authorization: `Token ${user.token}`,
            },
          });

          if (userPicksResponse.ok) {
            const userPicksData = await userPicksResponse.json();
            setUserPicks(userPicksData);
            sessionStorage.setItem(`userPicks-${user.id}`, JSON.stringify(userPicksData));
          }
        }
      }
    } 
    catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isLoggedIn, user]);

  const handlePicksUpdate = () => {
    fetchData();
  };

  const Spinner = () => (
    <div className="spinner-container">
      <div className="spinner"></div>
      <p>Loading matchup data...</p>
    </div>
  );

  return (
    <div className='home-container'>
      <Navbar></Navbar>
      <div className="submit-picks-container">
        <div className="submit-picks-content">
          {userPicks && (
            <PickSummary userPicks={userPicks} matchups={matchups} currentWeek={currentWeek}/>
          )}
          <h1 className="submit-picks-heading">{isLoggedIn && userPicks ? 'Update' : 'Submit'} Picks - Week {currentWeek}</h1>
          <p className="submit-picks-paragraph"> Select 1 favorite, 1 underdog, 1 over, and 1 under by 
            clicking on team logos as well as "over" and "under". <br></br>
            Login, submit, and come back later to see how your picks fared. Share your picks with friends and start a league!
          </p>
          {isLoading ? (<Spinner /> ) : (
            <SubmitPicksForm 
              matchups={matchups} 
              currentWeek={currentWeek} 
              userPicks={userPicks} 
              onPicksUpdate={handlePicksUpdate}
            />
          )}       
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default SubmitPicks;
