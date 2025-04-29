import React from 'react';
import NotificationList from '../components/notifications/NotificationList';

const NotificationsPage = () => {
  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>
      
      <div className="bg-white rounded-lg shadow">
        <NotificationList showAll={true} />
      </div>
    </div>
  );
};

export default NotificationsPage;