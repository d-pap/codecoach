import React from 'react'
import { NavLink as RouterLink } from 'react-router-dom'
import Navbar from './NavBar'
import { AppBar, Box, Toolbar, Typography } from '@mui/material'
import { styled } from '@mui/system'
//import Logo from './icons/CodeCoachLogo.png' // Import the logo

// Styled header section using MUI
// for the entire header section
const HeaderSection = styled(AppBar)(({ theme }) => ({
  //background: '#468585',
  //background: '#A2AAAD',
  //background: '#1f1f1f',
  background: 'transparent',
  display: 'flex',
  justifyContent: 'space-between',
  //boxShadow: '4px 4px 4px rgba(0, 0, 0, 0.25)',
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
  fontFamily: 'Teko',
  fontWeight: 'bold',
  //textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
  textAlign: 'left',
  fontSize: '2rem',
  color: '#000000', //! color if background is white or transparent
  //color: '#def9c4',
  marginLeft: theme.spacing(2), // Add some space between the logo and title
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
          <ProjectTitle variant="h1">CC</ProjectTitle>
        </TitleWrapper>
        <Box sx={{ marginLeft: 'auto' }}>
          <Navbar />
        </Box>
      </Toolbar>
    </HeaderSection>
  )
}

export default Header
