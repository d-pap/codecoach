import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

const CodeEditorToolbar = ({
  theme,
  language,
  setTheme,
  setLanguage,
  currentThemeStyle,
}) => {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: currentThemeStyle.backgroundColor,
        color: currentThemeStyle.color,
      }}
    >
      <Toolbar variant="dense" sx={{ minHeight: '50px' }}>
        <Select
          size="small"
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
            height: '30px', // adjust height of language select box
          }}
        >
          <MenuItem value="python">Python</MenuItem>
        </Select>

        <Select
          size="small"
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
            height: '30px', // adjust height of select box
          }}
        >
          {/* dark themes: */}
          <MenuItem value="monokai">Monokai</MenuItem>
          <MenuItem value="dracula">Dracula</MenuItem>
          <MenuItem value="one_dark">One Dark</MenuItem>
          <MenuItem value="terminal">Terminal</MenuItem>
          {/* light themes: */}
          <MenuItem value="github">GitHub Light</MenuItem>
          <MenuItem value="xcode">XCode Light</MenuItem>
        </Select>
      </Toolbar>
    </AppBar>
  )
}

export default CodeEditorToolbar
