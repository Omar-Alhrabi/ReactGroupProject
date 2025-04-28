// src/services/authService.js
import api from './api';

export const register = (userData) => {
  return api.post('/users', userData);
};

export const login = (credentials) => {
  return api.post('/login', credentials);
};

export const logout = () => {
  return api.post('/logout');
};