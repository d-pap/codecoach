import React from 'react'
import { NavLink as RouterLink } from 'react-router-dom'
import Navbar from './NavBar'
import { AppBar, Box, Toolbar, Typography } from '@mui/material'
import { styled } from '@mui/system'
//import Logo from './icons/CodeCoachLogo.png' // Import the logo

// Styled header section using MUI
// for the entire header section
const HeaderSection = styled(AppBar)(({ theme }) => ({
  background: 'transparent',
  display: 'flex',
  justifyContent: 'space-between',
  boxShadow: 'none',
  borderBottom: '2px solid #e0e0e0',
}))

// a box to wrap the title in the header
const TitleWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  textDecoration: 'none',
}))

// font styling for the project title in the header
const ProjectTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: 'none',
}))

// const LogoImage = styled('img')(({ theme }) => ({
//   height: 100, // Adjust the height as needed
//   marginRight: theme.spacing(2),
//   marginTop: theme.spacing(1)
// }));

const Header = () => {
  return (
    <HeaderSection position="static">
      <Toolbar sx={{ justifyContent: 'space-between', width: '100%' }}>
        <TitleWrapper
          component={RouterLink}
          to="/"
          sx={{ textDecoration: 'none' }}
        >
          <ProjectTitle variant="h6">CC</ProjectTitle>
        </TitleWrapper>
        <Box sx={{ marginLeft: 'auto' }}>
          <Navbar />
        </Box>
      </Toolbar>
    </HeaderSection>
  )
}

export default Header
