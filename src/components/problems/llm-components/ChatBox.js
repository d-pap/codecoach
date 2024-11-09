import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useCallback,
} from 'react'
import { Box, Paper, Typography, Tooltip } from '@mui/material'
import InfoRoundedIcon from '@mui/icons-material/InfoRounded'
import { useTheme } from '@mui/material/styles'
import SendChat from './AIChat'
import Messages from './Messages'
import ChatInput from './ChatInput'

// Function to clear chat history from localStorage
const clearChatHistory = (problemId) => {
  localStorage.removeItem(`chatHistory-${problemId}`)
}

const ChatBox = ({
  problem,
  chatHistory,
  setChatHistory,
  chatCount,
  setChatCount,
  initialScrollPosition,
  onScrollPositionChange,
  currentCode,
  currentLanguage,
}) => {
  const theme = useTheme()
  const [input, setInput] = useState('')
  const [includeCode, setIncludeCode] = useState(false)
  const [isLoading, setIsLoading] = useState(false) // Manage isLoading here

  const MAX_CHAT_COUNT = 20

  // Ref for Scrollable Container
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

  useLayoutEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = initialScrollPosition
    }
  }, [initialScrollPosition])

  useEffect(() => {
    // Capture Scroll Position before Unmounting
    return () => {
      if (scrollContainerRef.current) {
        onScrollPositionChange(scrollContainerRef.current.scrollTop)
      }
    }
  }, [onScrollPositionChange])

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
      if (includeCode && currentCode != null) {
        message += `\n\nUser Code:\n\n ${currentLanguage} \n\n\n\`\`\`\n${currentCode}\n`
      }
      // Increment chat count
      setChatCount((prevCount) => prevCount + 1)
    } else if (command === 'hint') {
      message = 'Requesting a hint...'
      setChatCount((prevCount) => prevCount + 1)
    } else if (command === 'solution') {
      message = 'Requesting a solution...'
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
        currentLanguage
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
      setIsLoading(false) // Ensure isLoading is set to false
    }

    setTimeout(scrollToBottom, 100)
  }

  // Function to delete chat history
  const handleDelete = () => {
    clearChatHistory(problem._id)
    setChatHistory({ conversation_id: null, data: [] })
    setInput('')
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
      </Box>

      {/* Messages Component */}
      <Messages
        chatHistory={chatHistory}
        isLoading={isLoading}
        scrollContainerRef={scrollContainerRef}
      />

      {/* ChatInput Component */}
      <ChatInput
        input={input}
        setInput={setInput}
        handleSend={handleSend}
        isLoading={isLoading}
        chatCount={chatCount}
        MAX_CHAT_COUNT={MAX_CHAT_COUNT}
        handleDelete={handleDelete}
        includeCode={includeCode}
        setIncludeCode={setIncludeCode}
      />
    </Paper>
  )
}

export default ChatBox
