import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { createPost } from '../services/postService';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !body.trim()) {
      setError('Title and content are required');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const postData = {
        title,
        body,
        user_id: user.id
      };
      
      const response = await createPost(postData);
      navigate(`/posts/${response.data.post.id}`);
    } catch (err) {
      console.error('Failed to create post:', err);
      
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Failed to create post. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <div className="card">
        <div className="card-body">
          <h1 className="fs-3 fw-bold mb-4">Create New Post</h1>
          
          {error && <div className="alert alert-danger mb-3">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label" htmlFor="title">Title</label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-control"
                placeholder="Enter your post title"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="form-label" htmlFor="body">Content</label>
              <textarea
                id="body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="form-control"
                style={{ height: "160px" }}
                placeholder="What's on your mind?"
                required
              />
            </div>
            
            <div className="text-end">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="btn btn-secondary me-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? 'Creating...' : 'Create Post'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;