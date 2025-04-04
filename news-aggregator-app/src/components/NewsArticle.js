import React from 'react';

function NewsArticle({ article }) {
  // Default values if props are not provided
  const {
    title = 'Article Title',
    source = 'News Source',
    publishedAt = new Date().toLocaleDateString(),
    summary = 'Article summary placeholder...',
    imageUrl = 'https://via.placeholder.com/300x200',
    url = '#'
  } = article || {};

  const handleShare = (platform) => {
    // In a real app, this would integrate with social media APIs
    console.log(`Sharing to ${platform}: ${title}`);
    alert(`Sharing to ${platform} is not implemented yet`);
  };

  return (
    <div className="news-article">
      <div className="article-image">
        <img src={imageUrl} alt={title} />
        <span className="source-label">{source}</span>
      </div>
      <div className="article-content">
        <h3><a href={url} target="_blank" rel="noopener noreferrer">{title}</a></h3>
        <p className="article-date">{publishedAt}</p>
        <p className="article-summary">{summary}</p>
        
        <div className="article-actions">
          <button className="action-button" title="Save for later">
            <i className="far fa-bookmark"></i>
          </button>
          <div className="share-dropdown">
            <button className="action-button" title="Share">
              <i className="fas fa-share-alt"></i>
            </button>
            <div className="share-options">
              <button onClick={() => handleShare('twitter')}>Twitter</button>
              <button onClick={() => handleShare('facebook')}>Facebook</button>
              <button onClick={() => handleShare('linkedin')}>LinkedIn</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsArticle;
