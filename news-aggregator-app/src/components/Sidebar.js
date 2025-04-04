import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="user-profile-summary">
        <div className="user-avatar">
          <img src="https://via.placeholder.com/50" alt="User avatar" />
        </div>
        <div className="user-name">User Name</div>
      </div>
      
      <nav className="sidebar-nav">
        <h3>News</h3>
        <ul>
          <li>
            <Link to="/" className="nav-item active">
              <i className="fas fa-home"></i>
              <span>Main Feed</span>
            </Link>
          </li>
          <li>
            <Link to="/trending" className="nav-item">
              <i className="fas fa-chart-line"></i>
              <span>Trending</span>
            </Link>
          </li>
          <li>
            <Link to="/personalized" className="nav-item">
              <i className="fas fa-user-check"></i>
              <span>For You</span>
            </Link>
          </li>
          <li>
            <Link to="/sports" className="nav-item">
              <i className="fas fa-basketball-ball"></i>
              <span>Sports</span>
            </Link>
          </li>
          <li>
            <Link to="/saved" className="nav-item">
              <i className="fas fa-bookmark"></i>
              <span>Saved Articles</span>
            </Link>
          </li>
        </ul>
        
        <h3>Account</h3>
        <ul>
          <li>
            <Link to="/settings" className="nav-item">
              <i className="fas fa-cog"></i>
              <span>Settings</span>
            </Link>
          </li>
          <li>
            <Link to="/social-connections" className="nav-item">
              <i className="fas fa-share-alt"></i>
              <span>Social Media</span>
            </Link>
          </li>
          <li>
            <Link to="/preferences" className="nav-item">
              <i className="fas fa-sliders-h"></i>
              <span>Feed Preferences</span>
            </Link>
          </li>
        </ul>
      </nav>
      
      <div className="sidebar-footer">
        <button className="theme-toggle">
          <i className="fas fa-moon"></i>
          <span>Dark Mode</span>
        </button>
        <button className="logout-button">
          <i className="fas fa-sign-out-alt"></i>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
