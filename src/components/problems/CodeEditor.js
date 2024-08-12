/**
 * Code editor for problem solving page
 * Currently NOT a compiler, only an editor.
 * Using React-Ace code editor
 */

import React from 'react'
import AceEditor from 'react-ace'
//import 'ace-builds/src-noconflict/theme-github_dark'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/mode-python'
import 'ace-builds/src-noconflict/ext-language_tools'
import { executeCode } from '../../api'
import styled from 'styled-components'
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send'
import PlayArrow from '@mui/icons-material/PlayArrow'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'

const CodeEditorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`

const StyledAceEditor = styled(AceEditor)`
  flex: 1;
  width: 100% !important;
`

// define EditorButtons component for Run and Submit MUI buttons
const EditorButtons = ({ handleRunCode }) => {
  return (
    <Box sx={{ paddingTop: 2 }}>
      <Stack direction="row" spacing={1} sx={{ justifyContent: 'flex-end' }}>
        <Button
          onClick={handleRunCode}
          variant="outlined"
          startIcon={<PlayArrow />}
        >
          Run
        </Button>
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          sx={{
            backgroundColor: 'green',
            '&:hover': { backgroundColor: 'darkgreen' },
          }}
        >
          Submit
        </Button>
      </Stack>
    </Box>
  )
}

const CodeEditor = ({ code, setCode, setOutput }) => {
  const handleRunCode = async () => {
    try {
      const result = await executeCode(code)
      if (result.status.id === 3) {
        // accepted
        setOutput(result.stdout || 'No output')
      } else if (result.status.id === 6) {
        // compilation error
        setOutput(`Compilation Error:\n${result.compile_output}`)
      } else if (result.status.id === 5) {
        // time limit exceeded
        setOutput('Time Limit Exceeded')
      } else {
        setOutput(`Error:\n${result.stderr}`)
      }
    } catch (error) {
      setOutput('Error executing code: ' + error.message)
    }
  }

  return (
    <CodeEditorWrapper>
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
      <EditorButtons handleRunCode={handleRunCode} />
    </CodeEditorWrapper>
  )
}

export default CodeEditor
