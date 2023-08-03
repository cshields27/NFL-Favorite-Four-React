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

  // Use useEffect to fetch the matchups data when the component mounts
  useEffect(() => {
    const fetchMatchups = async () => {
      const response = await fetch('http://127.0.0.1:8000/api/upcoming_week_matchups/');
      const data = await response.json();
      setMatchups(data.matchups);
      setCurrentWeek(data.week_number);
    };

    fetchMatchups();
  }, []);

  return (
    <div className='home-container'>
      <Navbar></Navbar>
      <div className="submit-picks-container">
        <div className="submit-picks-content">
          <h1 className="submit-picks-heading">Submit Your Picks</h1>
          {isLoggedIn ? (
            <SubmitPicksForm matchups={matchups} currentWeek={currentWeek} />
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
