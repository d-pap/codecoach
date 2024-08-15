import React, { useState, useEffect } from 'react';
import SendChat from './AIChat';
import { Box, TextField, Button, Paper, CircularProgress, Typography } from '@mui/material';

// Function to retrieve chat history from localStorage
const getChatHistory = (problemId) => {
  const history = localStorage.getItem(`chatHistory-${problemId}`);
  return history ? JSON.parse(history) : [];
};

// Function to save chat history to localStorage
const saveChatHistory = (problemId, history) => {
  localStorage.setItem(`chatHistory-${problemId}`, JSON.stringify(history));
};

// Function to clear chat history from localStorage
const clearChatHistory = (problemId) => {
  localStorage.removeItem(`chatHistory-${problemId}`);
};

const ChatBox = ({ problem }) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentChatHistory, setCurrentChatHistory] = useState([]);

  // Retrieve chat history on component mount
  useEffect(() => {
    const history = getChatHistory(problem._id);
    setCurrentChatHistory(history);
  }, [problem._id]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSend = async () => {
    if (input.trim() === '') return;

    const newHistory = [...currentChatHistory, { role: 'user', content: input }];
    setCurrentChatHistory(newHistory);
    saveChatHistory(problem._id, newHistory);

    setInput('');
    setIsLoading(true);

    try {
      const response = await SendChat(
        problem.title,
        problem.description,
        problem.hint,
        newHistory
      );

      console.log('Response:', response);

      const updatedHistory = [
        ...newHistory,
        { role: 'assistant', content: response },
      ];
      setCurrentChatHistory(updatedHistory);
      saveChatHistory(problem._id, updatedHistory);
    } catch (error) {
      console.error('Failed to send chat:', error);
      const updatedHistory = [
        ...newHistory,
        { role: 'assistant', content: 'Failed to get response from model' },
      ];
      setCurrentChatHistory(updatedHistory);
      saveChatHistory(problem._id, updatedHistory);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = () => {
    clearChatHistory(problem._id);
    setCurrentChatHistory([]);
    setInput('');
  };

  return (
    <Paper elevation={3} sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flex: 1, overflowY: 'auto', mb: 2, p: 2, border: '1px solid grey', borderRadius: 1 }}>
        {currentChatHistory.map((chat, index) => (
          <Box
            key={index}
            sx={{
              alignSelf: chat.role === 'user' ? 'flex-end' : 'flex-start',
              bgcolor: chat.role === 'user' ? 'primary.main' : 'grey.300',
              color: chat.role === 'user' ? 'primary.contrastText' : 'text.primary',
              borderRadius: 1,
              p: 1,
              mb: 1,
              maxWidth: '100%',
              wordBreak: 'break-word',
            }}
          >
            {chat.role === 'assistant' ? (
              <Typography sx={{ whiteSpace: 'pre-wrap' }}>{chat.content}</Typography>
            ) : (
              chat.content
            )}
          </Box>
        ))}
        {isLoading && (
          <Box
            sx={{
              alignSelf: 'flex-start',
              bgcolor: 'grey.300',
              borderRadius: 1,
              p: 1,
              mb: 1,
              maxWidth: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CircularProgress size={20} />
          </Box>
        )}
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mb: 1 }}>
        <Button variant="outlined" sx={{ mb: 1 }}>Hint</Button>
        <Button variant="outlined" sx={{ mb: 1 }}>Solution</Button>
        <Button variant="outlined" color="error" sx={{ mb: 1 }} onClick={handleDelete}>Delete</Button>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2, border: '1px solid grey', borderRadius: 1 }}>
        <TextField
          value={input}
          onChange={handleInputChange}
          placeholder="Type a message..."
          variant="outlined"
          fullWidth
          sx={{ mr: 1 }}
        />
        <Button onClick={handleSend} variant="contained">
          Send
        </Button>
      </Box>
    </Paper>
  );
};

export default ChatBox;
