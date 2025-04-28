import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { followUser, unfollowUser } from '../../services/userService';

const UserCard = ({ user, onFollowChange }) => {
  const { user: currentUser } = useContext(AuthContext);

  // Check if current user is following this user
  const isFollowing = user.followers?.some(
    follower => follower.id === currentUser?.id
  );

  const handleFollowToggle = async () => {
    if (!currentUser) return;

    try {
      if (isFollowing) {
        await unfollowUser(user.id, currentUser.id);
      } else {
        await followUser(user.id, currentUser.id);
      }
      
      // Call callback to update UI
      if (onFollowChange) {
        onFollowChange(user.id, !isFollowing);
      }
    } catch (error) {
      console.error('Failed to update follow status:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
      <div className="flex items-center">
        <div className="h-12 w-12 bg-gray-300 rounded-full flex items-center justify-center">
          {user.avatar ? (
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="h-12 w-12 rounded-full object-cover"
            />
          ) : (
            <span className="text-gray-600 text-xl">{user.name.charAt(0)}</span>
          )}
        </div>
        
        <div className="ml-3">
          <Link to={`/profile/${user.id}`} className="font-medium text-blue-600 hover:underline">
            {user.name}
          </Link>
          <p className="text-gray-500 text-sm">{user.email}</p>
        </div>
      </div>

      {currentUser && currentUser.id !== user.id && (
        <button
          onClick={handleFollowToggle}
          className={`px-4 py-1 rounded ${
            isFollowing 
              ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isFollowing ? 'Unfollow' : 'Follow'}
        </button>
      )}
    </div>
  );
};

export default UserCard;