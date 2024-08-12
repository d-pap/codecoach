/**
 * Component that creates a flex container with 2 halves
 * For Problem Solving page and any split screen layouts we need
 */

import React, { useState, useEffect, useRef } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import HorizontalResizableColumn from '../utility/HorizontalResizableColumn'
// import VerticalResizableColumn from '../utility/VerticalResizableColumn'
import CodeEditor from './CodeEditor'
// import ChatBox from './llm-components/ChatBox'

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
  height: 100%;
  background-color: #f0f0f0;
  display: flex;
  flex-direction: column;
`

const EditorContainer = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  display: flex;
`

// const ChatboxContainer = styled.div`
//   flex: 0 1
//   width: 100%;
//   overflow-y: auto;
//   display: flex;
//   flex-direction: column;
// `

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
  const [horizontalProps, setHorizontalProps] = useState(
    getResizableHorizontalColumnProps()
  )
  // const [verticalProps, setVerticalProps] = useState({
  //   initialHeight: 0,
  //   maxHeight: 0,
  //   minHeight: 0,
  // })

  const rightPanelRef = useRef(null)
  const [code, setCode] = useState(pythonDefaultCode)
  const [output, setOutput] = useState('')

  useEffect(() => {
    const handleResize = () => {
      setHorizontalProps(getResizableHorizontalColumnProps())
      // Update vertical props after horizontal props have been updated
      // updateVerticalProps() ----------------------------------------
    }

    window.addEventListener('resize', handleResize)
    handleResize() // Initialize with the correct values

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // useEffect(() => {
  //   if (rightPanelRef.current) {
  //     // Ensure the vertical props are updated when the right panel is mounted
  //     updateVerticalProps()
  //   }
  // }, [rightPanelRef.current])

  function getResizableHorizontalColumnProps() {
    const windowWidth = window.innerWidth
    const minWidth = windowWidth * 0.3
    const maxWidth = windowWidth * 0.7
    const initialWidth = windowWidth * 0.5
    return { initialWidth, maxWidth, minWidth }
  }

  // function updateVerticalProps() {
  //   if (rightPanelRef.current) {
  //     const panelHeight = rightPanelRef.current.offsetHeight
  //     const minHeight = panelHeight * 0.25
  //     const maxHeight = panelHeight * 0.75
  //     const initialHeight = panelHeight * 0.5

  //     setVerticalProps({ initialHeight, maxHeight, minHeight })
  //   }
  // }

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
        </RightPanel>
      </LayoutContainer>
    </>
  )
}

export default ProblemDetailLayout
