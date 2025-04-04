import React, { useState, useEffect } from 'react';

function AdminUserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    // Fetch users - in a real app, this would be an API call
    const fetchUsers = async () => {
      try {
        // Mock data
        const mockUsers = [
          { id: 1, username: 'user1', email: 'user1@example.com', lastLogin: '2025-04-01', status: 'active' },
          { id: 2, username: 'user2', email: 'user2@example.com', lastLogin: '2025-04-02', status: 'active' },
          { id: 3, username: 'user3', email: 'user3@example.com', lastLogin: '2025-03-28', status: 'inactive' },
          { id: 4, username: 'user4', email: 'user4@example.com', lastLogin: '2025-04-03', status: 'active' },
          { id: 5, username: 'user5', email: 'user5@example.com', lastLogin: '2025-03-15', status: 'suspended' }
        ];
        
        setTimeout(() => {
          setUsers(mockUsers);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, []);
  
  // UC_A21: Delete User Account
  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      // In a real app, this would be an API call
      setUsers(users.filter(user => user.id !== userId));
      alert('User deleted successfully');
    }
  };
  
  const handleStatusChange = (userId, newStatus) => {
    // Update user status
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
  };
  
  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-user-management">
      <h2>User Management</h2>
      
      <div className="admin-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <i className="fas fa-search"></i>
        </div>
      </div>
      
      {loading ? (
        <div className="loading-indicator">
          <div className="spinner"></div>
          <p>Loading users...</p>
        </div>
      ) : (
        <div className="users-table-container">
          {filteredUsers.length === 0 ? (
            <div className="no-results">
              <i className="fas fa-users-slash"></i>
              <p>No users found</p>
            </div>
          ) : (
            <table className="users-table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Last Login</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(user => (
                  <tr key={user.id}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.lastLogin}</td>
                    <td>
                      <span className={`status-badge ${user.status}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="action-buttons">
                      <div className="dropdown">
                        <button className="dropdown-toggle">
                          Status <i className="fas fa-chevron-down"></i>
                        </button>
                        <div className="dropdown-menu">
                          <button onClick={() => handleStatusChange(user.id, 'active')}>
                            Activate
                          </button>
                          <button onClick={() => handleStatusChange(user.id, 'suspended')}>
                            Suspend
                          </button>
                        </div>
                      </div>
                      <button
                        className="delete-button"
                        onClick={() => handleDeleteUser(user.id)}
                        title="Delete User"
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
    </div>
  );
}

export default AdminUserManagement;
