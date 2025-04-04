import React, { useState, useEffect } from 'react';

// UC3: Link Social Media Account
function SocialMediaConnect() {
  const [socialAccounts, setSocialAccounts] = useState([
    { id: 'twitter', name: 'Twitter', connected: false, icon: 'twitter', username: '' },
    { id: 'facebook', name: 'Facebook', connected: false, icon: 'facebook-f', username: '' },
    { id: 'google', name: 'Google', connected: true, icon: 'google', username: 'user@gmail.com' },
    { id: 'linkedin', name: 'LinkedIn', connected: false, icon: 'linkedin-in', username: '' }
  ]);
  
  const [loading, setLoading] = useState({});
  const [error, setError] = useState({});
  
  const handleConnect = (accountId) => {
    // Set loading state for this specific account
    setLoading(prev => ({ ...prev, [accountId]: true }));
    setError(prev => ({ ...prev, [accountId]: null }));
    
    // Simulate OAuth flow
    console.log(`Connecting to ${accountId}...`);
    
    // In a real app, this would open a popup window for OAuth authentication
    // For demo, we'll simulate success after a delay
    setTimeout(() => {
      try {
        // Simulate successful connection (normally this would be a callback from OAuth)
        setSocialAccounts(accounts => 
          accounts.map(account => 
            account.id === accountId 
              ? { 
                  ...account, 
                  connected: true, 
                  username: account.id === 'twitter' 
                    ? '@username' 
                    : account.id === 'facebook'
                      ? 'User Name'
                      : account.id === 'linkedin'
                        ? 'user.name'
                        : account.username
                } 
              : account
          )
        );
        
        setLoading(prev => ({ ...prev, [accountId]: false }));
      } catch (err) {
        // Handle error
        setError(prev => ({ 
          ...prev, 
          [accountId]: 'Failed to connect. Please try again.' 
        }));
        setLoading(prev => ({ ...prev, [accountId]: false }));
      }
    }, 1500);
  };
  
  const handleDisconnect = (accountId) => {
    // Set loading state
    setLoading(prev => ({ ...prev, [accountId]: true }));
    
    // In a real app, this would call an API to revoke OAuth access
    console.log(`Disconnecting from ${accountId}...`);
    
    // Simulate API call
    setTimeout(() => {
      setSocialAccounts(accounts => 
        accounts.map(account => 
          account.id === accountId 
            ? { ...account, connected: false, username: '' } 
            : account
        )
      );
      
      setLoading(prev => ({ ...prev, [accountId]: false }));
    }, 800);
  };
  
  // Benefits explanations for social media connections
  const benefitsByPlatform = {
    twitter: 'Share articles directly to Twitter, follow news sources, and get personalized content based on your Twitter interests.',
    facebook: 'Share your favorite articles with friends, log in with your Facebook account, and get news recommendations from your network.',
    google: 'Quickly log in with your Google account and synchronize your news preferences across devices.',
    linkedin: 'Share professional news content to your LinkedIn network and get industry-specific news recommendations.'
  };

  return (
    <div className="social-media-connect">
      <div className="section-intro">
        <h2>Connect Social Media Accounts</h2>
        <p>Connecting your social media accounts allows you to share articles, log in more easily, and get personalized content recommendations.</p>
      </div>
      
      <div className="social-accounts-list">
        {socialAccounts.map(account => (
          <div key={account.id} className="social-account-card">
            <div className="social-account-icon">
              <i className={`fab fa-${account.icon}`}></i>
            </div>
            
            <div className="social-account-details">
              <h3>{account.name}</h3>
              <p className="social-account-benefit">
                {benefitsByPlatform[account.id]}
              </p>
              
              {account.connected && (
                <div className="connection-status connected">
                  <i className="fas fa-check-circle"></i>
                  <span>Connected as {account.username}</span>
                </div>
              )}
              
              {error[account.id] && (
                <div className="connection-error">
                  <i className="fas fa-exclamation-circle"></i>
                  <span>{error[account.id]}</span>
                </div>
              )}
            </div>
            
            <div className="social-account-actions">
              {account.connected ? (
                <button 
                  className="disconnect-button"
                  onClick={() => handleDisconnect(account.id)}
                  disabled={loading[account.id]}
                >
                  {loading[account.id] ? (
                    <><i className="fas fa-spinner fa-spin"></i> Disconnecting...</>
                  ) : (
                    <><i className="fas fa-unlink"></i> Disconnect</>
                  )}
                </button>
              ) : (
                <button 
                  className={`connect-button connect-${account.id}`}
                  onClick={() => handleConnect(account.id)}
                  disabled={loading[account.id]}
                >
                  {loading[account.id] ? (
                    <><i className="fas fa-spinner fa-spin"></i> Connecting...</>
                  ) : (
                    <><i className="fas fa-link"></i> Connect</>
                  )}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="privacy-note">
        <i className="fas fa-shield-alt"></i>
        <p>We value your privacy. We will never post to your social media accounts without your explicit permission. You can disconnect your accounts at any time.</p>
      </div>
    </div>
  );
}

export default SocialMediaConnect;
