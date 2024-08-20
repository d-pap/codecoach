import React from 'react'
import { Box, Container, Grid, Typography, Link } from '@mui/material'
import { styled } from '@mui/material/styles'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import YouTubeIcon from '@mui/icons-material/YouTube'
import InstagramIcon from '@mui/icons-material/Instagram'

const FooterContainer = styled(Box)(({ theme }) => ({
  //backgroundColor: '#468585',
  //backgroundColor: '#1f1f1f',
  backgroundColor: 'transparent',
  color: theme.palette.primary.contrastText, // right now, this is using MUI's default theme styles. so this would be white
  padding: theme.spacing(4, 0), // padding top and bottom=32px (4*8px=32), no padding on the sides
  marginTop: 'auto',
  borderTop: '2px solid #e0e0e0',
}))

const FooterTypography = styled(Typography)({
  marginBottom: '0.5rem',
  color: '#1f1f1f',
  fontFamily: 'Ubuntu', //! font
})

const EmailLink = styled(Link)({
  //color: '#9cdba6',
  color: '#1f1f1f',
  fontFamily: 'Ubuntu', //! font
  textDecoration: 'none',
  '&:hover': {
    color: '#878686',
    transition: 'color 0.3s ease',
  },
})

const SocialIcon = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  marginRight: theme.spacing(1),
  '& a': {
    //color: '#9CDBA6',
    color: '#1f1f1f',
    '&:hover': {
      color: '#878686',
      transition: 'color 0.3s ease',
    },
  },
}))

const Footer = () => {
  return (
    <FooterContainer>
      <Container maxWidth="lg">
        <Grid container spacing={12} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <FooterTypography variant="h6" gutterBottom align="left">
              Contact Us
            </FooterTypography>
            <FooterTypography
              align="left"
              sx={{ fontFamily: 'Ubuntu' }} //! font
            >
              General Inquiries:{' '}
              <EmailLink href="mailto:team@codecoach.com">
                team@codecoach.com
              </EmailLink>
            </FooterTypography>
            <FooterTypography
              align="left"
              sx={{ fontFamily: 'Ubuntu' }} //! font
            >
              Support:{' '}
              <EmailLink href="mailto:support@codecoach.com">
                support@codecoach.com
              </EmailLink>
            </FooterTypography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FooterTypography variant="h6" gutterBottom align="left">
              Social
            </FooterTypography>
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
