import React, { useState, useEffect } from 'react';

// UC9: Bookmark Article
function BookmarkButton({ articleId, initialBookmarked = false }) {
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);
  const [isProcessing, setIsProcessing] = useState(false);
  const [animateBookmark, setAnimateBookmark] = useState(false);
  
  useEffect(() => {
    setIsBookmarked(initialBookmarked);
  }, [initialBookmarked]);

  const toggleBookmark = () => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    
    // Optimistic UI update
    setIsBookmarked(!isBookmarked);
    
    if (!isBookmarked) {
      setAnimateBookmark(true);
      setTimeout(() => setAnimateBookmark(false), 700);
    }
    
    // In a real app, this would call an API to save the bookmark status
    setTimeout(() => {
      console.log(`Article ${articleId} ${!isBookmarked ? 'bookmarked' : 'unbookmarked'}`);
      setIsProcessing(false);
    }, 600);
  };

  return (
    <button 
      className={`bookmark-button ${isBookmarked ? 'bookmarked' : ''} ${animateBookmark ? 'animate' : ''}`}
      onClick={toggleBookmark}
      disabled={isProcessing}
      aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark article'}
      title={isBookmarked ? 'Remove bookmark' : 'Bookmark article'}
    >
      <i className={`${isBookmarked ? 'fas' : 'far'} fa-bookmark`}></i>
      <span className="bookmark-text">
        {isBookmarked ? 'Bookmarked' : 'Bookmark'}
      </span>
      
      {/* Bookmark tooltip that shows briefly when action is completed */}
      <span className={`bookmark-tooltip ${isProcessing ? 'show' : ''}`}>
        {isBookmarked ? 'Added to bookmarks' : 'Removed from bookmarks'}
      </span>
    </button>
  );
}

export default BookmarkButton;
