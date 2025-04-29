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
      {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your post title"
          required
        />
      </div>
      
      <div className="mb-6">
        <label className="block text-gray-700 mb-2" htmlFor="body">Content</label>
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 h-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="What's on your mind?"
          required
        />
      </div>
      
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Submitting...' : buttonText}
        </button>
      </div>
    </form>
  );
};

export default CreatePostForm;