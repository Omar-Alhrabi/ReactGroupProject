import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const ProfileHeader = ({ profile, isFollowing, onFollowToggle }) => {
  const { user: currentUser } = useContext(AuthContext);
  const isCurrentUser = currentUser && currentUser.id === profile.id;

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex flex-col md:flex-row items-center">
        <div className="w-32 h-32 bg-gray-300 rounded-full mb-4 md:mb-0 md:mr-6 flex items-center justify-center">
          {profile.avatar ? (
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <span className="text-gray-600 text-4xl">{profile.name.charAt(0)}</span>
          )}
        </div>
        
        <div className="flex-grow text-center md:text-left">
          <h1 className="text-2xl font-bold">{profile.name}</h1>
          <p className="text-gray-600">{profile.email}</p>
          
          <div className="flex flex-wrap justify-center md:justify-start mt-2 space-x-4">
            <div>
              <span className="font-semibold">{profile.posts_count || 0}</span> posts
            </div>
            <div>
              <span className="font-semibold">{profile.followers_count || 0}</span> followers
            </div>
            <div>
              <span className="font-semibold">{profile.following_count || 0}</span> following
            </div>
          </div>
          
          <p className="mt-3 text-gray-700">{profile.bio || 'No bio available'}</p>
        </div>
        
        <div className="mt-4 md:mt-0 ml-0 md:ml-4">
          {isCurrentUser ? (
            <Link
              to="/profile/edit"
              className="flex items-center px-4 py-2 bg-gray-200 rounded-lg text-gray-800 hover:bg-gray-300"
            >
              Edit Profile
            </Link>
          ) : (
            <button 
              className={`flex items-center px-4 py-2 rounded-lg ${
                isFollowing 
                  ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
              onClick={onFollowToggle}
            >
              {isFollowing ? 'Unfollow' : 'Follow'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;