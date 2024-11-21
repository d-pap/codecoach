import React from 'react'
import { useCookies } from 'react-cookie'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import { styled, alpha } from '@mui/material/styles'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import YouTubeIcon from '@mui/icons-material/YouTube'
import InstagramIcon from '@mui/icons-material/Instagram'
import { useNavigate } from 'react-router-dom'
import logo from '../../images/logo-with-text.svg'

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: 'transparent',
  padding: theme.spacing(4, 0), // padding top and bottom=32px (4*8px=32), no padding on the sides
  marginTop: 'auto',
  borderTop: '2px solid #e0e0e0',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2, 0),
  },
  //backgroundImage: 'linear-gradient(to bottom, #eeeeee, #000)',
}))

const EmailLink = styled(Link)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
})

const SocialIcon = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  marginRight: theme.spacing(2),
  '& a': {
    color: 'inherit',
    '&:hover': {
      color: alpha(theme.palette.text.primary, 0.5),
      transition: 'color 0.2s ease',
    },
  },
}))

// Removed the invalid 'align' property
const PrivacyLink = styled(Link)(({ theme }) => ({
  color: 'inherit',
  textDecoration: 'none',
  cursor: 'pointer',
  '&:hover': {
    textDecoration: 'underline',
    color: alpha(theme.palette.text.primary, 0.5),
    transition: 'color 0.2s ease',
  },
}))

const Footer = () => {
  const navigate = useNavigate()

  const disableCookies = () => {
    // list all cookies
    const allCookies = document.cookie.split(';')

    // delete each cookie
    for (let cookie of allCookies) {
      const eqPos = cookie.indexOf('=')
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
    }
  }

  return (
    <Container>
      <Box
        sx={{
          border: (theme) => `1px solid ${theme.palette.text.primary}`,
          padding: (theme) => theme.spacing(4),
          marginBottom: (theme) => theme.spacing(4),
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <Box
              component="img"
              src={logo}
              alt="codecoach logo"
              sx={{
                width: '200px',
                height: 'auto',
                marginBottom: (theme) => theme.spacing(2),
              }}
            />
          </Grid>
          <Grid
            item
            xs={6}
            sx={{ marginTop: 'auto' }} //! to center horizontally
          >
            <Box
              sx={
                {
                  //paddingRight: (theme) => theme.spacing(8),
                }
              }
            >
              <Grid container spacing={8} justifyContent="center">
                <Grid item>
                  <Typography
                    variant="body2"
                    sx={{ marginBottom: (theme) => theme.spacing(2) }}
                  >
                    <Link href="/">Home</Link>
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ marginBottom: (theme) => theme.spacing(2) }}
                  >
                    <Link href="/help">Help</Link>
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ marginBottom: (theme) => theme.spacing(2) }}
                  >
                    <Link href="/problems/competitions">Competition</Link>
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ marginBottom: (theme) => theme.spacing(2) }}
                  >
                    <Link href="/problems/interviews">Interview</Link>
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant="body2"
                    sx={{ marginBottom: (theme) => theme.spacing(2) }}
                  >
                    <Link href="/courses">Courses</Link>
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ marginBottom: (theme) => theme.spacing(2) }}
                  >
                    <Link href="/resume">Resume</Link>
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Grid
        container
        spacing={2}
        sx={{ marginBottom: (theme) => theme.spacing(4) }}
      >
        <Grid item xs={12} md={6}>
          <Grid item>
            <Typography variant="body2">
              &copy; {new Date().getFullYear()} codecoach. All rights reserved.
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid
            container
            spacing={2}
            justifyContent={{ xs: 'flex-start', md: 'flex-end' }}
          >
            <Grid item>
              <Typography variant="body2">
                <Link href="/terms-of-service">Terms of Service</Link>
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2">
                <Link href="/cookie-info">Cookie Settings</Link>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Footer
