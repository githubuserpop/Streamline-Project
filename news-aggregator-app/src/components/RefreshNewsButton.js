import React, { useState, useEffect } from 'react';

// UC7: Refresh News Feed
function RefreshNewsButton({ onRefresh }) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState(new Date());
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  
  useEffect(() => {
    let refreshInterval;
    
    if (autoRefresh) {
      // Set up auto-refresh every 5 minutes
      refreshInterval = setInterval(() => {
        handleRefreshNews();
      }, 5 * 60 * 1000);
    }
    
    return () => {
      if (refreshInterval) {
        clearInterval(refreshInterval);
      }
    };
  }, [autoRefresh]);
  
  const handleRefreshNews = () => {
    setIsRefreshing(true);
    
    // Call the provided onRefresh callback
    if (typeof onRefresh === 'function') {
      // Simulate network delay
      Promise.resolve(onRefresh())
        .then(() => {
          setIsRefreshing(false);
          setLastRefreshed(new Date());
        })
        .catch(() => {
          setIsRefreshing(false);
          // Could handle error notification here
        });
    } else {
      // If no callback provided, just simulate a refresh
      setTimeout(() => {
        setIsRefreshing(false);
        setLastRefreshed(new Date());
      }, 1200);
    }
  };
  
  const getTimeAgo = () => {
    const now = new Date();
    const diffMs = now - lastRefreshed;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 1) return 'just now';
    if (diffMins === 1) return '1 minute ago';
    if (diffMins < 60) return `${diffMins} minutes ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours === 1) return '1 hour ago';
    return `${diffHours} hours ago`;
  };

  return (
    <div className="refresh-news-container">
      <button 
        className="refresh-button"
        onClick={handleRefreshNews}
        disabled={isRefreshing}
        title="Refresh News Feed"
      >
        <i className={`fas fa-sync-alt ${isRefreshing ? 'fa-spin' : ''}`}></i>
        <span>{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
      </button>
      
      <div className="refresh-options">
        <button 
          className="options-toggle"
          onClick={() => setShowOptions(!showOptions)}
          title="Refresh Options"
        >
          <i className="fas fa-ellipsis-v"></i>
        </button>
        
        {showOptions && (
          <div className="options-dropdown">
            <div className="last-refreshed">
              Last updated: {getTimeAgo()}
            </div>
            <div className="auto-refresh-toggle">
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={autoRefresh}
                  onChange={() => setAutoRefresh(!autoRefresh)}
                />
                <span className="toggle-slider"></span>
              </label>
              <span>Auto-refresh</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RefreshNewsButton;
