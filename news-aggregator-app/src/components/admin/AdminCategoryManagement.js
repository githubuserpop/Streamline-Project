import React, { useState, useEffect } from 'react';

function AdminCategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    icon: 'newspaper'
  });
  const [formErrors, setFormErrors] = useState({});

  // Available icons for categories
  const availableIcons = [
    'newspaper', 'globe', 'laptop-code', 'chart-line', 
    'basketball-ball', 'heartbeat', 'film', 'university', 
    'flask', 'book', 'coins', 'plane'
  ];

  useEffect(() => {
    // Fetch categories - in a real app, this would be an API call
    const fetchCategories = async () => {
      try {
        // Mock data
        const mockCategories = [
          { id: 1, name: 'Technology', description: 'Tech news and updates', icon: 'laptop-code', status: 'active', articleCount: 243 },
          { id: 2, name: 'Politics', description: 'Political news and events', icon: 'university', status: 'active', articleCount: 189 },
          { id: 3, name: 'Sports', description: 'Sports news and scores', icon: 'basketball-ball', status: 'active', articleCount: 312 },
          { id: 4, name: 'Business', description: 'Business and financial news', icon: 'chart-line', status: 'active', articleCount: 156 },
          { id: 5, name: 'Health', description: 'Health and wellness news', icon: 'heartbeat', status: 'active', articleCount: 98 },
          { id: 6, name: 'Entertainment', description: 'Entertainment and celebrity news', icon: 'film', status: 'inactive', articleCount: 205 }
        ];
        
        setTimeout(() => {
          setCategories(mockCategories);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setLoading(false);
      }
    };
    
    fetchCategories();
  }, []);
  
  // UC_A23: Manage Categories (Add)
  const handleAddCategory = (e) => {
    e.preventDefault();
    
    // Validate form
    const errors = {};
    if (!newCategory.name.trim()) errors.name = 'Name is required';
    if (!newCategory.description.trim()) errors.description = 'Description is required';
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    // Add the new category
    const newId = Math.max(...categories.map(c => c.id), 0) + 1;
    const categoryToAdd = {
      id: newId,
      ...newCategory,
      status: 'active',
      articleCount: 0
    };
    
    setCategories([...categories, categoryToAdd]);
    setShowAddCategory(false);
    setNewCategory({
      name: '',
      description: '',
      icon: 'newspaper'
    });
    setFormErrors({});
  };
  
  // UC_A23: Manage Categories (Remove)
  const handleDeleteCategory = (categoryId) => {
    const categoryToDelete = categories.find(c => c.id === categoryId);
    
    if (categoryToDelete.articleCount > 0) {
      alert(`This category contains ${categoryToDelete.articleCount} articles. Reassign these articles before deleting.`);
      return;
    }
    
    if (window.confirm('Are you sure you want to delete this category? This action cannot be undone.')) {
      setCategories(categories.filter(category => category.id !== categoryId));
      alert('Category deleted successfully');
    }
  };
  
  const handleCategoryStatusChange = (categoryId, newStatus) => {
    setCategories(categories.map(category => 
      category.id === categoryId ? { ...category, status: newStatus } : category
    ));
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory(prev => ({
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
    <div className="admin-category-management">
      <h2>Categories Management</h2>
      
      <div className="admin-controls">
        <button 
          className="add-button"
          onClick={() => setShowAddCategory(true)}
        >
          <i className="fas fa-plus"></i> Add Category
        </button>
      </div>
      
      {loading ? (
        <div className="loading-indicator">
          <div className="spinner"></div>
          <p>Loading categories...</p>
        </div>
      ) : (
        <div className="categories-container">
          {categories.length === 0 ? (
            <div className="no-results">
              <i className="fas fa-tags"></i>
              <p>No categories found</p>
            </div>
          ) : (
            <div className="category-cards">
              {categories.map(category => (
                <div 
                  key={category.id} 
                  className={`category-card ${category.status === 'inactive' ? 'inactive' : ''}`}
                >
                  <div className="category-icon">
                    <i className={`fas fa-${category.icon}`}></i>
                  </div>
                  <div className="category-details">
                    <h3>{category.name}</h3>
                    <p>{category.description}</p>
                    <div className="category-meta">
                      <span className="article-count">
                        <i className="fas fa-newspaper"></i> {category.articleCount} articles
                      </span>
                      <span className={`status-badge ${category.status}`}>
                        {category.status}
                      </span>
                    </div>
                  </div>
                  <div className="category-actions">
                    <button
                      className={`toggle-button ${category.status === 'active' ? 'deactivate' : 'activate'}`}
                      onClick={() => handleCategoryStatusChange(
                        category.id, 
                        category.status === 'active' ? 'inactive' : 'active'
                      )}
                      title={category.status === 'active' ? 'Deactivate Category' : 'Activate Category'}
                    >
                      <i className={`fas fa-${category.status === 'active' ? 'toggle-off' : 'toggle-on'}`}></i>
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteCategory(category.id)}
                      title="Delete Category"
                      disabled={category.articleCount > 0}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
      {showAddCategory && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3>Add Category</h3>
              <button 
                className="modal-close"
                onClick={() => {
                  setShowAddCategory(false);
                  setFormErrors({});
                }}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={handleAddCategory} className="add-category-form">
              <div className="form-group">
                <label htmlFor="name">Category Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newCategory.name}
                  onChange={handleInputChange}
                  className={formErrors.name ? 'error' : ''}
                />
                {formErrors.name && <span className="error-message">{formErrors.name}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={newCategory.description}
                  onChange={handleInputChange}
                  className={formErrors.description ? 'error' : ''}
                  rows="3"
                ></textarea>
                {formErrors.description && <span className="error-message">{formErrors.description}</span>}
              </div>
              
              <div className="form-group">
                <label>Icon</label>
                <div className="icon-selection">
                  {availableIcons.map(icon => (
                    <button
                      key={icon}
                      type="button"
                      className={`icon-option ${newCategory.icon === icon ? 'selected' : ''}`}
                      onClick={() => setNewCategory(prev => ({ ...prev, icon }))}
                    >
                      <i className={`fas fa-${icon}`}></i>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => {
                    setShowAddCategory(false);
                    setFormErrors({});
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="submit-button">
                  Add Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminCategoryManagement;
