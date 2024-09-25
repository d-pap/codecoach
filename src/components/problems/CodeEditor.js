import React, { useState, useEffect, Suspense, lazy } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Stack, Box } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import PlayArrow from '@mui/icons-material/PlayArrow'
import { executeCode, getCurrentUserId, saveSubmission } from '../../api'
import CodeEditorToolbar from './CodeEditorToolbar'
import FeedbackDialog from '../problems/FeedbackDialog'

// Dynamically import AceEditor
const AceEditor = lazy(() => import('react-ace'))

// Dynamically import themes and modes based on selection
const loadAceTheme = (theme) => import(`ace-builds/src-noconflict/theme-${theme}`)
const loadAceMode = (mode) => import(`ace-builds/src-noconflict/mode-${mode}`)
const loadAceExtensions = () => import('ace-builds/src-noconflict/ext-language_tools')

// Theme styles
const themeStyles = {
  monokai: { backgroundColor: '#272822', color: '#f8f8f2', borderColor: '#3e3d32', marginColor: '#2F3129' },
  github: { backgroundColor: '#ffffff', color: '#333333', borderColor: '#cccccc', marginColor: '#e8e8e8' },
  terminal: { backgroundColor: '#000000', color: '#00ff00', borderColor: '#333333', marginColor: '#1a0005' },
  one_dark: { backgroundColor: '#282c34', color: '#abb2bf', borderColor: '#4b5263', marginColor: '#282c34' },
  dracula: { backgroundColor: '#282a36', color: '#f8f8f2', borderColor: '#44475a', marginColor: '#282a36' },
  xcode: { backgroundColor: '#ffffff', color: '#000000', borderColor: '#d1d1d1', marginColor: '#e8e8e8' },
}

// Button component for running and submitting code
const EditorButtons = ({ handleRunCode, handleSubmitCode, currentThemeStyle, isDisabled }) => (
  <Box sx={{ pt: 1, pr: 1 }}>
    <Stack direction="row" spacing={1} sx={{ justifyContent: 'flex-end' }}>
      <Button
        size="small"
        onClick={handleRunCode}
        variant="text"
        startIcon={<PlayArrow />}
        sx={{ color: currentThemeStyle.color }}
        disabled={isDisabled}
      >
        Run
      </Button>
      <Button
        size="small"
        onClick={handleSubmitCode}
        variant="contained"
        endIcon={<SendIcon />}
        sx={{ backgroundColor: 'green', '&:hover': { backgroundColor: 'darkgreen' }, borderRadius: (theme) => theme.spacing(2) }}
        disabled={isDisabled}
      >
        Submit
      </Button>
    </Stack>
  </Box>
)

// Output display component
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
  const [theme, setTheme] = useState('monokai') // Current theme
  const [language, setLanguage] = useState('python') // Current language
  const { problemId } = useParams() // Get problem ID from URL
  const [feedbackOpen, setFeedbackOpen] = useState(false)

  // Maximum allowed runs and submissions
  const MAX_RUN_SUBMIT_COUNT = 10
  const [runSubmitCount, setRunSubmitCount] = useState(() => {
    const savedCount = localStorage.getItem('runSubmitCount')
    const savedDate = localStorage.getItem('runSubmitDate')
    const today = new Date().toDateString()

    if (savedDate !== today) {
      localStorage.setItem('runSubmitDate', today)
      return 0
    }
    return savedCount ? parseInt(savedCount, 10) : 0
  })

  // Update local storage when count changes
  useEffect(() => {
    localStorage.setItem('runSubmitCount', runSubmitCount)
    localStorage.setItem('runSubmitDate', new Date().toDateString())
  }, [runSubmitCount])

  const isDisabled = runSubmitCount >= MAX_RUN_SUBMIT_COUNT // Disable buttons if limit reached
  const currentThemeStyle = themeStyles[theme] // Current theme styles

  // Dynamically load theme, mode, and extensions when theme or language changes
  useEffect(() => {
    loadAceTheme(theme)
    loadAceMode(language)
    loadAceExtensions()
  }, [theme, language])

  // Handle code execution
  const handleRunCode = async () => {
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

      setRunSubmitCount((prev) => prev + 1) // Increment count
    } catch (error) {
      setOutput('Error executing code: ' + error.message)
    }
  }

  // Handle code submission
  const handleSubmitCode = async () => {
    if (runSubmitCount >= MAX_RUN_SUBMIT_COUNT) {
      setOutput('You have reached the maximum number of submissions for today.')
      return
    }

    try {
      const result = await executeCode(code)

      // Determine status
      let status = 'Unknown Error'
      if (result.status.id === 3) status = 'Accepted'
      else if (result.status.id === 6) status = 'Compilation Error'
      else if (result.status.id === 5) status = 'Time Limit Exceeded'
      else status = 'Runtime Error'

      const userId = await getCurrentUserId() // Get user ID

      // Prepare submission data
      const submissionData = {
        userId,
        problemId,
        code,
        result: {
          stdout: result.stdout,
          stderr: result.stderr,
          compile_output: result.compile_output,
          memory: result.memory,
          time: result.time,
        },
        status,
        timestamp: new Date(),
      }

      await saveSubmission(submissionData) // Save to database

      // Prepare output message
      let outputMessage = `Status: ${status}\nOutput: ${result.stdout || 'No output'}\nMemory: ${result.memory} KB\nExecution Time: ${result.time} seconds`
      if (result.stderr) outputMessage += `\nError: ${result.stderr}`
      if (result.compile_output) outputMessage += `\nCompilation Error: ${result.compile_output}`
      setOutput(outputMessage)

      setRunSubmitCount((prev) => prev + 1) // Increment count

      setTimeout(() => setFeedbackOpen(true), 3000) // Open feedback dialog
    } catch (error) {
      setOutput('Error submitting code: ' + error.message)
    }
  }

  // Handle feedback submission
  const handleFeedbackSubmit = (feedback) => {
    // TODO: Implement feedback submission to backend
    console.log(feedback)
  }

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
        marginBottom: 4,
      }}
    >
      <CodeEditorToolbar
        theme={theme}
        language={language}
        setTheme={setTheme}
        setLanguage={setLanguage}
        currentThemeStyle={currentThemeStyle}
        MAX_RUN_SUBMIT_COUNT={MAX_RUN_SUBMIT_COUNT}
        runSubmitCount={runSubmitCount}
      />
      <Suspense fallback={<div>Loading Editor...</div>}>
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
      </Suspense>
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
