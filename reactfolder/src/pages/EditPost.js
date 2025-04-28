import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getPost, updatePost } from '../services/postService';
import CreatePostForm from '../components/posts/CreatePostForm';
import Loader from '../components/common/Loader';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await getPost(id);
        setPost(response.data);
        
        // Check if user is the author
        if (user.id !== response.data.user_id) {
          navigate(`/posts/${id}`);
        }
      } catch (err) {
        console.error('Failed to fetch post:', err);
        setError('Failed to load post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, navigate, user]);

  const handleSubmit = async (postData) => {
    try {
      const response = await updatePost(id, postData);
      navigate(`/posts/${response.data.post.id}`);
    } catch (err) {
      console.error('Failed to update post:', err);
      throw err;
    }
  };

  if (loading) return <Loader />;
  if (error) return <div className="text-red-500 text-center py-4">{error}</div>;
  if (!post) return <div className="text-center py-4">Post not found</div>;

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-6">Edit Post</h1>
        
        <CreatePostForm 
          onSubmit={handleSubmit} 
          initialData={post} 
          buttonText="Save Changes" 
        />
        
        <div className="mt-4">
          <button
            onClick={() => navigate(`/posts/${id}`)}
            className="text-gray-600 hover:underline"
          >
            Cancel and return to post
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPost;