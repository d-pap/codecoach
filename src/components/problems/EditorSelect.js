// EditorSelect.js
import React from 'react'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

// Component to render language and theme dropdowns
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
        height: '30px', // Height of select box
        ...sx, // Allow additional styles to be passed in
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

export default EditorSelect
