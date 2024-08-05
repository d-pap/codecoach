/**
 * Placeholder div to indicate where code editor/compiler will go.
 * Replace this with the code editor/compiler we choose.
 */
import React from 'react'
import styled from 'styled-components'

const PlaceholderContainer = styled.div`
  width: 100%;
  height: 100%;
  border: 2px dashed #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: #999;
`

const CodeEditorPlaceholder = () => {
  return <PlaceholderContainer>(Code editor will be here)</PlaceholderContainer>
}

export default CodeEditorPlaceholder
