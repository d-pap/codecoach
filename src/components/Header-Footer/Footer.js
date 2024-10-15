import React from 'react'
import { Box, Container, Grid, Typography, Link } from '@mui/material'
import { styled, alpha } from '@mui/material/styles'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import YouTubeIcon from '@mui/icons-material/YouTube'
import InstagramIcon from '@mui/icons-material/Instagram'

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: 'transparent',
  padding: theme.spacing(2, 0), // padding top and bottom=32px (4*8px=32), no padding on the sides
  marginTop: 'auto',
  borderTop: '2px solid #e0e0e0',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2, 0),
  },
}))

const EmailLink = styled(Link)({
  //color: '#9cdba6',
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

const Footer = () => {
  return (
    <FooterContainer>
      <Container maxWidth="lg">
        <Grid container spacing={2} justifyContent="center">
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
              <SocialIcon>
                <Link
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
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
                  color="inherit"
                >
                  <InstagramIcon />
                </Link>
              </SocialIcon>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </FooterContainer>
  )
}

export default Footer
