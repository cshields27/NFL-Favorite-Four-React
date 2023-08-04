// leagueForm.js

import React, { useState } from 'react';
import './leagueForm.css';

const LeagueForm = () => {
  const [formType, setFormType] = useState('join'); // Track the selected form type (join or create)
  const [leagueName, setLeagueName] = useState('');
  const [passcode, setPasscode] = useState('');

  const handleFormTypeChange = (event) => {
    setFormType(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement join or create league logic here based on the selected form type
    console.log('Form submitted!', formType, leagueName, passcode);
  };

  return (
    <div className="league-form-container">
      <h2>Join or Create a League</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="formType">Select:</label>
          <select
            id="formType"
            name="formType"
            value={formType}
            onChange={handleFormTypeChange}
          >
            <option value="join">Join</option>
            <option value="create">Create</option>
          </select>
        </div>
        <div className="form-row">
          <label htmlFor="leagueName">League Name:</label>
          <input
            type="text"
            id="leagueName"
            name="leagueName"
            value={leagueName}
            onChange={(e) => setLeagueName(e.target.value)}
          />
        </div>
        <div className="form-row">
          <label htmlFor="passcode">Passcode:</label>
          <input
            type="text"
            id="passcode"
            name="passcode"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LeagueForm;
