import React from 'react'
import { NavLink as RouterLink } from 'react-router-dom'
import Navbar from './NavBar'
import { AppBar, Box, Toolbar, Typography } from '@mui/material'
import { styled } from '@mui/system'
//import Logo from './icons/CodeCoachLogo.png' // Import the logo

// Styled header section using MUI
const HeaderSection = styled(AppBar)(({ theme }) => ({
  background: '#468585',
  display: 'flex',
  justifyContent: 'space-between',
}))

const TitleWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  textDecoration: 'none',
}))

const ProjectTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
  textAlign: 'left',
  fontSize: '2rem',
  color: '#def9c4',
  marginLeft: theme.spacing(2), // Add some space between the logo and title
  textDecoration: 'none',
  fontFamily: 'Inter, sans-serif',
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
          <ProjectTitle variant="h1">Code Coach</ProjectTitle>
        </TitleWrapper>
        <Box sx={{ marginLeft: 'auto' }}>
          <Navbar />
        </Box>
      </Toolbar>
    </HeaderSection>
  )
}

export default Header
