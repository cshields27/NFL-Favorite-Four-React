import React, { useState, useEffect } from 'react';
import { useAuth } from '../authContext';
import config from '../config'
import './leagueList.css'

const LeagueList = () => {
  const { user } = useAuth();
  const [leagues, setLeagues] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState('');
  const [selectedWeek, setSelectedWeek] = useState('');
  const [members, setMembers] = useState([]);
  const [weekOptions, setWeekOptions] = useState([]);

  useEffect(() => {
    fetchLeagueList();
  }, [user]);

  useEffect(() => {
    fetchWeekList();
  }, []);

  useEffect(() => {
    if (selectedLeague) {
      fetchLeagueMembers(selectedLeague);
    }
  }, [selectedLeague]);

  useEffect(() => {
    if (selectedLeague && selectedWeek) {
      fetchLeaguePicks(selectedLeague, selectedWeek);
    }
  }, [selectedLeague, selectedWeek]);

  const fetchWeekList = async() => {
    try {
      const response = await fetch(`${config.API_URL}/api/get_past_weeks/`);
      const data = await response.json();
      setWeekOptions(data);
    } catch (error) {
      console.error('Error fetching week list:', error);
    }
  }

  const fetchLeagueList = async () => {
    if (!user){
      setLeagues([]);
      setMembers([]);
      setSelectedLeague('');
      return -1
    }
    try {
      const response = await fetch(`${config.API_URL}/api/leagues/user_leagues/`, {
        headers: {
          Authorization: `Token ${user.token}`,
        },
      });
      const data = await response.json();
      setLeagues(data);
    } catch (error) {
      console.error('Error fetching league list:', error);
    }
  };

  const fetchLeagueMembers = async (leagueName) => {
    try {
      const response = await fetch(`${config.API_URL}/api/leagues/league_members/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${user.token}`,
        },
        body: JSON.stringify({
          league_name: leagueName,
        }),
      });
      const data = await response.json();
      console.log(data);
      setMembers(data);
    } catch (error) {
      console.error('Error fetching league members:', error);
    }
  };

  const fetchLeaguePicks = async (leagueName, weekNumber) => {
    try {
      const response = await fetch(`${config.API_URL}/api/leagues/league_week_picks/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${user.token}`,
        },
        body: JSON.stringify({
          league_name: leagueName,
          week_number: weekNumber,
        }),
      });
      const data = await response.json();
      console.log(data);
      // Process data as needed for displaying picks
      // ...
    } catch (error) {
      console.error('Error fetching league picks:', error);
    }
  };

  const handleLeagueChange = (event) => {
    const selectedLeagueName = event.target.value;
    setSelectedLeague(selectedLeagueName);
  };

  const handleWeekChange = (event) => {
    const selectedWeekNumber = event.target.value;
    setSelectedWeek(selectedWeekNumber);
  };

  return (
    <div className="league-list-container">
      <div className="select-section">
        <select value={selectedLeague} onChange={handleLeagueChange}>
          <option value="" disabled>Select a league</option>
          {leagues.map((leagueName) => (
            <option key={leagueName} value={leagueName}>{leagueName}</option>
          ))}
        </select>

        {selectedLeague && (
          <select value={selectedWeek} onChange={handleWeekChange}>
            <option value="" disabled>Select a week</option>
            {weekOptions.map((week) => (
              <option key={week} value={week}>Week {week}</option>
            ))}
          </select>
        )}
      </div>

      {selectedLeague && (
        <div className="table-section">
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>W</th>
                <th>L</th>
                <th>Picks</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.user_id}>
                  <td>{member.user_email.split('@')[0]}</td>
                  <td>{member.wins}</td>
                  <td>{member.losses}</td>
                  <td>no week chosen</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LeagueList;
