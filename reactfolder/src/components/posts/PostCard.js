import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { likePost, unlikePost } from '../../services/postService';
import { formatDate } from '../../utils/formatDate';

const PostCard = ({ post, refreshPosts }) => {
  const { user } = useContext(AuthContext);
  
  const isLiked = user && post.likes?.some(like => like.user_id === user.id);
  const isAuthor = user && post.user_id === user.id;

  const handleLike = async () => {
    if (!user) return;
    
    try {
      if (isLiked) {
        await unlikePost(post.id, user.id);
      } else {
        await likePost(post.id, user.id);
      }
      
      if (refreshPosts) {
        refreshPosts();
      }
    } catch (error) {
      console.error('Failed to update like:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <div className="flex items-center mb-4">
        <div className="h-10 w-10 bg-gray-300 rounded-full flex items-center justify-center">
          {post.user?.avatar ? (
            <img 
              src={post.user.avatar} 
              alt={post.user.name} 
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <span className="text-gray-600 text-xl">{post.user?.name?.charAt(0) || 'U'}</span>
          )}
        </div>
        
        <div className="ml-3 flex-grow">
          <Link to={`/profile/${post.user_id}`} className="font-medium hover:underline">
            {post.user?.name || 'Unknown User'}
          </Link>
          <p className="text-gray-500 text-sm">{formatDate(post.created_at)}</p>
        </div>

        {isAuthor && (
          <div className="flex space-x-2">
            <Link 
              to={`/posts/${post.id}/edit`} 
              className="text-sm text-blue-600 hover:underline"
            >
              Edit
            </Link>
          </div>
        )}
      </div>
      
      <Link to={`/posts/${post.id}`}>
        <h3 className="text-xl font-bold mb-2">{post.title}</h3>
        <p className="text-gray-700 mb-4">{post.body}</p>
      </Link>
      
      <div className="flex items-center justify-between border-t pt-3">
        <button 
          onClick={handleLike}
          className={`flex items-center ${isLiked ? 'text-red-500' : 'text-gray-500'}`}
          disabled={!user}
        >
          <svg 
            className="w-5 h-5 mr-1" 
            fill={isLiked ? 'currentColor' : 'none'} 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
            />
          </svg>
          <span>{post.likes?.length || 0}</span>
        </button>
        
        <Link to={`/posts/${post.id}`} className="flex items-center text-gray-500">
          <svg 
            className="w-5 h-5 mr-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
            />
          </svg>
          <span>{post.comments?.length || 0}</span>
        </Link>
        
        <button className="flex items-center text-gray-500">
          <svg 
            className="w-5 h-5 mr-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" 
            />
          </svg>
          Share
        </button>
      </div>
    </div>
  );
};

export default PostCard;