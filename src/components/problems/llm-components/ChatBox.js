/**
 * ChatBox component to display chat history and send messages to the AI.
 * Implements dynamic imports to optimize performance by code splitting.
 */

import React, { useState, useEffect, Suspense, lazy } from 'react'
import { useTheme } from '@mui/material/styles'

// Dynamic Imports for Heavy Components and Icons
const SendChat = lazy(() => import('./AIChat'))
const ReactMarkdown = lazy(() => import('react-markdown'))
const remarkGfm = lazy(() => import('remark-gfm'))
const SyntaxHighlighter = lazy(() =>
  import('react-syntax-highlighter/dist/esm/prism').then(module => ({
    default: module.Prism,
  }))
)
const oneDark = lazy(() =>
  import('react-syntax-highlighter/dist/esm/styles/prism').then(module => ({
    default: module.oneDark,
  }))
)
const AddIcon = lazy(() => import('@mui/icons-material/Add'))
const RemoveIcon = lazy(() => import('@mui/icons-material/Remove'))
const SettingsIcon = lazy(() => import('@mui/icons-material/Settings'))
const CircularProgress = lazy(() => import('@mui/material/CircularProgress'))
const IconButton = lazy(() => import('@mui/material/IconButton'))
const Tooltip = lazy(() => import('@mui/material/Tooltip'))
const Typography = lazy(() => import('@mui/material/Typography'))
const Button = lazy(() => import('@mui/material/Button'))
const TextField = lazy(() => import('@mui/material/TextField'))
const Paper = lazy(() => import('@mui/material/Paper'))
const Box = lazy(() => import('@mui/material/Box'))
const Collapse = lazy(() => import('@mui/material/Collapse'))

// Helper Functions for Chat History Management
const getChatHistory = (problemId) => {
  try {
    const history = localStorage.getItem(`chatHistory-${problemId}`)
    return history ? JSON.parse(history) : { conversation_id: null, data: [] }
  } catch (error) {
    console.error('Failed to parse chat history:', error)
    return { conversation_id: null, data: [] }
  }
}

const saveChatHistory = (problemId, history) => {
  localStorage.setItem(`chatHistory-${problemId}`, JSON.stringify(history))
}

const clearChatHistory = (problemId) => {
  localStorage.removeItem(`chatHistory-${problemId}`)
}

/**
 * ChatBox component to display chat history and send messages.
 *
 * @param {object} props - Component props
 * @param {object} props.problem - Problem details
 * @param {number} props.drawerWidth - Current drawer width percentage
 * @param {function} props.setDrawerWidth - Function to update drawer width
 * @returns {JSX.Element} The rendered ChatBox component
 */
const ChatBox = ({ problem, drawerWidth, setDrawerWidth }) => {
  const theme = useTheme()
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [currentChatHistory, setCurrentChatHistory] = useState({
    conversation_id: null,
    data: [],
  })
  const [showSettings, setShowSettings] = useState(false)

  //! Limit the number of chats to prevent abuse
  const MAX_CHAT_COUNT = 10

  const [chatCount, setChatCount] = useState(() => {
    const savedCount = localStorage.getItem('chatCount')
    const savedDate = localStorage.getItem('chatDate')
    const today = new Date().toDateString()

    if (savedDate !== today) {
      localStorage.setItem('chatDate', today)
      return 0
    }
    return savedCount ? parseInt(savedCount, 10) : 0
  })

  // Retrieve chat history on component mount
  useEffect(() => {
    const history = getChatHistory(problem._id)
    if (Array.isArray(history.data)) {
      setCurrentChatHistory(history)
    } else {
      setCurrentChatHistory({ conversation_id: null, data: [] })
    }
  }, [problem._id])

  //! Save the chat count to localStorage
  useEffect(() => {
    localStorage.setItem('chatCount', chatCount)
    localStorage.setItem('chatDate', new Date().toDateString())
  }, [chatCount])

  const handleInputChange = (e) => {
    setInput(e.target.value)
  }

  /**
   * Function to send a message to the AI model.
   *
   * @param {string} command - The command type ('user', 'hint', 'solution')
   */
  const handleSend = async (command = undefined) => {
    if (command === 'user' && input.trim() === '') return

    let message = ''

    //! Limit the number of chats to prevent abuse
    if (chatCount >= MAX_CHAT_COUNT) {
      alert('You have reached the maximum number of messages for today.')
      return
    } else if (command === 'user') {
      message = input
      // Increment chat count
      setChatCount(chatCount + 1)
    } else if (command === 'hint') {
      message = 'Requesting a hint...'
      // Increment chat count
      setChatCount(chatCount + 1)
    } else if (command === 'solution') {
      message = 'Requesting a solution...'
      // Increment chat count
      setChatCount(chatCount + 1)
    } else {
      console.error('Invalid command:', command)
      return
    }

    const newHistory = {
      ...currentChatHistory,
      data: [...currentChatHistory.data, { role: 'user', content: message }],
    }
    setCurrentChatHistory(newHistory)
    saveChatHistory(problem._id, newHistory)

    setInput('')
    setIsLoading(true)

    try {
      // Dynamically import SendChat function
      const chatModule = await SendChat
      const query = await chatModule.default(
        problem.title,
        problem.description,
        message,
        currentChatHistory.conversation_id,
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

  // Function to delete chat history
  const handleDelete = () => {
    clearChatHistory(problem._id)
    setCurrentChatHistory({ conversation_id: null, data: [] })
    setInput('')
  }

  // Handle Enter key press in the input field
  const handleOnPressEnter = (event) => {
    if (event.key === 'Enter' && !isLoading) {
      if (chatCount >= MAX_CHAT_COUNT || input.trim() === '') {
        // Prevent default action and give alert
        event.preventDefault()
        if (chatCount >= MAX_CHAT_COUNT) {
          alert('You have reached the maximum number of messages for today.')
        }
        return
      }
      handleSend('user')
    }
  }

  /**
   * Function to format chat content using ReactMarkdown.
   *
   * @param {string} content - The chat message content
   * @returns {JSX.Element} The formatted chat content
   */
  const formatChatContent = (content) => {
    return (
      <Box sx={{ p: 1 }}>
        <Suspense fallback={<div>Loading Content...</div>}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              //* Formatting markdown for AI messages
              // Paragraphs formatting
              p: ({ node, ...props }) => (
                <Typography {...props} sx={{ mb: 0.5 }} />
              ),

              // Headings
              h1: ({ node, ...props }) => (
                <Typography variant="h4" {...props} sx={{ mb: 1 }} />
              ),
              h2: ({ node, ...props }) => (
                <Typography variant="h5" {...props} sx={{ mb: 1 }} />
              ),
              h3: ({ node, ...props }) => (
                <Typography variant="h6" {...props} sx={{ mb: 1 }} />
              ),

              // Lists formatting
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

              // List items formatting
              li: ({ node, ...props }) => (
                <li {...props} style={{ marginBottom: '0.5em' }} />
              ),

              // Blockquotes formatting
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

              // Code formatting
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
                  // Inline code
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
        </Suspense>
      </Box>
    )
  }

  // Functions to adjust drawer width
  const incrementDrawerWidth = () => {
    setDrawerWidth((prevWidth) => Math.min(prevWidth + 5, 70))
  }

  const decrementDrawerWidth = () => {
    setDrawerWidth((prevWidth) => Math.max(prevWidth - 5, 20))
  }

  return (
    <Suspense fallback={<div>Loading ChatBox...</div>}>
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
        {/* Header of ChatBox with Settings */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 1,
          }}
        >
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
            Get help from your Code Coach
          </Typography>
          <Suspense fallback={<div>Loading Settings...</div>}>
            <IconButton onClick={() => setShowSettings(!showSettings)}>
              <SettingsIcon />
            </IconButton>
          </Suspense>
        </Box>

        {/* Settings Collapse */}
        <Collapse in={showSettings}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
            <Suspense fallback={<div>Loading Add Icon...</div>}>
              <IconButton onClick={incrementDrawerWidth}>
                <AddIcon />
              </IconButton>
            </Suspense>
            <Box sx={{ display: 'flex', alignItems: 'center', mx: 1 }}>
              {drawerWidth}%
            </Box>
            <Suspense fallback={<div>Loading Remove Icon...</div>}>
              <IconButton onClick={decrementDrawerWidth}>
                <RemoveIcon />
              </IconButton>
            </Suspense>
          </Box>
        </Collapse>

        {/* Chat History */}
        <Box
          sx={{
            flex: 1,
            overflowY: 'auto',
            mb: theme.spacing(2),
            p: theme.spacing(2),
            border: 'none', //! Removed border of chat messages box
          }}
        >
          {Array.isArray(currentChatHistory.data) &&
            currentChatHistory.data.map((chat, index) => (
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
                  <Suspense fallback={<div>Loading Content...</div>}>
                    {formatChatContent(chat.content)}
                  </Suspense>
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
            <Suspense fallback={<div>Loading...</div>}>
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
            </Suspense>
          )}
        </Box>

        {/* Action Buttons */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            mb: 1,
          }}
        >
          <Suspense fallback={<div>Loading Hint Button...</div>}>
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
          </Suspense>
          <Suspense fallback={<div>Loading Solution Button...</div>}>
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
          </Suspense>
          <Suspense fallback={<div>Loading Delete Button...</div>}>
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
          </Suspense>
        </Box>

        {/* Input Field and Send Button */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: theme.spacing(1),
            border: 'none',
          }}
        >
          <Suspense fallback={<div>Loading Input...</div>}>
            <TextField
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleOnPressEnter} // TODO: onKeyPress is deprecated, use onKeyDown instead
              placeholder={`Type a message (${MAX_CHAT_COUNT - chatCount} messages left today)...`}
              variant="outlined"
              fullWidth
              sx={{
                mr: 1,
                '& fieldset': { borderRadius: theme.spacing(2) },
              }}
              disabled={isLoading || chatCount >= MAX_CHAT_COUNT} //! Disable the input field if the user has reached the maximum number of messages for the day
              multiline
              maxRows={4}
            />
          </Suspense>
          <Suspense fallback={<div>Loading Send Button...</div>}>
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
          </Suspense>
        </Box>
      </Paper>
    </Suspense>
  )
}

export default ChatBox
