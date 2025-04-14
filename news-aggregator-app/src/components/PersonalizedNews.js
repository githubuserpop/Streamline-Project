import React, { useState, useEffect } from 'react';
import NewsArticle from './NewsArticle';
import { useNews } from '../hooks/useNews';

function PersonalizedNews() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [personalizedArticles, setPersonalizedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const newsHook = useNews(null);

  const topics = ['All', 'Technology', 'Business', 'Science', 'Health', 'Sports', 'Entertainment', 'Politics', 'Travel'];

  const getCategoryForApi = (uiCategory) => {
    const categoryMap = {
      'All': 'general',
      'Science': 'science',
      'World': 'general',
    };
    return categoryMap[uiCategory] || uiCategory.toLowerCase();
  };

  useEffect(() => {
    async function fetchArticlesForCategory() {
      setLoading(true);
      setError(null);

      try {
        let fetchedArticles = [];

        if (activeFilter === 'All') {
          const data = await newsHook.getNewsByCategory('general');
          fetchedArticles = data || [];
        } else {
          const apiCategory = getCategoryForApi(activeFilter);
          const data = await newsHook.getNewsByCategory(apiCategory);
          fetchedArticles = data || [];
        }

        const formattedArticles = fetchedArticles.map((article, index) => ({
          id: article.id || `article-${index}-${Date.now()}`,
          title: article.title || 'No Title',
          source: article.source?.name || 'Unknown Source',
          publishedAt: formatPublishedDate(article.publishedAt),
          summary: article.description || article.content || 'No description available',
          imageUrl: article.urlToImage || 'https://via.placeholder.com/300x200?text=News',
          url: article.url || '#',
        }));

        setPersonalizedArticles(formattedArticles);
      } catch (err) {
        setError(err.message || 'Failed to load articles');
      } finally {
        setLoading(false);
      }
    }

    fetchArticlesForCategory();
  }, [activeFilter]);

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

  const handleFilterClick = (topic) => {
    setActiveFilter(topic);
  };

  return (
    <section className="news-section personalized-news">
  <div className="">
    {topics.map((topic) => (
      <button
        key={topic}
        onClick={() => handleFilterClick(topic)}
        className={`topic-button ${activeFilter === topic ? 'active' : ''}`}
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
      {personalizedArticles.map((article) => (
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