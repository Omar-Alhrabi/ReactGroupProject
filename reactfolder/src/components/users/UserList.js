import React, { useState, useEffect } from 'react';
import { getUsers } from '../../services/userService';
import UserCard from './UserCard';
import Loader from '../common/Loader';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await getUsers();
        setUsers(response.data);
      } catch (err) {
        console.error('Failed to fetch users:', err);
        setError('Failed to load users list');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleFollowChange = (userId, isFollowing) => {
    // Update follow status in local users list
    setUsers(prevUsers => 
      prevUsers.map(user => {
        if (user.id === userId) {
          // Here you should update the followers array based on new follow status
          // This is a simplified example
          return {
            ...user,
            is_following: isFollowing
          };
        }
        return user;
      })
    );
  };

  if (loading) return <Loader />;
  if (error) return <div className="text-red-500 text-center py-4">{error}</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Users</h2>
      
      {users.length === 0 ? (
        <p className="text-gray-500 text-center">No users found</p>
      ) : (
        users.map(user => (
          <UserCard 
            key={user.id} 
            user={user} 
            onFollowChange={handleFollowChange}
          />
        ))
      )}
    </div>
  );
};

export default UserList;