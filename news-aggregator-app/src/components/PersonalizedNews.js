import React, { useState, useEffect } from 'react';
import NewsArticle from './NewsArticle';
import { useNews } from '../hooks/useNews';

function PersonalizedNews() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [personalizedArticles, setPersonalizedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Initialize the useNews hook with null initial category to avoid immediate fetch
  const newsHook = useNews(null);
  
  // Define the available topics for filtering
  const topics = ['All', 'Technology', 'Business', 'Science', 'Health', 'Sports'];
  
  // Map our UI categories to NewsAPI categories if needed
  const getCategoryForApi = (uiCategory) => {
    const categoryMap = {
      'All': 'general',
      'Science': 'science',
      'World': 'general',
      // Others are the same lowercase
    };
    return categoryMap[uiCategory] || uiCategory.toLowerCase();
  };

  // Fetch articles based on selected topic
  useEffect(() => {
    console.log("Fetching articles for category:", activeFilter); // Debug log
    
    async function fetchArticlesForCategory() {
      setLoading(true);
      setError(null);
      
      try {
        let fetchedArticles = [];
        
        if (activeFilter === 'All') {
          // For "All", use the built-in newsHook functionality or fetch from general category
          const data = await newsHook.getNewsByCategory('general');
          fetchedArticles = data || [];
          console.log("Fetched 'All' articles:", fetchedArticles.length); // Debug log
        } else {
          // Get the appropriate category name for the API
          const apiCategory = getCategoryForApi(activeFilter);
          console.log("Using API category:", apiCategory); // Debug log
          
          // Get news for the specific category
          const data = await newsHook.getNewsByCategory(apiCategory);
          fetchedArticles = data || [];
          console.log("Fetched category articles:", fetchedArticles.length); // Debug log
        }
        
        // Format articles to ensure consistent structure
        const formattedArticles = fetchedArticles.map((article, index) => ({
          id: article.id || `article-${index}-${Date.now()}`,
          title: article.title || 'No Title',
          source: article.source?.name || 'Unknown Source',
          publishedAt: formatPublishedDate(article.publishedAt),
          summary: article.description || article.content || 'No description available',
          imageUrl: article.urlToImage || 'https://via.placeholder.com/300x200?text=News',
          url: article.url || '#'
        }));
        
        console.log("Formatted articles:", formattedArticles.length); // Debug log
        setPersonalizedArticles(formattedArticles);
      } catch (err) {
        console.error('Error fetching personalized news:', err);
        setError(err.message || 'Failed to load articles');
      } finally {
        setLoading(false);
      }
    }
    
    fetchArticlesForCategory();
  }, [activeFilter]); // Remove newsHook from dependencies to avoid circular updates

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

  // Handler for topic filter clicks
  const handleFilterClick = (topic) => {
    console.log("Filter clicked:", topic); // Debug log
    setActiveFilter(topic);
  };
  
  // Handler for preference button
  const handlePreferenceClick = () => {
    alert('Preference settings would open here');
  };

  // For debugging - display additional information about the current state
  console.log("Current state:", { 
    activeFilter, 
    articlesCount: personalizedArticles.length,
    loading,
    error
  });

  return (
    <section className="news-section personalized-news">
      <div className="section-header">
        <h2>For You</h2>
        <div className="section-controls">
          <button 
            className="preference-button" 
            title="Adjust Preferences"
            onClick={handlePreferenceClick}
          >
            <i className="fas fa-sliders-h"></i>
          </button>
        </div>
      </div>
      
      <div className="topic-filters">
        {topics.map(topic => (
          <button 
            key={topic}
            className={`topic-filter ${activeFilter === topic ? 'active' : ''}`}
            onClick={() => handleFilterClick(topic)}
          >
            {topic}
          </button>
        ))}
      </div>
      
      {loading ? (
        <div className="loading-indicator">Loading articles... (Category: {activeFilter})</div>
      ) : error ? (
        <div className="error-message">Error: {error}</div>
      ) : personalizedArticles.length > 0 ? (
        <div className="articles-grid">
          {personalizedArticles.map(article => (
            <NewsArticle key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="no-articles">
          No articles found for "{activeFilter}". Try another category.
        </div>
      )}
    </section>
  );
}

export default PersonalizedNews;