import React from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import useFirebaseAuth from '../hooks/useFirebaseAuth';
import './submitpicks.css'

const SubmitPicks = () => {
  const { user, handleLogin } = useFirebaseAuth();

  return (
    <div className='home-container'>
      <Navbar></Navbar>
      <div className="submit-picks-container">
        <div className="submit-picks-content">
          <h1 className="submit-picks-heading">Submit Your Picks</h1>
          {user ? (
            <p className="submit-picks-paragraph">
              Welcome, {user.displayName}! Here's where the submission form will go.
            </p>
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
