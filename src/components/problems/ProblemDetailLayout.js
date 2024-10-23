import React, { useState, useEffect, useRef } from 'react'
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
import Grow from '@mui/material/Grow'
import Paper from '@mui/material/Paper'
import { ResizableBox } from 'react-resizable'
import 'react-resizable/css/styles.css'

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
//! handle for resizing the chat box
const FullEdgeHandle = React.forwardRef(({ handleAxis, ...props }, ref) => {
  return (
    <div
      ref={ref}
      {...props}
      style={{
        position: 'absolute',
        backgroundColor: 'transparent',
        cursor: (() => {
          if (handleAxis === 'n') return 'ns-resize'
          if (handleAxis === 'w') return 'ew-resize'
          if (handleAxis === 'nw') return 'nwse-resize'
          return 'default'
        })(),

        ...(handleAxis === 'n' && {
          top: 0,
          left: 0,
          right: 0,
          height: '10px',
        }),
        ...(handleAxis === 'w' && {
          left: 0,
          top: 0,
          bottom: 0,
          width: '10px',
        }),

        ...(handleAxis === 'nw' && {
          left: 0,
          top: 0,

          width: '20px',
          height: '20px',
        }),
      }}
    />
  )
})

const pythonDefaultCode = `# Your code goes here 
def example_function():
  print("Hello, world!")`

const ProblemDetailLayout = ({ problem, problemDetails }) => {
  const [code, setCode] = useState(pythonDefaultCode)
  const [output, setOutput] = useState('')
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [drawerWidth, setDrawerWidth] = useState(35) // Width in percentage (default is 35%)

  //! state for chat history
  const [chatHistory, setChatHistory] = useState({
    conversation_id: null,
    data: [],
  })
  const [isLoading, setIsLoading] = useState(false)
  const [chatCount, setChatCount] = useState(0)
  const [showSettings, setShowSettings] = useState(false)

  //! state for scroll position
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

  //! handler to receive scroll position from ChatBox
  const handleScrollPositionChange = (position) => {
    setChatScrollPosition(position)
  }

  const theme = useTheme()

  const [chatSize, setChatSize] = useState({ width: 400, height: 500 })

  const onResize = (event, { size }) => {
    setChatSize({ width: size.width, height: size.height })
  }

  const chatRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        chatRef.current &&
        !chatRef.current.contains(event.target) &&
        isChatOpen
      ) {
        setIsChatOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isChatOpen])

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
                  bottom: {
                    xs: theme.spacing(2),
                    sm: theme.spacing(3),
                  },
                  right: {
                    xs: theme.spacing(2),
                    sm: theme.spacing(3),
                  },
                  zIndex: 1200,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                }}
              >
                {isChatOpen && (
                  <Grow
                    in={isChatOpen}
                    style={{ transformOrigin: 'bottom right' }}
                  >
                    <div ref={chatRef}>
                      <ResizableBox
                        width={chatSize.width}
                        height={chatSize.height}
                        onResize={onResize}
                        minConstraints={[300, 300]}
                        maxConstraints={[1000, 800]}
                        resizeHandles={['w', 'n', 'nw']}
                        handle={(handleAxis, ref) => (
                          <FullEdgeHandle handleAxis={handleAxis} ref={ref} />
                        )}
                      >
                        <Paper
                          elevation={3}
                          sx={{
                            width: '100%',
                            height: '100%',
                            mb: 2,
                            overflow: 'hidden',
                          }}
                        >
                          <Box
                            sx={{
                              width: '100%',
                              height: '100%',
                              p: 2,
                              backgroundColor: (theme) =>
                                theme.palette.background.default,
                              borderRadius: '4px',
                              overflow: 'auto',
                            }}
                          >
                            <ChatBox
                              problem={problem}
                              drawerWidth={chatSize.width}
                              setDrawerWidth={(width) =>
                                setChatSize((prev) => ({ ...prev, width }))
                              }
                              chatHistory={chatHistory}
                              setChatHistory={updateChatHistory}
                              isLoading={isLoading}
                              setIsLoading={setIsLoading}
                              chatCount={chatCount}
                              setChatCount={incrementChatCount}
                              showSettings={showSettings}
                              setShowSettings={setShowSettings}
                            />
                          </Box>
                        </Paper>
                      </ResizableBox>
                    </div>
                  </Grow>
                )}
                <Fab
                  aria-label="chat"
                  onClick={toggleChat}
                  size="small"
                  sx={{
                    transition: 'all 0.3s ease',
                    background:
                      'linear-gradient(45deg, #0e0725, #5c03bc, #e536ab, #f4e5f0)',
                    backgroundSize: '400% 400%',
                    animation: 'gradient 5s ease infinite',
                    animationPlayState: 'paused',
                    width: { xs: 40, sm: 48 },
                    height: { xs: 40, sm: 48 },
                    minHeight: 'auto',
                    '&:hover': {
                      transform: 'scale(1.1)',
                      boxShadow: theme.shadows[10],
                      animationPlayState: 'running',
                    },
                    '& img': {
                      width: { xs: '20px', sm: '24px', md: '28px' },
                      height: 'auto',
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
                  <AutoAwesomeRoundedIcon sx={{ color: 'white' }} />
                </Fab>
              </Box>
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
