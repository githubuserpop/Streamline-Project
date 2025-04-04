import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BookmarkButton from './BookmarkButton';

// For displaying bookmarked articles (UC9)
function BookmarkedArticles() {
  const [bookmarkedArticles, setBookmarkedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  
  useEffect(() => {
    // In a real app, this would fetch bookmarked articles from an API
    const fetchBookmarkedArticles = async () => {
      try {
        // Mock data
        const mockArticles = [
          {
            id: 1,
            title: 'The Future of AI in Everyday Applications',
            source: 'Tech News Daily',
            category: 'technology',
            date: '2023-05-15T10:30:00',
            imageUrl: 'https://via.placeholder.com/300x200',
            snippet: 'Artificial intelligence is revolutionizing how we interact with technology in our daily lives...',
            bookmarkedOn: '2023-05-16T08:45:00'
          },
          {
            id: 2,
            title: 'Global Economic Outlook for the Next Quarter',
            source: 'Finance Today',
            category: 'business',
            date: '2023-05-12T14:20:00',
            imageUrl: 'https://via.placeholder.com/300x200',
            snippet: 'Experts predict steady growth despite ongoing challenges in supply chain management...',
            bookmarkedOn: '2023-05-13T19:22:00'
          },
          {
            id: 3,
            title: 'New Study Reveals Benefits of Mediterranean Diet',
            source: 'Health Network',
            category: 'health',
            date: '2023-05-10T09:15:00',
            imageUrl: 'https://via.placeholder.com/300x200',
            snippet: 'Research confirms significant health improvements for participants following the diet for six months...',
            bookmarkedOn: '2023-05-10T12:30:00'
          },
          {
            id: 4,
            title: 'Championship Finals Set After Dramatic Semifinals',
            source: 'Sports Update',
            category: 'sports',
            date: '2023-05-08T22:45:00',
            imageUrl: 'https://via.placeholder.com/300x200',
            snippet: 'Underdogs advance to finals after surprising victory against tournament favorites...',
            bookmarkedOn: '2023-05-09T07:10:00'
          },
          {
            id: 5,
            title: 'Breakthrough in Quantum Computing Reaches New Milestone',
            source: 'Science Daily',
            category: 'science',
            date: '2023-05-05T11:00:00',
            imageUrl: 'https://via.placeholder.com/300x200',
            snippet: 'Researchers achieve quantum advantage with new algorithm solving previously impossible problems...',
            bookmarkedOn: '2023-05-06T14:25:00'
          }
        ];
        
        // Simulate API delay
        setTimeout(() => {
          setBookmarkedArticles(mockArticles);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching bookmarked articles:', error);
        setLoading(false);
      }
    };
    
    fetchBookmarkedArticles();
  }, []);
  
  // Apply filters and sorting
  const filteredAndSortedArticles = () => {
    let filtered = [...bookmarkedArticles];
    
    // Apply category filter
    if (filter !== 'all') {
      filtered = filtered.filter(article => article.category === filter);
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.bookmarkedOn) - new Date(a.bookmarkedOn));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.bookmarkedOn) - new Date(b.bookmarkedOn));
        break;
      case 'az':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'za':
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }
    
    return filtered;
  };
  
  // Handle removal of article from bookmarks
  const handleRemoveBookmark = (articleId) => {
    setBookmarkedArticles(prev => prev.filter(article => article.id !== articleId));
  };
  
  // Format date to readable string
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bookmarked-articles">
      <div className="bookmarks-header">
        <h2>Your Bookmarked Articles</h2>
        <p>Review and manage your saved articles</p>
      </div>
      
      {/* Filters and sorting controls */}
      <div className="bookmarks-controls">
        <div className="filter-dropdown">
          <label htmlFor="categoryFilter">Filter:</label>
          <select 
            id="categoryFilter" 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="technology">Technology</option>
            <option value="business">Business</option>
            <option value="health">Health</option>
            <option value="sports">Sports</option>
            <option value="science">Science</option>
          </select>
        </div>
        
        <div className="sort-dropdown">
          <label htmlFor="sortOrder">Sort by:</label>
          <select 
            id="sortOrder" 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">Most Recent</option>
            <option value="oldest">Oldest First</option>
            <option value="az">A-Z</option>
            <option value="za">Z-A</option>
          </select>
        </div>
      </div>
      
      {/* Loading state */}
      {loading ? (
        <div className="loading-indicator">
          <div className="spinner"></div>
          <p>Loading your bookmarks...</p>
        </div>
      ) : (
        <div className="bookmarked-articles-content">
          {/* Empty state */}
          {bookmarkedArticles.length === 0 ? (
            <div className="empty-bookmarks">
              <i className="far fa-bookmark empty-icon"></i>
              <h3>No bookmarked articles</h3>
              <p>Articles you bookmark will appear here for easy access.</p>
              <Link to="/" className="browse-button">Browse Articles</Link>
            </div>
          ) : (
            <>
              {/* Summary */}
              <div className="bookmarks-summary">
                <p>
                  <span className="count">{filteredAndSortedArticles().length}</span> 
                  {filter === 'all' 
                    ? 'bookmarked articles' 
                    : `articles in ${filter}`}
                </p>
              </div>
              
              {/* Article list */}
              <div className="bookmarked-articles-list">
                {filteredAndSortedArticles().map(article => (
                  <div className="bookmarked-article-card" key={article.id}>
                    <div className="article-image">
                      <img src={article.imageUrl} alt={article.title} />
                      <span className="category-badge">{article.category}</span>
                    </div>
                    
                    <div className="article-content">
                      <h3 className="article-title">
                        <Link to={`/articles/${article.id}`}>{article.title}</Link>
                      </h3>
                      
                      <div className="article-meta">
                        <span className="article-source">{article.source}</span>
                        <span className="article-date">{formatDate(article.date)}</span>
                      </div>
                      
                      <p className="article-snippet">{article.snippet}</p>
                      
                      <div className="bookmark-meta">
                        <span className="bookmark-date">
                          <i className="far fa-clock"></i> Bookmarked on {formatDate(article.bookmarkedOn)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="article-actions">
                      <BookmarkButton 
                        articleId={article.id} 
                        initialBookmarked={true}
                        onRemove={() => handleRemoveBookmark(article.id)}
                      />
                      <Link to={`/articles/${article.id}`} className="read-button">
                        <i className="fas fa-book-open"></i> Read
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default BookmarkedArticles;
