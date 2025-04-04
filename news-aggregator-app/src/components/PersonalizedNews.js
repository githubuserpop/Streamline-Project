import React from 'react';
import NewsArticle from './NewsArticle';

function PersonalizedNews() {
  // Mock data - in a real app, this would come from an API based on user preferences
  const mockPersonalizedArticles = [
    {
      id: 1,
      title: 'New Developments in Machine Learning',
      source: 'AI Weekly',
      publishedAt: '1 day ago',
      summary: 'Recent breakthroughs in neural networks are pushing the boundaries of what AI can achieve.',
      imageUrl: 'https://via.placeholder.com/300x200?text=AI+News',
      url: '#'
    },
    {
      id: 2,
      title: 'The Future of Remote Work in Tech Companies',
      source: 'Tech Insights',
      publishedAt: '2 days ago',
      summary: 'How leading tech companies are reshaping their workplace policies for the post-pandemic world.',
      imageUrl: 'https://via.placeholder.com/300x200?text=Work+Trends',
      url: '#'
    },
    {
      id: 3,
      title: 'Sustainable Energy Solutions Gain Momentum',
      source: 'Green Energy Today',
      publishedAt: '3 days ago',
      summary: 'New investments in renewable energy are accelerating the transition away from fossil fuels.',
      imageUrl: 'https://via.placeholder.com/300x200?text=Energy+News',
      url: '#'
    }
  ];

  return (
    <section className="news-section personalized-news">
      <div className="section-header">
        <h2>For You</h2>
        <div className="section-controls">
          <button className="preference-button" title="Adjust Preferences">
            <i className="fas fa-sliders-h"></i>
          </button>
        </div>
      </div>
      
      <div className="topic-filters">
        <button className="topic-filter active">All</button>
        <button className="topic-filter">Technology</button>
        <button className="topic-filter">Business</button>
        <button className="topic-filter">Science</button>
        <button className="topic-filter">Health</button>
      </div>
      
      <div className="articles-grid">
        {mockPersonalizedArticles.map(article => (
          <NewsArticle key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}

export default PersonalizedNews;
