import React from 'react';
import NewsArticle from './NewsArticle';

function TrendingNews() {
  // Mock data - in a real app, this would come from an API
  const mockTrendingArticles = [
    {
      id: 1,
      title: 'Major Tech Company Announces Revolutionary Product',
      source: 'Tech Today',
      publishedAt: '2 hours ago',
      summary: 'The latest innovation promises to change how we interact with technology.',
      imageUrl: 'https://via.placeholder.com/300x200?text=Tech+News',
      url: '#'
    },
    {
      id: 2,
      title: 'Global Climate Summit Reaches Historic Agreement',
      source: 'World News',
      publishedAt: '4 hours ago',
      summary: 'Leaders from 195 countries have agreed to ambitious new carbon reduction targets.',
      imageUrl: 'https://via.placeholder.com/300x200?text=Climate+News',
      url: '#'
    },
    {
      id: 3,
      title: 'Financial Markets Experience Record Growth',
      source: 'Business Daily',
      publishedAt: '6 hours ago',
      summary: 'Stock indexes hit all-time highs as economic recovery continues to accelerate.',
      imageUrl: 'https://via.placeholder.com/300x200?text=Financial+News',
      url: '#'
    }
  ];

  return (
    <section className="news-section trending-news">
      <div className="section-header">
        <h2>Trending News</h2>
        <div className="section-controls">
          <button className="refresh-button" title="Refresh">
            <i className="fas fa-sync-alt"></i>
          </button>
        </div>
      </div>
      
      <div className="breaking-news-alert">
        <span className="alert-label">BREAKING:</span>
        <span className="alert-text">Latest breaking news headline appears here</span>
      </div>
      
      <div className="articles-grid">
        {mockTrendingArticles.map(article => (
          <NewsArticle key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}

export default TrendingNews;
