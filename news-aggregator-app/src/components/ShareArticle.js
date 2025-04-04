import React, { useState } from 'react';

// UC5: Social Media Sharing
function ShareArticle({ article, onClose }) {
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(null);
  
  // Available sharing platforms
  const shareOptions = [
    { id: 'twitter', name: 'Twitter', icon: 'twitter', color: '#1DA1F2' },
    { id: 'facebook', name: 'Facebook', icon: 'facebook-f', color: '#4267B2' },
    { id: 'linkedin', name: 'LinkedIn', icon: 'linkedin-in', color: '#0077B5' },
    { id: 'email', name: 'Email', icon: 'envelope', color: '#D44638' },
    { id: 'whatsapp', name: 'WhatsApp', icon: 'whatsapp', color: '#25D366' }
  ];
  
  // Toggle share options dialog
  const toggleShareOptions = () => {
    setShowShareOptions(!showShareOptions);
    // Reset states when opening/closing
    setCopied(false);
    setShareSuccess(null);
  };
  
  // Handle sharing to a specific platform
  const handleShare = (platformId) => {
    console.log(`Sharing to ${platformId}`, article);
    
    // In a real app, this would open the appropriate sharing dialog or API
    // For demonstration purposes, we'll simulate success
    const platformName = shareOptions.find(opt => opt.id === platformId).name;
    
    setTimeout(() => {
      setShareSuccess(`Article shared to ${platformName} successfully!`);
      
      // Auto-dismiss success message after 3 seconds
      setTimeout(() => {
        setShareSuccess(null);
      }, 3000);
    }, 800);
  };
  
  // Copy article link to clipboard
  const copyLink = () => {
    // In a real app, this would be the actual article URL
    const articleUrl = `https://newsapp.example.com/articles/${article.id}`;
    
    navigator.clipboard.writeText(articleUrl)
      .then(() => {
        setCopied(true);
        
        // Reset copied state after 3 seconds
        setTimeout(() => {
          setCopied(false);
        }, 3000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };
  
  return (
    <div className="share-article-component">
      {/* Share button that toggles options */}
      <button 
        className="share-button"
        onClick={toggleShareOptions}
        aria-label="Share article"
      >
        <i className="fas fa-share-alt"></i>
        <span>Share</span>
      </button>
      
      {/* Share options dialog */}
      {showShareOptions && (
        <div className="share-dialog">
          <div className="share-dialog-content">
            <div className="share-header">
              <h3>Share Article</h3>
              <button 
                className="close-button"
                onClick={toggleShareOptions}
                aria-label="Close share dialog"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className="article-preview">
              <img 
                src={article.imageUrl || 'https://via.placeholder.com/150'} 
                alt={article.title} 
                className="article-thumbnail"
              />
              <h4>{article.title}</h4>
            </div>
            
            {shareSuccess && (
              <div className="share-success">
                <i className="fas fa-check-circle"></i>
                <span>{shareSuccess}</span>
              </div>
            )}
            
            <div className="share-options">
              {shareOptions.map(option => (
                <button
                  key={option.id}
                  className="share-option-button"
                  style={{ backgroundColor: option.color }}
                  onClick={() => handleShare(option.id)}
                  aria-label={`Share to ${option.name}`}
                >
                  <i className={`fab fa-${option.icon}`}></i>
                  <span>{option.name}</span>
                </button>
              ))}
            </div>
            
            <div className="copy-link-section">
              <div className="link-container">
                <input 
                  type="text" 
                  readOnly
                  value={`https://newsapp.example.com/articles/${article.id}`}
                  className="link-input"
                />
                <button 
                  className="copy-button"
                  onClick={copyLink}
                  aria-label="Copy link"
                >
                  {copied ? (
                    <><i className="fas fa-check"></i> Copied</>
                  ) : (
                    <><i className="fas fa-copy"></i> Copy</>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShareArticle;
