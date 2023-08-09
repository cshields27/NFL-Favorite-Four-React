import React, { useState } from 'react';
import { useAuth } from '../authContext';
import { useAlert } from 'react-alert'
import './leagueForm.css';

const LeagueForm = () => {
  const alert = useAlert()
  const { user } = useAuth();
  const [formType, setFormType] = useState('join'); // Track the selected form type (join or create)
  const [leagueName, setLeagueName] = useState('');
  const [passcode, setPasscode] = useState('');

  const handleFormTypeChange = (event) => {
    setFormType(event.target.value);
  };

  const handleSubmit = async (event) => {
    if (user == null){
      console.log('Must be logged in');
      return -1;
    }
    event.preventDefault();
  
    try {
      if (formType === 'join') {
        const response = await fetch(`http://127.0.0.1:8000/api/leagues/join/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${user.token}`,
          },
          body: JSON.stringify({ name: leagueName, passcode }),
        });
        if (response.ok) {
          const data = await response.json();
          console.log('Joined league', data);
          alert.show('League joined!');
        } 
        else {
          const errorData = await response.json();
          alert.error(errorData.message);
        }
      } 
      else if (formType === 'create') {
        const response = await fetch(`http://127.0.0.1:8000/api/leagues/create/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${user.token}`,
          },
          body: JSON.stringify({ name: leagueName, passcode }),
        });
        if (response.ok) {
          const data = await response.json();
          console.log('Created league', data);
          alert.show('League created!');
        } 
        else {
          const errorData = await response.json();
          alert.error(errorData.message);
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
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
        <button type="submit" onClick={(e) => handleSubmit(e)}>Submit</button>
      </form>
    </div>
  );
};

export default LeagueForm;
