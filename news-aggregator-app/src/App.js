import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { FiMoon, FiSun, FiSearch, FiMenu } from 'react-icons/fi';
import NewsFeed from './components/NewsFeed';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import CategoryPage from './pages/CategoryPage'; // Imports the CategoryPage component
import { useNews } from './hooks/useNews';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Hook fetches news data 
  const { 
    breakingNews, 
    featuredArticle, 
    articles, 
    trending,
    isLoading, 
    error 
  } = useNews();

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [darkMode]);

  const isHomePage = location.pathname === '/';

  return (
    <div className="App">
      <nav className="app-bar">
        <div className="app-bar-content">
          <div className="app-menu">
            <button 
              className="menu-button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
            >
              <FiMenu size={24} />
            </button>
            <Link to="/" className="app-title">Streamline</Link>
          </div>
          <div className="app-nav">
            <Link to="/" className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
            <Link to="/world" className={`nav-item ${location.pathname === '/world' ? 'active' : ''}`}>World</Link>
            <Link to="/business" className={`nav-item ${location.pathname === '/business' ? 'active' : ''}`}>Business</Link>
            <Link to="/technology" className={`nav-item ${location.pathname === '/technology' ? 'active' : ''}`}>Technology</Link>
            <Link to="/health" className={`nav-item ${location.pathname === '/health' ? 'active' : ''}`}>Health</Link>
            <Link to="/sports" className={`nav-item ${location.pathname === '/sports' ? 'active' : ''}`}>Sports</Link>
          </div>
          <div className="app-actions">
            <button 
              className="search-button"
              aria-label="Search"
            >
              <FiSearch size={20} />
            </button>
            <button 
              className="theme-toggle"
              onClick={() => setDarkMode(!darkMode)}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>
            <Link to="/login" className="button">Sign In</Link>
          </div>
        </div>
      </nav>
      {isHomePage && breakingNews.length > 0 && (
        <div className="breaking-news-ticker">
          <div className="ticker-content">
            <span className="ticker-label">BREAKING</span>
            <div className="ticker-items">
              {breakingNews.map((item, index) => (
                <div key={index} className="ticker-item">
                  <a href={item.url}>{item.title}</a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <main>
        {isLoading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading news...</p>
          </div>
        )}
        
        {error && (
          <div className="error-container">
            <p>Error loading news: {error}</p>
          </div>
        )}
        
        <Routes>
          <Route path="/" element={
            <div className="news-container">
              <div className="main-content">
                {featuredArticle && (
                  <div className="hero-section">
                    <img 
                      src={featuredArticle.urlToImage || 'https://via.placeholder.com/1200x600?text=News+Image'} 
                      alt={featuredArticle.title} 
                      className="hero-image" 
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/1200x600?text=News+Image';
                      }}
                    />
                    <div className="hero-content">
                      <span className="news-category">{featuredArticle.source?.name || 'News'}</span>
                      <h1 className="hero-title">{featuredArticle.title}</h1>
                      <p className="hero-description">{featuredArticle.description}</p>
                      <div className="news-meta">
                        <span className="news-time">
                          <i className="far fa-clock"></i> {new Date(featuredArticle.publishedAt).toRelativeTimeString()}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                <div>
                  <h2 className="section-title">Latest News</h2>
                  <div className="news-grid">
                    {articles.map((article, index) => (
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
                          <div className="news-category">{article.source?.name || 'News'}</div>
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
                <div>
                  <h2 className="section-title">Personalized For You</h2>
                  <NewsFeed />
                </div>
              </div>
              <div className="sidebar">
                <div className="sidebar-section">
                  <div className="sidebar-header">Trending Now</div>
                  <div className="sidebar-content">
                    <div className="trending-list">
                      {trending.map((item, index) => (
                        <div key={index} className="trending-item">
                          <div className="trending-number">{index + 1}</div>
                          <div className="trending-title">{item.title}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="sidebar-section">
                  <div className="sidebar-header">Editor's Picks</div>
                  <div className="sidebar-content">
                    {/* Content here */}
                  </div>
                </div>
              </div>
            </div>
          } />
          
          {/* Add routes for each category */}
          <Route path="/world" element={<CategoryPage category="world" />} />
          <Route path="/business" element={<CategoryPage category="business" />} />
          <Route path="/technology" element={<CategoryPage category="technology" />} />
          <Route path="/health" element={<CategoryPage category="health" />} />
          <Route path="/sports" element={<CategoryPage category="sports" />} />
          
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>
      <footer className="app-footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Streamline. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

// Function to format article time
Date.prototype.toRelativeTimeString = function() {
  const now = new Date();
  const diffInSeconds = Math.floor((now - this) / 1000);
  
  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hours ago`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} days ago`;
  }
  
  const diffInMonths = Math.floor(diffInDays / 30);
  return `${diffInMonths} months ago`;
};

export default App;