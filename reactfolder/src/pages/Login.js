import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';

const Login = () => {
  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
      
      <LoginForm />
      
      <div className="mt-4 text-center">
        <p>Don't have an account? <Link to="/register" className="text-blue-500">Register</Link></p>
      </div>
    </div>
  );
};

export default Login;