import api from './api';

export const getUserPosts = (userId) => {
    return api.get(`/users/${userId}/posts`);
  };
export const getPosts = () => {
  return api.get('/posts');
};

export const getPost = (id) => {
  return api.get(`/posts/${id}`);
};

export const searchPosts = (query) => {
    return api.get(`/search/posts?q=${query}`);
  };
export const createPost = (postData) => {
  return api.post('/posts', postData);
};

export const updatePost = (id, postData) => {
  return api.put(`/posts/${id}`, postData);
};

export const deletePost = (id) => {
  return api.delete(`/posts/${id}`);
};

export const likePost = (postId, userId) => {
  return api.post(`/posts/${postId}/like`, { user_id: userId });
};

export const unlikePost = (postId, userId) => {
  return api.delete(`/posts/${postId}/unlike`, { data: { user_id: userId } });
};