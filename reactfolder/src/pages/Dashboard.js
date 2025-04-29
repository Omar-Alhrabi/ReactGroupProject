import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getUserStats } from '../services/userService';
import Loader from '../components/common/Loader';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [period, setPeriod] = useState('week'); // week, month, year

  useEffect(() => {
    const fetchStats = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const response = await getUserStats(user.id, period);
        setStats(response.data);
      } catch (err) {
        console.error('Failed to fetch user stats:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user, period]);

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto py-10 px-4 text-center">
        <p className="text-lg text-gray-600">Please log in to view your dashboard</p>
      </div>
    );
  }

  if (loading) return <Loader />;
  if (error) return <div className="text-red-500 text-center py-4">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Dashboard</h1>
        
        <div className="flex border rounded-lg overflow-hidden">
          <button 
            className={`px-4 py-2 ${period === 'week' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
            onClick={() => setPeriod('week')}
          >
           
           
          </button>
          <button 
            className={`px-4 py-2 ${period === 'month' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
            onClick={() => setPeriod('month')}
          >
            Month
          </button>
          <button 
            className={`px-4 py-2 ${period === 'year' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
            onClick={() => setPeriod('year')}
          >
            Year
          </button>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm uppercase font-semibold">Posts</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-3xl font-bold">{stats.posts_count}</p>
            <p className="ml-2 text-sm text-gray-600">total</p>
          </div>
          <p className="text-green-600 mt-2 text-sm">
            +{stats.new_posts_count} new this {period}
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm uppercase font-semibold">Followers</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-3xl font-bold">{stats.followers_count}</p>
            <p className="ml-2 text-sm text-gray-600">total</p>
          </div>
          <p className="text-green-600 mt-2 text-sm">
            +{stats.new_followers_count} new this {period}
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm uppercase font-semibold">Likes Received</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-3xl font-bold">{stats.likes_received_count}</p>
            <p className="ml-2 text-sm text-gray-600">total</p>
          </div>
          <p className="text-green-600 mt-2 text-sm">
            +{stats.new_likes_received_count} new this {period}
          </p>
        </div>
      </div>
      
      {/* Activity Summary */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Activity Summary</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-medium">Most Popular Post</h3>
            {stats.most_popular_post ? (
              <div className="mt-2 border-l-4 border-blue-500 pl-3">
                <p className="font-medium">{stats.most_popular_post.title}</p>
                <div className="flex text-sm text-gray-500 mt-1">
                  <p>{stats.most_popular_post.likes_count} likes</p>
                  <span className="mx-2">•</span>
                  <p>{stats.most_popular_post.comments_count} comments</p>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 mt-2">No posts yet</p>
            )}
          </div>
          
          <div>
            <h3 className="font-medium">Recent Activity</h3>
            {stats.recent_activities && stats.recent_activities.length > 0 ? (
              <ul className="mt-2 space-y-2">
                {stats.recent_activities.map((activity, index) => (
                  <li key={index} className="text-sm">
                    <span className="text-gray-500">
                      {activity.type === 'post_created' && 'Created a new post'}
                      {activity.type === 'post_liked' && 'Liked a post'}
                      {activity.type === 'comment_created' && 'Commented on a post'}
                      {activity.type === 'started_following' && `Started following ${activity.target_name}`}
                    </span>
                    <span className="text-gray-400 ml-2">
                      {new Date(activity.created_at).toLocaleDateString()}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 mt-2">No recent activity</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;