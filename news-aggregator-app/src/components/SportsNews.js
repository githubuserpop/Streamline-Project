import React, { useState } from 'react';
import NewsArticle from './NewsArticle';

function SportsNews() {
  const [activeTab, setActiveTab] = useState('articles');

  // Mock data - in a real app, this would come from a sports data API
  // Make this section dynamic by fetching data from a sports API
  // and displaying the latest sports news, live scores, and standings.
  
  const mockSportsArticles = [
    {
      id: 1,
      title: 'Championship Finals Set to Begin This Weekend',
      source: 'Sports Network',
      publishedAt: '5 hours ago',
      summary: 'The two top teams will face off in what promises to be an epic championship series.',
      imageUrl: 'https://via.placeholder.com/300x200?text=Sports+News',
      url: '#'
    },
    {
      id: 2,
      title: 'Star Player Signs Record-Breaking Contract',
      source: 'Sports Daily',
      publishedAt: '1 day ago',
      summary: 'The league\'s MVP has agreed to a five-year extension worth over $200 million.',
      imageUrl: 'https://via.placeholder.com/300x200?text=Contract+News',
      url: '#'
    }
  ];

  // Mock live scores data
  const mockLiveScores = [
    {
      id: 1,
      homeTeam: 'Eagles',
      awayTeam: 'Tigers',
      homeScore: 24,
      awayScore: 21,
      period: '4th Quarter',
      timeRemaining: '2:30'
    },
    {
      id: 2,
      homeTeam: 'Warriors',
      awayTeam: 'Knights',
      homeScore: 87,
      awayScore: 92,
      period: '3rd Quarter',
      timeRemaining: '4:15'
    },
    {
      id: 3,
      homeTeam: 'United',
      awayTeam: 'City',
      homeScore: 2,
      awayScore: 2,
      period: '2nd Half',
      timeRemaining: '15:00'
    }
  ];

  // Mock standings data
  const mockStandings = [
    { id: 1, team: 'Lions', wins: 14, losses: 3, percentage: '.824' },
    { id: 2, team: 'Bears', wins: 12, losses: 5, percentage: '.706' },
    { id: 3, team: 'Wolves', wins: 11, losses: 6, percentage: '.647' },
    { id: 4, team: 'Eagles', wins: 10, losses: 7, percentage: '.588' },
    { id: 5, team: 'Tigers', wins: 8, losses: 9, percentage: '.471' }
  ];

  return (
    <section className="news-section sports-news">
      <div className="section-header">
        <h2>Sports</h2>
        <div className="section-controls">
          <div className="sports-filters">
            <select className="sport-selector">
              <option>All Sports</option>
              <option>Basketball</option>
              <option>Football</option>
              <option>Baseball</option>
              <option>Soccer</option>
              <option>Tennis</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="sports-tabs">
        <button 
          className={`tab-button ${activeTab === 'articles' ? 'active' : ''}`}
          onClick={() => setActiveTab('articles')}
        >
          News
        </button>
        <button 
          className={`tab-button ${activeTab === 'scores' ? 'active' : ''}`}
          onClick={() => setActiveTab('scores')}
        >
          Live Scores
        </button>
        <button 
          className={`tab-button ${activeTab === 'standings' ? 'active' : ''}`}
          onClick={() => setActiveTab('standings')}
        >
          Standings
        </button>
      </div>
      
      <div className="tab-content">
        {activeTab === 'articles' && (
          <div className="articles-grid">
            {mockSportsArticles.map(article => (
              <NewsArticle key={article.id} article={article} />
            ))}
          </div>
        )}
        
        {activeTab === 'scores' && (
          <div className="live-scores">
            {mockLiveScores.map(game => (
              <div key={game.id} className="score-card">
                <div className="teams">
                  <div className="team home">{game.homeTeam}</div>
                  <div className="team away">{game.awayTeam}</div>
                </div>
                <div className="scores">
                  <div className="score home">{game.homeScore}</div>
                  <div className="score away">{game.awayScore}</div>
                </div>
                <div className="game-info">
                  <span className="period">{game.period}</span>
                  <span className="time">{game.timeRemaining}</span>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {activeTab === 'standings' && (
          <div className="standings-table">
            <table>
              <thead>
                <tr>
                  <th>Team</th>
                  <th>W</th>
                  <th>L</th>
                  <th>Pct</th>
                </tr>
              </thead>
              <tbody>
                {mockStandings.map(team => (
                  <tr key={team.id}>
                    <td>{team.team}</td>
                    <td>{team.wins}</td>
                    <td>{team.losses}</td>
                    <td>{team.percentage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

export default SportsNews;
