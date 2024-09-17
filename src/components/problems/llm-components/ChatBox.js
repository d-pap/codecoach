import React, { useState, useEffect } from 'react'
import SendChat from './AIChat'
import {
  Box,
  TextField,
  Button,
  Paper,
  CircularProgress,
  IconButton,
  Typography,
  Collapse,
} from '@mui/material'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import SettingsIcon from '@mui/icons-material/Settings'

// Function to retrieve chat history from localStorage
const getChatHistory = (problemId) => {
  try {
    const history = localStorage.getItem(`chatHistory-${problemId}`)
    return history ? JSON.parse(history) : { conversation_id: null, data: [] }
  } catch (error) {
    console.error('Failed to parse chat history:', error)
    return { conversation_id: null, data: [] }
  }
}

// Function to save chat history to localStorage
const saveChatHistory = (problemId, history) => {
  localStorage.setItem(`chatHistory-${problemId}`, JSON.stringify(history))
}

// Function to clear chat history from localStorage
const clearChatHistory = (problemId) => {
  localStorage.removeItem(`chatHistory-${problemId}`)
}

// ChatBox component to display chat history and send messages
const ChatBox = ({ problem, drawerWidth, setDrawerWidth }) => {
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [currentChatHistory, setCurrentChatHistory] = useState({
    conversation_id: null,
    data: [],
  })
  const [showSettings, setShowSettings] = useState(false)

  // Retrieve chat history on component mount
  useEffect(() => {
    const history = getChatHistory(problem._id)
    if (Array.isArray(history.data)) {
      setCurrentChatHistory(history)
    } else {
      setCurrentChatHistory({ conversation_id: null, data: [] })
    }
  }, [problem._id])

  const handleInputChange = (e) => {
    setInput(e.target.value)
  }

  // Function to send a message to the AI model
  const handleSend = async (command = 'user') => {
    if (command === 'user' && input.trim() === '') return

    let message = ''

    if (command === 'user') {
      message = input
    } else if (command === 'hint') {
      message = 'Requesting a hint...'
    } else if (command === 'solution') {
      message = 'Requesting a solution...'
    } else {
      console.error('Invalid command:', command)
      return
    }

    // update history with user message
    const newHistory = {
      ...currentChatHistory,
      data: [...currentChatHistory.data, { role: 'user', content: message }],
    }
    setCurrentChatHistory(newHistory)
    saveChatHistory(problem._id, newHistory)

    setInput('')
    setIsLoading(true)

    try {
      // send chat message (AIChat.js file)
      const { aiResponse, conversationPk } = await SendChat(
        problem.title,
        problem.description,
        message,
        currentChatHistory.conversation_id,
        command
      )

      // update history with AI response
      const updatedHistory = {
        ...newHistory,
        data: [...newHistory.data, { role: 'assistant', content: aiResponse }],
      }

      if (conversationPk) {
        updatedHistory.conversation_id = conversationPk
      }

      setCurrentChatHistory(updatedHistory)
      saveChatHistory(problem._id, updatedHistory)
    } finally {
      setIsLoading(false)
    }
  }

  // Function to delete chat history
  const handleDelete = () => {
    clearChatHistory(problem._id)
    setCurrentChatHistory({ conversation_id: null, data: [] })
    setInput('')
  }

  // Handle Enter key press in the input field
  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !isLoading) {
      handleSend('user')
    }
  }

  const formatChatContent = (content) => {
    return (
      <Box
        sx={{
          bgcolor: 'grey.900',
          color: 'success.contrastText',
          p: 1,
          whiteSpace: 'pre-wrap',
          overflowX: 'auto',
          borderRadius: 1,
          fontSize: '0.80rem',
          '& code': {
            bgcolor: 'grey.800',
            p: 0.5,
            borderRadius: 1,
          },
          '& pre': {
            bgcolor: 'grey.800',
            p: 1,
            borderRadius: 1,
            overflowX: 'auto',
          },
          '& ul, & ol': {
            pl: 4,
          },
        }}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </Box>
    )
  }

  const incrementDrawerWidth = () => {
    setDrawerWidth((prevWidth) => Math.min(prevWidth + 5, 70))
  }

  const decrementDrawerWidth = () => {
    setDrawerWidth((prevWidth) => Math.max(prevWidth - 5, 20))
  }

  return (
    <Paper
      elevation={3}
      sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 1,
        }}
      >
        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
          Chat With AI
        </Typography>
        <IconButton onClick={() => setShowSettings(!showSettings)}>
          <SettingsIcon />
        </IconButton>
      </Box>

      <Collapse in={showSettings}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
          <IconButton onClick={incrementDrawerWidth}>
            <AddIcon />
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center', mx: 1 }}>
            {drawerWidth}%
          </Box>
          <IconButton onClick={decrementDrawerWidth}>
            <RemoveIcon />
          </IconButton>
        </Box>
      </Collapse>

      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          mb: 2,
          p: 2,
          border: '1px solid grey',
          borderRadius: 1,
        }}
      >
        {Array.isArray(currentChatHistory.data) &&
          currentChatHistory.data.map((chat, index) => (
            <Box
              key={index}
              sx={{
                alignSelf: chat.role === 'user' ? 'flex-end' : 'flex-start',
                bgcolor: chat.role === 'user' ? 'primary.main' : 'grey.900',
                color:
                  chat.role === 'user'
                    ? 'primary.contrastText'
                    : 'text.primary',
                borderRadius: 1,
                p: 1,
                mb: 1,
                maxWidth: '100%',
                wordBreak: 'break-word',
              }}
            >
              {chat.role === 'assistant'
                ? formatChatContent(chat.content)
                : chat.content}
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
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          mb: 1,
        }}
      >
        <Button
          variant="outlined"
          disabled={isLoading}
          sx={{ width: '30%', mx: 0.5, mb: 1 }}
          onClick={() => handleSend('hint')}
        >
          Hint
        </Button>
        <Button
          variant="outlined"
          disabled={isLoading}
          sx={{ width: '30%', mx: 0.5, mb: 1 }}
          onClick={() => handleSend('solution')}
        >
          Solution
        </Button>
        <Button
          variant="outlined"
          disabled={isLoading}
          color="error"
          sx={{
            width: '30%',
            mx: 0.5,
            mb: 1,
          }}
          onClick={handleDelete}
        >
          Delete
        </Button>
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: 2,
          border: '1px solid grey',
          borderRadius: 1,
        }}
      >
        <TextField
          value={input}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          variant="outlined"
          fullWidth
          sx={{ mr: 1 }}
        />
        <Button
          onClick={() => handleSend('user')} // Use arrow function
          disabled={isLoading}
          variant="contained"
        >
          Send
        </Button>
      </Box>
    </Paper>
  )
}

export default ChatBox
