import React, { useEffect, useRef } from 'react'
import {
  Box,
  TextField,
  Button,
  Paper,
  CircularProgress,
  IconButton,
  Typography,
  Collapse,
  Tooltip,
} from '@mui/material'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import SettingsIcon from '@mui/icons-material/Settings'
import InfoRoundedIcon from '@mui/icons-material/InfoRounded'
import { useTheme } from '@mui/material/styles'
import SendChat from './AIChat'

// Function to clear chat history from localStorage
const clearChatHistory = (problemId) => {
  localStorage.removeItem(`chatHistory-${problemId}`)
}

// ChatBox component to display chat history and send messages
const ChatBox = ({
  problem,
  drawerWidth,
  setDrawerWidth,
  chatHistory,
  setChatHistory,
  isLoading,
  setIsLoading,
  chatCount,
  setChatCount,
  showSettings,
  setShowSettings,
  // **New Props for Scroll Handling**
  initialScrollPosition,
  onScrollPositionChange,
}) => {
  const theme = useTheme()
  const [input, setInput] = React.useState('')

  //! limit the number of chats to prevent abuse
  const MAX_CHAT_COUNT = 10

  // **Ref for Scrollable Container**
  const scrollContainerRef = useRef(null)

  useEffect(() => {
    // **Restore Scroll Position on Mount**
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = initialScrollPosition
    }
  }, [initialScrollPosition])

  useEffect(() => {
    // **Capture Scroll Position before Unmounting**
    return () => {
      if (scrollContainerRef.current) {
        onScrollPositionChange(scrollContainerRef.current.scrollTop)
      }
    }
  }, [onScrollPositionChange])

  const handleInputChange = (e) => {
    setInput(e.target.value)
  }

  // Function to send a message to the AI model
  const handleSend = async (command = undefined) => {
    if (command === 'user' && input.trim() === '') return

    let message = ''

    //! limit the number of chats to prevent abuse
    if (chatCount >= MAX_CHAT_COUNT) {
      alert('You have reached the maximum number of messages for today.')
      return
    } else if (command === 'user') {
      message = input
      // increment chat count
      setChatCount((prevCount) => prevCount + 1)
    } else if (command === 'hint') {
      message = 'Requesting a hint...'
      // increment chat count
      setChatCount((prevCount) => prevCount + 1)
    } else if (command === 'solution') {
      message = 'Requesting a solution...'
      // increment chat count
      setChatCount((prevCount) => prevCount + 1)
    } else {
      console.error('Invalid command:', command)
      return
    }

    const newHistory = {
      ...chatHistory,
      data: [...chatHistory.data, { role: 'user', content: message }],
    }
    setChatHistory(newHistory)

    setInput('')
    setIsLoading(true)

    try {
      const conversation_id = chatHistory.conversation_id

      const query = await SendChat(
        problem.title,
        problem.description,
        message,
        conversation_id,
        command
      )

      const updatedHistory = {
        ...newHistory,
        data: [
          ...newHistory.data,
          { role: 'assistant', content: query.response },
        ],
      }

      if (query.conversation_id) {
        updatedHistory.conversation_id = query.conversation_id
      }

      setChatHistory(updatedHistory)
    } catch (error) {
      console.error('Failed to send chat:', error)
      const updatedHistory = {
        ...newHistory,
        data: [
          ...newHistory.data,
          { role: 'assistant', content: 'Failed to get response from model' },
        ],
      }
      setChatHistory(updatedHistory)
    } finally {
      setIsLoading(false)
    }
  }

  // Function to delete chat history
  const handleDelete = () => {
    clearChatHistory(problem._id)
    setChatHistory({ conversation_id: null, data: [] })
    setInput('')
  }

  // Handle Enter key press in the input field
  const handleOnPressEnter = (event) => {
    if (event.key === 'Enter' && !isLoading) {
      if (chatCount >= MAX_CHAT_COUNT || input.trim() === '') {
        // prevent default action and give alert
        event.preventDefault()
        if (chatCount >= MAX_CHAT_COUNT) {
          alert('You have reached the maximum number of messages for today.')
        }
        return
      }
      handleSend('user')
    }
  }

  const formatChatContent = (content) => {
    return (
      <Box sx={{ p: 1 }}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            //* formatting markdown for ai messages
            // paragraphs formatting
            p: ({ node, ...props }) => (
              <Typography {...props} sx={{ mb: 0.5 }} />
            ),

            // headings
            h1: ({ node, ...props }) => (
              <Typography variant="h4" {...props} sx={{ mb: 1 }} />
            ),
            h2: ({ node, ...props }) => (
              <Typography variant="h5" {...props} sx={{ mb: 1 }} />
            ),
            h3: ({ node, ...props }) => (
              <Typography variant="h6" {...props} sx={{ mb: 1 }} />
            ),

            // lists formatting
            ul: ({ node, ...props }) => (
              <ul
                {...props}
                style={{ paddingLeft: '1.5em', marginBottom: '0.5em' }}
              />
            ),
            ol: ({ node, ...props }) => (
              <ol
                {...props}
                style={{ paddingLeft: '1.5em', marginBottom: '0.5em' }}
              />
            ),

            // list items formatting
            li: ({ node, ...props }) => (
              <li {...props} style={{ marginBottom: '0.5em' }} />
            ),

            // blockquotes formatting
            blockquote: ({ node, ...props }) => (
              <blockquote
                {...props}
                style={{
                  borderLeft: '4px solid #ccc',
                  paddingLeft: '1em',
                  color: '#666',
                  marginBottom: '0.5em',
                }}
              />
            ),

            // code formatting
            code({ node, inline, className, children, ...props }) {
              const hasLanguage = /language-(\w+)/.exec(className || '')

              return !inline && hasLanguage ? (
                <SyntaxHighlighter
                  style={oneDark}
                  language={hasLanguage[1]}
                  PreTag="div"
                  customStyle={{ borderRadius: '12px', marginBottom: '0.5em' }}
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                // inline code
                <code
                  {...props}
                  style={{
                    backgroundColor: 'rgba(27,31,35,0.05)',
                    padding: '0.2em 0.4em',
                    borderRadius: '6px',
                    fontFamily: 'monospace',
                  }}
                >
                  {children}
                </code>
              )
            },
          }}
        >
          {content}
        </ReactMarkdown>
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
      sx={{
        p: 1,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 'none',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 1,
        }}
      >
        <Tooltip title="During development, the number of AI messages is limited per day. Each hint, solution, and user message costs 1 run. You can see how many runs you have left in the input field placeholder text.">
          <InfoRoundedIcon sx={{ color: theme.palette.text.secondary }} />
        </Tooltip>
        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
          Get help from your Code Coach
        </Typography>
        <IconButton onClick={() => setShowSettings(!showSettings)}>
          <SettingsIcon sx={{ color: theme.palette.text.secondary }} />
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
        ref={scrollContainerRef}
        sx={{
          flex: 1,
          overflowY: 'auto',
          mb: theme.spacing(2),
          p: theme.spacing(2),
          border: 'none',
        }}
      >
        {Array.isArray(chatHistory.data) &&
          chatHistory.data.map((chat, index) => (
            <Box
              key={index}
              sx={{
                alignSelf: chat.role === 'user' ? 'flex-end' : 'flex-start',
                bgcolor:
                  chat.role === 'user'
                    ? theme.palette.primary.main
                    : theme.palette.grey[200],
                color:
                  chat.role === 'user'
                    ? theme.palette.text.white
                    : theme.palette.text.primary,
                borderRadius:
                  chat.role === 'user'
                    ? '15px 15px 5px 15px'
                    : '15px 15px 15px 5px',
                p: 2,

                mb: 2,
                maxWidth: '100%',
                wordBreak: 'break-word',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  width: 0,
                  height: 0,
                  border: '10px solid transparent',
                  ...(chat.role === 'user'
                    ? {
                        borderTopColor: theme.palette.primary.main,
                        right: -7,
                        transform: 'rotate(180deg)',
                      }
                    : {
                        borderTopColor: theme.palette.grey[200],
                        left: -7,
                        transform: 'rotate(180deg)',
                      }),
                },
              }}
            >
              {chat.role === 'assistant' ? (
                formatChatContent(chat.content)
              ) : (
                <Typography
                  sx={{
                    color: theme.palette.text.white,
                  }}
                >
                  {chat.content}
                </Typography>
              )}
            </Box>
          ))}
        {isLoading && (
          <Box
            sx={{
              alignSelf: 'flex-start',
              bgcolor: theme.palette.background.paper,
              borderRadius: theme.spacing(2),
              p: 2,
              mb: 2,
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
        <Tooltip title={'Prompts the coach to give a hint'} enterDelay={500}>
          <Button
            variant="outlined"
            disabled={isLoading || chatCount >= MAX_CHAT_COUNT}
            sx={{ width: '30%', mx: 0.5, mb: 1 }}
            onClick={() => handleSend('hint')}
          >
            Get a Hint
          </Button>
        </Tooltip>
        <Tooltip
          title={'Prompts the coach to give a solution'}
          enterDelay={500}
        >
          <Button
            variant="outlined"
            disabled={isLoading || chatCount >= MAX_CHAT_COUNT}
            sx={{ width: '30%', mx: 0.5, mb: 1 }}
            onClick={() => handleSend('solution')}
          >
            Get a Solution
          </Button>
        </Tooltip>
        <Button
          variant="contained"
          disabled={isLoading}
          sx={{
            bgcolor: theme.palette.error.main,
            width: '30%',
            mx: 0.5,
            mb: 1,
            '&:hover': {
              bgcolor: theme.palette.error.dark,
            },
          }}
          onClick={handleDelete}
        >
          Delete Chat
        </Button>
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: theme.spacing(1),
          border: 'none',
        }}
      >
        <TextField
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleOnPressEnter} // Updated to onKeyDown
          placeholder={`Type a message (${MAX_CHAT_COUNT - chatCount} messages left today)...`}
          variant="outlined"
          fullWidth
          sx={{
            mr: 1,
            '& fieldset': { borderRadius: theme.spacing(2) },
          }}
          disabled={isLoading || chatCount >= MAX_CHAT_COUNT} //! disable the input field if the user has reached the maximum number of messages for the day
          multiline
          maxRows={4}
        />
        <Tooltip
          title={`You have ${MAX_CHAT_COUNT - chatCount} messages left for today.`}
          enterDelay={500}
        >
          <Button
            onClick={() => handleSend('user')} // Use arrow function
            disabled={
              isLoading || chatCount >= MAX_CHAT_COUNT || input.trim() === ''
            }
            variant="contained"
          >
            Send
          </Button>
        </Tooltip>
      </Box>
    </Paper>
  )
}

export default ChatBox
