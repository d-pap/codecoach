/**
 * This is the code editor component that is used to write code.
 * This file has the CodeEditor and EditorButtons components.
 * The language and theme dropdowns are defined in CodeEditorToolbar.js.
 */

import React, { useState } from 'react'
import AceEditor from 'react-ace'
import { executeCode } from '../../api'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/theme-github'
import 'ace-builds/src-noconflict/theme-solarized_dark'
import 'ace-builds/src-noconflict/theme-dracula'
import 'ace-builds/src-noconflict/theme-one_dark'
import 'ace-builds/src-noconflict/theme-terminal'
import 'ace-builds/src-noconflict/theme-xcode'
import 'ace-builds/src-noconflict/mode-python'
import 'ace-builds/src-noconflict/ext-language_tools'
import { Button, Stack, Box } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import PlayArrow from '@mui/icons-material/PlayArrow'
import CodeEditorToolbar from './CodeEditorToolbar'

const themeStyles = {
  monokai: {
    backgroundColor: '#272822',
    color: '#f8f8f2',
    borderColor: '#3e3d32',
    marginColor: '#2F3129',
  },
  github: {
    backgroundColor: '#ffffff',
    color: '#333333',
    borderColor: '#cccccc',
    marginColor: '#e8e8e8',
  },
  terminal: {
    backgroundColor: '#000000',
    color: '#00ff00',
    borderColor: '#333333',
    marginColor: '#1a0005',
  },
  one_dark: {
    backgroundColor: '#282c34',
    color: '#abb2bf',
    borderColor: '#4b5263',
    marginColor: '#282c34',
  },
  dracula: {
    backgroundColor: '#282a36',
    color: '#f8f8f2',
    borderColor: '#44475a',
    marginColor: '#282a36',
  },
  xcode: {
    backgroundColor: '#ffffff',
    color: '#000000',
    borderColor: '#d1d1d1',
    marginColor: '#e8e8e8',
  },
}

const EditorButtons = ({ handleRunCode, currentThemeStyle }) => (
  <Box sx={{ pt: 1, pr: 1 }}>
    <Stack direction="row" spacing={1} sx={{ justifyContent: 'flex-end' }}>
      <Button
        size="small"
        onClick={handleRunCode}
        variant="text"
        startIcon={<PlayArrow />}
        sx={{ color: currentThemeStyle.color }}
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
          borderRadius: (theme) => theme.spacing(2),
        }}
      >
        Submit
      </Button>
    </Stack>
  </Box>
)

const OutputWindow = ({ output, currentThemeStyle }) => (
  <Box
    sx={{
      fontFamily: (theme) => theme.typography.code,
      p: 2,
      m: 1,
      backgroundColor: currentThemeStyle.backgroundColor,
      color: currentThemeStyle.color,
      border: 1,
      borderColor: currentThemeStyle.borderColor,
      borderRadius: (theme) => theme.spacing(2),
      overflow: 'auto',
      whiteSpace: 'pre-wrap',
      wordWrap: 'break-word',
      boxSize: 'border-box',
      maxHeight: '8em',
      height: '8em',
    }}
  >
    {output}
  </Box>
)

const CodeEditor = ({ code, setCode, setOutput, output }) => {
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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        border: 1,
        borderColor: currentThemeStyle.borderColor,
        borderRadius: (theme) => theme.spacing(2),
        backgroundColor: currentThemeStyle.marginColor,
        marginBottom: 4, //! important for proper layout
      }}
    >
      <CodeEditorToolbar
        theme={theme}
        language={language}
        setTheme={setTheme}
        setLanguage={setLanguage}
        currentThemeStyle={currentThemeStyle}
      />
      <AceEditor
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
          fontFamily: 'monospace',
        }}
        style={{ flex: 1, width: '100%', height: '100%' }}
      />
      <EditorButtons
        handleRunCode={handleRunCode}
        currentThemeStyle={currentThemeStyle}
      />
      <OutputWindow output={output} currentThemeStyle={currentThemeStyle} />
    </Box>
  )
}

export default CodeEditor
