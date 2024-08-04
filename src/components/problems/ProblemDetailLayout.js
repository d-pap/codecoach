/**
 * Component that creates a flex container with 2 halves
 * For Problem Solving page and any split screen layouts we need
 */
import React, { useState, useEffect } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import ResizableColumn from '../utility/ResizableColumn'

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
  justify-content: center;
  align-items: center;
`

const ProblemDetailLayout = ({ problemDetails, codeEditor }) => {
  const [resizableProps, setResizableProps] = useState(
    getResizableColumnProps()
  )

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
        <RightPanel>{codeEditor}</RightPanel>
      </LayoutContainer>
    </>
  )
}

export default ProblemDetailLayout
