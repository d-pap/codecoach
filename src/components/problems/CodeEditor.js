/**
 * This is the code editor component that is used to write code.
 * This file has the CodeEditor and EditorButtons components.
 * The language and theme dropdowns are defined in CodeEditorToolbar.js.
 */
import React, { useState } from 'react'
import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/theme-github'
import 'ace-builds/src-noconflict/theme-solarized_dark'
import 'ace-builds/src-noconflict/theme-dracula'
import 'ace-builds/src-noconflict/theme-one_dark'
import 'ace-builds/src-noconflict/theme-terminal'
import 'ace-builds/src-noconflict/theme-xcode'
import 'ace-builds/src-noconflict/mode-python'
import 'ace-builds/src-noconflict/ext-language_tools'
import { executeCode } from '../../api'
import styled from 'styled-components'
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send'
import PlayArrow from '@mui/icons-material/PlayArrow'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import CodeEditorToolbar from './CodeEditorToolbar'

const CodeEditorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  border: 1px solid ${({ borderColor }) => borderColor};
  border-radius: 4px;
  background-color: ${({ backgroundColor }) => backgroundColor};
`

const StyledAceEditor = styled(AceEditor)`
  flex: 1;
  width: 100% !important;
  height: 100% !important;
`
// const StyledAceEditor = styled(AceEditor)`
//   flex: 1;
//   width: 100% !important;
//   height: auto !important;
//   min-height: 400px;
// `

const themeStyles = {
  monokai: {
    backgroundColor: '#272822',
    color: '#f8f8f2',
    borderColor: '#3e3d32',
  },
  github: {
    backgroundColor: '#f5f5f5',
    color: '#333333',
    borderColor: '#cccccc',
  },
  terminal: {
    backgroundColor: '#000000',
    color: '#00ff00',
    borderColor: '#333333',
  },
  one_dark: {
    backgroundColor: '#282c34',
    color: '#abb2bf',
    borderColor: '#4b5263',
  },
  dracula: {
    backgroundColor: '#282a36',
    color: '#f8f8f2',
    borderColor: '#44475a',
  },
  xcode: {
    backgroundColor: '#ffffff',
    color: '#000000',
    borderColor: '#d1d1d1',
  },
}

const EditorButtons = ({ handleRunCode, currentThemeStyle }) => {
  return (
    <Box sx={{ paddingBottom: 1, paddingRight: 1 }}>
      <Stack direction="row" spacing={1} sx={{ justifyContent: 'flex-end' }}>
        <Button
          size="small"
          onClick={handleRunCode}
          variant="text"
          startIcon={<PlayArrow />}
          sx={{
            fontSize: '12px',
            fontFamily: 'Ubuntu', //! font family of the run button
            borderRadius: '6px',
            color: currentThemeStyle.color,
          }}
        >
          Run
        </Button>
        <Button
          size="small"
          variant="contained"
          endIcon={<SendIcon />}
          sx={{
            backgroundColor: 'green',
            '&:hover': { backgroundColor: 'darkgreen' },
            fontSize: '12px',
            fontFamily: 'Ubuntu', //! font family of the submit button
            borderRadius: '6px',
          }}
        >
          Submit
        </Button>
      </Stack>
    </Box>
  )
}

const CodeEditor = ({ code, setCode, setOutput }) => {
  const [theme, setTheme] = useState('monokai')
  const [language, setLanguage] = useState('python')

  const handleRunCode = async () => {
    try {
      const result = await executeCode(code)
      if (result.status.id === 3) {
        setOutput(result.stdout || 'No output')
      } else if (result.status.id === 6) {
        setOutput(`Compilation Error:\n${result.compile_output}`)
      } else if (result.status.id === 5) {
        setOutput('Time Limit Exceeded')
      } else {
        setOutput(`Error:\n${result.stderr}`)
      }
    } catch (error) {
      setOutput('Error executing code: ' + error.message)
    }
  }

  const currentThemeStyle = themeStyles[theme]

  return (
    <CodeEditorWrapper
      borderColor={currentThemeStyle.borderColor}
      backgroundColor={currentThemeStyle.backgroundColor}
    >
      <CodeEditorToolbar
        theme={theme}
        language={language}
        setTheme={setTheme}
        setLanguage={setLanguage}
        currentThemeStyle={currentThemeStyle}
      />
      <StyledAceEditor
        mode={language}
        theme={theme}
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
      <EditorButtons
        handleRunCode={handleRunCode}
        currentThemeStyle={currentThemeStyle}
      />
    </CodeEditorWrapper>
  )
}

export default CodeEditor
