import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function RegisterPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  
  const [preferences, setPreferences] = useState({
    categories: {
      technology: false,
      business: false,
      health: false,
      sports: false,
      entertainment: false,
      politics: false,
      science: false
    },
    notificationPreferences: {
      breaking: true,
      daily: false,
      trending: true
    }
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleCategoryToggle = (category) => {
    setPreferences(prev => ({
      ...prev,
      categories: {
        ...prev.categories,
        [category]: !prev.categories[category]
      }
    }));
  };
  
  const handleNotificationToggle = (type) => {
    setPreferences(prev => ({
      ...prev,
      notificationPreferences: {
        ...prev.notificationPreferences,
        [type]: !prev.notificationPreferences[type]
      }
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      // Validate first step form
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords don't match!");
        return;
      }
      setStep(2);
    } else {
      // Submit both account and preferences
      console.log("Account created with:", formData);
      console.log("Preferences set:", preferences);
      navigate('/');
    }
  };
  
  const handleSocialSignup = (provider) => {
    // In a real app, this would redirect to OAuth flow
    console.log(`Signing up with ${provider}`);
    // Then skip to preferences screen
    setStep(2);
  };

  return (
    <div className="auth-page register-page">
      <div className="auth-container">
        <div className="auth-header">
          <h1>News Aggregator</h1>
          <h2>{step === 1 ? 'Create your account' : 'Set your preferences'}</h2>
          {step === 2 && <p>Personalize your news experience</p>}
        </div>
        
        {step === 1 ? (
          <>
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input 
                  type="password" 
                  id="password" 
                  name="password" 
                  value={formData.password}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input 
                  type="password" 
                  id="confirmPassword" 
                  name="confirmPassword" 
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <div className="checkbox-group terms">
                <input 
                  type="checkbox" 
                  id="agreeToTerms" 
                  name="agreeToTerms" 
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="agreeToTerms">
                  I agree to the <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>
                </label>
              </div>
              
              <button type="submit" className="auth-button">Next: Set Preferences</button>
            </form>
            
            <div className="social-signup">
              <p>Or sign up with</p>
              <div className="social-buttons">
                <button 
                  type="button" 
                  className="social-button google"
                  onClick={() => handleSocialSignup('Google')}
                >
                  <i className="fab fa-google"></i>
                  <span>Google</span>
                </button>
                <button 
                  type="button" 
                  className="social-button facebook"
                  onClick={() => handleSocialSignup('Facebook')}
                >
                  <i className="fab fa-facebook-f"></i>
                  <span>Facebook</span>
                </button>
                <button 
                  type="button" 
                  className="social-button twitter"
                  onClick={() => handleSocialSignup('Twitter')}
                >
                  <i className="fab fa-twitter"></i>
                  <span>Twitter</span>
                </button>
              </div>
            </div>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="preferences-form">
            <div className="preferences-section">
              <h3>News Categories</h3>
              <p>Select categories you're interested in:</p>
              
              <div className="categories-grid">
                {Object.entries(preferences.categories).map(([category, isSelected]) => (
                  <div key={category} className="category-toggle">
                    <label className={`category-chip ${isSelected ? 'active' : ''}`}>
                      <input 
                        type="checkbox" 
                        checked={isSelected}
                        onChange={() => handleCategoryToggle(category)}
                      />
                      <span>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="preferences-section">
              <h3>Notifications</h3>
              <p>How would you like to be notified?</p>
              
              <div className="notification-options">
                {Object.entries(preferences.notificationPreferences).map(([type, isEnabled]) => (
                  <div key={type} className="notification-toggle">
                    <label className={`toggle-switch ${isEnabled ? 'active' : ''}`}>
                      <input 
                        type="checkbox" 
                        checked={isEnabled}
                        onChange={() => handleNotificationToggle(type)}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                    <span className="notification-name">
                      {type === 'breaking' ? 'Breaking News' : 
                       type === 'daily' ? 'Daily Digest' : 'Trending Topics'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="form-actions">
              <button 
                type="button" 
                className="back-button"
                onClick={() => setStep(1)}
              >
                Back
              </button>
              <button type="submit" className="auth-button">
                Complete Registration
              </button>
            </div>
          </form>
        )}
        
        <div className="auth-footer">
          <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
