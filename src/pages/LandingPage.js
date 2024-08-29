import React from 'react'
import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  Toolbar,
  Typography,
} from '@mui/material'
import { styled } from '@mui/system'
import HeroBg from '../images/hero-bg.jpg'

const HeaderSection = styled(AppBar)(({ theme }) => ({
  background: 'transparent',
  display: 'flex',
  justifyContent: 'space-between',
  boxShadow: 'none',
  color: theme.palette.text.primary,
}))

const HeroSection = styled(Box)(({ theme }) => ({
  backgroundImage: `url(${HeroBg})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '60vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.primary,
  textAlign: 'center',
}))

const FeatureCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[3],
}))

const LandingPage = ({ onGetStarted }) => {
  return (
    <Box>
      <HeaderSection position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CodeCoach
          </Typography>
          <Button color="inherit" onClick={onGetStarted}>
            Login
          </Button>
          <Button variant="contained" onClick={onGetStarted}>
            Register
          </Button>
        </Toolbar>
      </HeaderSection>

      <HeroSection>
        <Container>
          <Typography variant="h2" component="h1" gutterBottom>
            Master Your Coding Skills
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            Prepare, Learn, and Excel with CodeCoach
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{ mt: 2 }}
            onClick={onGetStarted}
          >
            Get Started
          </Button>
        </Container>
      </HeroSection>

      <Container sx={{ mt: 8, mb: 8 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <FeatureCard>
              <Typography variant="h5" component="h3" gutterBottom>
                Diverse Problem Set
              </Typography>
              <Typography>
                Access a wide range of coding challenges across various
                difficulty levels and topics.
              </Typography>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureCard>
              <Typography variant="h5" component="h3" gutterBottom>
                Real-time Compiler
              </Typography>
              <Typography>
                Write, run, and test your code directly in the browser with our
                powerful compiler.
              </Typography>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureCard>
              <Typography variant="h5" component="h3" gutterBottom>
                Track Your Progress
              </Typography>
              <Typography>
                Monitor your improvement and compare your solutions with others
                in the community.
              </Typography>
            </FeatureCard>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default LandingPage
