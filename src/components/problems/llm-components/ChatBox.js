import React, { useEffect, useRef, useState, useCallback } from 'react'
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
  FormControlLabel,
  Switch,
  Divider, // Import Switch and FormControlLabel
  Avatar,
} from '@mui/material'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import SettingsIcon from '@mui/icons-material/Settings'
import InfoRoundedIcon from '@mui/icons-material/InfoRounded'
import DeleteIcon from '@mui/icons-material/Delete'
import { useTheme } from '@mui/material/styles'
import SendChat from './AIChat'
import rocketImg from '../../../images/rocket.svg'
import aiAvatar from '../../../images/aiAvatar.svg'

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
  initialScrollPosition,
  onScrollPositionChange,
  code,
}) => {
  const theme = useTheme()
  const [input, setInput] = useState('')
  const [includeCode, setIncludeCode] = useState(false)
  const [tooltipsEnabled, setTooltipsEnabled] = useState(true)
  const [tooltipOpen, setTooltipOpen] = useState(false)

  //! limit the number of chats to prevent abuse
  const MAX_CHAT_COUNT = 20

  // **Ref for Scrollable Container**
  const scrollContainerRef = useRef(null)

  const scrollToBottom = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollHeight, scrollTop, clientHeight } =
        scrollContainerRef.current
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100 // 100px threshold
      if (isNearBottom) {
        scrollContainerRef.current.scrollTop =
          scrollContainerRef.current.scrollHeight
      }
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [chatHistory, scrollToBottom])

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

    // Limit the number of chats to prevent abuse
    if (chatCount >= MAX_CHAT_COUNT) {
      alert('You have reached the maximum number of messages for today.')
      return
    } else if (command === 'user') {
      message = `${input}\n`
      if (includeCode && code != null) {
        message += `User Code: ${code}`
      }
      // Increment chat count
      setChatCount((prevCount) => prevCount + 1)
    } else if (command === 'hint') {
      message = 'Requesting a hint...'
      // Increment chat count
      setChatCount((prevCount) => prevCount + 1)
    } else if (command === 'solution') {
      message = 'Requesting a solution...'
      // Increment chat count
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
        command,
        code // Pass the code to SendChat
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

      // Scroll to bottom after state update
      setTimeout(scrollToBottom, 100)
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

    code = null // Reset the code after sending it
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

  const handleToggle = () => {
    // Toggle the tooltip enabled state
    setTooltipsEnabled((prev) => !prev)
    // Immediately close the tooltip if it's open
    setTooltipOpen(false)
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
              <Typography
                {...props}
                sx={{
                  mb: 0.5,
                  fontSize: '0.875rem',
                  lineHeight: '1.5',
                  letterSpacing: '0.01em',
                }}
              />
            ),

            // headings
            h1: ({ node, ...props }) => (
              <Typography
                variant="h4"
                {...props}
                sx={{
                  mb: 1,
                  fontSize: '1.25rem',
                  lineHeight: '1.5',
                  letterSpacing: '0.01em',
                }}
              />
            ),
            h2: ({ node, ...props }) => (
              <Typography
                variant="h5"
                {...props}
                sx={{
                  mb: 1,
                  fontSize: '1.125rem',
                  lineHeight: '1.5',
                  letterSpacing: '0.01em',
                }}
              />
            ),
            h3: ({ node, ...props }) => (
              <Typography
                variant="h6"
                {...props}
                sx={{
                  mb: 1,
                  fontSize: '1rem',
                  lineHeight: '1.5',
                  letterSpacing: '0.01em',
                }}
              />
            ),

            // lists formatting
            ul: ({ node, ...props }) => (
              <ul
                {...props}
                style={{
                  paddingLeft: '1.5em',
                  marginBottom: '0.5em',
                  fontSize: '0.875rem',
                  lineHeight: '1.5',
                  letterSpacing: '0.01em',
                }}
              />
            ),
            ol: ({ node, ...props }) => (
              <ol
                {...props}
                style={{
                  paddingLeft: '1.5em',
                  marginBottom: '0.5em',
                  fontSize: '0.875rem',
                  lineHeight: '1.5',
                  letterSpacing: '0.01em',
                }}
              />
            ),

            // list items formatting
            li: ({ node, ...props }) => (
              <li
                {...props}
                style={{
                  marginBottom: '0.5em',
                  fontSize: '0.875rem',
                  lineHeight: '1.5',
                  letterSpacing: '0.01em',
                }}
              />
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
                  fontSize: '0.875rem',
                  lineHeight: '1.5',
                  letterSpacing: '0.01em',
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
                  customStyle={{
                    borderRadius: '12px',
                    marginBottom: '0.5em',
                    fontSize: '0.875rem',
                    lineHeight: '1.5',
                    letterSpacing: '0.01em',
                  }}
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
                    fontSize: '0.875rem',
                    lineHeight: '1.5',
                    letterSpacing: '0.01em',
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
      {/* Header Section */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 1,
        }}
      >
        <Tooltip title="During development, the number of AI messages is limited per day. Each hint, solution, and user message costs 1 run. You can see how many runs you have left in the input field placeholder text.">
          <div>
            <InfoRoundedIcon sx={{ color: 'text.secondary' }} />
          </div>
        </Tooltip>
        <Typography variant="h3" sx={{ flexGrow: 1, textAlign: 'center' }}>
          codecoach
        </Typography>
        <IconButton onClick={() => setShowSettings(!showSettings)}>
          <SettingsIcon sx={{ color: 'text.secondary' }} />
        </IconButton>
      </Box>

      {/* Settings Section */}
      <Collapse in={showSettings}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            m: 1,
          }}
        >
          {/* Drawer Width Controls */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title="Increase the width of the chat history drawer">
              <div>
                <IconButton onClick={incrementDrawerWidth}>
                  <AddIcon />
                </IconButton>
              </div>
            </Tooltip>
            <Box sx={{ display: 'flex', alignItems: 'center', mx: 1 }}>
              {drawerWidth}%
            </Box>
            <Tooltip title="Decrease the width of the chat history drawer">
              <div>
                <IconButton onClick={decrementDrawerWidth}>
                  <RemoveIcon />
                </IconButton>
              </div>
            </Tooltip>
          </Box>

          {/* Switch for Tooltips */}
          <Tooltip
            title="Disables tooltip text (like the one you are reading now) from the buttons below"
            disableHoverListener={!tooltipsEnabled}
            open={tooltipOpen}
            onOpen={() => setTooltipOpen(true)}
            onClose={() => setTooltipOpen(false)}
            leaveDelay={200}
          >
            <div>
              <FormControlLabel
                control={
                  <Switch
                    checked={tooltipsEnabled}
                    onChange={handleToggle}
                    color="primary"
                  />
                }
                label="Enable Button Popups"
              />
            </div>
          </Tooltip>
        </Box>
        <Divider />
      </Collapse>

      {/* Chat History Section */}
      <Box
        ref={scrollContainerRef}
        sx={{
          flex: 1,
          overflowY: 'auto',
          mb: 2,
          p: 2,
          border: 'none',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Avatar and Call-to-Action */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Avatar
            alt="AI Robot"
            src={aiAvatar}
            sx={{ width: 80, height: 80, mb: 1 }}
          />
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 'bold', textAlign: 'center' }}
          >
            codecoach answers your questions instantly!
          </Typography>
        </Box>

        {/* Chat Messages */}
        {Array.isArray(chatHistory.data) &&
          chatHistory.data.map((chat, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                justifyContent:
                  chat.role === 'user' ? 'flex-end' : 'flex-start',
                mb: 2,
              }}
            >
              {chat.role === 'assistant' && (
                <Avatar
                  alt="AI"
                  src={aiAvatar}
                  sx={{
                    width: 30,
                    height: 30,
                    mr: 1,
                    alignSelf: 'flex-end',
                  }}
                />
              )}
              <Box
                sx={{
                  bgcolor:
                    chat.role === 'user'
                      ? 'primary.main'
                      : 'grey.200',
                  color:
                    chat.role === 'user'
                      ? 'common.white'
                      : 'text.primary',
                  borderRadius:
                    chat.role === 'user'
                      ? '20px 20px 5px 20px'
                      : '20px 20px 20px 5px',
                  p: 2,
                  maxWidth: '80%',
                  wordBreak: 'break-word',
                }}
              >
                {chat.role === 'assistant' ? (
                  formatChatContent(chat.content)
                ) : (
                  <Typography
                    sx={{
                      color: 'common.white',
                      fontSize: '0.875rem',
                    }}
                  >
                    {chat.content}
                  </Typography>
                )}
              </Box>
            </Box>
          ))}

        {/* Loading Indicator */}
        {isLoading && (
          <Box
            sx={{
              alignSelf: 'flex-start',
              bgcolor: 'background.paper',
              borderRadius: 2,
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

        {/* Quick Action Buttons */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            mt: 'auto', // Push to the bottom
            pt: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              maxWidth: '70%',
            }}
          >
            {/* Get a Hint Button */}
            <Button
              variant="contained"
              disabled={isLoading || chatCount >= MAX_CHAT_COUNT}
              sx={{
                mb: 1,
                borderRadius: '20px 20px 5px 20px',
              }}
              onClick={() => handleSend('hint')}
            >
              Get a Hint
            </Button>

            {/* Analyze/Exclude Code Button */}
            <Tooltip
              title={'Toggle code analysis'}
              enterDelay={500}
              disableHoverListener={!tooltipsEnabled}
            >
              <Button
                variant="outlined"
                disabled={isLoading || chatCount >= MAX_CHAT_COUNT}
                sx={{
                  mb: 1,
                  borderRadius: '20px 20px 5px 20px',
                  backgroundColor: isLoading
                    ? theme.palette.grey[300]
                    : includeCode
                      ? 'common.white'
                      : 'primary.main',
                  color: includeCode
                    ? 'text.primary'
                    : 'common.white',
                  '&:hover': {
                    backgroundColor: includeCode
                      ? 'action.hover'
                      : 'primary.dark',
                    color: includeCode
                      ? 'text.primary'
                      : 'common.white',
                    borderColor: includeCode
                      ? 'secondary.main'
                      : 'common.white',
                  },
                  transition: 'background-color 0.3s, border-color 0.3s, color 0.3s',
                }}
                onClick={() => setIncludeCode(!includeCode)}
              >
                {includeCode ? 'Exclude My Code' : 'Analyze My Code'}
              </Button>
            </Tooltip>
          </Box>
        </Box>
      </Box>

      {/* Input Field and Send Button */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: 1,
          border: 'none',
        }}
      >
        <Tooltip
          title={'Delete the chat history'}
          enterDelay={500}
          disableHoverListener={!tooltipsEnabled}
        >
          <IconButton
            disabled={isLoading}
            sx={{
              color: 'error.main',
            }}
            onClick={handleDelete}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>

        <TextField
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleOnPressEnter}
          placeholder={`Type a message (${MAX_CHAT_COUNT - chatCount} messages left today)...`}
          variant="outlined"
          fullWidth
          sx={{
            mr: 1,
            '& fieldset': { borderRadius: 2 },
          }}
          disabled={isLoading || chatCount >= MAX_CHAT_COUNT}
          multiline
          maxRows={4}
        />

        <Tooltip
          title={`You have ${MAX_CHAT_COUNT - chatCount} messages left for today.`}
          enterDelay={500}
          disableHoverListener={!tooltipsEnabled}
        >
          <Button
            onClick={() => handleSend('user')}
            disabled={
              isLoading ||
              chatCount >= MAX_CHAT_COUNT ||
              input.trim() === ''
            }
            variant="contained"
            sx={{
              bgcolor: 'primary.main',
              '&:hover': {
                bgcolor: 'primary.main',
              },
            }}
          >
            Send
          </Button>
        </Tooltip>
      </Box>
    </Paper>
  );
};

export default ChatBox
