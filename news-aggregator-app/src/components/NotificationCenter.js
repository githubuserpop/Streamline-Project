import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// UC8: Notification Preferences
function NotificationCenter() {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const notificationRef = useRef(null);
  
  // Close notification panel when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Fetch notifications
  useEffect(() => {
    // Simulating API call to fetch notifications
    const fetchNotifications = async () => {
      try {
        // Mock data
        const mockNotifications = [
          {
            id: 1,
            type: 'article',
            title: 'New article from your favorite source',
            message: 'Tech News Daily just published "The Future of AI in Healthcare"',
            date: new Date(Date.now() - 15 * 60000).toISOString(), // 15 minutes ago
            read: false,
            actionUrl: '/articles/123'
          },
          {
            id: 2,
            type: 'alert',
            title: 'Breaking News Alert',
            message: 'Major announcement from the Federal Reserve about interest rates',
            date: new Date(Date.now() - 3 * 3600000).toISOString(), // 3 hours ago
            read: false,
            actionUrl: '/articles/456'
          },
          {
            id: 3,
            type: 'system',
            title: 'Account settings updated',
            message: 'Your account password was recently changed',
            date: new Date(Date.now() - 1 * 86400000).toISOString(), // 1 day ago
            read: true,
            actionUrl: '/settings/security'
          },
          {
            id: 4,
            type: 'social',
            title: 'Your shared article is getting attention',
            message: 'Your shared article about climate change has received 15 likes',
            date: new Date(Date.now() - 2 * 86400000).toISOString(), // 2 days ago
            read: true,
            actionUrl: '/articles/789'
          },
          {
            id: 5,
            type: 'article',
            title: 'Weekly summary of your interests',
            message: 'Check out the top 5 articles from your selected categories this week',
            date: new Date(Date.now() - 5 * 86400000).toISOString(), // 5 days ago
            read: true,
            actionUrl: '/weekly-digest'
          }
        ];
        
        // Simulate API delay
        setTimeout(() => {
          setNotifications(mockNotifications);
          setUnreadCount(mockNotifications.filter(n => !n.read).length);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setLoading(false);
      }
    };
    
    fetchNotifications();
  }, []);
  
  // Format date for display
  const formatNotificationTime = (dateString) => {
    const now = new Date();
    const notificationDate = new Date(dateString);
    const diffMs = now - notificationDate;
    const diffMins = Math.round(diffMs / (1000 * 60));
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    
    const diffHours = Math.round(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    
    const diffDays = Math.round(diffHours / 24);
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    
    return notificationDate.toLocaleDateString();
  };
  
  // Mark a notification as read
  const markAsRead = (notificationId) => {
    setNotifications(notifications.map(notification => 
      notification.id === notificationId 
        ? { ...notification, read: true } 
        : notification
    ));
    
    // Update unread count
    const updatedUnreadCount = notifications.filter(n => !n.read && n.id !== notificationId).length;
    setUnreadCount(updatedUnreadCount);
  };
  
  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
    setUnreadCount(0);
  };
  
  // Toggle notification panel
  const toggleNotifications = () => {
    setIsOpen(!isOpen);
  };
  
  // Apply filter
  const filteredNotifications = () => {
    if (filter === 'all') return notifications;
    if (filter === 'unread') return notifications.filter(n => !n.read);
    return notifications.filter(n => n.type === filter);
  };
  
  // Get icon based on notification type
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'article': return 'newspaper';
      case 'alert': return 'exclamation-circle';
      case 'system': return 'cog';
      case 'social': return 'share-alt';
      default: return 'bell';
    }
  };

  return (
    <div className="notification-center" ref={notificationRef}>
      <button 
        className="notification-button"
        onClick={toggleNotifications}
        aria-label="Notifications"
      >
        <i className="fas fa-bell"></i>
        {unreadCount > 0 && (
          <span className="notification-badge">{unreadCount}</span>
        )}
      </button>
      
      {isOpen && (
        <div className="notification-panel">
          <div className="notification-header">
            <h3>Notifications</h3>
            
            <div className="notification-actions">
              {unreadCount > 0 && (
                <button 
                  className="mark-all-read"
                  onClick={markAllAsRead}
                >
                  Mark all as read
                </button>
              )}
              <Link to="/settings/notifications" className="settings-link">
                <i className="fas fa-cog"></i>
              </Link>
            </div>
          </div>
          
          <div className="notification-filters">
            <button 
              className={`filter-button ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button 
              className={`filter-button ${filter === 'unread' ? 'active' : ''}`}
              onClick={() => setFilter('unread')}
            >
              Unread
            </button>
            <button 
              className={`filter-button ${filter === 'article' ? 'active' : ''}`}
              onClick={() => setFilter('article')}
            >
              Articles
            </button>
            <button 
              className={`filter-button ${filter === 'alert' ? 'active' : ''}`}
              onClick={() => setFilter('alert')}
            >
              Alerts
            </button>
          </div>
          
          <div className="notification-list">
            {loading ? (
              <div className="loading-notifications">
                <div className="spinner"></div>
                <p>Loading notifications...</p>
              </div>
            ) : filteredNotifications().length === 0 ? (
              <div className="empty-notifications">
                <i className="far fa-bell-slash"></i>
                <p>No notifications to display</p>
              </div>
            ) : (
              filteredNotifications().map(notification => (
                <Link 
                  to={notification.actionUrl}
                  key={notification.id}
                  className={`notification-item ${!notification.read ? 'unread' : ''}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="notification-icon">
                    <i className={`fas fa-${getNotificationIcon(notification.type)}`}></i>
                  </div>
                  <div className="notification-content">
                    <h4 className="notification-title">{notification.title}</h4>
                    <p className="notification-message">{notification.message}</p>
                    <span className="notification-time">
                      {formatNotificationTime(notification.date)}
                    </span>
                  </div>
                  {!notification.read && <div className="unread-indicator"></div>}
                </Link>
              ))
            )}
          </div>
          
          <div className="notification-footer">
            <Link to="/notifications" className="view-all">
              View all notifications
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default NotificationCenter;
