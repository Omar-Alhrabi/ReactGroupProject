import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { getNotifications, markNotificationAsRead } from '../../services/notificationService';
import { formatDate } from '../../utils/formatDate';

const NotificationList = ({ limit = 5, showAll = false }) => {
  const { user } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const response = await getNotifications(limit);
        setNotifications(response.data);
      } catch (err) {
        console.error('Failed to fetch notifications:', err);
        setError('Failed to load notifications');
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [user, limit]);

  const handleMarkAsRead = async (id) => {
    try {
      await markNotificationAsRead(id);
      
      // Update local state
      setNotifications(prev => 
        prev.map(notification => 
          notification.id === id 
            ? { ...notification, read_at: new Date().toISOString() } 
            : notification
        )
      );
    } catch (err) {
      console.error('Failed to mark notification as read:', err);
    }
  };

  if (!user) return null;
  if (loading) return <div className="text-center p-4">Loading notifications...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;
  if (notifications.length === 0) {
    return <div className="text-center p-4 text-gray-500">No notifications</div>;
  }

  const getNotificationContent = (notification) => {
    const { type, data } = notification;
    
    switch (type) {
      case 'new_follower':
        return (
          <span>
            <Link to={`/profile/${data.user_id}`} className="font-semibold hover:underline">
              {data.user_name}
            </Link> started following you
          </span>
        );
      case 'post_liked':
        return (
          <span>
            <Link to={`/profile/${data.user_id}`} className="font-semibold hover:underline">
              {data.user_name}
            </Link> liked your <Link to={`/posts/${data.post_id}`} className="hover:underline">post</Link>
          </span>
        );
      case 'comment_received':
        return (
          <span>
            <Link to={`/profile/${data.user_id}`} className="font-semibold hover:underline">
              {data.user_name}
            </Link> commented on your <Link to={`/posts/${data.post_id}`} className="hover:underline">post</Link>
          </span>
        );
      default:
        return <span>You have a new notification</span>;
    }
  };

  const displayedNotifications = showAll 
    ? notifications 
    : notifications.slice(0, limit);

  return (
    <div className="divide-y">
      {displayedNotifications.map(notification => (
        <div 
          key={notification.id} 
          className={`p-4 ${!notification.read_at ? 'bg-blue-50' : ''}`}
        >
          <div className="flex items-start">
            <div className="h-10 w-10 bg-gray-300 rounded-full flex-shrink-0 flex items-center justify-center">
              {notification.data.user_avatar ? (
                <img 
                  src={notification.data.user_avatar} 
                  alt=""
                  className="h-10 w-10 rounded-full object-cover" 
                />
              ) : (
                <span className="text-gray-600">{notification.data.user_name?.charAt(0)}</span>
              )}
            </div>
            
            <div className="ml-3 flex-grow">
              <div className="text-sm">{getNotificationContent(notification)}</div>
              <div className="text-xs text-gray-500 mt-1">{formatDate(notification.created_at)}</div>
            </div>
            
            {!notification.read_at && (
              <button
                onClick={() => handleMarkAsRead(notification.id)}
                className="text-xs text-blue-600 hover:underline"
              >
                Mark as read
              </button>
            )}
          </div>
        </div>
      ))}
      
      {!showAll && notifications.length > limit && (
        <div className="p-4 text-center">
          <Link to="/notifications" className="text-blue-600 hover:underline">
            View all notifications
          </Link>
        </div>
      )}
    </div>
  );
};

export default NotificationList;