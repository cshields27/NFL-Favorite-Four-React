import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { useAuth } from '../authContext';
import useGoogleAuth from '../hooks/useGoogleAuth';
import SubmitPicksForm from '../components/submitPicksForm';
import './submitpicks.css';

const SubmitPicks = () => {
  const { isLoggedIn, user } = useAuth(); // Access authentication state and user data from the context
  const { handleLogin } = useGoogleAuth();
  const [matchups, setMatchups] = useState([]);
  const [currentWeek, setCurrentWeek] = useState(null);
  const [userPicks, setUserPicks] = useState(null);

  useEffect(() => {
    // Fetch matchups data and user picks for the upcoming week when the component mounts
    const fetchData = async () => {
      try {
        setUserPicks(null);
        const matchupsResponse = await fetch('http://127.0.0.1:8000/api/upcoming_week_matchups/');
        const matchupsData = await matchupsResponse.json();
        setMatchups(matchupsData.matchups);
        setCurrentWeek(matchupsData.week_number);

        if (user && isLoggedIn) {
          const userPicksResponse = await fetch(`http://127.0.0.1:8000/api/user_picks_for_next_week/`, {
            headers: {
              Authorization: `Token ${user.token}`, // Pass the user token as authorization header
            },
          });

          if (userPicksResponse.ok) {
            const userPicksData = await userPicksResponse.json();
            setUserPicks(userPicksData);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [isLoggedIn, user]);

  return (
    <div className='home-container'>
      <Navbar></Navbar>
      <div className="submit-picks-container">
        <div className="submit-picks-content">
          <h1 className="submit-picks-heading">{isLoggedIn && userPicks ? 'Update' : 'Submit'} Your Picks</h1>
          {isLoggedIn ? (
            <SubmitPicksForm matchups={matchups} currentWeek={currentWeek} userPicks={userPicks} />
          ) : (
            <div>
              <p className="submit-picks-paragraph">Please log in to submit your picks.</p>
              <button onClick={handleLogin} className="submit-picks-button">
                Login with Google
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default SubmitPicks;
