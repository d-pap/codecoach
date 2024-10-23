/**
 * This is the code editor component that is used to write code.
 * This file has the CodeEditor and EditorButtons components.
 * The language and theme dropdowns are defined in CodeEditorToolbar.js.
 */

import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/mode-python'
import 'ace-builds/src-noconflict/ext-language_tools'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import SendIcon from '@mui/icons-material/Send'
import PlayArrow from '@mui/icons-material/PlayArrow'
import CircularProgress from '@mui/material/CircularProgress'
import FeedbackDialog from '../problems/FeedbackDialog'
import { executeCode, getCurrentUserId, saveSubmission } from '../../api'
import { loadTheme, loadMode } from '../utility/aceImports'
import CodeEditorToolbar, { languageOptions } from './CodeEditorToolbar'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ButtonBase from '@mui/material/ButtonBase'

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

const TestCaseInput = ({ testCase, setTestCase, currentThemeStyle }) => (
  <TextField
    multiline
    rows={2}
    variant="outlined"
    placeholder="Enter custom test case here..."
    value={testCase}
    onChange={(e) => setTestCase(e.target.value)}
    sx={{
      backgroundColor: currentThemeStyle.backgroundColor,
      color: currentThemeStyle.color,
      mt: 1,
      mx: 1,
      borderRadius: (theme) => theme.spacing(2),
      '& .MuiOutlinedInput-root': {
        color: currentThemeStyle.color,
        //backgroundColor: currentThemeStyle.backgroundColor,
        borderRadius: (theme) => theme.spacing(2),
        fontFamily: (theme) => theme.typography.code,
        '& fieldset': {
          borderColor: currentThemeStyle.borderColor,
        },
        '&:hover fieldset': {
          borderColor: currentThemeStyle.borderColor,
        },
        '&.Mui-focused fieldset': {
          borderColor: currentThemeStyle.borderColor,
          border: '1px solid',
        },
      },
    }}
  />
)

const EditorButtons = ({
  handleRunCode,
  handleSubmitCode,
  currentThemeStyle,
  isDisabled,
  isSubmitting,
  isRunning,
  showTestCase,
  setShowTestCase,
}) => {
  const toggleTestCase = () => setShowTestCase(!showTestCase)

  return (
    <Box
      sx={{
        pt: 1,
        px: 1,
      }}
    >
      <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-end' }}>
        <ButtonBase
          onClick={toggleTestCase}
          disableRipple
          sx={{
            display: 'flex',
            alignItems: 'center',
            color: currentThemeStyle.color,
            '&:hover': { opacity: 0.7, transition: 'opacity 0.2s' },
            borderRadius: (theme) => theme.spacing(2),
          }}
        >
          <IconButton sx={{ color: 'inherit', p: 0.5 }}>
            {showTestCase ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
          <Typography
            variant="body2"
            sx={{
              ml: 0.5,
              color: currentThemeStyle.color,
              fontWeight: 500,
              fontSize: '0.8rem',
              letterSpacing: '0.03071em',
            }}
          >
            Test Cases
          </Typography>
        </ButtonBase>

        <Button
          size="small"
          onClick={handleRunCode}
          variant="text"
          startIcon={
            isRunning ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <PlayArrow />
            )
          }
          sx={{
            color: currentThemeStyle.color,
            fontWeight: 500,
            fontSize: '0.8rem',
            letterSpacing: '0.03071em',
            '&:hover': { opacity: 0.7, transition: 'opacity 0.2s' },
          }}
          disabled={isDisabled || isRunning}
        >
          {isRunning ? '' : 'Run'}
        </Button>
        <Button
          size="small"
          onClick={handleSubmitCode}
          variant="contained"
          endIcon={
            isSubmitting ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <SendIcon />
            )
          }
          sx={{
            backgroundColor: 'green',
            fontSize: '0.8rem',
            fontWeight: 500,
            letterSpacing: '0.03071em',
            '&:hover': {
              backgroundColor: 'darkgreen',
              transition: 'background-color 0.2s',
            },
            borderRadius: (theme) => theme.spacing(2),
            minWidth: '100px',
          }}
          disabled={isDisabled || isSubmitting}
        >
          {isSubmitting ? '' : 'Submit'}
        </Button>
      </Stack>
    </Box>
  )
}

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

const defaultCode = {
  python: `def main():
    print("Hello, World!")

if __name__ == "__main__":
    main()`,
  java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
  cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
  c: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
}

const CodeEditor = ({
  initialCode,
  setCode,
  setOutput,
  output,
  enableFeedback = false,
}) => {
  const [theme, setTheme] = useState('monokai')
  const [language, setLanguage] = useState('python')
  const [editorCode, setEditorCode] = useState(
    initialCode || defaultCode.python
  )
  const { problemId } = useParams() // get problem ID from URL
  const [feedbackOpen, setFeedbackOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const [testCase, setTestCase] = useState('')
  const [showTestCase, setShowTestCase] = useState(false)

  //! limit number of judge0 runs and reset limit after 12 hours
  const MAX_RUN_SUBMIT_COUNT = 10
  const RESET_INTERVAL = 12 * 60 * 60 * 1000 // 12 hours in milliseconds

  const [runSubmitCount, setRunSubmitCount] = useState(() => {
    const savedCount = localStorage.getItem('runSubmitCount')
    const lastResetTime = localStorage.getItem('lastResetTime')
    const currentTime = Date.now()

    if (
      !lastResetTime ||
      currentTime - parseInt(lastResetTime, 10) >= RESET_INTERVAL
    ) {
      // if it's been more than 12 hours since the last reset, reset the count
      localStorage.setItem('lastResetTime', currentTime.toString())
      localStorage.setItem('runSubmitCount', '0')
      return 0
    }

    return savedCount ? parseInt(savedCount, 10) : 0
  })

  useEffect(() => {
    const checkAndResetCount = () => {
      const lastResetTime = localStorage.getItem('lastResetTime')
      const currentTime = Date.now()

      if (currentTime - parseInt(lastResetTime, 10) >= RESET_INTERVAL) {
        setRunSubmitCount(0)
        localStorage.setItem('lastResetTime', currentTime.toString())
        localStorage.setItem('runSubmitCount', '0')
      }
    }

    // check and reset count on component mount and every minute
    checkAndResetCount()
    const intervalId = setInterval(checkAndResetCount, 60000)

    return () => clearInterval(intervalId)
  }, [RESET_INTERVAL])

  useEffect(() => {
    localStorage.setItem('runSubmitCount', runSubmitCount.toString())
  }, [runSubmitCount])

  useEffect(() => {
    setEditorCode(defaultCode[language] || '')
  }, [language])

  const isDisabled = runSubmitCount >= MAX_RUN_SUBMIT_COUNT

  const handleRunCode = async () => {
    if (isDisabled) {
      setOutput(
        'You have reached the maximum number of runs. Please wait for the limit to reset.'
      )
      return
    }

    setIsRunning(true)
    try {
      const selectedLanguage = languageOptions.find(
        (lang) => lang.value === language
      )
      const language_id = selectedLanguage.id

      const result = await executeCode(editorCode, testCase, language_id)
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
    } finally {
      setIsRunning(false)
    }
  }

  const handleSubmitCode = async () => {
    if (isDisabled) {
      setOutput(
        'You have reached the maximum number of submissions. Please wait for the limit to reset.'
      )
      return
    }

    setIsSubmitting(true)
    try {
      const selectedLanguage = languageOptions.find(
        (lang) => lang.value === language
      )
      const language_id = selectedLanguage.id

      const result = await executeCode(editorCode, testCase, language_id)

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
        code: editorCode,
        language_id,
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
      // add compilation output if any
      if (result.compile_output) {
        outputMessage += `\nCompilation Error: ${result.compile_output}`
      }
      setOutput(outputMessage)

      setRunSubmitCount((prevCount) => prevCount + 1)

      // open feedback dialog after 3 seconds, only if enableFeedback is true
      if (enableFeedback) {
        setTimeout(() => setFeedbackOpen(true), 3000)
      }
    } catch (error) {
      setOutput('Error submitting code: ' + error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  // feedback function
  const handleFeedbackSubmit = (feedback) => {
    //TODO: implement feedback submission to backend here
    console.log(feedback)
  }

  const currentThemeStyle = themeStyles[theme]

  // function to handle theme changes
  const handleThemeChange = useCallback(
    async (newTheme) => {
      if (newTheme === theme) return
      if (newTheme !== 'monokai') {
        await loadTheme(newTheme)
      }

      setTheme(newTheme)
    },
    [theme]
  )

  // function to handle language changes
  const handleLanguageChange = useCallback(
    async (newLanguage) => {
      if (newLanguage === language) return

      setLanguage(newLanguage)

      // load the new mode
      await loadMode(newLanguage)

      // set default code for the new language
      setEditorCode(defaultCode[newLanguage] || '')
    },
    [language]
  )

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
        setTheme={handleThemeChange}
        setLanguage={handleLanguageChange}
        currentThemeStyle={currentThemeStyle}
        MAX_RUN_SUBMIT_COUNT={MAX_RUN_SUBMIT_COUNT}
        runSubmitCount={runSubmitCount}
      />
      <AceEditor
        mode={language === 'c' || language === 'cpp' ? 'c_cpp' : language}
        theme={theme}
        name="codeEditor"
        onChange={(newCode) => {
          setEditorCode(newCode)
          setCode(newCode)
        }}
        fontSize={14}
        lineHeight={19}
        showPrintMargin={false}
        showGutter={true}
        highlightActiveLine={true}
        value={editorCode}
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          showLineNumbers: true,
          tabSize: 2,
          fontFamily: 'JetBrains Mono, monospace',
        }}
        style={{ flex: 1, width: '100%', height: '100%' }}
      />
      <EditorButtons
        handleRunCode={handleRunCode}
        handleSubmitCode={handleSubmitCode}
        currentThemeStyle={currentThemeStyle}
        isDisabled={isDisabled}
        isRunning={isRunning}
        isSubmitting={isSubmitting}
        showTestCase={showTestCase}
        setShowTestCase={setShowTestCase}
      />
      {showTestCase && (
        <TestCaseInput
          testCase={testCase}
          setTestCase={setTestCase}
          currentThemeStyle={currentThemeStyle}
        />
      )}
      <OutputWindow output={output} currentThemeStyle={currentThemeStyle} />
      {enableFeedback && (
        <FeedbackDialog
          open={feedbackOpen}
          onClose={() => setFeedbackOpen(false)}
          onSubmit={handleFeedbackSubmit}
        />
      )}
    </Box>
  )
}

export default CodeEditor
