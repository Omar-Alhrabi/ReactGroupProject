import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchUsers } from '../services/userService';
import { searchPosts } from '../services/postService';
import UserCard from '../components/users/UserCard';
import PostCard from '../components/posts/PostCard';
import Loader from '../components/common/Loader';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [activeTab, setActiveTab] = useState('all');
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;
      
      try {
        setLoading(true);
        setError(null);
        
        const [usersResponse, postsResponse] = await Promise.all([
          searchUsers(query),
          searchPosts(query)
        ]);
        
        setUsers(usersResponse.data);
        setPosts(postsResponse.data);
      } catch (err) {
        console.error('Search error:', err);
        setError('Failed to load search results');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  const refreshPosts = async () => {
    try {
      const response = await searchPosts(query);
      setPosts(response.data);
    } catch (err) {
      console.error('Failed to refresh posts:', err);
    }
  };

  if (loading) return <Loader />;
  
  if (!query) {
    return (
      <div className="max-w-4xl mx-auto py-6 px-4">
        <div className="text-center py-10">
          <p className="text-xl text-gray-600">Enter a search term to find users or posts</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold mb-6">Search Results for "{query}"</h1>
      
      {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-6">{error}</div>}
      
      <div className="mb-6">
        <div className="flex border-b">
          <button 
            className={`px-4 py-2 font-medium ${
              activeTab === 'all' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('all')}
          >
            All ({users.length + posts.length})
          </button>
          <button 
            className={`px-4 py-2 font-medium ${
              activeTab === 'users' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('users')}
          >
            People ({users.length})
          </button>
          <button 
            className={`px-4 py-2 font-medium ${
              activeTab === 'posts' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('posts')}
          >
            Posts ({posts.length})
          </button>
        </div>
      </div>
      
      {(activeTab === 'all' || activeTab === 'users') && users.length > 0 && (
        <div className="mb-8">
          {activeTab === 'all' && <h2 className="text-xl font-semibold mb-4">People</h2>}
          
          <div className="space-y-4">
            {users.map(user => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        </div>
      )}
      
      {(activeTab === 'all' || activeTab === 'posts') && posts.length > 0 && (
        <div>
          {activeTab === 'all' && <h2 className="text-xl font-semibold mb-4">Posts</h2>}
          
          <div className="space-y-4">
            {posts.map(post => (
              <PostCard key={post.id} post={post} refreshPosts={refreshPosts} />
            ))}
          </div>
        </div>
      )}
      
      {users.length === 0 && posts.length === 0 && (
        <div className="text-center py-10">
          <p className="text-xl text-gray-600">No results found for "{query}"</p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;