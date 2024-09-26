import React, { useState, Suspense, lazy } from 'react'
import ChatBox from './llm-components/ChatBox'
import ChatIcon from '@mui/icons-material/Chat'
import CodeEditor from './CodeEditor'
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels'
import styled from 'styled-components';

// Dynamically import MUI components to optimize bundle size
const Box = lazy(() => import('@mui/material/Box'))
const Container = lazy(() => import('@mui/material/Container'))
const Drawer = lazy(() => import('@mui/material/Drawer'))
const IconButton = lazy(() => import('@mui/material/IconButton'))

// Styled component for the panel resize handle
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

// Default Python code for the editor
const pythonDefaultCode = `# Your code goes here 
def example_function():
  print("Hello, world!")`

// ProblemDetailLayout component
const ProblemDetailLayout = ({ problem, problemDetails }) => {
  // State hooks for code editor, output, chat drawer, and drawer width
  const [code, setCode] = useState(pythonDefaultCode)
  const [output, setOutput] = useState('')
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [drawerWidth, setDrawerWidth] = useState(35) // Width in percentage (default is 35%)

  // Toggle the chat drawer open/close
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen)
  }

  return (
    // Suspense wraps dynamically imported components
    <Suspense fallback={<div>Loading...</div>}>
      <Container maxWidth={false}>
        <Box
          sx={{
            display: 'flex',
            height: 'calc(100vh - 66px)',
            backgroundColor: (theme) => theme.palette.background.default,
          }}
        >
          <PanelGroup direction="horizontal">
            {/* Left Panel displaying problem details */}
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

            {/* Resize handle between panels */}
            <StyledPanelResizeHandle />

            {/* Right Panel containing CodeEditor and Chat functionalities */}
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
                {/* Code Editor Section */}
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

                {/* Chat Icon Button */}
                <Box
                  sx={{
                    position: 'fixed',
                    top: '50%',
                    right: 0,
                    transform: 'translateY(-50%)',
                    zIndex: 10,
                  }}
                >
                  <IconButton
                    onClick={toggleChat}
                    sx={{
                      backgroundColor: '#3f51b5',
                      borderRadius: '5px 0 0 5px',
                      transition: 'transform 0.3s ease, background-color 0.3s ease',
                      '&:hover': {
                        transform: 'translate(-5px, -50%)',
                        backgroundColor: '#303f9f',
                      },
                    }}
                  >
                    <ChatIcon />
                  </IconButton>
                </Box>

                {/* Chat Drawer */}
                <Drawer
                  anchor="right"
                  open={isChatOpen}
                  onClose={toggleChat}
                  PaperProps={{ style: { width: `${drawerWidth}vw` } }}
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
                    />
                  </Box>
                </Drawer>
              </Box>
            </Panel>
          </PanelGroup>
        </Box>
      </Container>
    </Suspense>
  )
}

export default ProblemDetailLayout
