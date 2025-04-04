import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would authenticate with a backend
    console.log('Login attempt with:', formData.email);
    // Simulate successful login
    navigate('/');
  };
  
  const handleSocialLogin = (provider) => {
    // In a real app, this would redirect to OAuth flow
    console.log(`Logging in with ${provider}`);
    // Simulate successful login
    navigate('/');
  };

  return (
    <div className="auth-page login-page">
      <div className="auth-container">
        <div className="auth-header">
          <h1>News Aggregator</h1>
          <h2>Login to your account</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="auth-form">
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
          
          <div className="form-row">
            <div className="checkbox-group">
              <input 
                type="checkbox" 
                id="rememberMe" 
                name="rememberMe" 
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <label htmlFor="rememberMe">Remember me</label>
            </div>
            <Link to="/forgot-password" className="forgot-password-link">
              Forgot Password?
            </Link>
          </div>
          
          <button type="submit" className="auth-button">Login</button>
        </form>
        
        <div className="social-login">
          <p>Or login with</p>
          <div className="social-buttons">
            <button 
              type="button" 
              className="social-button google"
              onClick={() => handleSocialLogin('Google')}
            >
              <i className="fab fa-google"></i>
              <span>Google</span>
            </button>
            <button 
              type="button" 
              className="social-button facebook"
              onClick={() => handleSocialLogin('Facebook')}
            >
              <i className="fab fa-facebook-f"></i>
              <span>Facebook</span>
            </button>
            <button 
              type="button" 
              className="social-button twitter"
              onClick={() => handleSocialLogin('Twitter')}
            >
              <i className="fab fa-twitter"></i>
              <span>Twitter</span>
            </button>
          </div>
        </div>
        
        <div className="auth-footer">
          <p>Don't have an account? <Link to="/register">Register here</Link></p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
