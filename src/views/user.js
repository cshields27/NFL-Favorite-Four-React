import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Profile from '../components/profile';

const User = () => {
  const [refreshLeagueList, setRefreshLeagueList] = useState(false);

  const handleRefreshLeagueList = () => {
    setRefreshLeagueList(!refreshLeagueList);
  };

  return (
    <div className='home-container'> 
      <Navbar />
      <div className="user-profile-container">
        <Profile />
      </div>
      <Footer />
    </div>
  );
};

export default User;
