import React, { Suspense, lazy } from 'react'
import { Box, Container, Grid, Typography, Link } from '@mui/material'
import { styled, alpha } from '@mui/material/styles'

// Dynamic Imports for Social Icons to enable code splitting
const LinkedInIcon = lazy(() => import('@mui/icons-material/LinkedIn'))
const YouTubeIcon = lazy(() => import('@mui/icons-material/YouTube'))
const InstagramIcon = lazy(() => import('@mui/icons-material/Instagram'))

// Styled components
const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: 'transparent',
  padding: theme.spacing(2, 0), // Padding top and bottom
  marginTop: 'auto',
  borderTop: '2px solid #e0e0e0',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2, 0),
  },
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
  marginRight: theme.spacing(1),
  '& a': {
    '&:hover': {
      color: alpha(theme.palette.text.primary, 0.5),
      transition: 'color 0.2s ease',
    },
  },
}))

/**
 * Footer component displaying contact information and social media links.
 * Implements dynamic imports for social icons to optimize performance.
 *
 * @returns {JSX.Element} The rendered Footer component.
 */
const Footer = () => {
  return (
    <FooterContainer>
      <Container maxWidth="lg">
        <Grid container spacing={2} justifyContent="center">
          {/* Contact Us Section */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography
              variant="h6"
              gutterBottom
              align="left"
              sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}
            >
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

          {/* Social Media Section */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography
              variant="h6"
              gutterBottom
              align="left"
              sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}
            >
              Social
            </Typography>
            <Box display="flex" alignItems="center">
              {/* LinkedIn Icon */}
              <SocialIcon>
                <Suspense fallback={<div>Loading...</div>}>
                  <Link
                    href="https://www.linkedin.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    color="inherit"
                  >
                    <LinkedInIcon />
                  </Link>
                </Suspense>
              </SocialIcon>

              {/* YouTube Icon */}
              <SocialIcon>
                <Suspense fallback={<div>Loading...</div>}>
                  <Link
                    href="https://www.youtube.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    color="inherit"
                  >
                    <YouTubeIcon />
                  </Link>
                </Suspense>
              </SocialIcon>

              {/* Instagram Icon */}
              <SocialIcon>
                <Suspense fallback={<div>Loading...</div>}>
                  <Link
                    href="https://www.instagram.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    color="inherit"
                  >
                    <InstagramIcon />
                  </Link>
                </Suspense>
              </SocialIcon>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </FooterContainer>
  )
}

export default Footer
