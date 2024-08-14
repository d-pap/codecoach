import React from 'react'
import {
  Box,
  Container,
  Typography,
  Link as MuiLink,
  Grid,
} from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import InstagramIcon from '@mui/icons-material/Instagram'
import { styled } from '@mui/system'

const FooterSection = styled(Box)(({ theme }) => ({
  width: '100%',
  backgroundColor: '#468585',
  padding: '30px 0', // reduced padding to make the footer less tall
  color: '#b6b6b6',
  marginTop: '20px', // add some space between bottom of page n top of footer
}))

const InformationText = styled(Typography)(({ theme }) => ({
  color: '#def9c4',
  marginBottom: theme.spacing(1), // reduced margin to save space
  fontSize: '1rem', // adjusted font size for better fit
}))

const CallText = styled(Typography)(({ theme }) => ({
  color: '#b6b6b6',
  marginBottom: theme.spacing(1), // tighter layout
  fontSize: '0.9rem', // smaller font
  '& a': {
    color: '#9cdba6',
    textDecoration: 'none',
    '&:hover': {
      color: '#878686',
    },
  },
}))

const SocialIcon = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  '& a': {
    color: '#9CDBA6',
    textDecoration: 'none',
    marginBottom: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.9rem', // smaller font size for social links
    '& svg': {
      fontSize: '1.2rem', // smaller icon size
      marginRight: theme.spacing(1),
    },
    '&:hover': {
      color: '#878686',
    },
  },
}))

const Footer = () => {
  return (
    <FooterSection>
      <Container>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <InformationText variant="h6">Contact Us</InformationText>
            <CallText>
              <MuiLink href="tel:+011234567890">+01 1234567890</MuiLink>
            </CallText>
            <CallText>
              <MuiLink href="tel:+019876543210">+01 9876543210</MuiLink>
            </CallText>
            <CallText>
              <MuiLink href="mailto:demo@gmail.com">demo@gmail.com</MuiLink>
            </CallText>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <SocialIcon>
              <MuiLink href="#">
                <FacebookIcon /> Facebook
              </MuiLink>
              <MuiLink href="#">
                <TwitterIcon /> Twitter
              </MuiLink>
              <MuiLink href="#">
                <LinkedInIcon /> LinkedIn
              </MuiLink>
              <MuiLink href="#">
                <InstagramIcon /> Instagram
              </MuiLink>
            </SocialIcon>
          </Grid>
        </Grid>
      </Container>
    </FooterSection>
  )
}

export default Footer
