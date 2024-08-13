/**
 * This component is used to render the top toolbar of the code editor
 * that has language and theme dropdowns.
 */
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
            fontSize: '14px',
            fontFamily: 'DM Sans', // font family of the select input itself
            color: currentThemeStyle.color,
            backgroundColor: currentThemeStyle.backgroundColor,
            minWidth: '100px',
            marginLeft: '20px',
            borderRadius: '6px',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: currentThemeStyle.color,
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: currentThemeStyle.color,
            },
            '& .MuiSvgIcon-root': {
              fontSize: '14px',
              color: currentThemeStyle.color,
            },
            height: '30px', // height of language select box
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                '& .MuiMenuItem-root': {
                  fontSize: '14px', // font size of the dropdown items
                  fontFamily: 'DM Sans', // font family of the dropdown items
                  padding: '3px 10px', // padding of the dropdown items
                  borderRadius: '10px', // border radius of the dropdown items
                },
              },
            },
          }}
        >
          <MenuItem value="python">Python</MenuItem>
        </Select>

        <Select
          size="small"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          sx={{
            fontSize: '14px', // font size of the select input itself
            fontFamily: 'DM Sans', // font family of the select input itself
            color: currentThemeStyle.color,
            backgroundColor: currentThemeStyle.backgroundColor,
            minWidth: '100px',
            marginLeft: '10px',
            borderRadius: '6px',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: currentThemeStyle.color,
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: currentThemeStyle.color,
            },
            '& .MuiSvgIcon-root': {
              fontSize: '14px',
              color: currentThemeStyle.color,
            },
            height: '30px', // height of theme select box
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                '& .MuiMenuItem-root': {
                  fontSize: '14px', // font size of the theme dropdown items
                  fontFamily: 'DM Sans', // font family of the dropdown items
                  padding: '3px 10px', // padding of the dropdown items
                  borderRadius: '10px', // border radius of the dropdown items
                },
              },
            },
          }}
        >
          <MenuItem value="monokai">Monokai</MenuItem>
          <MenuItem value="dracula">Dracula</MenuItem>
          <MenuItem value="one_dark">One Dark</MenuItem>
          <MenuItem value="terminal">Terminal</MenuItem>
          <MenuItem value="github">GitHub Light</MenuItem>
          <MenuItem value="xcode">XCode Light</MenuItem>
        </Select>
      </Toolbar>
    </AppBar>
  )
}

export default CodeEditorToolbar
