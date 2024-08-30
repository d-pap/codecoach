/**
 * This component is used to render the top toolbar of the code editor
 * that has language and theme dropdowns.
 */
import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

// component to render language and theme dropdowns
const EditorSelect = ({ value, onChange, options, currentThemeStyle, sx }) => {
  return (
    <Select
      size="small"
      value={value}
      onChange={onChange}
      sx={{
        fontSize: (theme) => theme.typography.button.fontSize,
        color: currentThemeStyle.color,
        backgroundColor: currentThemeStyle.marginColor,
        minWidth: '100px',
        marginLeft: '20px',
        borderRadius: (theme) => theme.spacing(2),
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: currentThemeStyle.color,
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: currentThemeStyle.color,
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: currentThemeStyle.color,
        },
        '& .MuiSvgIcon-root': {
          color: currentThemeStyle.color,
        },
        height: '30px', // height of select box
        ...sx, //* to allow additional styles to be passed in
      }}
      MenuProps={{
        PaperProps: {
          sx: {
            borderRadius: (theme) => theme.spacing(2),
            backgroundColor: currentThemeStyle.marginColor,
            '& .MuiMenuItem-root': {
              fontSize: (theme) => theme.typography.button.fontSize,
              color: currentThemeStyle.color,
            },
          },
        },
      }}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  )
}

const CodeEditorToolbar = ({
  theme,
  language,
  setTheme,
  setLanguage,
  currentThemeStyle,
}) => {
  const languageOptions = [
    { value: 'python', label: 'Python' },
    // add more languages here
  ]

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
      </Toolbar>
    </AppBar>
  )
}

export default CodeEditorToolbar
