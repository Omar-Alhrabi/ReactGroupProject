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
  if (error) return <div className="text-red-500 text-center py-4">{error}</div>;
  if (!post) return <div className="text-center py-4">Post not found</div>;

  const isLiked = post.likes?.some(like => like.user_id === user?.id);
  const isAuthor = user && post.user_id === user.id;

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            <div className="h-10 w-10 bg-gray-300 rounded-full flex items-center justify-center">
              {post.user?.avatar ? (
                <img 
                  src={post.user.avatar} 
                  alt={post.user.name} 
                  className="h-10 w-10 rounded-full object-cover"
                />
              ) : (
                <span className="text-gray-600">{post.user?.name.charAt(0)}</span>
              )}
            </div>
            <div className="ml-3">
              <Link to={`/profile/${post.user_id}`} className="font-medium hover:underline">
                {post.user?.name || 'Unknown User'}
              </Link>
              <p className="text-gray-500 text-sm">{formatDate(post.created_at)}</p>
            </div>
          </div>

          {isAuthor && (
            <div className="flex space-x-2">
              <Link 
                to={`/posts/${post.id}/edit`} 
                className="text-sm text-blue-600 hover:underline"
              >
                Edit
              </Link>
              <button 
                onClick={() => setShowDeleteModal(true)}
                className="text-sm text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          )}
        </div>

        <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
        <div className="prose max-w-none mb-6">
          <p>{post.body}</p>
        </div>

        <div className="flex items-center justify-between border-t pt-4">
          <div className="flex items-center">
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
              <span>{post.likes?.length || 0} likes</span>
            </button>
            <div className="ml-4 text-gray-500">
              <span>{post.comments?.length || 0} comments</span>
            </div>
          </div>
          
          <button className="text-gray-500 flex items-center">
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      <div className="mt-6">
        <CommentList postId={post.id} />
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <h3 className="text-xl font-bold mb-4">Confirm Delete</h3>
            <p className="mb-6">Are you sure you want to delete this post? This action cannot be undone.</p>
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button 
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetail;