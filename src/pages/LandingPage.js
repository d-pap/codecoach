/**
 * TODO:
 * - //! update the execution time for the compiler!!!!!
 * - change images in feature sections
 */
import React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import DoubleArrowRoundedIcon from '@mui/icons-material/DoubleArrowRounded'
import { styled } from '@mui/system'
import logo from '../images/logo-with-text.svg'
import rocket from '../images/rocket.svg'
import communityImg from '../images/resumeresources.svg'
import grad12webp from '../images/Grad_12.webp'
import compilerImgwebp from '../images/compiler.webp'
/********************************************************************************
 * styling for header nav bar
 ********************************************************************************/
const HeaderNavBar = styled(AppBar)(({ theme }) => ({
  background: 'transparent',
  display: 'flex',
  justifyContent: 'space-between',
  boxShadow: 'none',
  color: theme.palette.text.primary,
}))

/********************************************************************************
 * components for sections
 ********************************************************************************/
// styling for hero section text
const heroTextStyles = {
  position: 'relative',
  zIndex: 2,
  fontWeight: 'bold',
  fontFamily: 'Helvetica, Arial, sans-serif',
  fontSize: { xs: '10vh', sm: '10vh', md: '12vh', lg: '12vh', xl: '15vh' },
  lineHeight: { xs: '10vh', sm: '10vh', md: '12vh', lg: '12vh', xl: '15vh' },
}

// component for hero text
const HeroText = ({ children }) => (
  <Typography variant="h1" component="h1" sx={heroTextStyles}>
    {children}
  </Typography>
)

// component for section body text
const SectionContentHeaderText = ({ children }) => (
  <Typography
    variant="body1"
    component="h3"
    gutterBottom
    sx={{
      fontWeight: 'bold',
      fontSize: { xs: '0.889rem', sm: '0.889rem', md: '1rem' },
      letterSpacing: { xs: '0.01em', sm: '0.01em', md: '0.02em' },
    }}
  >
    {children}
  </Typography>
)

const SectionContentBodyText = ({ children }) => (
  <Typography
    variant="body2"
    component="p"
    sx={{
      fontSize: { xs: '0.79rem', sm: '0.79rem', md: '0.875rem' },
      mb: { xs: 2, sm: 2, md: 2 },
    }}
  >
    {children}
  </Typography>
)

// component for section image container
const SectionImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  paddingTop: '56.25%', //TODO: 16:9 (adjust if needed (56.25% for 16:9 or 66.6% for 4:3)) -----------------------------
  borderRadius: theme.spacing(2),
  overflow: 'hidden',
  boxShadow: 'none',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    minHeight: '200px', //TODO: resize container on smaller screens ------------------------------------------------
  },
}))

// component for section text and image
function SectionText({ title, description, image, imageAlt }) {
  return (
    <Container maxWidth="lg">
      <Typography
        variant="h4"
        component="h2"
        sx={{
          my: 2,
          fontWeight: 'bold',
          fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
          textAlign: 'center',
        }}
        //sx={{ textAlign: 'center', mb: 5, fontWeight: 'bold' }}
      >
        {title}
      </Typography>
      <Grid container spacing={0} alignItems="center">
        <Grid item xs={6} md={6}>
          {description}
        </Grid>
        <Grid item xs={6} md={6}>
          <SectionImageContainer>
            <Box
              component="img"
              src={image}
              alt={imageAlt}
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
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

/********************************************************************************
 * components for language logos in compiler section
 ********************************************************************************/
// component for sizing a single language logo
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

// component for all language logos
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
    {[
      {
        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
        alt: 'Python',
      },
      {
        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg',
        alt: 'Java',
      },
      {
        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg',
        alt: 'C++',
      },
      {
        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg',
        alt: 'C',
      },
      {
        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg',
        alt: 'Kotlin',
      },
    ].map((logo, index) => (
      <LanguageLogo
        key={index}
        src={logo.src}
        alt={logo.alt}
        size={{ xs: 30, sm: 30, md: 40 }}
      />
    ))}
  </Container>
)

/********************************************************************************
 * timeline component for the landing page sections
 ********************************************************************************/
const Timeline = ({ number, title }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mt: { xs: 4, md: 6, lg: 8 },
        //margin: '50px 0',
      }}
    >
      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        {/* vertical line */}
        <Box
          sx={{
            width: '2px',
            height: '100px',
            backgroundColor: '#d3d3d3',
          }}
        />
        {/* circle with number */}
        <Box
          sx={{
            width: '40px',
            height: '40px',
            background: 'linear-gradient(45deg, #0070f3, #ff4081)', //TODO: change color of this? -----------------------
            color: 'white',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '18px',
            fontWeight: 'bold',
          }}
        >
          {number}
        </Box>
      </Box>
      {/* title in timeline */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: 'bold',
          background: 'linear-gradient(90deg, #0070f3, #ff4081)', //TODO: change color of this? -----------------------
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textFillColor: 'transparent',
          marginTop: '10px',
          textAlign: 'center',
        }}
      >
        {title}
      </Typography>
    </Box>
  )
}

const LandingPage = ({ onGetStarted }) => {
  return (
    <>
      {/* landing page navbar */}
      <HeaderNavBar position="static">
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
      </HeaderNavBar>

      {/* hero section */}
      <Box
        // hero section box
        position="relative"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="70vh"
        height={{ xs: '70vh', md: '75vh', lg: '75vh', xl: '80vh' }}
        overflow="hidden"
        sx={{
          position: 'relative',
          zIndex: 1,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${grad12webp})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'bottom 30% left 10%',
            opacity: 0.7,
            zIndex: -1,
            '@media (max-width: 600px)': {
              backgroundSize: '200%',
              backgroundPosition: 'center 60%',
            },
          },
        }}
      >
        {/* text in hero section */}
        <HeroText>Learn.</HeroText>
        <HeroText>Prepare.</HeroText>
        <HeroText>Win.</HeroText>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => onGetStarted('signUp')}
          sx={{
            mt: 4,
            py: { xs: 1, md: 1.5 },
            px: { xs: 3, md: 4 },
            fontSize: { xs: '0.889rem', md: '1.125rem' },
            fontWeight: 'bold',
            position: 'relative',
            zIndex: 2,
          }}
        >
          Get Started <DoubleArrowRoundedIcon sx={{ ml: 1 }} />
        </Button>
        <Typography
          variant="body2"
          component="h2"
          color="text.primary"
          sx={{
            mt: { xs: 2, md: 4 },
            position: 'relative',
            zIndex: 2,
            fontSize: { xs: '0.8rem', md: '1.125rem', lg: '1.125rem' },
          }}
        >
          Your path to coding excellence begins here.
        </Typography>
      </Box>

      {/* features section */}
      <Box>
        <Box
          sx={{
            py: 0,
            px: { xs: 0, sm: 2, md: 2 }, //TODO: adjust this to bring the text in closer to the center of the page -------------------
          }}
        >
          <Timeline number={1} title="Develop" />
          <SectionText
            title="Real-time Compiler"
            description={
              <>
                <SectionContentHeaderText>
                  Instant Feedback
                </SectionContentHeaderText>
                <SectionContentBodyText>
                  Get real-time results as soon as you run your code. No delays,
                  no waiting.
                </SectionContentBodyText>
                <SectionContentHeaderText>
                  Optimized for Performance
                </SectionContentHeaderText>
                <SectionContentBodyText>
                  Experience lightning-fast code execution.
                </SectionContentBodyText>
                <SectionContentHeaderText>
                  Cloud-Based Execution
                </SectionContentHeaderText>
                <SectionContentBodyText>
                  Your code runs in the cloud, meaning no local setup is needed.
                </SectionContentBodyText>
              </>
            }
            image={compilerImgwebp}
            imageAlt="Real-time Compiler"
          />
          <LanguageLogos />
          <Timeline number={2} title="Learn" />
          <SectionText
            title="AI Assistant"
            description={
              <>
                <SectionContentHeaderText>
                  Smart Problem Breakdown
                </SectionContentHeaderText>
                <SectionContentBodyText>
                  Get intelligent insights that dissect complex coding
                  challenges.
                </SectionContentBodyText>
                <SectionContentHeaderText>
                  Real-Time Code Review
                </SectionContentHeaderText>
                <SectionContentBodyText>
                  Write code and receive instant feedback.
                </SectionContentBodyText>
              </>
            }
            image={rocket}
            imageAlt="AI Tutor"
          />
          <Timeline number={3} title="Connect" />
          <SectionText
            title="Community"
            description={
              <>
                <SectionContentHeaderText>
                  Collaborate with ACM Members
                </SectionContentHeaderText>
                <SectionContentBodyText>
                  Share your solutions and learn from peers.
                </SectionContentBodyText>
                <SectionContentHeaderText>
                  Exclusive ACM Resources
                </SectionContentHeaderText>
                <SectionContentBodyText>
                  Gain access to coding workshops and study groups.
                </SectionContentBodyText>
              </>
            }
            image={communityImg}
            imageAlt="Community"
          />

          {/* final call to action */}
          <Container>
            <Box sx={{ mb: { xs: 4, sm: 6, md: 8 } }}>
              <Box
                sx={{
                  mt: { xs: 4, sm: 6, md: 8 },
                  bgcolor: 'primary.light100',
                  p: { xs: 3, sm: 4, md: 6 },
                  borderRadius: 4,
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <Typography
                  variant="h3"
                  gutterBottom
                  sx={{
                    fontWeight: 'bold',
                    fontSize: { xs: '1rem', sm: '1rem', md: '1.226rem' },
                    letterSpacing: { xs: '0.01em', sm: '0.01em', md: '0.02em' },
                  }}
                >
                  Ready to Improve Your Coding Skills?
                </Typography>
                <Typography
                  variant="body1"
                  gutterBottom
                  sx={{
                    mb: 4,
                    fontSize: { xs: '0.79rem', sm: '0.889rem', md: '1rem' },
                  }}
                >
                  Join CodeCoach today and get access to real-time feedback,
                  AI-driven problem solving, and a supportive community.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => onGetStarted('signUp')}
                  sx={{
                    px: 5,
                    py: 2,
                    fontSize: { xs: '0.79rem', sm: '0.889rem', md: '1rem' },
                  }}
                >
                  Get Started <DoubleArrowRoundedIcon sx={{ ml: 1 }} />
                </Button>
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  )
}

export default LandingPage
