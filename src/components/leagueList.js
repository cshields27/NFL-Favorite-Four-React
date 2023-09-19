// LeagueList.js

import React, { useState, useEffect } from 'react';
import { useAuth } from '../authContext';
import { getTeamLogoUrl } from './matchupRow'; // Import the function to get the team logo URL
import { useAlert } from 'react-alert'
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
  const alert = useAlert();
  const { user } = useAuth();
  const [leagues, setLeagues] = useState([]); // list of {name: name, passcode: passcode}
  const [selectedLeague, setSelectedLeague] = useState({name: '', passcode: ''});
  const [selectedWeek, setSelectedWeek] = useState('');
  const [members, setMembers] = useState([]);
  const [weekOptions, setWeekOptions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [matchupData, setMatchupData] = useState({});

  useEffect(() => {
    fetchLeagueList();
    fetchWeekList();
  }, [user, refresh]);

  useEffect(() => {
    if (selectedLeague.name) {
      fetchLeagueMembers(selectedLeague.name, currentPage); // may need to remove the currentPage from this call
    }
  }, [selectedLeague, selectedWeek]);

  useEffect(() => {
      if (selectedWeek) {
        fetchMatchupData(selectedWeek);
      }
    }, [user, selectedWeek]);

  const fetchWeekList = async () => {
    try {
      const response = await fetch(`${config.API_URL}/api/get_past_weeks/`);
      const data = await response.json();
      if (data.length > 0) {
        setSelectedWeek(data[0]); // Most recent week
      }
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

      if (data.length > 0) {
        setSelectedLeague(data[0]); // Automatically select the first league if it exists
      }
    } catch (error) {
      console.error('Error fetching league list:', error);
    }
  };

  const fetchLeagueMembers = async (leagueName, page=1) => {
    try {
      let requestBody = {
        league_name: leagueName,
      };
      if (selectedWeek) {
        requestBody.week = selectedWeek;
      }

      const response = await fetch(`${config.API_URL}/api/leagues/league_members/?page=${page}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${user.token}`,
        },
        body: JSON.stringify(requestBody),
      });
      const data = await response.json();
      setMembers(data.results);
      setCurrentPage(page);
      const pageSize = 30; // HAS to be in line with backend - TODO fix this and add custom pagination
      setTotalPages(Math.ceil(data.count / pageSize));
    } catch (error) {
      console.error('Error fetching league members:', error);
    }
  };

  const fetchMatchupData = async (week) => {
    try {
      const response = await fetch(`${config.API_URL}/api/winning_matchups/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${user.token}`,
        },
        body: JSON.stringify({
          week: selectedWeek,
        }),
      });
      const data = await response.json();
      setMatchupData(data);
    } catch (error) {
      console.error('Error fetching winning matchups:', error);
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
      // Refetch league members after kicking a member
      alert.show('Member kicked!');
      fetchLeagueMembers(selectedLeague.name);
    } catch (error) {
      console.error('Error kicking member:', error);
    }
  };

  const handleDeleteLeague = async () => {
    try {
      const response = await fetch(`${config.API_URL}/api/leagues/delete_league/`, {
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
      alert.show('League deleted!');
      setSelectedLeague({name: '', passcode: ''});
      fetchLeagueList();
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
      // Refetch league list after leaving a league
      alert.show('League left!');
      setSelectedLeague({ name: '', passcode: '' });
      fetchLeagueList();
    } catch (error) {
      console.error('Error leaving league:', error);
      alert.error(errorData.message);
    }
  };

  const handleLeagueChange = (event) => {
    const selectedLeagueName = event.target.value;
    const league = leagues.find((league) => league.name === selectedLeagueName);
    setSelectedLeague(league);
  };

  const handleWeekChange = (event) => {
    const selectedWeekNumber = event.target.value;
    setMembers([]);
    setSelectedWeek(selectedWeekNumber);
  };

  const downloadCSV = (leagueName, weekNum, members) => {
    const csvArray = [
      'user_email,wins,losses,favorite_team,favorite_spread,favorite_result,underdog_team,underdog_spread,underdog_result,over_home_team,over_over_under,over_result,under_home_team,under_over_under,under_result'
    ];
  
    members.forEach((member) => {
      const memberInfo = extractMemberInfo(member);
      if (memberInfo) {
        const [favorite_matchup, underdog_matchup, over_matchup, under_matchup, favoriteStatus, underdogStatus, overStatus, underStatus, favoriteStarted, underdogStarted, overStarted, underStarted] = memberInfo;
        const row = [
          member.user_email,
          member.wins,
          member.losses,
          favorite_matchup.spread <= 0 ? favorite_matchup.home_team : favorite_matchup.away_team,
          favorite_matchup.spread,
          favoriteStatus,
          underdog_matchup.spread <= 0 ? underdog_matchup.away_team : underdog_matchup.home_team,
          underdog_matchup.spread,
          underdogStatus,
          over_matchup.home_team,
          over_matchup.over_under,
          overStatus,
          under_matchup.home_team,
          under_matchup.over_under,
          underStatus 
        ];
          csvArray.push(row.join(','));
      }
    });

    const csvString = csvArray.join('\n').replace(/\b(undefined|null)\b/g, '');
  
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `favefour_${leagueName}_week${weekNum}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const allMatchupsStarted = () => {
    if (!matchupData || !matchupData.matchup_details) {
      return false;
    }
  
    let allStarted = true;
    const currentTime = new Date();
  
    Object.values(matchupData.matchup_details).forEach((value) => {
      const matchupStartTime = new Date(value.start_time);
      if (matchupStartTime > currentTime) {
        allStarted = false;
      }
    });
  
    return allStarted;
  };
  
  
  
 const extractMemberInfo = (member) => {
    if (!member.favorite_pick)
      return null;
    const favorite_matchup = matchupData.matchup_details[member.favorite_pick];
    const underdog_matchup = matchupData.matchup_details[member.underdog_pick];
    const over_matchup = matchupData.matchup_details[member.over_pick];
    const under_matchup = matchupData.matchup_details[member.under_pick];

    const favoriteStatus = matchupData.favorites.includes(member.favorite_pick) ? 'won' :  (matchupData.underdogs.includes(member.favorite_pick) ? 'lost' : (matchupData.not_scored.includes(member.favorite_pick) ? 'not-scored' : 'pushed'));
    const underdogStatus = matchupData.underdogs.includes(member.underdog_pick) ? 'won' :  (matchupData.favorites.includes(member.underdog_pick) ? 'lost' : (matchupData.not_scored.includes(member.underdog_pick) ? '' : 'pushed'));
    const overStatus = matchupData.overs.includes(member.over_pick) ? 'won' :  (matchupData.unders.includes(member.over_pick) ? 'lost' : (matchupData.not_scored.includes(member.over_pick) ? 'not-scored' : 'pushed'));
    const underStatus = matchupData.unders.includes(member.under_pick) ? 'won' :  (matchupData.overs.includes(member.under_pick) ? 'lost' : (matchupData.not_scored.includes(member.under_pick) ? 'not-scored' : 'pushed'));

    const currentTime = new Date();
    const favoriteStarted = new Date(favorite_matchup.start_time) <= currentTime;
    const underdogStarted = new Date(underdog_matchup.start_time) <= currentTime;
    const overStarted = new Date(over_matchup.start_time) <= currentTime;
    const underStarted = new Date(under_matchup.start_time) <= currentTime;

    return  [favorite_matchup, underdog_matchup, over_matchup, under_matchup, favoriteStatus, underdogStatus, overStatus, underStatus, favoriteStarted, underdogStarted, overStarted, underStarted];
  }

  const renderMemberInfo = (member) => {
    if (!selectedWeek) {
      return "No week chosen";
    }
    if (!matchupData || !matchupData.matchup_details){
      return "Loading matchup data...";
    }
    
    const res = extractMemberInfo(member);
    
    if (!res) {
      return "No picks submitted";
    }
    const [favorite_matchup, underdog_matchup, over_matchup, under_matchup, favoriteStatus, underdogStatus, overStatus, underStatus, favoriteStarted, underdogStarted, overStarted, underStarted] = res;

    // use member picks and winning matchups to display correct helmets
    const favorite_team = favorite_matchup.spread <= 0 ? favorite_matchup.home_team : favorite_matchup.away_team;
    const underdog_team = underdog_matchup.spread <= 0 ? underdog_matchup.away_team : underdog_matchup.home_team;

    const favorite_logo_url = getTeamLogoUrl(favorite_team);
    const underdog_logo_url = getTeamLogoUrl(underdog_team);
    const over_home_logo_url = getTeamLogoUrl(over_matchup.home_team);
    const over_away_logo_url = getTeamLogoUrl(over_matchup.away_team);
    const under_home_logo_url = getTeamLogoUrl(under_matchup.home_team);
    const under_away_logo_url = getTeamLogoUrl(under_matchup.away_team);

    return (
      <>
        <div className="picks-container">
          <img className={`pick-favorite ${favoriteStatus}`}
            src={favoriteStarted ? favorite_logo_url : 'img/lock.png'} 
            alt={favoriteStarted ? `${favorite_team} logo` : 'Game not started'}
          />
          <img className={`pick-underdog ${underdogStatus}`}
            src={underdogStarted ? underdog_logo_url : 'img/lock.png'} 
            alt={underdogStarted ? `${underdog_team} logo` : 'Game not started'}
          />
          <div className={`pick-over ${overStatus}`}>
            <>
              <img className="pick-over-home" 
                src={overStarted ? over_home_logo_url : 'img/lock.png'} 
                alt={overStarted ? `${over_matchup.home_team} logo` : 'Game not started'} 
              />
              <img className="pick-over-away" 
                src={overStarted ? over_away_logo_url : 'img/lock.png'} 
                alt={overStarted ? `${over_matchup.away_team} logo` : 'Game not started'} 
              />
            </>
          </div>
          <div className={`pick-under ${underStatus}`}>
            <>
              <img className="pick-under-home" 
                src={underStarted ? under_home_logo_url : 'img/lock.png'} 
                alt={underStarted ? `${under_matchup.home_team} logo` : 'Game not started'} 
              />
              <img className="pick-under-away" 
                src={underStarted ? under_away_logo_url : 'img/lock.png'} 
                alt={underStarted ? `${under_matchup.away_team} logo` : 'Game not started'} 
              />
            </>
          </div>
        </div>
      </>
    );
    
    
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
          {selectedLeague.name && selectedWeek && selectedLeague.is_creator && allMatchupsStarted() ? (
            <button className="download-button" onClick={() => {
              const confirmBox = window.confirm(`Download week summary CSV?`)
              if (confirmBox === true) {
                downloadCSV(selectedLeague.name, selectedWeek, members);
              }
            }}>
              Generate CSV
            </button>
          ) : null}
          {selectedLeague.name && selectedLeague.is_creator && Array.isArray(members) && members.length == 1 ? (
            <button className="leave-button" onClick={() => {
              const confirmBox = window.confirm(`Delete league?`)
              if (confirmBox === true) {
                handleDeleteLeague();
              }
            }}>
              Delete
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
                <th className="wl-column">W</th>
                <th className="wl-column">L</th>
                <th>Picks</th>
                {selectedLeague.is_creator && <th className="actions-column">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.user_id}>
                  <td>{member.user_email.split('@')[0]}</td>
                  <td className="wl-column">{member.wins}</td>
                  <td className="wl-column">{member.losses}</td>
                  <td>{renderMemberInfo(member)}</td>
                  {selectedLeague.is_creator && (
                  <td className="actions-column">
                    {user && member.user_id !== user.id && (
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
                )}
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
