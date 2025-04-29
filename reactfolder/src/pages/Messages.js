import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getConversations } from '../services/messageService';
import { formatDate } from '../utils/formatDate';
import Loader from '../components/common/Loader';

const Messages = () => {
  const { user } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setLoading(true);
        const response = await getConversations();
        setConversations(response.data);
      } catch (err) {
        console.error('Failed to fetch conversations:', err);
        setError('Failed to load messages');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchConversations();
    }
  }, [user]);

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto py-10 px-4 text-center">
        <p className="text-lg text-gray-600">Please log in to view your messages</p>
      </div>
    );
  }

  if (loading) return <Loader />;
  if (error) return <div className="text-red-500 text-center py-4">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Messages</h1>
        <Link 
          to="/messages/new" 
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          New Message
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {conversations.length === 0 ? (
          <div className="py-10 text-center">
            <p className="text-gray-500">No conversations yet</p>
            <Link to="/messages/new" className="text-blue-600 hover:underline mt-2 inline-block">
              Start a new conversation
            </Link>
          </div>
        ) : (
          <div className="divide-y">
            {conversations.map(conversation => {
              const participant = conversation.participants.find(p => p.id !== user.id);
              const lastMessage = conversation.last_message;
              
              return (
                <Link 
                  key={conversation.id} 
                  to={`/messages/${conversation.id}`}
                  className="block hover:bg-gray-50"
                >
                  <div className="p-4 flex items-center">
                    <div className="h-12 w-12 bg-gray-300 rounded-full flex-shrink-0 flex items-center justify-center">
                      {participant.avatar ? (
                        <img 
                          src={participant.avatar} 
                          alt={participant.name}
                          className="h-12 w-12 rounded-full object-cover" 
                        />
                      ) : (
                        <span className="text-gray-600">{participant.name.charAt(0)}</span>
                      )}
                    </div>
                    
                    <div className="ml-3 flex-grow min-w-0">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium truncate">{participant.name}</h3>
                        <span className="text-xs text-gray-500">
                          {formatDate(lastMessage.created_at)}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm truncate">
                        {lastMessage.body}
                      </p>
                    </div>
                    
                    {conversation.unread_count > 0 && (
                      <div className="ml-2 bg-blue-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                        {conversation.unread_count}
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;