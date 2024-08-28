import React, { useState } from 'react'
import { Box, Container, Drawer, IconButton } from '@mui/material'
import ChatBox from './llm-components/ChatBox'
import ChatIcon from '@mui/icons-material/Chat'
import CodeEditor from './CodeEditor'
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels'
import styled from 'styled-components'

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

const pythonDefaultCode = `# Your code goes here \ndef example_function():\n  print("Hello, world!")`

const ProblemDetailLayout = ({ problem, problemDetails }) => {
  const [code, setCode] = useState(pythonDefaultCode)
  const [output, setOutput] = useState('')
  const [isChatOpen, setIsChatOpen] = useState(false)

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen)
  }

  return (
    <Container maxWidth={false}>
      <Box
        sx={{
          display: 'flex',
          height: 'calc(100vh - 85px)',
          backgroundColor: (theme) => theme.palette.background.default,
        }}
      >
        <PanelGroup direction="horizontal">
          <Panel defaultSize={50} minSize={20}>
            <Box
              //* left panel
              sx={{
                pt: 2,
                //pr: 2,
                backgroundColor: (theme) => theme.palette.background.default,
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'auto',
              }}
            >
              {problemDetails}
            </Box>
          </Panel>
          <StyledPanelResizeHandle />
          <Panel minSize={20}>
            <Box
              //* right panel
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
                //* code editor container
                sx={{
                  flex: 1,
                  //width: '100%', //! controlled by CodeEditor?
                  //height: '100%', //! controlled by CodeEditor?
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
              {/* <Box
                //* output window
                sx={{
                  mt: 2,
                  mb: 4, //! added margin bottom - important for proper layout
                  p: 2,
                  backgroundColor: '#272822',
                  color: '#f8f8f2',
                  border: 1,
                  borderColor: '#75715e',
                  borderRadius: (theme) => theme.spacing(2),
                  fontFamily: 'monospace',
                  whiteSpace: 'pre-wrap',
                  height: '20vh',
                  overflowY: 'auto',
                }}
              >
                {output}
              </Box> */}
              <Box
                //* chat bubble
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
                    transition:
                      'transform 0.3s ease, background-color 0.3s ease',
                    '&:hover': {
                      transform: 'translate(-5px, -50%)',
                      backgroundColor: '#303f9f',
                    },
                  }}
                >
                  <ChatIcon />
                </IconButton>
              </Box>
              <Drawer
                anchor="right"
                open={isChatOpen}
                onClose={toggleChat}
                PaperProps={{ style: { width: '25vw' } }}
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
                  <ChatBox problem={problem} />
                </Box>
              </Drawer>
            </Box>
          </Panel>
        </PanelGroup>
      </Box>
    </Container>
  )
}

export default ProblemDetailLayout
