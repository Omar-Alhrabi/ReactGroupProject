import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getUser, followUser, unfollowUser } from '../services/userService';
import { getUserPosts } from '../services/postService';
import ProfileHeader from '../components/profile/ProfileHeader';
//import PostList from '../components/posts/PostList';
import Loader from '../components/common/Loader';

const Profile = () => {
  const { id } = useParams();
  const { user: currentUser } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState('posts');

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        
        const [userResponse, postsResponse] = await Promise.all([
          getUser(id),
          getUserPosts(id)
        ]);
        
        setProfile(userResponse.data);
        setPosts(postsResponse.data);
        
        // Check if current user is following this profile
        if (currentUser && userResponse.data.followers) {
          setIsFollowing(
            userResponse.data.followers.some(follower => follower.id === currentUser.id)
          );
        }
      } catch (err) {
        console.error('Failed to fetch profile:', err);
        setError('Failed to load user profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [id, currentUser]);

  const handleFollowToggle = async () => {
    if (!currentUser) return;
    
    try {
      if (isFollowing) {
        await unfollowUser(profile.id, currentUser.id);
      } else {
        await followUser(profile.id, currentUser.id);
      }
      
      setIsFollowing(!isFollowing);
      
      // Update follower count
      setProfile(prev => ({
        ...prev,
        followers_count: isFollowing 
          ? (prev.followers_count - 1) 
          : (prev.followers_count + 1)
      }));
    } catch (err) {
      console.error('Failed to update follow status:', err);
    }
  };

  if (loading) return <Loader />;
  if (error) return <div className="text-red-500 text-center py-4">{error}</div>;
  if (!profile) return <div className="text-center py-4">User not found</div>;

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
    <ProfileHeader 
      profile={profile} 
      isFollowing={isFollowing} 
      onFollowToggle={handleFollowToggle} 
    />
    
    {/* Tabs */}
    <div className="bg-white rounded-lg shadow">
      <div className="flex border-b">
        <button 
          className={`flex-1 py-3 font-medium ${
            activeTab === 'posts' 
              ? 'text-blue-500 border-b-2 border-blue-500' 
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('posts')}
        >
          Posts
        </button>
        <button 
          className={`flex-1 py-3 font-medium ${
            activeTab === 'media' 
              ? 'text-blue-500 border-b-2 border-blue-500' 
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('media')}
        >
          Media
        </button>
        <button 
          className={`flex-1 py-3 font-medium ${
            activeTab === 'likes' 
              ? 'text-blue-500 border-b-2 border-blue-500' 
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('likes')}
        >
          Likes
        </button>
      </div>
      
      <div className="p-4">
        {activeTab === 'posts' && (
          <div>
            {posts.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p className="text-lg">No posts yet</p>
                {profile.id === currentUser?.id && (
                  <p className="mt-2">Share your first post with your followers</p>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {posts.map(post => (
                  <div key={post.id} className="border-b pb-4 mb-4 last:border-b-0">
                    <h2 className="font-bold text-lg">{post.title}</h2>
                    <p className="text-gray-700 mt-2">{post.body}</p>
                    <div className="flex items-center mt-3 text-sm text-gray-500">
                      <span className="mr-4">{post.likes?.length || 0} likes</span>
                      <span>{post.comments?.length || 0} comments</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'media' && (
          <div className="text-center py-8 text-gray-500">
            <p>No media uploads yet</p>
          </div>
        )}
        
        {activeTab === 'likes' && (
          <div className="text-center py-8 text-gray-500">
            <p>Posts liked by {profile.name} will appear here</p>
          </div>
        )}
      </div>
    </div>
  </div>
);
};

export default Profile;