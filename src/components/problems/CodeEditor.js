import React, { useState } from 'react'
import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/theme-github'
import 'ace-builds/src-noconflict/theme-solarized_dark'
import 'ace-builds/src-noconflict/theme-terminal'
import 'ace-builds/src-noconflict/mode-python'
import 'ace-builds/src-noconflict/ext-language_tools'
import { executeCode } from '../../api'
import styled from 'styled-components'
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send'
import PlayArrow from '@mui/icons-material/PlayArrow'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
// import Typography from '@mui/material/Typography' // use if we want titles for the select
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

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

const themeStyles = {
  monokai: {
    backgroundColor: '#272822',
    color: '#f8f8f2',
  },
  github: {
    backgroundColor: '#f5f5f5',
    color: '#333333',
  },
  solarized_dark: {
    backgroundColor: '#002b36',
    color: '#839496',
  },
  terminal: {
    backgroundColor: '#000000',
    color: '#00ff00',
  },
}

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
    <CodeEditorWrapper>
      <AppBar
        position="static"
        sx={{
          backgroundColor: currentThemeStyle.backgroundColor,
          color: currentThemeStyle.color,
        }}
      >
        <Toolbar variant="dense" sx={{ minHeight: '50px' }}>
          <Select
            size="small" // adjust size of language select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            sx={{
              color: currentThemeStyle.color,
              backgroundColor: currentThemeStyle.backgroundColor,
              minWidth: '150px',
              marginLeft: '10px',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: currentThemeStyle.color,
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: currentThemeStyle.color,
              },
              '& .MuiSvgIcon-root': {
                color: currentThemeStyle.color,
              },
              height: '30px', // adjust height of language select
            }}
          >
            <MenuItem value="python">Python</MenuItem>
          </Select>

          <Select
            size="small" // adjust size of theme select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            sx={{
              color: currentThemeStyle.color,
              backgroundColor: currentThemeStyle.backgroundColor,
              minWidth: '150px',
              marginLeft: '10px',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: currentThemeStyle.color,
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: currentThemeStyle.color,
              },
              '& .MuiSvgIcon-root': {
                color: currentThemeStyle.color,
              },
            }}
          >
            <MenuItem value="monokai">Monokai</MenuItem>
            <MenuItem value="github">GitHub</MenuItem>
            <MenuItem value="solarized_dark">Solarized Dark</MenuItem>
            <MenuItem value="terminal">Terminal</MenuItem>
          </Select>
        </Toolbar>
      </AppBar>
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
      <EditorButtons handleRunCode={handleRunCode} />
    </CodeEditorWrapper>
  )
}

export default CodeEditor
