import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// UC13: Delete Account, UC14: Change Password, UC16: User Logout
function AccountManagement() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  
  // Password change state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordErrors, setPasswordErrors] = useState({});
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  
  // Delete account state
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  
  // User profile state (for UC12: Account Settings)
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    username: 'johndoe',
    profileImage: 'https://via.placeholder.com/150',
    notificationEmail: true,
    notificationPush: true,
    newsletterSubscription: false
  });
  
  // Handler for password form
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (passwordErrors[name]) {
      setPasswordErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  // Handler for profile form
  const handleProfileChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  // UC14: Change Password validation and submission
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    
    // Validate password form
    const errors = {};
    if (!passwordForm.currentPassword) {
      errors.currentPassword = 'Current password is required';
    }
    
    if (!passwordForm.newPassword) {
      errors.newPassword = 'New password is required';
    } else if (passwordForm.newPassword.length < 8) {
      errors.newPassword = 'Password must be at least 8 characters long';
    }
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    if (Object.keys(errors).length > 0) {
      setPasswordErrors(errors);
      return;
    }
    
    // Submit password change
    setIsChangingPassword(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsChangingPassword(false);
      setPasswordSuccess(true);
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setPasswordSuccess(false);
      }, 3000);
    }, 1000);
  };
  
  // UC13: Delete Account
  const handleDeleteAccount = () => {
    if (deleteConfirmText !== 'DELETE') {
      setPasswordErrors({ deleteConfirm: 'Please type DELETE to confirm' });
      return;
    }
    
    setIsDeleting(true);
    
    // Simulate API call to delete account
    setTimeout(() => {
      // In a real app, this would call a backend API to delete the user's account
      console.log('Account deleted');
      
      // Redirect to login page
      navigate('/login');
    }, 1500);
  };
  
  // UC16: User Logout
  const handleLogout = () => {
    // In a real app, this would clear auth tokens, etc.
    console.log('Logging out');
    navigate('/login');
  };
  
  // Handle save profile changes
  const handleSaveProfile = (e) => {
    e.preventDefault();
    
    // Simulate API call to update profile
    setTimeout(() => {
      alert('Profile updated successfully');
    }, 500);
  };

  return (
    <div className="account-management">
      <div className="account-tabs">
        <button 
          className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          <i className="fas fa-user"></i>
          <span>Profile</span>
        </button>
        <button 
          className={`tab-button ${activeTab === 'security' ? 'active' : ''}`}
          onClick={() => setActiveTab('security')}
        >
          <i className="fas fa-lock"></i>
          <span>Security</span>
        </button>
        <button 
          className={`tab-button ${activeTab === 'danger' ? 'active' : ''}`}
          onClick={() => setActiveTab('danger')}
        >
          <i className="fas fa-exclamation-triangle"></i>
          <span>Danger Zone</span>
        </button>
      </div>
      
      <div className="account-content">
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="profile-settings">
            <h2>Profile Settings</h2>
            
            <div className="profile-image-section">
              <div className="profile-image">
                <img src={profile.profileImage} alt="Profile" />
              </div>
              <button className="change-image-button">
                <i className="fas fa-camera"></i>
                <span>Change Photo</span>
              </button>
            </div>
            
            <form onSubmit={handleSaveProfile} className="profile-form">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={profile.name}
                  onChange={handleProfileChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input 
                  type="text" 
                  id="username" 
                  name="username" 
                  value={profile.username}
                  onChange={handleProfileChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={profile.email}
                  onChange={handleProfileChange}
                />
              </div>
              
              <h3>Notification Preferences</h3>
              
              <div className="checkbox-group">
                <input 
                  type="checkbox" 
                  id="notificationEmail" 
                  name="notificationEmail" 
                  checked={profile.notificationEmail}
                  onChange={handleProfileChange}
                />
                <label htmlFor="notificationEmail">Email Notifications</label>
              </div>
              
              <div className="checkbox-group">
                <input 
                  type="checkbox" 
                  id="notificationPush" 
                  name="notificationPush" 
                  checked={profile.notificationPush}
                  onChange={handleProfileChange}
                />
                <label htmlFor="notificationPush">Push Notifications</label>
              </div>
              
              <div className="checkbox-group">
                <input 
                  type="checkbox" 
                  id="newsletterSubscription" 
                  name="newsletterSubscription" 
                  checked={profile.newsletterSubscription}
                  onChange={handleProfileChange}
                />
                <label htmlFor="newsletterSubscription">Weekly Newsletter</label>
              </div>
              
              <button type="submit" className="save-button">Save Changes</button>
            </form>
          </div>
        )}
        
        {/* Security Tab (UC14: Change Password) */}
        {activeTab === 'security' && (
          <div className="security-settings">
            <h2>Security Settings</h2>
            
            <div className="password-section">
              <h3>Change Password</h3>
              
              {passwordSuccess && (
                <div className="success-message">
                  <i className="fas fa-check-circle"></i>
                  <span>Password changed successfully!</span>
                </div>
              )}
              
              <form onSubmit={handlePasswordSubmit} className="password-form">
                <div className="form-group">
                  <label htmlFor="currentPassword">Current Password</label>
                  <input 
                    type="password" 
                    id="currentPassword" 
                    name="currentPassword" 
                    value={passwordForm.currentPassword}
                    onChange={handlePasswordChange}
                    className={passwordErrors.currentPassword ? 'error' : ''}
                  />
                  {passwordErrors.currentPassword && (
                    <span className="error-message">{passwordErrors.currentPassword}</span>
                  )}
                </div>
                
                <div className="form-group">
                  <label htmlFor="newPassword">New Password</label>
                  <input 
                    type="password" 
                    id="newPassword" 
                    name="newPassword" 
                    value={passwordForm.newPassword}
                    onChange={handlePasswordChange}
                    className={passwordErrors.newPassword ? 'error' : ''}
                  />
                  {passwordErrors.newPassword && (
                    <span className="error-message">{passwordErrors.newPassword}</span>
                  )}
                </div>
                
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm New Password</label>
                  <input 
                    type="password" 
                    id="confirmPassword" 
                    name="confirmPassword" 
                    value={passwordForm.confirmPassword}
                    onChange={handlePasswordChange}
                    className={passwordErrors.confirmPassword ? 'error' : ''}
                  />
                  {passwordErrors.confirmPassword && (
                    <span className="error-message">{passwordErrors.confirmPassword}</span>
                  )}
                </div>
                
                <button 
                  type="submit" 
                  className="change-password-button"
                  disabled={isChangingPassword}
                >
                  {isChangingPassword ? 'Changing...' : 'Change Password'}
                </button>
              </form>
            </div>
            
            <div className="login-security-section">
              <h3>Login & Security</h3>
              
              <div className="security-option">
                <div className="option-details">
                  <h4>Two-Factor Authentication</h4>
                  <p>Add an extra layer of security to your account</p>
                </div>
                <button className="setup-button">Set Up</button>
              </div>
              
              <div className="security-option">
                <div className="option-details">
                  <h4>Active Sessions</h4>
                  <p>Manage devices where you're currently logged in</p>
                </div>
                <button className="view-button">View</button>
              </div>
            </div>
          </div>
        )}
        
        {/* Danger Zone Tab (UC13: Delete Account) */}
        {activeTab === 'danger' && (
          <div className="danger-zone-settings">
            <h2>Danger Zone</h2>
            
            <div className="warning-box">
              <i className="fas fa-exclamation-circle"></i>
              <p>Actions in this section can lead to permanent data loss and cannot be undone. Please proceed with caution.</p>
            </div>
            
            <div className="danger-option">
              <div className="option-details">
                <h3>Delete Your Account</h3>
                <p>Permanently delete your account and all of your data. This action cannot be undone.</p>
              </div>
              
              {!showDeleteConfirm ? (
                <button 
                  className="delete-account-button"
                  onClick={() => setShowDeleteConfirm(true)}
                >
                  Delete Account
                </button>
              ) : (
                <div className="delete-confirmation">
                  <p>To confirm, type <strong>DELETE</strong> in the field below:</p>
                  <input 
                    type="text"
                    value={deleteConfirmText}
                    onChange={(e) => setDeleteConfirmText(e.target.value)}
                    className={passwordErrors.deleteConfirm ? 'error' : ''}
                  />
                  {passwordErrors.deleteConfirm && (
                    <span className="error-message">{passwordErrors.deleteConfirm}</span>
                  )}
                  
                  <div className="confirmation-actions">
                    <button 
                      className="cancel-button"
                      onClick={() => {
                        setShowDeleteConfirm(false);
                        setDeleteConfirmText('');
                        setPasswordErrors({});
                      }}
                    >
                      Cancel
                    </button>
                    <button 
                      className="confirm-delete-button"
                      onClick={handleDeleteAccount}
                      disabled={isDeleting}
                    >
                      {isDeleting ? 'Deleting...' : 'Confirm Delete'}
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="logout-section">
              <div className="option-details">
                <h3>Log Out</h3>
                <p>Log out from your current session</p>
              </div>
              <button 
                className="logout-button"
                onClick={handleLogout}
              >
                <i className="fas fa-sign-out-alt"></i>
                <span>Log Out</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AccountManagement;
