import React, { useState, useEffect, useRef } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import HorizontalResizableColumn from '../utility/HorizontalResizableColumn'
import CodeEditor from './CodeEditor'
import { IconButton, Drawer, Box } from '@mui/material'
import ChatBox from './llm-components/ChatBox'
import ChatIcon from '@mui/icons-material/Chat'
import { Container } from '@mui/material'

// const GlobalStyle = createGlobalStyle`
//   * {
//     margin: 0;
//     padding: 0;
//   }

//   html, body {
//     height: 100%;
//   }
// `

const LayoutContainer = styled.div`
  display: flex;
  height: calc(100vh - 85px);
  background-color: #f0f0f0;
`

const LeftPanel = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: #f0f0f0;
`

const RightPanel = styled.div`
  flex: 1;
  padding-left: 20px;
  padding-right: 20px;
  height: 100%;
  background-color: #f0f0f0;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`

const EditorContainer = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  display: flex;
  border-radius: 6px;
`

const OutputArea = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 10px;
  background-color: #272822;
  color: #f8f8f2;
  border: 1px solid #75715e;
  border-radius: 6px;
  font-family: monospace;
  white-space: pre-wrap;
  height: 200px;
  overflow-y: auto;
  ::selection {
    background: #49483e;
  }
`

const ChatBubble = styled.div`
  position: fixed;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  z-index: 10;
  padding: 10px 5px;
  background-color: #3f51b5;
  border-radius: 5px 0 0 5px;
  transition:
    transform 0.3s ease,
    background-color 0.3s ease;

  &:hover {
    transform: translate(-5px, -50%);
    background-color: #303f9f;
  }
`

const ChatLedger = styled(Box)`
  width: 300px;
  width: 25vw;
  height: 98vh;
  padding: 20px;
  background-color: white;
  border-radius: 4px 4px 0 0;
`

const pythonDefaultCode = `# Your code goes here \ndef example_function():\n  print("Hello, world!")`

const ProblemDetailLayout = ({ problem, problemDetails, codeEditor }) => {
  const [horizontalProps, setHorizontalProps] = useState(
    getResizableHorizontalColumnProps()
  )
  const rightPanelRef = useRef(null)
  const [code, setCode] = useState(pythonDefaultCode)
  const [output, setOutput] = useState('')
  const [isChatOpen, setIsChatOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setHorizontalProps(getResizableHorizontalColumnProps())
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Get the props for the horizontal resizable column
  function getResizableHorizontalColumnProps() {
    const windowWidth = window.innerWidth
    const minWidth = windowWidth * 0.3
    const maxWidth = windowWidth * 0.7
    const initialWidth = windowWidth * 0.5
    return { initialWidth, maxWidth, minWidth }
  }

  // Toggle the chat drawer
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen)
  }

  return (
    <>
      {/* <GlobalStyle /> */}
      <Container maxWidth="false">
        <LayoutContainer>
          <HorizontalResizableColumn
            initialWidth={horizontalProps.initialWidth}
            maxWidth={horizontalProps.maxWidth}
            minWidth={horizontalProps.minWidth}
          >
            <Box
              sx={{
                flex: 1,
                padding: '0',
                height: '100%',
                backgroundColor: '#f0f0f0',
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'auto',
                boxSizing: 'border-box',
              }}
            >
              <LeftPanel>{problemDetails}</LeftPanel>
            </Box>
          </HorizontalResizableColumn>
          <Box
            sx={{
              flex: 1,
              padding: '20px',
              height: '100%',
              backgroundColor: '#f0f0f0',
              display: 'flex',
              flexDirection: 'column',
              overflowY: 'auto',
              boxSizing: 'border-box',
            }}
          >
            <RightPanel ref={rightPanelRef}>
              <EditorContainer>
                <CodeEditor
                  code={code}
                  setCode={setCode}
                  setOutput={setOutput}
                />
              </EditorContainer>
              <OutputArea>{output}</OutputArea>
              <ChatBubble>
                <IconButton onClick={toggleChat} color="blue" size="large">
                  <ChatIcon />
                </IconButton>
              </ChatBubble>
              <Drawer
                anchor="right"
                open={isChatOpen}
                onClose={toggleChat}
                PaperProps={{ style: { width: '28vw' } }}
              >
                <ChatLedger>
                  <ChatBox problem={problem} />
                </ChatLedger>
              </Drawer>
            </RightPanel>
          </Box>
        </LayoutContainer>
      </Container>
    </>
  )
}

export default ProblemDetailLayout
