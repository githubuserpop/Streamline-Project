import React, { useState } from 'react';

function Settings() {
  const [activeTab, setActiveTab] = useState('account');
  
  // These would be populated from an API in a real application
  const [userPreferences, setUserPreferences] = useState({
    categories: {
      technology: true,
      business: true,
      health: false,
      sports: true,
      entertainment: true,
      politics: false,
      science: true
    },
    notifications: {
      breaking: true,
      daily: true,
      trending: false
    },
    theme: 'light',
    fontSize: 'medium'
  });
  
  const socialAccounts = [
    { id: 'twitter', name: 'Twitter', connected: true, icon: 'fab fa-twitter' },
    { id: 'facebook', name: 'Facebook', connected: false, icon: 'fab fa-facebook' },
    { id: 'google', name: 'Google', connected: true, icon: 'fab fa-google' },
    { id: 'linkedin', name: 'LinkedIn', connected: false, icon: 'fab fa-linkedin' }
  ];
  
  const handleCategoryToggle = (category) => {
    setUserPreferences({
      ...userPreferences,
      categories: {
        ...userPreferences.categories,
        [category]: !userPreferences.categories[category]
      }
    });
  };
  
  const handleNotificationToggle = (type) => {
    setUserPreferences({
      ...userPreferences,
      notifications: {
        ...userPreferences.notifications,
        [type]: !userPreferences.notifications[type]
      }
    });
  };
  
  const handleThemeChange = (theme) => {
    setUserPreferences({
      ...userPreferences,
      theme
    });
  };
  
  const handleFontSizeChange = (fontSize) => {
    setUserPreferences({
      ...userPreferences,
      fontSize
    });
  };
  
  const handleSocialConnect = (account) => {
    // In a real app, this would open OAuth flow
    alert(`Connecting to ${account.name} is not implemented in this demo`);
  };
  
  const handleSocialDisconnect = (account) => {
    alert(`Disconnecting from ${account.name} is not implemented in this demo`);
  };
  
  const handleSaveChanges = () => {
    // In a real app, this would save to a database
    alert('Settings saved successfully!');
  };
  
  const handleDeleteAccount = () => {
    const confirmed = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
    if (confirmed) {
      alert('Account deletion is not implemented in this demo');
    }
  };

  return (
    <div className="settings-page">
      <h2>Settings</h2>
      
      <div className="settings-tabs">
        <button 
          className={`tab-button ${activeTab === 'account' ? 'active' : ''}`}
          onClick={() => setActiveTab('account')}
        >
          Account
        </button>
        <button 
          className={`tab-button ${activeTab === 'preferences' ? 'active' : ''}`}
          onClick={() => setActiveTab('preferences')}
        >
          Feed Preferences
        </button>
        <button 
          className={`tab-button ${activeTab === 'social' ? 'active' : ''}`}
          onClick={() => setActiveTab('social')}
        >
          Social Media
        </button>
        <button 
          className={`tab-button ${activeTab === 'appearance' ? 'active' : ''}`}
          onClick={() => setActiveTab('appearance')}
        >
          Appearance
        </button>
      </div>
      
      <div className="settings-content">
        {/* Account Settings */}
        {activeTab === 'account' && (
          <div className="settings-section">
            <h3>Account Settings</h3>
            
            <div className="settings-form">
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" defaultValue="user@example.com" />
              </div>
              
              <div className="form-group">
                <label>Current Password</label>
                <input type="password" placeholder="Enter your current password" />
              </div>
              
              <div className="form-group">
                <label>New Password</label>
                <input type="password" placeholder="Enter a new password" />
              </div>
              
              <div className="form-group">
                <label>Confirm New Password</label>
                <input type="password" placeholder="Confirm your new password" />
              </div>
              
              <button className="save-button" onClick={handleSaveChanges}>
                Save Changes
              </button>
              
              <div className="danger-zone">
                <h4>Danger Zone</h4>
                <button className="delete-account-button" onClick={handleDeleteAccount}>
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Feed Preferences */}
        {activeTab === 'preferences' && (
          <div className="settings-section">
            <h3>Feed Preferences</h3>
            
            <div className="preferences-section">
              <h4>News Categories</h4>
              <p>Select which categories appear in your feed</p>
              
              <div className="categories-grid">
                {Object.entries(userPreferences.categories).map(([category, isSelected]) => (
                  <div key={category} className="category-toggle">
                    <label className={`toggle-switch ${isSelected ? 'active' : ''}`}>
                      <input 
                        type="checkbox" 
                        checked={isSelected}
                        onChange={() => handleCategoryToggle(category)}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                    <span className="category-name">{category.charAt(0).toUpperCase() + category.slice(1)}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="preferences-section">
              <h4>Notifications</h4>
              <p>Control which notifications you receive</p>
              
              <div className="notification-options">
                {Object.entries(userPreferences.notifications).map(([type, isEnabled]) => (
                  <div key={type} className="notification-toggle">
                    <label className={`toggle-switch ${isEnabled ? 'active' : ''}`}>
                      <input 
                        type="checkbox" 
                        checked={isEnabled}
                        onChange={() => handleNotificationToggle(type)}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                    <div className="notification-details">
                      <span className="notification-name">
                        {type === 'breaking' ? 'Breaking News' : 
                         type === 'daily' ? 'Daily Digest' : 'Trending Topics'}
                      </span>
                      <span className="notification-description">
                        {type === 'breaking' ? 'Get notified about major breaking news' : 
                         type === 'daily' ? 'Receive a daily summary of top news' : 
                         'Get updates on trending topics'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <button className="save-button" onClick={handleSaveChanges}>
              Save Preferences
            </button>
          </div>
        )}
        
        {/* Social Media Connections */}
        {activeTab === 'social' && (
          <div className="settings-section">
            <h3>Social Media Connections</h3>
            <p>Connect your social media accounts to share articles or sign in more easily</p>
            
            <div className="social-accounts-list">
              {socialAccounts.map(account => (
                <div key={account.id} className="social-account-item">
                  <i className={account.icon}></i>
                  <span className="account-name">{account.name}</span>
                  
                  {account.connected ? (
                    <button 
                      className="disconnect-button"
                      onClick={() => handleSocialDisconnect(account)}
                    >
                      Disconnect
                    </button>
                  ) : (
                    <button 
                      className="connect-button"
                      onClick={() => handleSocialConnect(account)}
                    >
                      Connect
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Appearance Settings */}
        {activeTab === 'appearance' && (
          <div className="settings-section">
            <h3>Appearance</h3>
            
            <div className="appearance-option">
              <h4>Theme</h4>
              <div className="theme-options">
                <button 
                  className={`theme-button ${userPreferences.theme === 'light' ? 'active' : ''}`}
                  onClick={() => handleThemeChange('light')}
                >
                  <i className="fas fa-sun"></i>
                  <span>Light</span>
                </button>
                <button 
                  className={`theme-button ${userPreferences.theme === 'dark' ? 'active' : ''}`}
                  onClick={() => handleThemeChange('dark')}
                >
                  <i className="fas fa-moon"></i>
                  <span>Dark</span>
                </button>
                <button 
                  className={`theme-button ${userPreferences.theme === 'system' ? 'active' : ''}`}
                  onClick={() => handleThemeChange('system')}
                >
                  <i className="fas fa-laptop"></i>
                  <span>System</span>
                </button>
              </div>
            </div>
            
            <div className="appearance-option">
              <h4>Font Size</h4>
              <div className="font-size-options">
                <button 
                  className={`font-button ${userPreferences.fontSize === 'small' ? 'active' : ''}`}
                  onClick={() => handleFontSizeChange('small')}
                >
                  <span>Small</span>
                </button>
                <button 
                  className={`font-button ${userPreferences.fontSize === 'medium' ? 'active' : ''}`}
                  onClick={() => handleFontSizeChange('medium')}
                >
                  <span>Medium</span>
                </button>
                <button 
                  className={`font-button ${userPreferences.fontSize === 'large' ? 'active' : ''}`}
                  onClick={() => handleFontSizeChange('large')}
                >
                  <span>Large</span>
                </button>
              </div>
            </div>
            
            <button className="save-button" onClick={handleSaveChanges}>
              Save Appearance Settings
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Settings;
