import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Drawer from '@mui/material/Drawer'
import Fab from '@mui/material/Fab'
import { useTheme } from '@mui/material'
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded'
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels'
import styled from 'styled-components'
import CodeEditor from './CodeEditor'
import ChatBox from './llm-components/ChatBox'

const StyledPanelResizeHandle = styled(PanelResizeHandle)`
  background-color: #ccc;
  border-radius: 10px;
  width: 5px;
  cursor: ew-resize;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #888;
  }

  &::before {
    content: '|';
    color: #888;
    font-size: 18px;
  }
`

const pythonDefaultCode = `# Your code goes here 
def example_function():
  print("Hello, world!")`

const ProblemDetailLayout = ({ problem, problemDetails }) => {
  const [code, setCode] = useState(pythonDefaultCode)
  const [output, setOutput] = useState('')
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [drawerWidth, setDrawerWidth] = useState(35) // Width in percentage (default is 35%)

  // **Lifted ChatBox State**
  const [chatHistory, setChatHistory] = useState({
    conversation_id: null,
    data: [],
  })
  const [isLoading, setIsLoading] = useState(false)
  const [chatCount, setChatCount] = useState(0)
  const [showSettings, setShowSettings] = useState(false)

  // **New State for Scroll Position**
  const [chatScrollPosition, setChatScrollPosition] = useState(0)

  // Load chat history from localStorage on mount or when problem changes
  useEffect(() => {
    const history = getChatHistory(problem._id)
    if (Array.isArray(history.data)) {
      setChatHistory(history)
    } else {
      setChatHistory({ conversation_id: null, data: [] })
    }
  }, [problem._id])

  // Functions to manage chat state
  const updateChatHistory = (newHistory) => {
    setChatHistory(newHistory)
    saveChatHistory(problem._id, newHistory)
  }

  const incrementChatCount = () => {
    setChatCount((prevCount) => {
      const newCount = prevCount + 1
      localStorage.setItem('chatCount', newCount)
      localStorage.setItem('chatDate', new Date().toDateString())
      return newCount
    })
  }

  const resetChatCountIfNeeded = () => {
    const savedDate = localStorage.getItem('chatDate')
    const today = new Date().toDateString()
    if (savedDate !== today) {
      localStorage.setItem('chatDate', today)
      setChatCount(0)
    } else {
      const savedCount = localStorage.getItem('chatCount')
      setChatCount(savedCount ? parseInt(savedCount, 10) : 0)
    }
  }

  useEffect(() => {
    resetChatCountIfNeeded()
  }, [])

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen)
  }

  // **Handler to Receive Scroll Position from ChatBox**
  const handleScrollPositionChange = (position) => {
    setChatScrollPosition(position)
  }

  const theme = useTheme()

  return (
    <Container maxWidth={false}>
      <Box
        sx={{
          display: 'flex',
          height: 'calc(100vh - 66px)',
          backgroundColor: (theme) => theme.palette.background.default,
        }}
      >
        <PanelGroup direction="horizontal">
          <Panel defaultSize={50} minSize={20}>
            <Box
              sx={{
                pt: 2,
                backgroundColor: (theme) => theme.palette.background.default,
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                overflowY: 'auto',
              }}
            >
              {problemDetails}
            </Box>
          </Panel>
          <StyledPanelResizeHandle />
          <Panel minSize={20}>
            <Box
              sx={{
                pt: 2,
                pl: 2,
                height: '100%',
                backgroundColor: (theme) => theme.palette.background.default,
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'auto',
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  borderRadius: 1,
                }}
              >
                <CodeEditor
                  code={code}
                  setCode={setCode}
                  setOutput={setOutput}
                  output={output}
                />
              </Box>
              <Box
                sx={{
                  position: 'fixed',
                  top: '50%',
                  right: 0,
                  transform: 'translateY(-50%)',
                  zIndex: 10,
                }}
              >
                <Fab
                  aria-label="chat"
                  onClick={toggleChat}
                  sx={{
                    position: 'fixed',
                    bottom: theme.spacing(4),
                    right: theme.spacing(4),
                    transition: 'all 0.3s ease',
                    background:
                      'linear-gradient(45deg, #0e0725, #5c03bc, #e536ab, #f4e5f0)',
                    backgroundSize: '400% 400%',
                    animation: 'gradient 5s ease infinite',
                    animationPlayState: 'paused',
                    '&:hover': {
                      transform: 'scale(1.1)',
                      boxShadow: theme.shadows[10],
                      animationPlayState: 'running',
                    },
                    '& .MuiSvgIcon-root': {
                      color: 'white',
                    },
                    '@keyframes gradient': {
                      '0%': {
                        backgroundPosition: '0% 50%',
                      },
                      '50%': {
                        backgroundPosition: '100% 50%',
                      },
                      '100%': {
                        backgroundPosition: '0% 50%',
                      },
                    },
                  }}
                >
                  <AutoAwesomeRoundedIcon sx={{ fontSize: 32 }} />
                </Fab>
              </Box>
              <Drawer
                anchor="right"
                open={isChatOpen}
                onClose={toggleChat}
                PaperProps={{ style: { width: `${drawerWidth}vw` } }}
                // Remove keepMounted to prevent ResizeObserver issues
              >
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    p: 2,
                    backgroundColor: 'white',
                    borderRadius: '4px 4px 0 0',
                  }}
                >
                  <ChatBox
                    problem={problem}
                    drawerWidth={drawerWidth}
                    setDrawerWidth={setDrawerWidth}
                    chatHistory={chatHistory}
                    setChatHistory={updateChatHistory}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    chatCount={chatCount}
                    setChatCount={incrementChatCount}
                    showSettings={showSettings}
                    setShowSettings={setShowSettings}
                    // **Pass Scroll Props**
                    initialScrollPosition={chatScrollPosition}
                    onScrollPositionChange={handleScrollPositionChange}
                  />
                </Box>
              </Drawer>
            </Box>
          </Panel>
        </PanelGroup>
      </Box>
    </Container>
  )
}

// Helper functions (ensure these are included or imported appropriately)
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

export default ProblemDetailLayout
