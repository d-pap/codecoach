/**
 * Layout component that splits page into 2 halves.
 * For Problem Solving page and any split screen layouts we need
 */
import React from "react"
import styled from "styled-components"

const LayoutContainer = styled.div`
  display: flex;
  height: calc(100vh - 60px); // Adjust based on your navbar height
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
  return (
    <LayoutContainer>
      <LeftPanel>{problemDetails}</LeftPanel>
      <RightPanel>{codeEditor}</RightPanel>
    </LayoutContainer>
  )
}

export default ProblemDetailLayout
