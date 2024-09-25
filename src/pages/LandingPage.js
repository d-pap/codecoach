import React, { Suspense, lazy } from 'react'
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

// Dynamic Imports for Subcomponents
const HeroSection = lazy(() => import('../components/sub-components/landing-page/HeroSection'))
const FeatureCard = lazy(() => import('../components/sub-components/landing-page/FeatureCard'))

const HeaderSection = styled(AppBar)(({ theme }) => ({
  background: 'transparent',
  display: 'flex',
  justifyContent: 'space-between',
  boxShadow: 'none',
  color: theme.palette.text.primary,
}))

const HighlightedText = styled('span')(({ theme }) => ({
  backgroundColor: theme.palette.text.primary,
  color: theme.palette.common.white,
  padding: theme.spacing(0.5, 2),
  borderRadius: theme.spacing(5),
}))

const LandingPage = ({ onGetStarted }) => {
  return (
    <Box>
      <HeaderSection position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CodeCoach
          </Typography>
          <Button color="inherit" onClick={() => onGetStarted('signIn')}>
            Login
          </Button>
          <Button variant="contained" onClick={() => onGetStarted('signUp')}>
            Register
          </Button>
        </Toolbar>
      </HeaderSection>
      <Box sx={{ bgcolor: 'background.default', py: 6 }}>
        {/* Hero Section with Suspense */}
        <Suspense fallback={<div>Loading Hero Section...</div>}>
          <HeroSection onGetStarted={onGetStarted} />
        </Suspense>

        {/* Feature Section with Suspense */}
        <Container sx={{ mt: 8, mb: 8 }}>
          <Grid container spacing={4}>
            <Suspense fallback={<div>Loading Features...</div>}>
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
                    Write, run, and test your code directly in the browser with
                    our powerful compiler.
                  </Typography>
                </FeatureCard>
              </Grid>
              <Grid item xs={12} md={4}>
                <FeatureCard>
                  <Typography variant="h5" component="h3" gutterBottom>
                    Track Your Progress
                  </Typography>
                  <Typography>
                    Monitor your improvement and compare your solutions with
                    others in the community.
                  </Typography>
                </FeatureCard>
              </Grid>
            </Suspense>
          </Grid>
        </Container>
      </Box>
    </Box>
  )
}

export default LandingPage
