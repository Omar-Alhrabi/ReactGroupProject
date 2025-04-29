import React, { useState, useEffect, useContext } from 'react';
import { getPosts, likePost, unlikePost } from '../../services/postService';
import { AuthContext } from '../../context/AuthContext';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await getPosts();
        setPosts(response.data);
      } catch (err) {
        setError('Failed to load posts');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPosts();
  }, []);

  const handleLike = async (postId) => {
    if (!user) return;
    
    try {
      const post = posts.find(p => p.id === postId);
      const isLiked = post.likes.some(like => like.user_id === user.id);
      
      if (isLiked) {
        await unlikePost(postId, user.id);
      } else {
        await likePost(postId, user.id);
      }
      
      const response = await getPosts();
      setPosts(response.data);
    } catch (err) {
      setError('Failed to update like');
      console.error(err);
    }
  };

  if (loading) return <div className="text-center p-4">Loading posts...</div>;
  if (error) return <div className="text-danger p-4">{error}</div>;

  return (
    <div className="d-flex flex-column gap-4">
      {posts.map(post => (
        <PostCard 
          key={post.id}
          post={post}
          currentUser={user}
          onLike={handleLike}
        />
      ))}
    </div>
  );
};

const PostCard = ({ post, currentUser, onLike }) => {
  const isLiked = post.likes?.some(like => currentUser && like.user_id === currentUser.id);
  
  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex align-items-center mb-3">
          <div className="rounded-circle bg-secondary d-flex justify-content-center align-items-center" style={{width: "40px", height: "40px"}}></div>
          <div className="ms-3">
            <h3 className="fw-medium mb-0">{post.user?.name || 'unknown'}</h3>
            <p className="text-muted small mb-0">{new Date(post.created_at).toLocaleString()}</p>
          </div>
        </div>
        
        <h2 className="fs-4 fw-bold mb-2">{post.title}</h2>
        <p className="mb-3">{post.body}</p>
        
        <div className="d-flex align-items-center justify-content-between pt-2 border-top">
          <button 
            className={`btn btn-sm ${isLiked ? 'text-danger' : 'text-secondary'} border-0`}
            onClick={() => onLike(post.id)}
          >
            {post.likes?.length || 0} Like
          </button>
          
          <button className="btn btn-sm text-secondary border-0">
            {post.comments?.length || 0} comment
          </button>
          
          <button className="btn btn-sm text-secondary border-0">
            share
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostList;