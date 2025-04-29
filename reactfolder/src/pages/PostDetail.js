import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getPost, likePost, unlikePost, deletePost } from '../services/postService';
import CommentList from '../components/comments/CommentList';
import Loader from '../components/common/Loader';
import { formatDate } from '../utils/formatDate';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await getPost(id);
        setPost(response.data);
      } catch (err) {
        console.error('Failed to fetch post:', err);
        setError('Failed to load post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleLike = async () => {
    if (!user) return;
    
    try {
      const isLiked = post.likes?.some(like => like.user_id === user.id);
      
      if (isLiked) {
        await unlikePost(post.id, user.id);
      } else {
        await likePost(post.id, user.id);
      }
      
      // Refresh post data
      const response = await getPost(id);
      setPost(response.data);
    } catch (err) {
      console.error('Failed to update like status:', err);
    }
  };

  const handleDelete = async () => {
    try {
      await deletePost(post.id);
      navigate('/');
    } catch (err) {
      console.error('Failed to delete post:', err);
      setError('Failed to delete post');
    }
  };

  if (loading) return <Loader />;
  if (error) return <div className="text-danger text-center py-4">{error}</div>;
  if (!post) return <div className="text-center py-4">Post not found</div>;

  const isLiked = post.likes?.some(like => like.user_id === user?.id);
  const isAuthor = user && post.user_id === user.id;

  return (
    <div className="container py-4">
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start mb-3">
            <div className="d-flex align-items-center">
              <div className="bg-secondary rounded-circle d-flex align-items-center justify-content-center" style={{width: "40px", height: "40px"}}>
                {post.user?.avatar ? (
                  <img 
                    src={post.user.avatar} 
                    alt={post.user.name} 
                    className="rounded-circle w-100 h-100 object-fit-cover"
                  />
                ) : (
                  <span className="text-white">{post.user?.name.charAt(0)}</span>
                )}
              </div>
              <div className="ms-3">
                <Link to={`/profile/${post.user_id}`} className="fw-medium text-decoration-hover">
                  {post.user?.name || 'Unknown User'}
                </Link>
                <p className="text-muted small mb-0">{formatDate(post.created_at)}</p>
              </div>
            </div>

            {isAuthor && (
              <div className="d-flex gap-2">
                <Link 
                  to={`/posts/${post.id}/edit`} 
                  className="small text-primary text-decoration-hover"
                >
                  Edit
                </Link>
                <button 
                  onClick={() => setShowDeleteModal(true)}
                  className="small text-danger border-0 bg-transparent p-0 text-decoration-hover"
                >
                  Delete
                </button>
              </div>
            )}
          </div>

          <h1 className="fs-3 fw-bold mb-3">{post.title}</h1>
          <div className="mb-4">
            <p>{post.body}</p>
          </div>

          <div className="d-flex align-items-center justify-content-between border-top pt-3">
            <div className="d-flex align-items-center">
              <button 
                onClick={handleLike}
                className={`btn btn-sm ${isLiked ? 'text-danger' : 'text-secondary'} p-0 d-flex align-items-center border-0`}
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
                <span>{post.likes?.length || 0} likes</span>
              </button>
              <div className="ms-3 text-secondary">
                <span>{post.comments?.length || 0} comments</span>
              </div>
            </div>
            
            <button className="btn btn-sm text-secondary p-0 d-flex align-items-center border-0">
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

      <div className="mt-4">
        <CommentList postId={post.id} />
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal fade show" style={{display: 'block'}} tabIndex="-1" aria-modal="true" role="dialog">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button type="button" className="btn-close" onClick={() => setShowDeleteModal(false)} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this post? This action cannot be undone.</p>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-danger" 
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </div>
      )}
    </div>
  );
};

export default PostDetail;