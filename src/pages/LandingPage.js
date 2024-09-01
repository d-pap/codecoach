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
import Trophy from '../images/icpc-trophy.png'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'

const HeaderSection = styled(AppBar)(({ theme }) => ({
  background: 'transparent',
  display: 'flex',
  justifyContent: 'space-between',
  boxShadow: 'none',
  color: theme.palette.text.primary,
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

const HighlightedText = styled('span')(({ theme }) => ({
  backgroundColor: theme.palette.text.primary,
  color: theme.palette.common.white,
  padding: theme.spacing(0.5, 2), // padding around the text
  borderRadius: theme.spacing(5),
}))

const ImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative', // positioning for the image inside
  width: '50%',
  height: '350px',
  padding: theme.spacing(2),
  background: 'radial-gradient(circle, #6C63FF, #fffffe)',
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // optional shadow for 3D effect
  overflow: 'unset', // allows the image to overflow the container
}))

function HeroSection({ onGetStarted }) {
  return (
    <Container
      maxWidth="lg"
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' }, // stack on mobile
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 'auto',
        padding: (theme) => theme.spacing(4),
        py: 8,
      }}
    >
      {/* left side with text */}
      <Box
        sx={{
          width: '40%',
          textAlign: { xs: 'center', md: 'left' },
          mb: { xs: 3, md: 0 },
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            lineHeight: 1.2,
          }}
        >
          Where Coders become <HighlightedText>Champions</HighlightedText>
        </Typography>
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          sx={{
            color: 'text.secondary',
            mb: 3,
          }}
        >
          Experience the next level of competitive programming preparation with
          CodeCoach
        </Typography>
        <Button variant="contained" size="large" onClick={onGetStarted} sx={{}}>
          Get started for free <KeyboardDoubleArrowRightIcon sx={{ ml: 1 }} />
        </Button>
      </Box>

      {/* right side with image */}
      <ImageContainer>
        <Box
          component="img"
          src={Trophy}
          alt="AI Robot"
          sx={{
            position: 'absolute',
            bottom: 0,
            zIndex: 1,
            width: { xs: '400px', md: '700px', lg: '800px' },
            height: 'auto',
          }}
        />
      </ImageContainer>
    </Container>
  )
}

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
        {/* hero section */}
        <HeroSection onGetStarted={onGetStarted} />

        {/* feature section */}
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
          </Grid>
        </Container>
      </Box>
    </Box>
  )
}

export default LandingPage
