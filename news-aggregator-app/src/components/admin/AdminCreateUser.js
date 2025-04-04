import React, { useState } from 'react';

// UC_A17: Admin account creation
function AdminCreateUser({ onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'admin',
    permissions: {
      manageUsers: true,
      manageSources: true,
      manageCategories: true
    }
  });
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
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

  const handlePermissionChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [name]: checked
      }
    }));
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.username.trim()) {
      errors.username = 'Username is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
    }
    
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // In a real app, this would make an API call to create the admin
    console.log('Creating admin with data:', formData);
    
    // Simulate API call
    setTimeout(() => {
      onSuccess();
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit} className="admin-create-form">
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className={formErrors.username ? 'error' : ''}
        />
        {formErrors.username && <span className="error-message">{formErrors.username}</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={formErrors.email ? 'error' : ''}
        />
        {formErrors.email && <span className="error-message">{formErrors.email}</span>}
      </div>
      
      <div className="form-row">
        <div className="form-group half-width">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={formErrors.password ? 'error' : ''}
          />
          {formErrors.password && <span className="error-message">{formErrors.password}</span>}
        </div>
        
        <div className="form-group half-width">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={formErrors.confirmPassword ? 'error' : ''}
          />
          {formErrors.confirmPassword && <span className="error-message">{formErrors.confirmPassword}</span>}
        </div>
      </div>
      
      <div className="form-group">
        <label htmlFor="role">Role</label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="admin">Administrator</option>
          <option value="moderator">Content Moderator</option>
        </select>
      </div>
      
      <div className="form-group">
        <label>Permissions</label>
        <div className="permissions-checkboxes">
          <div className="checkbox-group">
            <input
              type="checkbox"
              id="manageUsers"
              name="manageUsers"
              checked={formData.permissions.manageUsers}
              onChange={handlePermissionChange}
            />
            <label htmlFor="manageUsers">Manage Users</label>
          </div>
          <div className="checkbox-group">
            <input
              type="checkbox"
              id="manageSources"
              name="manageSources"
              checked={formData.permissions.manageSources}
              onChange={handlePermissionChange}
            />
            <label htmlFor="manageSources">Manage Sources</label>
          </div>
          <div className="checkbox-group">
            <input
              type="checkbox"
              id="manageCategories"
              name="manageCategories"
              checked={formData.permissions.manageCategories}
              onChange={handlePermissionChange}
            />
            <label htmlFor="manageCategories">Manage Categories</label>
          </div>
        </div>
      </div>
      
      <div className="form-actions">
        <button type="button" className="cancel-button" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="submit-button">
          Create Admin
        </button>
      </div>
    </form>
  );
}

export default AdminCreateUser;
