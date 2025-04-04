import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { FiMoon, FiSun, FiSearch, FiMenu } from 'react-icons/fi';
import NewsFeed from './components/NewsFeed';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import './App.css';

// Mock data for the landing page
const mockBreakingNews = [
  { id: 1, title: 'Global markets respond to economic changes', url: '#' },
  { id: 2, title: 'New tech regulations announced by government', url: '#' },
  { id: 3, title: 'Sports championship finals set after semifinals', url: '#' },
  { id: 4, title: 'Health officials release updated guidelines', url: '#' },
];

const mockFeaturedArticle = {
  id: 1,
  title: 'Tech Innovation Drives Economic Growth in Major Markets',
  category: 'Business',
  description: 'Latest reports show technology sector leading recovery as investors turn to innovation for future growth.',
  imageUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  time: '2 hours ago'
};

const mockArticles = [
  {
    id: 2,
    title: 'New Renewable Energy Projects Set to Transform Power Grid',
    category: 'Environment',
    description: 'Major investments in solar and wind power expected to reduce carbon emissions significantly.',
    imageUrl: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    time: '3 hours ago'
  },
  {
    id: 3,
    title: 'Global Health Initiative Launches to Tackle Emerging Challenges',
    category: 'Health',
    description: 'International cooperation brings new resources to worldwide health concerns.',
    imageUrl: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    time: '5 hours ago'
  },
  {
    id: 4,
    title: 'Sports Championship Finals Set After Dramatic Semifinals',
    category: 'Sports',
    description: 'Underdogs advance to finals after surprising victory against tournament favorites.',
    imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    time: '8 hours ago',
    isLive: true
  },
  {
    id: 5,
    title: 'Technology Leaders Announce New Collaboration on AI Standards',
    category: 'Technology',
    description: 'Major tech companies agree on ethical guidelines for artificial intelligence development.',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    time: '10 hours ago'
  }
];

const mockTrending = [
  { id: 1, title: 'Markets react to central bank policy changes' },
  { id: 2, title: 'New study reveals benefits of Mediterranean diet' },
  { id: 3, title: 'Tech company unveils revolutionary product' },
  { id: 4, title: 'International diplomacy efforts focus on climate accord' },
  { id: 5, title: 'Cultural event draws record attendance in major city' }
];

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    // Check for saved preference
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Save preference to localStorage
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    
    // Update theme
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [darkMode]);

  // Check if we're on the home page
  const isHomePage = location.pathname === '/';

  return (
    <div className="App">
      {/* Navigation Bar */}
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
      
      {/* Breaking News Ticker */}
      {isHomePage && (
        <div className="breaking-news-ticker">
          <div className="ticker-content">
            <span className="ticker-label">BREAKING</span>
            <div className="ticker-items">
              {mockBreakingNews.map(item => (
                <div key={item.id} className="ticker-item">
                  <a href={item.url}>{item.title}</a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <main>
        <Routes>
          <Route path="/" element={
            <div className="news-container">
              <div className="main-content">
                {/* Hero Article */}
                <div className="hero-section">
                  <img src={mockFeaturedArticle.imageUrl} alt={mockFeaturedArticle.title} className="hero-image" />
                  <div className="hero-content">
                    <span className="news-category">{mockFeaturedArticle.category}</span>
                    <h1 className="hero-title">{mockFeaturedArticle.title}</h1>
                    <p className="hero-description">{mockFeaturedArticle.description}</p>
                    <div className="news-meta">
                      <span className="news-time">
                        <i className="far fa-clock"></i> {mockFeaturedArticle.time}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Latest News Section */}
                <div>
                  <h2 className="section-title">Latest News</h2>
                  <div className="news-grid">
                    {mockArticles.map(article => (
                      <div key={article.id} className="news-card">
                        <img src={article.imageUrl} alt={article.title} className="news-card-image" />
                        <div className="news-card-content">
                          <div className="news-category">
                            {article.category}
                            {article.isLive && (
                              <span className="live-badge">Live</span>
                            )}
                          </div>
                          <h3 className="news-title">{article.title}</h3>
                          <p>{article.description}</p>
                          <div className="news-meta">
                            <span className="news-time">
                              <i className="far fa-clock"></i> {article.time}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* NewsFeed Component - This includes your existing functionality */}
                <div>
                  <h2 className="section-title">Personalized For You</h2>
                  <NewsFeed />
                </div>
              </div>
              
              {/* Sidebar */}
              <div className="sidebar">
                {/* Trending Section */}
                <div className="sidebar-section">
                  <div className="sidebar-header">Trending Now</div>
                  <div className="sidebar-content">
                    <div className="trending-list">
                      {mockTrending.map((item, index) => (
                        <div key={item.id} className="trending-item">
                          <div className="trending-number">{index + 1}</div>
                          <div className="trending-title">{item.title}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Additional sidebar content can go here */}
                <div className="sidebar-section">
                  <div className="sidebar-header">Editor's Picks</div>
                  <div className="sidebar-content">
                    {/* Content here */}
                  </div>
                </div>
              </div>
            </div>
          } />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Streamline. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
