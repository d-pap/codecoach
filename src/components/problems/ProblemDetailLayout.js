/**
 * Component that creates a flex container with 2 halves
 * For Problem Solving page and any split screen layouts we need
 */

import React, { useState, useEffect } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import ResizableColumn from '../utility/ResizableColumn'
import CodeEditor from './CodeEditor'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    height: 100%;
  }
`

const LayoutContainer = styled.div`
  display: flex;
  height: calc(100vh - 85px);
`

const LeftPanel = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
`

const RightPanel = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #f0f0f0;
  display: flex;
  flex-direction: column;
`

// important for flexbox to work correctly
const EditorContainer = styled.div`
  flex: 1;
  min-height: 0;
`

const OutputArea = styled.div`
  margin-top: 20px;
  padding: 10px;
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: monospace;
  white-space: pre-wrap;
  height: 200px;
  overflow-y: auto;
`

// default code shown in the code editor
const pythonDefaultCode = `# Your code goes here \ndef example_function():\n  print("Hello, world!")`

const ProblemDetailLayout = ({ problemDetails, codeEditor }) => {
  const [resizableProps, setResizableProps] = useState(
    getResizableColumnProps()
  )

  const [code, setCode] = useState(pythonDefaultCode)
  const [output, setOutput] = useState('')

  useEffect(() => {
    const handleResize = () => {
      setResizableProps(getResizableColumnProps())
    }

    window.addEventListener('resize', handleResize)
    handleResize() // Initialize with the correct values

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  function getResizableColumnProps() {
    const windowWidth = window.innerWidth

    // Calculate dimensions based on window width
    const minWidth = windowWidth * 0.3
    const maxWidth = windowWidth * 0.7
    const initialWidth = windowWidth * 0.5

    return { initialWidth, maxWidth, minWidth }
  }
  return (
    <>
      <GlobalStyle />
      <LayoutContainer>
        <ResizableColumn
          initialWidth={resizableProps.initialWidth}
          maxWidth={resizableProps.maxWidth}
          minWidth={resizableProps.minWidth}
        >
          <LeftPanel>{problemDetails}</LeftPanel>
        </ResizableColumn>
        <RightPanel>
          <EditorContainer>
            <CodeEditor code={code} setCode={setCode} setOutput={setOutput} />
          </EditorContainer>
          <OutputArea>{output}</OutputArea>
        </RightPanel>
      </LayoutContainer>
    </>
  )
}

export default ProblemDetailLayout
