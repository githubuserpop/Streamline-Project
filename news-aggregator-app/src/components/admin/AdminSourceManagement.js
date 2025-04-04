import React, { useState, useEffect } from 'react';

function AdminSourceManagement() {
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddSource, setShowAddSource] = useState(false);
  const [newSource, setNewSource] = useState({
    name: '',
    url: '',
    category: '',
    refreshInterval: '30'
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    // Fetch news sources - in a real app, this would be an API call
    const fetchSources = async () => {
      try {
        // Mock data
        const mockSources = [
          { id: 1, name: 'Tech News Daily', url: 'https://technews.com/rss', category: 'Technology', refreshInterval: 30, status: 'active' },
          { id: 2, name: 'World Reports', url: 'https://worldreports.com/feed', category: 'Politics', refreshInterval: 60, status: 'active' },
          { id: 3, name: 'Sports Update', url: 'https://sportsupdate.com/rss', category: 'Sports', refreshInterval: 15, status: 'active' },
          { id: 4, name: 'Finance Today', url: 'https://financetoday.com/feed', category: 'Business', refreshInterval: 30, status: 'inactive' },
          { id: 5, name: 'Science Daily', url: 'https://sciencedaily.com/rss', category: 'Science', refreshInterval: 120, status: 'active' }
        ];
        
        setTimeout(() => {
          setSources(mockSources);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching sources:', error);
        setLoading(false);
      }
    };
    
    fetchSources();
  }, []);
  
  // UC_A22: Manage News Sources (Add)
  const handleAddSource = (e) => {
    e.preventDefault();
    
    // Validate form
    const errors = {};
    if (!newSource.name.trim()) errors.name = 'Name is required';
    if (!newSource.url.trim()) errors.url = 'URL is required';
    if (!newSource.url.match(/^https?:\/\/.+/)) errors.url = 'Please enter a valid URL';
    if (!newSource.category.trim()) errors.category = 'Category is required';
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    // Add the new source
    const newId = Math.max(...sources.map(s => s.id), 0) + 1;
    const sourceToAdd = {
      id: newId,
      ...newSource,
      status: 'active'
    };
    
    setSources([...sources, sourceToAdd]);
    setShowAddSource(false);
    setNewSource({
      name: '',
      url: '',
      category: '',
      refreshInterval: '30'
    });
    setFormErrors({});
  };
  
  // UC_A22: Manage News Sources (Remove)
  const handleDeleteSource = (sourceId) => {
    if (window.confirm('Are you sure you want to remove this news source? This action cannot be undone.')) {
      setSources(sources.filter(source => source.id !== sourceId));
      alert('News source removed successfully');
    }
  };
  
  const handleSourceStatusChange = (sourceId, newStatus) => {
    setSources(sources.map(source => 
      source.id === sourceId ? { ...source, status: newStatus } : source
    ));
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSource(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="admin-source-management">
      <h2>News Sources Management</h2>
      
      <div className="admin-controls">
        <button 
          className="add-button"
          onClick={() => setShowAddSource(true)}
        >
          <i className="fas fa-plus"></i> Add News Source
        </button>
      </div>
      
      {loading ? (
        <div className="loading-indicator">
          <div className="spinner"></div>
          <p>Loading news sources...</p>
        </div>
      ) : (
        <div className="sources-table-container">
          {sources.length === 0 ? (
            <div className="no-results">
              <i className="fas fa-newspaper"></i>
              <p>No news sources found</p>
            </div>
          ) : (
            <table className="sources-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>URL</th>
                  <th>Category</th>
                  <th>Refresh Interval (min)</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sources.map(source => (
                  <tr key={source.id}>
                    <td>{source.name}</td>
                    <td>
                      <a href={source.url} target="_blank" rel="noopener noreferrer">
                        {source.url.substring(0, 30)}...
                      </a>
                    </td>
                    <td>{source.category}</td>
                    <td>{source.refreshInterval}</td>
                    <td>
                      <span className={`status-badge ${source.status}`}>
                        {source.status}
                      </span>
                    </td>
                    <td className="action-buttons">
                      <button
                        className={`toggle-button ${source.status === 'active' ? 'deactivate' : 'activate'}`}
                        onClick={() => handleSourceStatusChange(
                          source.id, 
                          source.status === 'active' ? 'inactive' : 'active'
                        )}
                        title={source.status === 'active' ? 'Deactivate Source' : 'Activate Source'}
                      >
                        <i className={`fas fa-${source.status === 'active' ? 'pause' : 'play'}`}></i>
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleDeleteSource(source.id)}
                        title="Delete Source"
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
      
      {showAddSource && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3>Add News Source</h3>
              <button 
                className="modal-close"
                onClick={() => {
                  setShowAddSource(false);
                  setFormErrors({});
                }}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={handleAddSource} className="add-source-form">
              <div className="form-group">
                <label htmlFor="name">Source Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newSource.name}
                  onChange={handleInputChange}
                  className={formErrors.name ? 'error' : ''}
                />
                {formErrors.name && <span className="error-message">{formErrors.name}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="url">RSS/API URL</label>
                <input
                  type="text"
                  id="url"
                  name="url"
                  value={newSource.url}
                  onChange={handleInputChange}
                  placeholder="https://"
                  className={formErrors.url ? 'error' : ''}
                />
                {formErrors.url && <span className="error-message">{formErrors.url}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  value={newSource.category}
                  onChange={handleInputChange}
                  className={formErrors.category ? 'error' : ''}
                >
                  <option value="">Select a category</option>
                  <option value="Technology">Technology</option>
                  <option value="Politics">Politics</option>
                  <option value="Business">Business</option>
                  <option value="Sports">Sports</option>
                  <option value="Science">Science</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Health">Health</option>
                </select>
                {formErrors.category && <span className="error-message">{formErrors.category}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="refreshInterval">Refresh Interval (minutes)</label>
                <input
                  type="number"
                  id="refreshInterval"
                  name="refreshInterval"
                  value={newSource.refreshInterval}
                  onChange={handleInputChange}
                  min="5"
                  max="1440"
                />
              </div>
              
              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => {
                    setShowAddSource(false);
                    setFormErrors({});
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="submit-button">
                  Add Source
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminSourceManagement;
