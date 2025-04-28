import api from './api';

export const getUsers = () => {
  return api.get('/users');
};

export const getUser = (id) => {
  return api.get(`/users/${id}`);
};

export const updateUser = (id, userData) => {
  return api.put(`/users/${id}`, userData);
};

export const deleteUser = (id) => {
  return api.delete(`/users/${id}`);
};

export const getUserFollowers = (id) => {
  return api.get(`/users/${id}/followers`);
};

export const searchUsers = (query) => {
    return api.get(`/search/users?q=${query}`);
  };
  
  export const getUserStats = (userId, period = 'week') => {
    return api.get(`/users/${userId}/stats?period=${period}`);
  };
export const getUserFollowing = (id) => {
  return api.get(`/users/${id}/following`);
};

export const followUser = (followedId, followerId) => {
  return api.post(`/users/${followedId}/follow`, { follower_id: followerId });
};

export const unfollowUser = (followedId, followerId) => {
  return api.delete(`/users/${followedId}/unfollow`, { data: { follower_id: followerId } });
};