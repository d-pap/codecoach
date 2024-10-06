import React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/system'
import logo from '../images/logo-with-text.svg'
import grad15 from '../images/Grad_15.png'
import grad16 from '../images/Grad_16.png'
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

const SectionImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  paddingTop: '75%', //TODO: 4:3 aspect ratio (adjust if needed, e.g., 56.25% for 16:9)
  borderRadius: theme.spacing(2),
  overflow: 'hidden',
  boxShadow: theme.shadows[3],
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    minHeight: '200px', // resize container on smaller screens
  },
}))

function SectionText({ title, description, image, imageAlt }) {
  return (
    <Container maxWidth="lg">
      <Typography
        variant="h3"
        component="h2"
        sx={{
          textAlign: 'center',
          mb: 5,
          mt: -5,
          fontWeight: 'bold',
        }}
      >
        {title}
      </Typography>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
          {description}
        </Grid>
        <Grid item xs={12} md={6}>
          <SectionImageContainer>
            <Box
              component="img"
              src={image}
              alt={imageAlt}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
          </SectionImageContainer>
        </Grid>
      </Grid>
    </Container>
  )
}

/**
 * language logo components for logos in compiler section
 */
const LanguageLogo = ({ src, alt, size }) => (
  <Box
    sx={{
      width: size,
      height: size,
      mx: { xs: 1, sm: 2, md: 5 },
    }}
  >
    <img src={src} alt={alt} style={{ width: '100%', height: '100%' }} />
  </Box>
)

const LanguageLogos = () => (
  <Container
    maxWidth="lg"
    sx={{
      py: 4,
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'nowrap',
      overflow: 'hidden',
    }}
  >
    <LanguageLogo
      src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg"
      alt="Python"
      size={{ xs: 50, sm: 80, md: 100 }}
    />
    <LanguageLogo
      src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg"
      alt="Java"
      size={{ xs: 50, sm: 80, md: 100 }}
    />

    <LanguageLogo
      src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg"
      alt="C++"
      size={{ xs: 50, sm: 80, md: 100 }}
    />
    <LanguageLogo
      src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg"
      alt="C"
      size={{ xs: 50, sm: 80, md: 100 }}
    />
    <LanguageLogo
      src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg"
      alt="Kotlin"
      size={{ xs: 50, sm: 80, md: 100 }}
    />
  </Container>
)

/**
 * timeline component for the landing page sections
 */
const Timeline = ({ number, title }) => {
  return (
    <TimelineSection>
      <TimelineLineComponent>
        <TimelineLine />
        <TimelineCircle>{number}</TimelineCircle>
      </TimelineLineComponent>
      <TimelineTitle>{title}</TimelineTitle>
    </TimelineSection>
  )
}

// styling for the timeline component
const TimelineSection = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '50px 0', // gap between section botton and top of line
})

const TimelineLineComponent = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})

const TimelineCircle = styled('div')({
  width: '40px',
  height: '40px',
  background: 'linear-gradient(45deg, #0070f3, #ff4081)',
  color: 'white',
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '18px',
  fontWeight: 'bold',
})

const TimelineLine = styled('div')({
  width: '2px',
  height: '100px',
  backgroundColor: '#d3d3d3',
})

const TimelineTitle = styled('h2')({
  fontSize: '24px',
  background: 'linear-gradient(90deg, #0070f3, #ff4081)', // define the gradient
  WebkitBackgroundClip: 'text', // clip the background to the text
  WebkitTextFillColor: 'transparent', // make sure the text itself is transparent
  backgroundClip: 'text', // ensure compatibility for non-Webkit browsers
  textFillColor: 'transparent', // ensure compatibility for non-Webkit browsers
  marginTop: '20px',
  textAlign: 'center',
})

const LandingPage = ({ onGetStarted }) => {
  return (
    <>
      {/* landing page header */}
      <HeaderSection position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box
            component="img"
            src={logo}
            alt="CodeCoach Logo"
            sx={{
              height: '100%',
              maxHeight: '60px',
              width: 'auto',
              maxWidth: '100%',
              cursor: 'pointer',
            }}
          />
          <Box>
            <Button color="inherit" onClick={() => onGetStarted('signIn')}>
              Login
            </Button>
            <Button variant="contained" onClick={() => onGetStarted('signUp')}>
              Register
            </Button>
          </Box>
        </Toolbar>
      </HeaderSection>

      {/* hero section */}
      <Box
        // hero section box
        position="relative"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="80vh"
        overflow="hidden"
      >
        {/* background box for top of page */}
        <Box
          position="relative"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          width="100%"
          height="100%"
          overflow="hidden"
          sx={{
            backgroundImage: `url(${grad15})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* text in box */}
          <Typography
            variant="h1"
            component="h1"
            fontWeight="bold" // TODO: change font ?
            fontFamily="Helvetica, Arial, sans-serif"
            color="text.primary"
            sx={{
              position: 'relative',
              zIndex: 2,
            }}
          >
            Learn.
          </Typography>
          <Typography
            variant="h1"
            component="h1"
            fontWeight="bold" // TODO: change font ?
            fontFamily="Helvetica, Arial, sans-serif"
            color="text.primary"
            sx={{
              position: 'relative',
              zIndex: 2,
            }}
          >
            Prepare.
          </Typography>
          <Typography
            variant="h1"
            component="h1"
            fontWeight="bold" // TODO: change font ?
            fontFamily="Helvetica, Arial, sans-serif"
            color="text.primary"
            sx={{
              position: 'relative',
              zIndex: 2,
            }}
          >
            Win.
          </Typography>
          <Button
            variant="contained"
            color="secondary" //TODO: change color of this
            size="large"
            onClick={() => onGetStarted('signUp')}
            sx={{
              mt: 4,
              py: 1.5,
              px: 4,
              fontSize: '1.1rem',
              fontWeight: 'bold',
              position: 'relative',
              zIndex: 2,
            }}
          >
            Get Started
          </Button>
          <Typography
            variant="h6"
            component="h2"
            color="text.primary"
            sx={{
              mt: 2,
              position: 'relative',
              zIndex: 2,
            }}
          >
            CodeCoach is a platform for competitive programming.
          </Typography>
        </Box>
      </Box>

      {/* features section */}
      <Box>
        <Box sx={{ bgcolor: 'background.default', py: 6 }}>
          <Timeline number={1} title="Develop" />
          <SectionText
            title="Real-time Compiler"
            description={
              <>
                <Typography
                  variant="h6"
                  component="h3"
                  gutterBottom
                  sx={{ fontWeight: 'bold' }}
                >
                  Instant Feedback
                </Typography>
                <Typography
                  variant="body1"
                  component="p"
                  gutterBottom
                  sx={{ mb: 4 }}
                >
                  Get real-time results as soon as you run your code. No delays,
                  no waiting—see the output of your work immediately.
                </Typography>
                <Typography
                  variant="h6"
                  component="h3"
                  gutterBottom
                  sx={{ fontWeight: 'bold' }}
                >
                  Optimized for Performance
                </Typography>
                <Typography
                  variant="body1"
                  component="p"
                  gutterBottom
                  sx={{ mb: 4 }}
                >
                  Experience lightning-fast code execution, powered by a highly
                  efficient backend, ensuring that your code runs smoothly
                  without hiccups.
                </Typography>
                <Typography
                  variant="h6"
                  component="h3"
                  gutterBottom
                  sx={{ fontWeight: 'bold' }}
                >
                  Cloud-Based Execution
                </Typography>
                <Typography
                  variant="body1"
                  component="p"
                  gutterBottom
                  sx={{ mb: 4 }}
                >
                  Your code runs in the cloud, meaning no local setup or
                  configuration. Access your projects from anywhere and keep
                  coding on the go.
                </Typography>
              </>
            }
            image={grad16}
            imageAlt="Real-time Compiler"
          />
          <LanguageLogos />
          <Timeline number={2} title="Learn" />
          <SectionText
            title="AI Assistant"
            description={
              <>
                <Typography
                  variant="h6"
                  component="h3"
                  gutterBottom
                  sx={{ fontWeight: 'bold' }}
                >
                  Smart Problem Breakdown
                </Typography>
                <Typography
                  variant="body1"
                  component="p"
                  gutterBottom
                  sx={{ mb: 4 }}
                >
                  Get intelligent insights that dissect complex coding
                  challenges into manageable steps. No more struggling in
                  silence—our assistant helps you tackle each problem with
                  clarity.
                </Typography>
                <Typography
                  variant="h6"
                  component="h3"
                  gutterBottom
                  sx={{ fontWeight: 'bold' }}
                >
                  Real-Time Code Review
                </Typography>
                <Typography
                  variant="body1"
                  component="p"
                  gutterBottom
                  sx={{ mb: 4 }}
                >
                  Write code, and receive instant feedback on best practices and
                  potential improvements. Get suggestions as you go, helping you
                  sharpen your skills with every keystroke.
                </Typography>
              </>
            }
            image={grad16}
            imageAlt="AI Tutor"
          />
          <Timeline number={3} title="Connect" />
          <SectionText
            title="Community"
            description={
              <>
                <Typography
                  variant="h6"
                  component="h3"
                  gutterBottom
                  sx={{ fontWeight: 'bold' }}
                >
                  Collaborate with ACM Members
                </Typography>
                <Typography
                  variant="body1"
                  component="p"
                  gutterBottom
                  sx={{ mb: 4 }}
                >
                  Share your solutions and learn from your peers in a supportive
                  environment.
                </Typography>
                <Typography
                  variant="h6"
                  component="h3"
                  gutterBottom
                  sx={{ fontWeight: 'bold' }}
                >
                  Exclusive ACM Resources
                </Typography>
                <Typography
                  variant="body1"
                  component="p"
                  gutterBottom
                  sx={{ mb: 4 }}
                >
                  Gain access to a wealth of resources, from study groups to
                  coding workshops, designed to help you stay ahead in the
                  ever-evolving tech world.
                </Typography>
              </>
            }
            image={grad16}
            imageAlt="Community"
          />

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
    </>
  )
}

export default LandingPage
