import React, { useState, useEffect } from 'react';
import { fetchNewsByCategory } from '../services/newsApi';

function CategoryPage({ category }) {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Formatted Category page for display
  const formatCategoryName = (cat) => {
    return cat.charAt(0).toUpperCase() + cat.slice(1);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchNewsByCategory(category)
      .then(data => {
        setArticles(data.articles || []);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Error fetching category news:", err);
        setError(err.message);
        setIsLoading(false);
      });
  }, [category]);

  return (
    <div className="category-page">
      <h1 className="category-page-title">{formatCategoryName(category)} News</h1>
      
      {isLoading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading {formatCategoryName(category)} news...</p>
        </div>
      )}
      
      {error && (
        <div className="error-container">
          <p>Error loading news: {error}</p>
        </div>
      )}

      <div className="news-container">
        <div className="main-content">
          {articles.length > 0 && (
            <div className="hero-section">
              <img 
                src={articles[0].urlToImage || 'https://via.placeholder.com/1200x600?text=News+Image'} 
                alt={articles[0].title} 
                className="hero-image" 
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/1200x600?text=News+Image';
                }}
              />
              <div className="hero-content">
                <span className="news-category">{articles[0].source?.name || formatCategoryName(category)}</span>
                <h1 className="hero-title">{articles[0].title}</h1>
                <p className="hero-description">{articles[0].description}</p>
                <div className="news-meta">
                  <span className="news-time">
                    <i className="far fa-clock"></i> {new Date(articles[0].publishedAt).toRelativeTimeString()}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="news-grid">
            {articles.slice(1).map((article, index) => (
              <div key={index} className="news-card">
                <img 
                  src={article.urlToImage || 'https://via.placeholder.com/400x200?text=News+Image'} 
                  alt={article.title} 
                  className="news-card-image" 
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x200?text=News+Image';
                  }}
                />
                <div className="news-card-content">
                  <div className="news-category">{article.source?.name || formatCategoryName(category)}</div>
                  <h3 className="news-title">{article.title}</h3>
                  <p>{article.description}</p>
                  <div className="news-meta">
                    <span className="news-time">
                      <i className="far fa-clock"></i> {new Date(article.publishedAt).toRelativeTimeString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;