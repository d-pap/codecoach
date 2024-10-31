import React from 'react'
import { useCookies } from 'react-cookie'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import Tooltip from '@mui/material/Tooltip'
import { styled, alpha } from '@mui/material/styles'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import YouTubeIcon from '@mui/icons-material/YouTube'
import InstagramIcon from '@mui/icons-material/Instagram'
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
    <FooterContainer>
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography
              align="left"
              sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
            >
              General Inquiries:{' '}
              <EmailLink href="mailto:team@codecoach.com">
                team@codecoach.com
              </EmailLink>
            </Typography>
            <Typography
              align="left"
              sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
            >
              Support:{' '}
              <EmailLink href="mailto:support@codecoach.com">
                support@codecoach.com
              </EmailLink>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>
              Social
            </Typography>
            <Box display="flex" alignItems="center">
              <SocialIcon>
                <Link
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  color="inherit"
                >
                  <LinkedInIcon />
                </Link>
              </SocialIcon>
              <SocialIcon>
                <Link
                  href="https://www.youtube.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  color="inherit"
                >
                  <YouTubeIcon />
                </Link>
              </SocialIcon>
              <SocialIcon>
                <Link
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  color="inherit"
                >
                  <InstagramIcon />
                </Link>
              </SocialIcon>
            </Box>
          </Grid>
          {/* Privacy Section */}
          <Grid item xs={12} sm={12} md={4}>
            <Typography variant="h6" gutterBottom align="left">
              Privacy
            </Typography>
            <Tooltip
              title="We use cookies to store personal settings and preferences. We do not collect personal data for marketing or profit."
              placement="top"
              arrow
              enterDelay={500}
            >
              <PrivacyLink onClick={disableCookies}>
                Disable Cookies
              </PrivacyLink>
            </Tooltip>
          </Grid>
        </Grid>
      </Container>
      <Box display="flex" justifyContent="center" alignItems="center">
        <img src={logo} alt="CodeCoach Logo" width="50%" />
      </Box>
    </FooterContainer>
  )
}

export default Footer
