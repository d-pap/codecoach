/**
 * Component that creates a flex container with 2 halves
 * For Problem Solving page and any split screen layouts we need
 */
import React, { useState } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import CodeEditor from './CodeEditor'

// reset some default styling
// these css rules make the container height fit perfect (no scroll bar)
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

// container that takes up full viewport height
// subtracted by height of navbar (85px)
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

const ProblemDetailLayout = ({ problemDetails }) => {
  // state to hold the users code
  const [code, setCode] =
    useState(`# Your code goes here \ndef example_function():
  print("Hello, world!")`)
  return (
    <>
      <GlobalStyle />
      <LayoutContainer>
        <LeftPanel>{problemDetails}</LeftPanel>
        <RightPanel>
          <CodeEditor code={code} setCode={setCode} />
        </RightPanel>
      </LayoutContainer>
    </>
  )
}

export default ProblemDetailLayout
