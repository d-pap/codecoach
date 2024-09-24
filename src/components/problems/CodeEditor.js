/**
 * This is the code editor component that is used to write code.
 * This file has the CodeEditor and EditorButtons components.
 * The language and theme dropdowns are defined in CodeEditorToolbar.js.
 */

import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
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
import { getCurrentUserId, saveSubmission } from '../../api'
import FeedbackDialog from '../problems/FeedbackDialog'

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

const EditorButtons = ({
  handleRunCode,
  handleSubmitCode,
  currentThemeStyle,
  isDisabled, //! if true, the buttons will be disabled
}) => (
  <Box sx={{ pt: 1, pr: 1 }}>
    <Stack direction="row" spacing={1} sx={{ justifyContent: 'flex-end' }}>
      <Button
        size="small"
        onClick={handleRunCode}
        variant="text"
        startIcon={<PlayArrow />}
        sx={{ color: currentThemeStyle.color }}
        disabled={isDisabled} //! if true, the button will be disabled
      >
        Run
      </Button>
      <Button
        size="small"
        onClick={handleSubmitCode}
        variant="contained"
        endIcon={<SendIcon />}
        sx={{
          backgroundColor: 'green',
          '&:hover': { backgroundColor: 'darkgreen' },
          borderRadius: (theme) => theme.spacing(2),
        }}
        disabled={isDisabled} //! if true, the button will be disabled
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
  const { problemId } = useParams() // get problem ID from URL
  const [feedbackOpen, setFeedbackOpen] = useState(false)

  //! limit the number of runs and submissions to prevent abuse
  const MAX_RUN_SUBMIT_COUNT = 5
  const [runSubmitCount, setRunSubmitCount] = useState(() => {
    const savedCount = localStorage.getItem('runSubmitCount')
    const savedDate = localStorage.getItem('runSubmitDate')
    const today = new Date().toDateString()

    if (savedDate !== today) {
      // new day, reset the count
      localStorage.setItem('runSubmitDate', today)
      return 0
    }
    return savedCount ? parseInt(savedCount, 10) : 0
  })

  useEffect(() => {
    localStorage.setItem('runSubmitCount', runSubmitCount)
    localStorage.setItem('runSubmitDate', new Date().toDateString())
  }, [runSubmitCount])

  //! if true, the buttons will be disabled
  const isDisabled = runSubmitCount >= MAX_RUN_SUBMIT_COUNT

  const handleRunCode = async () => {
    //! limit the number of runs and submissions to prevent abuse
    if (runSubmitCount >= MAX_RUN_SUBMIT_COUNT) {
      setOutput('You have reached the maximum number of runs for today.')
      return
    }

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

      //! increment the run submit count
      setRunSubmitCount((prevCount) => prevCount + 1)
    } catch (error) {
      setOutput('Error executing code: ' + error.message)
    }
  }

  const handleSubmitCode = async () => {
    //! limit the number of runs and submissions to prevent abuse
    if (runSubmitCount >= MAX_RUN_SUBMIT_COUNT) {
      setOutput('You have reached the maximum number of submissions for today.')
      return
    }

    try {
      const result = await executeCode(code)

      // determine the status of the result
      let status = 'Unknown Error'
      if (result.status.id === 3) {
        status = 'Accepted'
      } else if (result.status.id === 6) {
        status = 'Compilation Error'
      } else if (result.status.id === 5) {
        status = 'Time Limit Exceeded'
      } else {
        status = 'Runtime Error'
      }

      // prepare submission data
      const userId = await getCurrentUserId() // get user ID

      // submission data to be saved in the database
      const submissionData = {
        userId,
        problemId,
        code,
        result: {
          stdout: result.stdout,
          stderr: result.stderr,
          compile_output: result.compile_output, // will be 'null' for non-compiled languages like Python
          memory: result.memory,
          time: result.time,
        },
        status,
        timestamp: new Date(),
      }

      // save submission to database
      await saveSubmission(submissionData)

      // display output with memory and execution time
      let outputMessage = `Status: ${status}\nOutput: ${result.stdout || 'No output'}\nMemory: ${result.memory} KB\nExecution Time: ${result.time} seconds`
      // add error messages if any
      if (result.stderr) {
        outputMessage += `\nError: ${result.stderr}`
      }
      // add compilation output if any //!(only if we add compiled languages in the future)
      if (result.compile_output) {
        outputMessage += `\nCompilation Error: ${result.compile_output}`
      }
      setOutput(outputMessage)

      //! increment the run submit count
      setRunSubmitCount((prevCount) => prevCount + 1)

      // open feedback dialog after 3 seconds
      setTimeout(() => setFeedbackOpen(true), 3000)
    } catch (error) {
      setOutput('Error submitting code: ' + error.message)
    }
  }

  // feedback function
  const handleFeedbackSubmit = (feedback) => {
    //TODO: implement feedback submission to backend here
    console.log(feedback)
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
        handleSubmitCode={handleSubmitCode}
        currentThemeStyle={currentThemeStyle}
        isDisabled={isDisabled}
      />
      <OutputWindow output={output} currentThemeStyle={currentThemeStyle} />
      <FeedbackDialog
        open={feedbackOpen}
        onClose={() => setFeedbackOpen(false)}
        onSubmit={handleFeedbackSubmit}
      />
    </Box>
  )
}

export default CodeEditor
