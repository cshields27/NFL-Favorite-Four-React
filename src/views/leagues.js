import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import LeagueForm from '../components/leagueForm';
import LeagueList from '../components/leagueList';
import './leagues.css';

const Leagues = () => {
  const [refreshLeagueList, setRefreshLeagueList] = useState(false);

  const handleRefreshLeagueList = () => {
    setRefreshLeagueList(!refreshLeagueList);
  };

  return (
    <div className='home-container'> 
      <Navbar />
      <div className="league-page-container">
        <div className="league-page-content">
          <LeagueList refresh={refreshLeagueList}/>
          <LeagueForm onJoinCreateLeague={handleRefreshLeagueList}/>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Leagues;
