import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import PostList from '../components/posts/PostList';
import UserList from '../components/users/UserList';

const Home = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto py-10 px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">Welcome to SocialApp</h1>
          <p className="text-xl text-gray-600 mb-6">
            Connect with friends and share your moments
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/login"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
            >
              Register
            </Link>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4">Features</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4 border rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Share Posts</h3>
              <p className="text-gray-600">
                Share your thoughts, photos, and moments with your friends
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Connect</h3>
              <p className="text-gray-600">
                Follow other users and build your network
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Engage</h3>
              <p className="text-gray-600">
                Like and comment on posts to engage with others
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-3/4">
          <h2 className="text-2xl font-bold mb-6">Feed</h2>
          <PostList />
        </div>
        
        <div className="md:w-1/4">
          <h2 className="text-xl font-bold mb-4">Suggested Users</h2>
          <UserList limit={5} />
        </div>
      </div>
    </div>
  );
};

export default Home;