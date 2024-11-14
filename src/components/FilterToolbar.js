// src/components/FilterToolbar.jsx

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { styled, alpha } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import InputBase from '@mui/material/InputBase'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import SearchIcon from '@mui/icons-material/Search'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.spacing(2),
  backgroundColor: alpha(theme.palette.text.secondary, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.text.secondary, 0.25),
    transition: 'background-color 0.3s ease-in-out',
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
  color: theme.palette.text.primary,
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledSelect = styled(Select)(({ theme }) => ({
  height: '40px',
  minWidth: '150px',
  padding: '0 10px',
  borderRadius: theme.spacing(2),
  '&.hover': {
    color: theme.palette.text.primary,
  },
  '&.active': {
    color: theme.palette.text.primary,
  },
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}))

const FilterToolbar = ({ filters, searchQuery, onSearchChange }) => {
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery)

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSearchChange(localSearchQuery)
    }
  }

  const handleSearchInputChange = (event) => {
    setLocalSearchQuery(event.target.value)
  }

  const menuProps = {
    PaperProps: {
      style: {
        maxHeight: 300,
      },
    },
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {filters.map((filter) => (
              <StyledSelect
                key={filter.id}
                value={filter.value}
                onChange={filter.onChange}
                MenuProps={menuProps}
              >
                <MenuItem value="all">{filter.allLabel}</MenuItem>
                {filter.options?.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </StyledSelect>
            ))}
          </Box>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search..."
              inputProps={{ 'aria-label': 'search' }}
              value={localSearchQuery}
              onChange={handleSearchInputChange}
              onKeyDown={handleKeyPress}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

FilterToolbar.propTypes = {
  filters: PropTypes.array.isRequired,
  searchQuery: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
}

export default FilterToolbar
