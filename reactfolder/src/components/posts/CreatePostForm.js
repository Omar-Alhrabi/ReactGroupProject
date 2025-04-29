import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const CreatePostForm = ({ onSubmit, initialData = {}, buttonText = 'Create Post' }) => {
  const [title, setTitle] = useState(initialData.title || '');
  const [body, setBody] = useState(initialData.body || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !body.trim()) {
      setError('Title and content are required');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      await onSubmit({
        title: title.trim(),
        body: body.trim(),
        user_id: user.id
      });
    } catch (err) {
      console.error('Form submission error:', err);
      
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('An error occurred. Please try again.');
      }
      
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="alert alert-danger mb-3">{error}</div>}
      
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
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? 'Submitting...' : buttonText}
        </button>
      </div>
    </form>
  );
};

export default CreatePostForm;