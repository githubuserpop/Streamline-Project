import React, { useState, useEffect } from 'react';
import NewsArticle from './NewsArticle';
import { useNews } from '../hooks/useNews';

function TrendingNews() {
  const [trendingArticles, setTrendingArticles] = useState([]);
  const [breakingNews, setBreakingNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Initialize the news hook
  const { 
    trending: hookTrending,
    breakingNews: hookBreakingNews,
    isLoading: hookLoading,
    error: hookError,
    searchNewsArticles
  } = useNews();

  // Fetch trending and breaking news
  useEffect(() => {
    async function fetchTrendingNews() {
      setLoading(true);
      setError(null);
      
      try {
        // First approach: Use the trending news already provided by the hook
        if (hookTrending && hookTrending.length > 0) {
          setTrendingArticles(formatArticles(hookTrending));
          
          // Use the first breaking news item from the hook if available
          if (hookBreakingNews && hookBreakingNews.length > 0) {
            setBreakingNews(hookBreakingNews[0]);
          }
        } 
        // Second approach: Fetch fresh trending news with specific parameters
        else {
          // Search for articles with 'breaking' or 'urgent' in the title
          const urgentNewsData = await searchNewsArticles('breaking OR urgent');
          
          if (urgentNewsData && urgentNewsData.length > 0) {
            // Set the most recent as breaking news
            setBreakingNews(urgentNewsData[0]);
            
            // Use the rest as trending (max 3)
            setTrendingArticles(formatArticles(urgentNewsData.slice(1, 4)));
          } else {
            // Fallback to general trending topics
            const trendingData = await searchNewsArticles('trending OR popular');
            setTrendingArticles(formatArticles(trendingData?.slice(0, 3) || []));
          }
        }
      } catch (err) {
        console.error('Error fetching trending news:', err);
        setError(err.message || 'Failed to load trending news');
      } finally {
        setLoading(false);
      }
    }
    
    fetchTrendingNews();
    
    // Refresh trending news every 15 minutes
    const refreshInterval = setInterval(fetchTrendingNews, 15 * 60 * 1000);
    
    // Clean up on unmount
    return () => clearInterval(refreshInterval);
  }, []);

  // Format articles for consistency
  const formatArticles = (articles) => {
    return articles.map((article, index) => ({
      id: article.id || `trending-${index}-${Date.now()}`,
      title: article.title || 'No Title',
      source: article.source?.name || 'Unknown Source',
      publishedAt: formatPublishedDate(article.publishedAt),
      summary: article.description || article.content || 'No description available',
      imageUrl: article.urlToImage || 'https://via.placeholder.com/300x200?text=News',
      url: article.url || '#'
    }));
  };

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

  // Handler for refresh button
  const handleRefresh = async () => {
    setLoading(true);
    try {
      // Search for breaking and urgent news
      const urgentNewsData = await searchNewsArticles('breaking OR urgent');
      
      if (urgentNewsData && urgentNewsData.length > 0) {
        // Update breaking news with the most recent item
        setBreakingNews(urgentNewsData[0]);
        
        // Update trending articles
        setTrendingArticles(formatArticles(urgentNewsData.slice(1, 4)));
      } else {
        // Fallback to regular trending topics
        const trendingData = await searchNewsArticles('trending OR popular');
        setTrendingArticles(formatArticles(trendingData?.slice(0, 3) || []));
      }
    } catch (err) {
      console.error('Error refreshing news:', err);
      setError(err.message || 'Failed to refresh news');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="news-section trending-news">
      <div className="section-header">
        <h2>Trending News</h2>
        <div className="section-controls">
          <button 
            className="refresh-button" 
            title="Refresh" 
            onClick={handleRefresh}
            disabled={loading}
          >
            <i className={`fas ${loading ? 'fa-spinner fa-spin' : 'fa-sync-alt'}`}></i>
          </button>
        </div>
      </div>

      {error ? (
        <div className="error-message">{error}</div>
      ) : (
        <>
          <div className="breaking-news-alert">
            <span className="alert-label">BREAKING:</span>
            <span className="alert-text">
              {loading ? 'Loading latest news...' : 
               breakingNews ? breakingNews.title : 
               'No breaking news at the moment'}
            </span>
          </div>

          {loading ? (
            <div className="loading-indicator">Loading trending news...</div>
          ) : trendingArticles.length > 0 ? (
            <div className="articles-grid">
              {trendingArticles.map(article => (
                <NewsArticle key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="no-articles">No trending articles available at the moment.</div>
          )}
        </>
      )}
    </section>
  );
}

export default TrendingNews;