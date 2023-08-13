// LeagueList.js

import React, { useState, useEffect } from 'react';
import { useAuth } from '../authContext';
import config from '../config';
import './leagueList.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
      <div className="pagination">
          <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
          <span>{currentPage} of {totalPages}</span>
          <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
      </div>
  );
};

const LeagueList = ({ refresh }) => {
  const { user } = useAuth();
  const [leagues, setLeagues] = useState([]); // list of {name: name, passcode: passcode}
  const [selectedLeague, setSelectedLeague] = useState({name: '', passcode: ''});
  const [selectedWeek, setSelectedWeek] = useState('');
  const [members, setMembers] = useState([]);
  const [weekOptions, setWeekOptions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchLeagueList();
    fetchWeekList();
  }, [user, refresh]);

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
      setCurrentPage(1);
      setTotalPages(1);
      return -1;
    }
    try {
      const response = await fetch(`${config.API_URL}/api/leagues/user_leagues/`, {
        headers: {
          Authorization: `Token ${user.token}`,
        },
      });
      const data = await response.json();
      setLeagues(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching league list:', error);
    }
  };

  const fetchLeagueMembers = async (leagueName, page=1) => {
    try {
      const response = await fetch(`${config.API_URL}/api/leagues/league_members/?page=${page}`, {
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
      setMembers(data.results);
      setCurrentPage(page);
      const pageSize = 20; // HAS to be in line with backend - TODO fix this and add custom pagination
      setTotalPages(Math.ceil(data.count / pageSize));
    } catch (error) {
      console.error('Error fetching league members:', error);
    }
  };

  const handleKickMember = async (memberId) => {
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
      <div className="league-header">
        <select className="styled-select" value={selectedLeague.name || ""} onChange={handleLeagueChange}>
          <option value="" disabled>Select League</option>
          {leagues.map((league) => (
            <option key={league.name} value={league.name}>
              {league.name}
            </option>
          ))}
        </select>
        <select className="styled-select" value={selectedWeek || ""} onChange={handleWeekChange}>
          <option value="" disabled>Select Week</option>
          {weekOptions.map((week) => (
              <option key={week} value={week}>
                  Week {week}
              </option>
          ))}
        </select>
        
        <div className="league-info">
          {selectedLeague.name && <>
            <p>Members: {members.length}</p>
            <p>Passcode: {selectedLeague.passcode}</p>
          </>}
          {selectedLeague.name && !selectedLeague.is_creator ? (
            <button className="leave-button" onClick={() => {
              const confirmBox = window.confirm(`Do you really want to leave this league?`)
              if (confirmBox === true) {
                handleLeaveLeague();
              }
            }}>
              Leave
            </button>
          ) : null}
        </div>
      </div>
  
      {selectedLeague.name && (
        <div className="table-section">
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>W</th>
                <th>L</th>
                <th>Picks</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.user_id}>
                  <td>{member.user_email.split('@')[0]}</td>
                  <td>{member.wins}</td>
                  <td>{member.losses}</td>
                  <td>No week chosen</td>
                  <td>
                    {selectedLeague.is_creator && user && member.user_id !== user.id && (
                      <button className="leave-button" onClick={() => {
                        const confirmBox = window.confirm(`Do you really want to kick ${member.user_email.split('@')[0]}?`)
                        if (confirmBox === true) {
                          handleKickMember(member.user_id);
                        }
                      }}>
                        Kick
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => fetchLeagueMembers(selectedLeague.name, page)}
          />
        </div>
      )}
    </div>
  );
};

export default LeagueList;
