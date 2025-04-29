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
    <div className="card mb-3">
      <div className="card-body">
        <div className="d-flex align-items-center mb-3">
          <div className="bg-secondary rounded-circle d-flex align-items-center justify-content-center" style={{width: "40px", height: "40px"}}>
            {post.user?.avatar ? (
              <img 
                src={post.user.avatar} 
                alt={post.user.name} 
                className="rounded-circle w-100 h-100 object-fit-cover"
              />
            ) : (
              <span className="text-white">{post.user?.name?.charAt(0) || 'U'}</span>
            )}
          </div>
          
          <div className="ms-3 flex-grow-1">
            <Link to={`/profile/${post.user_id}`} className="fw-medium text-decoration-hover">
              {post.user?.name || 'Unknown User'}
            </Link>
            <p className="text-muted small mb-0">{formatDate(post.created_at)}</p>
          </div>

          {isAuthor && (
            <div>
              <Link 
                to={`/posts/${post.id}/edit`} 
                className="small text-primary text-decoration-hover"
              >
                Edit
              </Link>
            </div>
          )}
        </div>
        
        <Link to={`/posts/${post.id}`} className="text-decoration-none text-dark">
          <h3 className="fw-bold fs-4 mb-2">{post.title}</h3>
          <p className="text-secondary mb-3">{post.body}</p>
        </Link>
        
        <div className="d-flex align-items-center justify-content-between border-top pt-3">
          <button 
            onClick={handleLike}
            className={`btn btn-sm ${isLiked ? 'text-danger' : 'text-secondary'} d-flex align-items-center border-0`}
            disabled={!user}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg"
              width="16" 
              height="16"
              className="me-1" 
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
          
          <Link to={`/posts/${post.id}`} className="btn btn-sm text-secondary d-flex align-items-center border-0">
            <svg 
              xmlns="http://www.w3.org/2000/svg"
              width="16" 
              height="16"
              className="me-1" 
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
          
          <button className="btn btn-sm text-secondary d-flex align-items-center border-0">
            <svg 
              xmlns="http://www.w3.org/2000/svg"
              width="16" 
              height="16"
              className="me-1" 
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
    </div>
  );
};

export default PostCard;