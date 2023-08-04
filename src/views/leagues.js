import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import LeagueForm from '../components/leagueForm';
import './leagues.css';

const Leagues = () => {
  // State to hold the league data (you'll fetch this from the backend)
  const [leagues, setLeagues] = useState([]);

  useEffect(() => {
    // Fetch leagues data when the component mounts
    const fetchLeagues = async () => {
      try {
        // Make an API call to get the leagues data
        // Example:
        // const response = await fetch('http://example.com/api/leagues/');
        // const data = await response.json();
        // setLeagues(data);
      } catch (error) {
        console.error('Error fetching leagues data:', error);
      }
    };

    fetchLeagues();
  }, []);

  return (
    <div className='home-container'> 
      <Navbar />
      <div className="league-page-container">
        <div className="league-page-content">
          <LeagueForm />
          {/* Render the list of leagues */}
          {/* {leagues.map((league) => (
            <div key={league.id} className="league-item">
              <h3>{league.name}</h3>
              <p>{league.description}</p>
              {/* Add more details and actions related to each league */}
            {/* </div>
          ))} */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Leagues;
