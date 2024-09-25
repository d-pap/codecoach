import React, { Suspense, lazy } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { Typography } from '@mui/material'

// Dynamically import the EditorSelect component
const EditorSelect = lazy(() => import('./EditorSelect'))

const CodeEditorToolbar = ({
  theme,
  language,
  setTheme,
  setLanguage,
  currentThemeStyle,
  MAX_RUN_SUBMIT_COUNT,
  runSubmitCount,
}) => {
  // Options for language selection
  const languageOptions = [
    { value: 'python', label: 'Python' },
    // Add more languages here
  ]

  // Options for theme selection
  const themeOptions = [
    { value: 'monokai', label: 'Monokai' },
    { value: 'dracula', label: 'Dracula' },
    { value: 'one_dark', label: 'One Dark' },
    { value: 'terminal', label: 'Terminal' },
    { value: 'github', label: 'GitHub Light' },
    { value: 'xcode', label: 'XCode Light' },
  ]

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: currentThemeStyle.marginColor,
        color: currentThemeStyle.color,
        boxShadow: 'none',
        borderRadius: (theme) => theme.spacing(2),
      }}
    >
      <Toolbar
        variant="dense"
        sx={{
          minHeight: '50px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
          pl: 2,
        }}
      >
        {/* Suspense handles the loading state of dynamically imported EditorSelect */}
        <Suspense fallback={<div>Loading Select...</div>}>
          <EditorSelect
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            options={languageOptions}
            currentThemeStyle={currentThemeStyle}
          />
          <EditorSelect
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            options={themeOptions}
            currentThemeStyle={currentThemeStyle}
          />
        </Suspense>
        {/* Display remaining runs for the day */}
        <Typography
          variant="body2"
          sx={{ p: 1, ml: 'auto', color: currentThemeStyle.color }}
        >
          {`You have ${MAX_RUN_SUBMIT_COUNT - runSubmitCount} runs left for today`}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default CodeEditorToolbar
