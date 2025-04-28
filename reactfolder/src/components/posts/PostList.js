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
        setError('فشل تحميل المنشورات');
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
      
      // تحديث المنشورات بعد الإعجاب/إلغاء الإعجاب
      const response = await getPosts();
      setPosts(response.data);
    } catch (err) {
      setError('فشل تحديث الإعجاب');
      console.error(err);
    }
  };

  if (loading) return <div className="text-center p-6">جاري تحميل المنشورات...</div>;
  if (error) return <div className="text-red-500 p-6">{error}</div>;

  return (
    <div className="space-y-6">
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
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center mb-4">
        <div className="h-10 w-10 rounded-full bg-gray-300"></div>
        <div className="ml-3">
          <h3 className="font-medium">{post.user?.name || 'مجهول'}</h3>
          <p className="text-gray-500 text-sm">{new Date(post.created_at).toLocaleString()}</p>
        </div>
      </div>
      
      <h2 className="text-xl font-bold mb-2">{post.title}</h2>
      <p className="mb-4">{post.body}</p>
      
      <div className="flex items-center justify-between pt-2 border-t">
        <button 
          className={`flex items-center ${isLiked ? 'text-red-500' : 'text-gray-500'}`}
          onClick={() => onLike(post.id)}
        >
          <span>{post.likes?.length || 0} إعجاب</span>
        </button>
        
        <button className="flex items-center text-gray-500">
          <span>{post.comments?.length || 0} تعليق</span>
        </button>
        
        <button className="flex items-center text-gray-500">
          مشاركة
        </button>
      </div>
    </div>
  );
};

export default PostList;