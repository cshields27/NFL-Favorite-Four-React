import React from 'react';
import Navbar from '../components/navbar'
import Footer from '../components/footer'

const SubmitPicks = () => {
  return (
    <div className='home-container'>
      <Navbar></Navbar>
      <div className="submit-picks-page">
        <h1>Submit Your Picks</h1>
        <p>Here's where the submission form will go.</p>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default SubmitPicks;