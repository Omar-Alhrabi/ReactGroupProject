import api from './api';

export const getNotifications = (limit = null) => {
  const url = limit ? `/notifications?limit=${limit}` : '/notifications';
  return api.get(url);
};

export const markNotificationAsRead = (id) => {
  return api.post(`/notifications/${id}/read`);
};

export const markAllNotificationsAsRead = () => {
  return api.post('/notifications/read-all');
};