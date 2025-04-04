import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminUserManagement from '../../components/admin/AdminUserManagement';
import AdminSourceManagement from '../../components/admin/AdminSourceManagement';
import AdminCategoryManagement from '../../components/admin/AdminCategoryManagement';
import AdminCreateUser from '../../components/admin/AdminCreateUser';

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('users');
  const [showCreateAdmin, setShowCreateAdmin] = useState(false);
  
  // UC_A19: Admin Logout
  const handleLogout = () => {
    // Clear admin session data
    console.log('Admin logged out');
    navigate('/admin/login');
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>News Aggregator Admin</h1>
        <div className="admin-controls">
          <button 
            className="create-admin-button"
            onClick={() => setShowCreateAdmin(true)}
            title="Create Admin Account"
          >
            <i className="fas fa-user-plus"></i>
            <span>New Admin</span>
          </button>
          <button 
            className="admin-logout-button"
            onClick={handleLogout}
            title="Logout"
          >
            <i className="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </button>
        </div>
      </header>
      
      <div className="admin-layout">
        <aside className="admin-sidebar">
          <nav className="admin-nav">
            <ul>
              <li>
                <button 
                  className={`nav-button ${activeSection === 'users' ? 'active' : ''}`}
                  onClick={() => setActiveSection('users')}
                >
                  <i className="fas fa-users"></i>
                  <span>User Management</span>
                </button>
              </li>
              <li>
                <button 
                  className={`nav-button ${activeSection === 'sources' ? 'active' : ''}`}
                  onClick={() => setActiveSection('sources')}
                >
                  <i className="fas fa-newspaper"></i>
                  <span>News Sources</span>
                </button>
              </li>
              <li>
                <button 
                  className={`nav-button ${activeSection === 'categories' ? 'active' : ''}`}
                  onClick={() => setActiveSection('categories')}
                >
                  <i className="fas fa-tags"></i>
                  <span>Categories</span>
                </button>
              </li>
            </ul>
          </nav>
        </aside>
        
        <main className="admin-content">
          {/* UC_A20: View User Accounts, UC_A21: Delete User Account */}
          {activeSection === 'users' && <AdminUserManagement />}
          
          {/* UC_A22: Manage News Sources */}
          {activeSection === 'sources' && <AdminSourceManagement />}
          
          {/* UC_A23: Manage Categories */}
          {activeSection === 'categories' && <AdminCategoryManagement />}
        </main>
      </div>
      
      {/* UC_A17: Admin account creation */}
      {showCreateAdmin && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h2>Create Admin Account</h2>
              <button 
                className="modal-close-button"
                onClick={() => setShowCreateAdmin(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <AdminCreateUser 
              onSuccess={() => {
                alert('Admin created successfully');
                setShowCreateAdmin(false);
              }}
              onCancel={() => setShowCreateAdmin(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
