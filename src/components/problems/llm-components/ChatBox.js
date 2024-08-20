import React, { useState, useEffect } from 'react'
import SendChat from './AIChat'
import {
  Box,
  TextField,
  Button,
  Paper,
  CircularProgress,
  Typography,
} from '@mui/material'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

// Function to retrieve chat history from localStorage
const getChatHistory = (problemId) => {
  try {
    const history = localStorage.getItem(`chatHistory-${problemId}`)
    return history ? JSON.parse(history) : { convoId: null, data: [] }
  } catch (error) {
    console.error('Failed to parse chat history:', error)
    return { convoId: null, data: [] }
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

const ChatBox = ({ problem }) => {
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [currentChatHistory, setCurrentChatHistory] = useState({
    convoId: null,
    data: [],
  })

  // Retrieve chat history on component mount
  useEffect(() => {
    const history = getChatHistory(problem._id)
    if (Array.isArray(history.data)) {
      setCurrentChatHistory(history)
    } else {
      setCurrentChatHistory({ convoId: null, data: [] })
    }
  }, [problem._id])
  const handleInputChange = (e) => {
    setInput(e.target.value)
  }

  const handleSend = async () => {
    if (input.trim() === '') return

    const newHistory = {
      ...currentChatHistory,
      data: [...currentChatHistory.data, { role: 'user', content: input }],
    }
    setCurrentChatHistory(newHistory)
    saveChatHistory(problem._id, newHistory)

    setInput('')
    setIsLoading(true)

    try {
      const query = await SendChat(problem.title, problem.description, input)

      console.log('Response:', query)

      const updatedHistory = {
        ...newHistory,
        data: [...newHistory.data, { role: 'assistant', content: query }],
      }

      // Update convoId if it's provided in the response
      if (query.convoId) {
        updatedHistory.convoId = query.convoId
      }

      setCurrentChatHistory(updatedHistory)
      saveChatHistory(problem._id, updatedHistory)
    } catch (error) {
      console.error('Failed to send chat:', error)
      const updatedHistory = {
        ...newHistory,
        data: [
          ...newHistory.data,
          { role: 'assistant', content: 'Failed to get response from model' },
        ],
      }
      setCurrentChatHistory(updatedHistory)
      saveChatHistory(problem._id, updatedHistory)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = () => {
    clearChatHistory(problem._id)
    setCurrentChatHistory({ convoId: null, data: [] })
    setInput('')
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
  return (
    <Paper
      elevation={3}
      sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}
    >
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
                bgcolor: chat.role === 'user' ? 'primary.main' : 'grey.300',
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
          sx={{
            width: '30%',
            mx: 0.5,
            mb: 1,
          }}
        >
          Hint
        </Button>
        <Button
          variant="outlined"
          disabled={isLoading}
          sx={{
            width: '30%',
            mx: 0.5,
            mb: 1,
          }}
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
          placeholder="Type a message..."
          variant="outlined"
          fullWidth
          sx={{ mr: 1 }}
        />
        <Button onClick={handleSend} disabled={isLoading} variant="contained">
          Send
        </Button>
      </Box>
    </Paper>
  )
}

export default ChatBox
