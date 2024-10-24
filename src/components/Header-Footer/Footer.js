import React from 'react'
import { useCookies } from 'react-cookie'
import { Box, Container, Grid, Typography, Link, Tooltip } from '@mui/material'
import { styled, alpha } from '@mui/material/styles'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import YouTubeIcon from '@mui/icons-material/YouTube'
import InstagramIcon from '@mui/icons-material/Instagram'

// Styled Components

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: 'transparent',
  padding: theme.spacing(4, 0), // Increased padding for better spacing
  marginTop: 'auto',
  borderTop: '2px solid #e0e0e0',
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

// Footer Component

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
          {/* Contact Us Section */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography
              variant="h6"
              gutterBottom
              align="center"
              sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}
            >
              Contact Us
            </Typography>
            <Typography
              align="left"
              sx={{ fontSize: { xs: '1rem', sm: '1.125rem' }, marginBottom: 1 }}
            >
              General Inquiries:{' '}
              <EmailLink href="mailto:team@codecoach.com">
                team@codecoach.com
              </EmailLink>
            </Typography>
            <Typography
              align="left"
              sx={{ fontSize: { xs: '1rem', sm: '1.125rem' } }}
            >
              Support:{' '}
              <EmailLink href="mailto:support@codecoach.com">
                support@codecoach.com
              </EmailLink>
            </Typography>
          </Grid>

          {/* Social Section */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography
              variant="h6"
              gutterBottom
              align="center"
              sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}
            >
              Social
            </Typography>
            <Box display="flex" justifyContent="center">
              <SocialIcon>
                <Link
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon fontSize="large" />
                </Link>
              </SocialIcon>
              <SocialIcon>
                <Link
                  href="https://www.youtube.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                >
                  <YouTubeIcon fontSize="large" />
                </Link>
              </SocialIcon>
              <SocialIcon>
                <Link
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <InstagramIcon fontSize="large" />
                </Link>
              </SocialIcon>
            </Box>
          </Grid>

          {/* Privacy Section */}
          <Grid
            item
            xs={12}
            sm={12}
            md={4}
            sx={{ textAlign: 'center' }} // Added textAlign center here
          >
            <Typography
              variant="h6"
              gutterBottom
              align="center"
              sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}
            >
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
    </FooterContainer>
  )
}

export default Footer
