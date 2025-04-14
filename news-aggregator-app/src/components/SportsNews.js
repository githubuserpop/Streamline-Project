import React, { useState, useEffect, useRef } from 'react';
import NewsArticle from './NewsArticle';
import { useNews } from '../hooks/useNews';
import { useSportsData } from '../hooks/useSportsData';

function SportsNews() {
  const [activeTab, setActiveTab] = useState('articles');
  const [activeSport, setActiveSport] = useState('All Sports');
  const [sportsArticles, setSportsArticles] = useState([]);
  const [liveScores, setLiveScores] = useState([]);
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const widgetLoaded = useRef(false);
  
  // Import the news hook and sports data hook
  const { getNewsByCategory, searchNewsArticles } = useNews();
  const { getLiveScores, getStandings, loading: sportsDataLoading, error: sportsDataError } = useSportsData();
  
  // Sports options
  const sportsOptions = [
    'All Sports', 
    'Basketball', 
    'Football', 
    'Baseball', 
    'Soccer', 
    'Tennis', 
    'Golf', 
    'Hockey'
  ];

  // Load Sportradar widget when "Baseball" is selected in standings tab
  useEffect(() => {
    if (activeTab === 'standings' && activeSport === 'Baseball' && !widgetLoaded.current) {
      // Create script tag for Sportradar widget
      const script = document.createElement('script');
      script.innerHTML = `
        (function(a,b,c,d,e,f,g,h,i){
          a[e]||(i=a[e]=function(){(a[e].q=a[e].q||[]).push(arguments)},i.l=1*new Date,i.o=f,
          g=b.createElement(c),h=b.getElementsByTagName(c)[0],g.async=1,g.src=d,g.setAttribute("n",e),h.parentNode.insertBefore(g,h)
        )})(window,document,"script","https://widgets.media.sportradar.com/67fc8a56a3bea30437523e9e/widgetloader","SIR",
        { language: 'en_us' });
        SIR('addWidget', '#sr-mlb-widget', 'us.season.mlb.standings', {seasonId: 79507});
      `;
      
      document.body.appendChild(script);
      widgetLoaded.current = true;
      
      // Clean up function to remove script when component unmounts
      return () => {
        document.body.removeChild(script);
        widgetLoaded.current = false;
      };
    }
  }, [activeTab, activeSport]);

  // Fetch sports news based on selected sport
  useEffect(() => {
    async function fetchSportsNews() {
      if (activeTab !== 'articles') return;
      
      setLoading(true);
      setError(null);
      
      try {
        let articles = [];
        
        if (activeSport === 'All Sports') {
          // Fetch general sports news
          const sportsNews = await getNewsByCategory('sports');
          articles = sportsNews || [];
        } else {
          // Fetch sport-specific news using search
          const sportName = activeSport.toLowerCase();
          const searchResults = await searchNewsArticles(`${sportName} sports`);
          articles = searchResults || [];
        }
        
        // Format articles for consistency
        const formattedArticles = articles.map((article, index) => ({
          id: article.id || `sports-${index}-${Date.now()}`,
          title: article.title || 'No Title',
          source: article.source?.name || 'Sports News',
          publishedAt: formatPublishedDate(article.publishedAt),
          summary: article.description || article.content || 'No description available',
          imageUrl: article.urlToImage || `https://via.placeholder.com/300x200?text=${activeSport}`,
          url: article.url || '#'
        }));
        
        setSportsArticles(formattedArticles);
      } catch (err) {
        console.error('Error fetching sports news:', err);
        setError(err.message || 'Failed to load sports news');
      } finally {
        setLoading(false);
      }
    }
    
    fetchSportsNews();
  }, [activeTab, activeSport, getNewsByCategory, searchNewsArticles]);

  // Fetch live scores when tab or sport changes
  useEffect(() => {
    async function fetchLiveScores() {
      if (activeTab !== 'scores') return;
      
      setLoading(true);
      setError(null);
      
      try {
        const sportName = activeSport === 'All Sports' ? 'all sports' : activeSport;
        const scores = await getLiveScores(sportName);
        setLiveScores(scores || []);
      } catch (err) {
        console.error('Error fetching live scores:', err);
        setError(err.message || 'Failed to load live scores');
      } finally {
        setLoading(false);
      }
    }
    
    fetchLiveScores();
  }, [activeTab, activeSport, getLiveScores]);

  // Fetch standings when tab or sport changes (except for Baseball which uses the widget)
  useEffect(() => {
    async function fetchStandings() {
      if (activeTab !== 'standings' || activeSport === 'Baseball') return;
      
      setLoading(true);
      setError(null);
      
      try {
        const sportName = activeSport === 'All Sports' ? 'all sports' : activeSport;
        const leagueStandings = await getStandings(sportName);
        setStandings(leagueStandings || []);
      } catch (err) {
        console.error('Error fetching standings:', err);
        setError(err.message || 'Failed to load standings');
      } finally {
        setLoading(false);
      }
    }
    
    fetchStandings();
  }, [activeTab, activeSport, getStandings]);

  // Format date helper function
  const formatPublishedDate = (dateString) => {
    if (!dateString) return 'Recently';
    
    const published = new Date(dateString);
    const now = new Date();
    const diffInMs = now - published;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) {
      const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
      if (diffInHours === 0) {
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
        return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
      }
      return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
    } else if (diffInDays < 7) {
      return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
    } else {
      return published.toLocaleDateString();
    }
  };

  // Handler for sport selection
  const handleSportChange = (e) => {
    setActiveSport(e.target.value);
  };

  // Format game time (for scheduled games)
  const formatGameTime = (dateTimeString) => {
    if (!dateTimeString) return '';
    
    try {
      const gameTime = new Date(dateTimeString);
      return gameTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      return '';
    }
  };

  // Determine if a game is live
  const isGameLive = (status) => {
    const liveStatuses = ['In Progress', 'Live', 'Halftime', 'Ongoing'];
    return liveStatuses.some(s => status && status.includes(s));
  };

  // Group standings by conference/division if applicable
  const groupedStandings = () => {
    if (!standings.length) return {};
    
    // Check if standings have conference/division info
    const hasConference = standings.some(team => team.conference && team.conference !== '-');
    const hasDivision = standings.some(team => team.division && team.division !== '-');
    
    if (!hasConference && !hasDivision) {
      return { 'League Standings': standings };
    }
    
    // Group by conference first, then by division if available
    return standings.reduce((groups, team) => {
      let groupKey;
      
      if (hasDivision && team.division !== '-') {
        groupKey = `${team.conference || ''} ${team.division}`.trim();
      } else if (hasConference && team.conference !== '-') {
        groupKey = team.conference;
      } else {
        groupKey = 'Other';
      }
      
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      
      groups[groupKey].push(team);
      return groups;
    }, {});
  };

  // Render standings content based on selected sport
  const renderStandingsContent = () => {
    if (activeSport === 'Baseball') {
      return (
        <div className="mlb-standings-widget">
          <h3>MLB Standings</h3>
          <div id="sr-mlb-widget" className="sportradar-widget"></div>
        </div>
      );
    }
    
    if (loading) {
      return <div className="loading-indicator">Loading standings...</div>;
    }
    
    if (error) {
      return <div className="error-message">{error}</div>;
    }
    
    if (standings.length > 0) {
      return (
        <div className="standings-tables">
          <h3>{activeSport} Standings</h3>
          
          {Object.entries(groupedStandings()).map(([groupName, groupTeams]) => (
            <div key={groupName} className="standings-group">
              <h4>{groupName}</h4>
              <table className="standings-table">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th className="team-column">Team</th>
                    <th>W</th>
                    <th>L</th>
                    <th>Pct</th>
                  </tr>
                </thead>
                <tbody>
                  {groupTeams.map((team, index) => (
                    <tr key={team.id}>
                      <td>{index + 1}</td>
                      <td className="team-column">{team.team}</td>
                      <td>{team.wins}</td>
                      <td>{team.losses}</td>
                      <td>{team.percentage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      );
    }
    
    return (
      <div className="no-standings">
        No standings available for {activeSport}.
      </div>
    );
  };

  return (
    <section className="news-section sports-news">
      <div className="section-header">
        <h2>Sports</h2>
        <div className="section-controls">
          <div className="sports-filters">
            <select 
              className="sport-selector" 
              value={activeSport} 
              onChange={handleSportChange}
            >
              {sportsOptions.map(sport => (
                <option key={sport} value={sport}>{sport}</option>
              ))}
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
          <>
            {loading ? (
              <div className="loading-indicator">Loading sports news...</div>
            ) : error ? (
              <div className="error-message">{error}</div>
            ) : sportsArticles.length > 0 ? (
              <div className="articles-grid">
                {sportsArticles.map(article => (
                  <NewsArticle key={article.id} article={article} />
                ))}
              </div>
            ) : (
              <div className="no-articles">
                No sports news available for {activeSport}. Try another sport.
              </div>
            )}
          </>
        )}
        
        {activeTab === 'scores' && (
          <div className="live-scores">
            {loading ? (
              <div className="loading-indicator">Loading live scores...</div>
            ) : error ? (
              <div className="error-message">{error}</div>
            ) : liveScores.length > 0 ? (
              <>
                <h3>{activeSport} Live Scores</h3>
                <div className="scores-grid">
                  {liveScores.map(game => (
                    <div key={game.id} className={`score-card ${isGameLive(game.status) ? 'live' : ''}`}>
                      <div className="game-status">
                        {isGameLive(game.status) ? (
                          <span className="live-indicator">LIVE</span>
                        ) : (
                          <span className="game-time">{formatGameTime(game.startTime)}</span>
                        )}
                      </div>
                      <div className="teams-container">
                        <div className="team-row">
                          <div className="team home">{game.homeTeam}</div>
                          <div className="score home">{game.homeScore}</div>
                        </div>
                        <div className="team-row">
                          <div className="team away">{game.awayTeam}</div>
                          <div className="score away">{game.awayScore}</div>
                        </div>
                      </div>
                      <div className="game-info">
                        <span className="period">{game.period}</span>
                        <span className="time">{game.timeRemaining}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="no-scores">
                No live scores available for {activeSport} at the moment.
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'standings' && (
          <div className="standings-container">
            {renderStandingsContent()}
          </div>
        )}
      </div>
    </section>
  );
}

export default SportsNews;