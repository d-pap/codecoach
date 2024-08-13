import React, { useState, useEffect, useRef } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import HorizontalResizableColumn from '../utility/HorizontalResizableColumn'
import CodeEditor from './CodeEditor'
import { IconButton, Drawer, Box } from '@mui/material'
import ChatBox from './llm-components/ChatBox'
import ChatIcon from '@mui/icons-material/Chat'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    border-radius: 4px;
  }

  html, body {
    height: 100%;
  }
`
// styled component for the main layout container
// containing the left and right panels
const LayoutContainer = styled.div`
  display: flex;
  height: calc(100vh - 85px);
  background-color: #f0f0f0;
`

// styled component for the left side (problem details)
const LeftPanel = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: #f0f0f0;
`

// styled component for the right side (code editor and output area)
const RightPanel = styled.div`
  flex: 1;
  padding: 20px;
  height: 100%;
  background-color: #f0f0f0;
  display: flex;
  flex-direction: column;
`

// important for flexbox to work correctly
// this is the container for the code editor
// and the run and submit buttons below it
const EditorContainer = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  display: flex;
`

// styled component for the output area below the code editor (right side)
const OutputArea = styled.div`
  margin-top: 20px;
  padding: 10px;
  background-color: #272822; // background color of monokai theme
  color: #f8f8f2; // text color of monokai theme
  border: 1px solid #75715e; // border color of monokai theme
  border-radius: 4px;
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
  height: 98vh; // Adjust height to your preference
  padding: 20px;
  background-color: white;
  border-radius: 4px 4px 0 0;
`

// default code shown in the code editor
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
    // if the user resizes the window, it changes the percentage of the width and height, thus we must update the horizontalProps
    const handleResize = () => {
      setHorizontalProps(getResizableHorizontalColumnProps())
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // The locations are based on the percentage of the window width
  function getResizableHorizontalColumnProps() {
    const windowWidth = window.innerWidth
    const minWidth = windowWidth * 0.3
    const maxWidth = windowWidth * 0.7
    const initialWidth = windowWidth * 0.5
    return { initialWidth, maxWidth, minWidth }
  }

  // Occurs when the user clicks on the chat bubble
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen)
  }

  return (
    <>
      <GlobalStyle />
      <LayoutContainer>
        <HorizontalResizableColumn
          initialWidth={horizontalProps.initialWidth}
          maxWidth={horizontalProps.maxWidth}
          minWidth={horizontalProps.minWidth}
        >
          <LeftPanel>{problemDetails}</LeftPanel>
        </HorizontalResizableColumn>
        <RightPanel ref={rightPanelRef}>
          <EditorContainer>
            <CodeEditor code={code} setCode={setCode} setOutput={setOutput} />
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
            PaperProps={{ style: { width: '25vw' } }}
          >
            <ChatLedger>
              <ChatBox problem={problem} />
            </ChatLedger>
          </Drawer>
        </RightPanel>
      </LayoutContainer>
    </>
  )
}

export default ProblemDetailLayout
