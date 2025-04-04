import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ArticleDetailPage() {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setTimeout(() => {
          setArticle({
            id: articleId,
            title: 'Article Title',
            content: 'Full article content would be displayed here. This is a detailed view of the article that includes all the paragraphs, images, and other media that comprise the full content. In a real implementation, this would be fetched from a backend API and might include rich text formatting, embedded videos, or interactive elements.',
            publishedAt: new Date().toLocaleDateString(),
            source: 'News Source',
            imageUrl: 'https://via.placeholder.com/800x400',
            author: 'John Doe',
            category: 'Politics',
            tags: ['politics', 'government', 'election']
          });
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching article:', error);
        setLoading(false);
      }
    };

    fetchArticle();
  }, [articleId]);

  const handleShare = (platform) => {
    console.log(`Sharing to ${platform}: ${article?.title}`);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        alert('Link copied to clipboard!');
      })
      .catch(err => {
        console.error('Could not copy text: ', err);
      });
  };

  if (loading) {
    return (
      <div className="article-loading">
        <div className="loading-spinner"></div>
        <p>Loading article...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="article-not-found">
        <i className="fas fa-search"></i>
        <p>Article not found</p>
        <button onClick={() => navigate(-1)}>Return to News Feed</button>
      </div>
    );
  }

  return (
    <div className="article-detail-page">
      <div className="article-navigation">
        <button className="back-button" onClick={() => navigate(-1)}>
          <i className="fas fa-arrow-left"></i> Back to News
        </button>
        <div className="article-category-tag">
          <span>{article.category}</span>
        </div>
      </div>

      <div className="article-header">
        <h1>{article.title}</h1>
        <div className="article-meta">
          <span className="article-source">{article.source}</span>
          <span className="article-date">{article.publishedAt}</span>
          <span className="article-author">By {article.author}</span>
        </div>
      </div>

      <div className="article-featured-image">
        <img src={article.imageUrl} alt={article.title} />
      </div>

      <div className="article-content-full">
        <p>{article.content}</p>
      </div>

      <div className="article-tags">
        {article.tags.map(tag => (
          <span key={tag} className="article-tag">#{tag}</span>
        ))}
      </div>

      <div className="article-actions">
        <div className="share-options">
          <span>Share this article:</span>
          <button onClick={() => handleShare('twitter')} className="share-button twitter">
            <i className="fab fa-twitter"></i>
          </button>
          <button onClick={() => handleShare('facebook')} className="share-button facebook">
            <i className="fab fa-facebook-f"></i>
          </button>
          <button onClick={() => handleShare('linkedin')} className="share-button linkedin">
            <i className="fab fa-linkedin-in"></i>
          </button>
          <button onClick={handleCopyLink} className="share-button copy">
            <i className="fas fa-link"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ArticleDetailPage;
