import api from './api';

export const getPostComments = (postId) => {
  return api.get(`/posts/${postId}/comments`);
};

export const getComment = (id) => {
  return api.get(`/comments/${id}`);
};

export const createComment = (postId, commentData) => {
  return api.post(`/posts/${postId}/comments`, commentData);
};

export const updateComment = (id, commentData) => {
  return api.put(`/comments/${id}`, commentData);
};

export const deleteComment = (id) => {
  return api.delete(`/comments/${id}`);
};

export const likeComment = (commentId, userId) => {
  return api.post(`/comments/${commentId}/like`, { user_id: userId });
};

export const unlikeComment = (commentId, userId) => {
  return api.delete(`/comments/${commentId}/unlike`, { data: { user_id: userId } });
};