import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Heart, Reply } from 'lucide-react';

// Mocked services - replace with actual implementations
const getPostComments = async (postId) => {
  // Implementation would fetch from your Laravel API
  return { data: [] };
};

const addComment = async (postId, commentData) => {
  // Implementation would post to your Laravel API
};

const likeComment = async (commentId, userId) => {
  // Implementation would call your Laravel API
};

const unlikeComment = async (commentId, userId) => {
  // Implementation would call your Laravel API
};

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [replyingTo, setReplyingTo] = useState(null);
  const [commentText, setCommentText] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const response = await getPostComments(postId);
        // Filter to get only top-level comments
        const topLevelComments = response.data.filter(comment => !comment.parent_id);
        setComments(topLevelComments);
      } catch (err) {
        setError('Failed to load comments');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchComments();
  }, [postId]);

  const handleAddComment = async () => {
    if (!commentText.trim() || !user) return;
    
    try {
      const commentData = {
        user_id: user.id,
        body: commentText.trim(),
        parent_id: null
      };
      
      await addComment(postId, commentData);
      // Refresh comments
      const response = await getPostComments(postId);
      const topLevelComments = response.data.filter(comment => !comment.parent_id);
      setComments(topLevelComments);
      setCommentText('');
    } catch (err) {
      setError('Failed to add comment');
      console.error(err);
    }
  };

  const handleAddReply = async (parentId) => {
    if (!commentText.trim() || !user) return;
    
    try {
      const commentData = {
        user_id: user.id,
        body: commentText.trim(),
        parent_id: parentId
      };
      
      await addComment(postId, commentData);
      // Refresh comments
      const response = await getPostComments(postId);
      const topLevelComments = response.data.filter(comment => !comment.parent_id);
      setComments(topLevelComments);
      setCommentText('');
      setReplyingTo(null);
    } catch (err) {
      setError('Failed to add reply');
      console.error(err);
    }
  };

  const handleLike = async (commentId) => {
    if (!user) return;
    
    try {
      const comment = findCommentById(comments, commentId);
      const isLiked = comment.likes?.some(like => like.user_id === user.id);
      
      if (isLiked) {
        await unlikeComment(commentId, user.id);
      } else {
        await likeComment(commentId, user.id);
      }
      
      // Refresh comments
      const response = await getPostComments(postId);
      const topLevelComments = response.data.filter(comment => !comment.parent_id);
      setComments(topLevelComments);
    } catch (err) {
      setError('Failed to update like');
      console.error(err);
    }
  };

  // Helper function to find a comment by id, including in nested children
  const findCommentById = (commentList, id) => {
    for (const comment of commentList) {
      if (comment.id === id) return comment;
      if (comment.children?.length) {
        const found = findCommentById(comment.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  if (loading) return <div className="p-4">Loading comments...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4">Comments</h3>
      
      <div className="flex mb-6">
        <div className="h-8 w-8 rounded-full bg-gray-300 flex-shrink-0"></div>
        <div className="ml-3 flex-grow">
          <textarea
            className="w-full border border-gray-300 rounded-lg p-2 text-sm"
            rows="2"
            placeholder="Write a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button 
            className="bg-blue-500 text-white px-4 py-1 rounded-lg mt-2 text-sm"
            onClick={handleAddComment}
            disabled={!commentText.trim() || !user}
          >
            Comment
          </button>
        </div>
      </div>
      
      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-gray-500">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map(comment => (
            <Comment 
              key={comment.id} 
              comment={comment} 
              onLike={handleLike}
              onReply={(id) => setReplyingTo(id)}
              replyingTo={replyingTo}
              onAddReply={handleAddReply}
              currentUser={user}
              commentText={commentText}
              setCommentText={setCommentText}
            />
          ))
        )}
      </div>
    </div>
  );
};

const Comment = ({ 
  comment, 
  onLike, 
  onReply, 
  replyingTo, 
  onAddReply, 
  currentUser,
  commentText,
  setCommentText,
  depth = 0 
}) => {
  const isLiked = comment.likes?.some(like => currentUser && like.user_id === currentUser.id);
  const isReplying = replyingTo === comment.id;
  const maxDepth = 3; // Limit nesting for visual clarity
  
  return (
    <div className={`${depth > 0 ? 'ml-6 mt-3' : ''}`}>
      <div className="flex">
        <div className="h-8 w-8 rounded-full bg-gray-300 flex-shrink-0"></div>
        <div className="ml-3 flex-grow">
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center mb-2">
              <h4 className="font-medium">{comment.user?.name || 'Anonymous'}</h4>
              <span className="text-gray-500 text-xs ml-2">
                {new Date(comment.created_at).toLocaleString()}
              </span>
            </div>
            <p>{comment.body}</p>
          </div>
          
          <div className="flex items-center mt-2 text-sm">
            <button 
              className={`mr-4 flex items-center ${isLiked ? 'text-red-500' : 'text-gray-500'}`}
              onClick={() => onLike(comment.id)}
            >
              <Heart size={14} fill={isLiked ? 'currentColor' : 'none'} className="mr-1" />
              <span>{comment.likes?.length || 0}</span>
            </button>
            
            {depth < maxDepth && (
              <button 
                className="text-gray-500 flex items-center"
                onClick={() => onReply(comment.id)}
              >
                <Reply size={14} className="mr-1" />
                Reply
              </button>
            )}
          </div>
          
          {isReplying && (
            <div className="mt-3">
              <div className="flex">
                <div className="h-6 w-6 rounded-full bg-gray-300 flex-shrink-0"></div>
                <div className="ml-2 flex-grow">
                  <textarea
                    className="w-full border border-gray-300 rounded-lg p-2 text-xs"
                    rows="2"
                    placeholder={`Reply to ${comment.user?.name}...`}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  />
                  <div className="flex justify-end mt-1">
                    <button 
                      className="text-gray-500 text-xs mr-2"
                      onClick={() => onReply(null)}
                    >
                      Cancel
                    </button>
                    <button 
                      className="bg-blue-500 text-white px-3 py-1 rounded text-xs"
                      onClick={() => onAddReply(comment.id)}
                      disabled={!commentText.trim() || !currentUser}
                    >
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {comment.children?.length > 0 && (
            <div className="mt-3">
              {comment.children.map(childComment => (
                <Comment
                  key={childComment.id}
                  comment={childComment}
                  onLike={onLike}
                  onReply={onReply}
                  replyingTo={replyingTo}
                  onAddReply={onAddReply}
                  currentUser={currentUser}
                  commentText={commentText}
                  setCommentText={setCommentText}
                  depth={depth + 1}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentList;