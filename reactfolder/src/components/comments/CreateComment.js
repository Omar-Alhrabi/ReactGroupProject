import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { createComment } from '../../services/commentService';

const CreateComment = ({ postId, parentId = null, onCommentCreated }) => {
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) return;
    if (!body.trim()) return;
    
    try {
      setLoading(true);
      setError('');
      
      const commentData = {
        body: body.trim(),
        user_id: user.id,
        parent_id: parentId
      };
      
      const response = await createComment(postId, commentData);
      
      setBody('');
      if (onCommentCreated) {
        onCommentCreated(response.data.comment);
      }
    } catch (err) {
      console.error('Failed to create comment:', err);
      setError('Failed to add comment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="bg-gray-50 p-4 rounded-lg text-center">
        <p className="text-gray-600">Please log in to comment</p>
      </div>
    );
  }

  return (
    <div className="mb-6">
      {error && <div className="text-red-500 mb-2">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="flex">
          <div className="h-10 w-10 bg-gray-300 rounded-full flex items-center justify-center">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <span className="text-gray-600">{user.name.charAt(0)}</span>
            )}
          </div>
          
          <div className="flex-grow ml-3">
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={parentId ? 'Write a reply...' : 'Write a comment...'}
              rows="3"
              required
            />
            
            <div className="flex justify-end mt-2">
              <button
                type="submit"
                className="px-4 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                disabled={loading || !body.trim()}
              >
                {loading ? 'Posting...' : parentId ? 'Reply' : 'Comment'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateComment;