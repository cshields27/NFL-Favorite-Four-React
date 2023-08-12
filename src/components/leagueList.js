// LeagueList.js

import React, { useState, useEffect } from 'react';
import { useAuth } from '../authContext';
import config from '../config';
import './leagueList.css';

const LeagueList = () => {
  const { user } = useAuth();
  const [leagues, setLeagues] = useState([]); // list of {name: name, passcode: passcode}
  const [selectedLeague, setSelectedLeague] = useState({name: '', passcode: ''});
  const [selectedWeek, setSelectedWeek] = useState('');
  const [members, setMembers] = useState([]);
  const [weekOptions, setWeekOptions] = useState([]);

  useEffect(() => {
    fetchLeagueList();
    fetchWeekList();
  }, [user]);

  useEffect(() => {
    if (selectedLeague.name) {
      fetchLeagueMembers(selectedLeague.name);
    }
  }, [selectedLeague]);

  const fetchWeekList = async () => {
    try {
      const response = await fetch(`${config.API_URL}/api/get_past_weeks/`);
      const data = await response.json();
      setWeekOptions(data);
    } catch (error) {
      console.error('Error fetching week list:', error);
    }
  };

  const fetchLeagueList = async () => {
    if (!user) {
      setLeagues([]);
      setMembers([]);
      setSelectedLeague({name: '', passcode: ''});
      return -1;
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
      setMembers(data);
    } catch (error) {
      console.error('Error fetching league members:', error);
    }
  };

  const handleKickMember = async (member) => {
    const confirmMessage = `Are you sure you want to kick ${member.user_email.split('@')[0]}?`;
    if (!window.confirm(confirmMessage)) {
      return;
    }
    const memberId = member.user_id;
    try {
      const response = await fetch(`${config.API_URL}/api/leagues/kick_member/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${user.token}`,
        },
        body: JSON.stringify({
          league_name: selectedLeague.name,
          member_id: memberId,
        }),
      });
      const data = await response.json();
      console.log(data);
      // Refetch league members after kicking a member
      fetchLeagueMembers(selectedLeague.name);
    } catch (error) {
      console.error('Error kicking member:', error);
    }
  };

  const handleLeaveLeague = async () => {
    const confirmMessage = 'Are you sure you want to leave this league?';
    if (!window.confirm(confirmMessage)) {
      return
    }
    try {
      const response = await fetch(`${config.API_URL}/api/leagues/leave_league/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${user.token}`,
        },
        body: JSON.stringify({
          league_name: selectedLeague.name,
        }),
      });
      const data = await response.json();
      console.log(data);
      // Refetch league list after leaving a league
      fetchLeagueList();
      setSelectedLeague({ name: '', passcode: '' });
      setMembers([]);
    } catch (error) {
      console.error('Error leaving league:', error);
    }
  };

  const handleLeagueChange = (event) => {
    const selectedLeagueName = event.target.value;
    const league = leagues.find((league) => league.name === selectedLeagueName);
    setSelectedLeague(league);
    setSelectedWeek('');
  };

  const handleWeekChange = (event) => {
    const selectedWeekNumber = event.target.value;
    setSelectedWeek(selectedWeekNumber);
  };

  return (
    <div className="league-list-container">
      <div className="select-section">
        <select value={selectedLeague.name} onChange={handleLeagueChange}>
          <option value="" disabled>Select a league</option>
          {leagues.map((league) => (
            <option key={league.name} value={league.name}>
              {league.name}
            </option>
          ))}
        </select>

        {selectedLeague.name && (
          <select value={selectedWeek} onChange={handleWeekChange}>
            <option value="" disabled>Select a week</option>
            {weekOptions.map((week) => (
              <option key={week} value={week}>
                Week {week}
              </option>
            ))}
          </select>
        )}
      </div>

      {selectedLeague.name && (
        <div className="league-header">
          <h2>League: {selectedLeague.name}</h2>
          <p>Members: {members.length}</p>
          <p>Passcode: {selectedLeague.passcode}</p>
          {selectedLeague.is_creator ? null : (
            <button className="leave-button" onClick={handleLeaveLeague}>
              Leave
            </button>
          )}
        </div>
      )}

      {selectedLeague.name && (
        <div className="table-section">
          <table>
            {/* Table header */}
            <thead>
              <tr>
                <th>User</th>
                <th>W</th>
                <th>L</th>
                <th>Picks</th>
              </tr>
            </thead>

            {/* Table body */}
            <tbody>
              {members.map((member) => (
                <tr key={member.user_id}>
                  <td>{member.user_email.split('@')[0]}</td>
                  <td>{member.wins}</td>
                  <td>{member.losses}</td>
                  <td>No week chosen</td>
                  {selectedLeague.is_creator && user && member.user_id !== user.id && (
                    <td>
                      <button className="kick-button" onClick={() => handleKickMember(member)}>
                        Kick
                      </button>
                    </td>
                  )}
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
