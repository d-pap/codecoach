import React, { useState, useEffect } from 'react';
import { getCurrentUserId, fetchMessages, postMessage, likeMessage } from '../../../api';
import ForumLayout from './ForumLayout';

// Define filter options
const FILTER_OPTIONS = {
  NEWEST: 'NEWEST',
  OLDEST: 'OLDEST',
  MOST_LIKED: 'MOST_LIKED',
  LEAST_LIKED: 'LEAST_LIKED',
};

const ForumTab = () => {
  const problemId = window.location.pathname.split('/').pop(); // Get problem ID from URL
  const [userId, setUserId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [filter, setFilter] = useState(FILTER_OPTIONS.NEWEST); // Set default filter to NEWEST

  useEffect(() => {
    const loadUserIdAndMessages = async () => {
      try {
        const currentUserId = await getCurrentUserId();
        setUserId(currentUserId);

        // Placeholder messages with a "likedBy" array to track who liked the message
        const messages = [
          { id: 1, userId: 1, message: 'This is a sample message', likes: 2, likedBy: [1], timestamp: new Date() },
          { id: 2, userId: 2, message: 'This is another sample message', likes: 3, likedBy: [], timestamp: new Date() },
          { id: 3, userId: 3, message: 'This is another sample message', likes: 3, likedBy: [2], timestamp: new Date() },
        ];

        // const fetchedMessages = await fetchMessages(problemId);
        const fetchedMessages = messages;
        setMessages(fetchedMessages);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    loadUserIdAndMessages();
  }, [problemId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      try {
        const response = await postMessage(problemId, userId, newMessage);
        setMessages(prevMessages => [...prevMessages, { ...response, message: newMessage, userId, likes: 0, likedBy: [], timestamp: new Date() }]);
        setNewMessage('');
      } catch (error) {
        console.error('Error posting message:', error);
      }
    }
  };

  const handleLike = async (messageId) => {
    try {
      setMessages(prevMessages =>
        prevMessages.map(msg => {
          if (msg.id === messageId) {
            const hasLiked = msg.likedBy.includes(userId);
            const updatedLikes = hasLiked ? msg.likes - 1 : msg.likes + 1;
            const updatedLikedBy = hasLiked
              ? msg.likedBy.filter(id => id !== userId) // Remove the user from the likedBy array
              : [...msg.likedBy, userId]; // Add the user to the likedBy array

            return { ...msg, likes: updatedLikes, likedBy: updatedLikedBy };
          }
          return msg;
        })
      );

      // Call the backend to register the like/unlike action
      await likeMessage(messageId);
    } catch (error) {
      console.error('Error liking message:', error);
    }
  };

  // Function to handle filter changes
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  // Function to get filtered messages
  const getFilteredMessages = () => {
    switch (filter) {
      case FILTER_OPTIONS.NEWEST:
        return [...messages].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      case FILTER_OPTIONS.OLDEST:
        return [...messages].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
      case FILTER_OPTIONS.MOST_LIKED:
        return [...messages].sort((a, b) => b.likes - a.likes);
      case FILTER_OPTIONS.LEAST_LIKED:
        return [...messages].sort((a, b) => a.likes - b.likes);
      default:
        return messages;
    }
  };

  return (
    <ForumLayout
      messages={getFilteredMessages()}
      newMessage={newMessage}
      handleLike={handleLike}
      handleSubmit={handleSubmit}
      setNewMessage={setNewMessage}
      filter={filter}
      onFilterChange={handleFilterChange}
      userId={userId}
    />
  );
};

export default ForumTab;
