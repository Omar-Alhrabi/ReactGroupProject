import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../components/auth/RegisterForm';

const Register = () => {
  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Create Account</h1>
      
      <RegisterForm />
      
      <div className="mt-4 text-center">
        <p>Already have an account? <Link to="/login" className="text-blue-500">Login</Link></p>
      </div>
    </div>
  );
};

export default Register;