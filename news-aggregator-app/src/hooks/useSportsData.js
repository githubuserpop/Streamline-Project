

// src/hooks/useSportsData.js
import { useState } from 'react';

export function useSportsData() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
 
  const API_KEY = 'b5b9a997949a494893fd39a395e1080b';
  const BASE_URL = 'https://api.sportsdata.io/v3'; 
  
  /**
   * Fetch live scores for a specific sport
   * @param {string} sport - Sport category (basketball, football, etc.)
   * @returns {Promise<Array>} - Array of live game scores
   */
  const getLiveScores = async (sport) => {
    setLoading(true);
    setError(null);
    
    try {
      // Map the sport names to API endpoints
      const sportEndpoints = {
        'basketball': 'nba/scores/json/GamesInProgress',
        'football': 'nfl/scores/json/ScoresByWeek/current',
        'baseball': 'mlb/scores/json/GamesInProgress',
        'soccer': 'soccer/scores/json/LiveScores',
        'hockey': 'nhl/scores/json/GamesInProgress',
        'all sports': 'scores/json/LiveScoresAll' // Hypothetical endpoint for all sports
      };
      
      const endpoint = sportEndpoints[sport.toLowerCase()] || sportEndpoints['all sports'];
      const response = await fetch(`${BASE_URL}/${endpoint}?key=${API_KEY}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch live scores: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Format the response to match the application's structure
      return formatLiveScores(data, sport);
    } catch (err) {
      setError(err.message || 'Failed to load live scores');
      return [];
    } finally {
      setLoading(false);
    }
  };
  
  /**
   * Fetch standings for a specific sport
   * @param {string} sport - Sport category (basketball, football, etc.)
   * @returns {Promise<Array>} - Array of team standings
   */
  const getStandings = async (sport) => {
    setLoading(true);
    setError(null);
    
    try {
      //  sport names to API endpoints
      const standingsEndpoints = {
        'basketball': 'nba/scores/json/Standings/current',
        'football': 'nfl/scores/json/Standings/current',
        'baseball': 'mlb/scores/json/Standings/current',
        'soccer': 'soccer/scores/json/Standings',
        'hockey': 'nhl/scores/json/Standings/current',
        'all sports': null // Handle in the component with multiple fetches
      };
      
      if (sport.toLowerCase() === 'all sports') {
        // Fetch standings for multiple sports
        const nbaStandings = await fetch(`${BASE_URL}/nba/scores/json/Standings/current?key=${API_KEY}`);
        const nflStandings = await fetch(`${BASE_URL}/nfl/scores/json/Standings/current?key=${API_KEY}`);
        
        if (!nbaStandings.ok || !nflStandings.ok) {
          throw new Error('Failed to fetch standings for multiple sports');
        }
        
        const nbaData = await nbaStandings.json();
        const nflData = await nflStandings.json();
        
        // Combine and format both standings
        return formatStandings([...nbaData, ...nflData], 'all sports');
      }
      
      const endpoint = standingsEndpoints[sport.toLowerCase()];
      if (!endpoint) {
        throw new Error(`Standings not available for ${sport}`);
      }
      
      const response = await fetch(`${BASE_URL}/${endpoint}?key=${API_KEY}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch standings: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // 
      return formatStandings(data, sport);
    } catch (err) {
      setError(err.message || 'Failed to load standings');
      return [];
    } finally {
      setLoading(false);
    }
  };
  
  /**
   * Format live scores from API response
   * @param {Array} data - Raw API data
   * @param {string} sport - Sport category
   * @returns {Array} - Formatted scores
   */
  const formatLiveScores = (data, sport) => {
    if (!data || !Array.isArray(data)) return [];
    
    // Different formatting based on sport type
    switch (sport.toLowerCase()) {
      case 'basketball':
        return data.map(game => ({
          id: game.GameID || `game-${Math.random().toString(36).substr(2, 9)}`,
          homeTeam: game.HomeTeam,
          awayTeam: game.AwayTeam,
          homeScore: game.HomeScore,
          awayScore: game.AwayScore,
          period: `Q${game.Quarter || game.Period}`,
          timeRemaining: game.TimeRemainingMinutes 
            ? `${game.TimeRemainingMinutes}:${game.TimeRemainingSeconds || '00'}`
            : game.Status,
          sportType: 'basketball',
          startTime: game.DateTime || null,
          status: game.Status
        }));
        
      case 'football':
        return data.map(game => ({
          id: game.GameID || `game-${Math.random().toString(36).substr(2, 9)}`,
          homeTeam: game.HomeTeam,
          awayTeam: game.AwayTeam,
          homeScore: game.HomeScore,
          awayScore: game.AwayScore,
          period: game.Quarter ? `Q${game.Quarter}` : game.Status,
          timeRemaining: game.TimeRemaining || game.Status,
          sportType: 'football',
          startTime: game.DateTime || null,
          status: game.Status
        }));
        
      // Add cases for other sports
      
      default:
        // Generic formatter for unknown sport structures
        return data.map((game, index) => ({
          id: game.GameID || game.ID || `game-${index}-${Date.now()}`,
          homeTeam: game.HomeTeam || game.Home || 'Home Team',
          awayTeam: game.AwayTeam || game.Away || 'Away Team',
          homeScore: game.HomeScore || 0,
          awayScore: game.AwayScore || 0,
          period: game.Period || game.Quarter || game.Status || 'Live',
          timeRemaining: game.TimeRemaining || game.Clock || game.Status || '-',
          sportType: sport.toLowerCase(),
          startTime: game.DateTime || game.StartTime || null,
          status: game.Status || 'In Progress'
        }));
    }
  };
  
  /**
   * Format standings from API response
   * @param {Array} data - Raw API data
   * @param {string} sport - Sport category
   * @returns {Array} - Formatted standings
   */
  const formatStandings = (data, sport) => {
    if (!data || !Array.isArray(data)) return [];
    
    // Different formatting based on sport type
    switch (sport.toLowerCase()) {
      case 'basketball':
        return data.map(team => ({
          id: team.TeamID || `team-${Math.random().toString(36).substr(2, 9)}`,
          team: team.Name || team.Team,
          wins: team.Wins,
          losses: team.Losses,
          percentage: team.Percentage || calculatePercentage(team.Wins, team.Losses),
          sportType: 'basketball',
          conference: team.Conference,
          division: team.Division
        }));
        
      case 'football':
        return data.map(team => ({
          id: team.TeamID || `team-${Math.random().toString(36).substr(2, 9)}`,
          team: team.Name || team.Team,
          wins: team.Wins,
          losses: team.Losses,
          percentage: team.WinningPercentage || calculatePercentage(team.Wins, team.Losses),
          sportType: 'football',
          conference: team.Conference,
          division: team.Division
        }));
        
      // Add cases for other sports
      
      default:
        // Generic formatter for unknown sport structures
        return data.map((team, index) => ({
          id: team.TeamID || team.ID || `team-${index}-${Date.now()}`,
          team: team.Name || team.Team || 'Team',
          wins: team.Wins || 0,
          losses: team.Losses || 0,
          percentage: team.Percentage || team.WinningPercentage || calculatePercentage(team.Wins, team.Losses),
          sportType: sport.toLowerCase(),
          conference: team.Conference || team.Group || '-',
          division: team.Division || '-'
        }));
    }
  };
  
  /**
   * Calculate winning percentage
   * @param {number} wins - Number of wins
   * @param {number} losses - Number of losses
   * @returns {string} - Formatted percentage
   */
  const calculatePercentage = (wins, losses) => {
    const totalGames = wins + losses;
    if (totalGames === 0) return '.000';
    
    const percentage = wins / totalGames;
    return percentage.toFixed(3).toString().substring(1); // Format as .XXX
  };
  
  return {
    getLiveScores,
    getStandings,
    loading,
    error
  };
}