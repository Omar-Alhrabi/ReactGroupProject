import React, { createContext, useState, useEffect } from 'react';
import { login as loginApi, register as registerApi } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check local storage for stored user on app load
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);
  
  const login = async (credentials) => {
    try {
      const response = await loginApi(credentials);
      const userData = response.data;
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', userData.token);
      return userData;
    } catch (error) {
      throw error;
    }
  };
  
  const register = async (userData) => {
    try {
      const response = await registerApi(userData);
      const newUser = response.data.user;
      // If your API returns a token with registration
      const token = response.data.token; 
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      localStorage.setItem('token', token);
      return newUser;
    } catch (error) {
      throw error;
    }
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const updateUserContext = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };
  
  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, updateUserContext }}>
      {children}
    </AuthContext.Provider>
  );
};