import React, { useState, useEffect } from 'react';
//Implement buttons and checkboxes for user preferences
// UC4: Adjust Personalized News Feed
// UC15: Manage Feed Topics
function FeedPreferences({ onSave }) {
  const [preferences, setPreferences] = useState({
    categories: {
      technology: true,
      business: false,
      health: true,
      sports: true,
      entertainment: false,
      politics: false,
      science: true,
      world: true
    },
    sources: {
      "Tech News Daily": true,
      "World Reports": true,
      "Sports Update": true,
      "Finance Today": false,
      "Science Daily": true,
      "Entertainment Weekly": false,
      "Health Network": true
    },
    displaySettings: {
      showImages: true,
      articlesPerPage: 10,
      sortBy: 'newest',
      layout: 'grid'
    }
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  // Load user preferences from "API"
  useEffect(() => {
    // Simulate API call to fetch user preferences
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    // Reset save success message
    if (saveSuccess) {
      const timer = setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [saveSuccess]);
  
  // Track changes
  useEffect(() => {
    if (!isLoading) {
      setHasChanges(true);
    }
  }, [preferences]);
  
  const handleCategoryToggle = (category) => {
    setPreferences(prev => ({
      ...prev,
      categories: {
        ...prev.categories,
        [category]: !prev.categories[category]
      }
    }));
  };
  
  const handleSourceToggle = (source) => {
    setPreferences(prev => ({
      ...prev,
      sources: {
        ...prev.sources,
        [source]: !prev.sources[source]
      }
    }));
  };
  
  const handleDisplaySettingChange = (setting, value) => {
    setPreferences(prev => ({
      ...prev,
      displaySettings: {
        ...prev.displaySettings,
        [setting]: value
      }
    }));
  };
  
  const handleSavePreferences = () => {
    setIsSaving(true);
    
    // Simulate API call to save preferences
    setTimeout(() => {
      if (typeof onSave === 'function') {
        onSave(preferences);
      }
      
      setIsSaving(false);
      setHasChanges(false);
      setSaveSuccess(true);
    }, 1000);
  };
  
  if (isLoading) {
    return (
      <div className="loading-preferences">
        <div className="loading-spinner"></div>
        <p>Loading your preferences...</p>
      </div>
    );
  }

  return (
    <div className="feed-preferences">
      <section className="preferences-section">
        <h3>News Categories</h3>
        <p>Select the categories you want to see in your feed</p>
        
        <div className="categories-grid">
          {Object.entries(preferences.categories).map(([category, isSelected]) => (
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
      </section>
      
      <section className="preferences-section">
        <h3>News Sources</h3>
        <p>Select the sources you want to follow</p>
        
        <div className="sources-list">
          {Object.entries(preferences.sources).map(([source, isSelected]) => (
            <div key={source} className="source-toggle">
              <label className={`toggle-switch ${isSelected ? 'active' : ''}`}>
                <input 
                  type="checkbox" 
                  checked={isSelected}
                  onChange={() => handleSourceToggle(source)}
                />
                <span className="toggle-slider"></span>
              </label>
              <span className="source-name">{source}</span>
            </div>
          ))}
        </div>
      </section>
      
      <section className="preferences-section">
        <h3>Display Settings</h3>
        <p>Customize how your news feed appears</p>
        
        <div className="display-settings">
          <div className="setting-group">
            <label htmlFor="articlesPerPage">Articles per page</label>
            <select 
              id="articlesPerPage"
              value={preferences.displaySettings.articlesPerPage}
              onChange={(e) => handleDisplaySettingChange('articlesPerPage', parseInt(e.target.value))}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
          
          <div className="setting-group">
            <label htmlFor="sortBy">Sort by</label>
            <select 
              id="sortBy"
              value={preferences.displaySettings.sortBy}
              onChange={(e) => handleDisplaySettingChange('sortBy', e.target.value)}
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="popular">Most popular</option>
              <option value="relevant">Most relevant</option>
            </select>
          </div>
          
          <div className="setting-group">
            <label htmlFor="layout">Layout</label>
            <div className="layout-options">
              <button 
                className={`layout-option ${preferences.displaySettings.layout === 'grid' ? 'active' : ''}`}
                onClick={() => handleDisplaySettingChange('layout', 'grid')}
              >
                <i className="fas fa-th-large"></i>
                <span>Grid</span>
              </button>
              <button 
                className={`layout-option ${preferences.displaySettings.layout === 'list' ? 'active' : ''}`}
                onClick={() => handleDisplaySettingChange('layout', 'list')}
              >
                <i className="fas fa-th-list"></i>
                <span>List</span>
              </button>
            </div>
          </div>
          
          <div className="setting-group toggle-setting">
            <label>Show images</label>
            <label className="toggle-switch">
              <input 
                type="checkbox"
                checked={preferences.displaySettings.showImages}
                onChange={(e) => handleDisplaySettingChange('showImages', e.target.checked)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>
      </section>
      
      <div className="preferences-actions">
        {saveSuccess && (
          <div className="save-success">
            <i className="fas fa-check-circle"></i>
            <span>Preferences saved successfully!</span>
          </div>
        )}
        
        <button 
          className="save-preferences-button"
          onClick={handleSavePreferences}
          disabled={isSaving || !hasChanges}
        >
          {isSaving ? 'Saving...' : 'Save Preferences'}
        </button>
      </div>
    </div>
  );
}

export default FeedPreferences;
