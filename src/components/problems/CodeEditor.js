/**
 * Code editor for problem solving page
 * Currently NOT a compiler, only an editor.
 * Using React-Ace code editor
 */

import React from 'react'
import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/mode-python'
import 'ace-builds/src-noconflict/ext-language_tools'
import { executeCode } from '../../api'
import styled from 'styled-components'

const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`

const StyledAceEditor = styled(AceEditor)`
  flex: 1;
  width: 100% !important;
`

const RunButton = styled.button`
  margin-top: 10px;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
`

const CodeEditor = ({ code, setCode, setOutput }) => {
  const handleRunCode = async () => {
    try {
      const result = await executeCode(code)
      if (result.status.id === 3) {
        // Accepted
        setOutput(result.stdout || 'No output')
      } else if (result.status.id === 6) {
        // Compilation Error
        setOutput(`Compilation Error:\n${result.compile_output}`)
      } else if (result.stderr) {
        setOutput(`Error:\n${result.stderr}`)
      } else {
        setOutput(`Execution Error:\n${result.status.description}`)
      }
    } catch (error) {
      setOutput('Error executing code: ' + error.message)
    }
  }

  return (
    <EditorContainer>
      <StyledAceEditor
        mode="python"
        theme="monokai"
        name="codeEditor"
        onChange={(newCode) => setCode(newCode)}
        fontSize={14}
        lineHeight={19}
        showPrintMargin={false}
        showGutter={true}
        highlightActiveLine={true}
        value={code}
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          showLineNumbers: true,
          tabSize: 2,
        }}
      />
      <RunButton onClick={handleRunCode}>Run Code</RunButton>
    </EditorContainer>
  )
}

export default CodeEditor
