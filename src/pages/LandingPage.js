/**
 * TODO:
 * - //! connect sign up and login buttons to backend? doesnt work on netlify (bc of ProtectedRoute?)
 * - //! update the execution time for the compiler!!!!!
 * - // remove borders and box shadows around images on this and home pages??
 * - //! make container size responsive and have whitespace on left and right sides e.g., <Container maxWidth="lg">
 * - make the text in the hero section responsive (use vh? or other relative units?)
 * - make the text in the feature section responsive
 * - //! make image sizes and language logos responsive
 * - //! make boxes responsive

 * - fix spacing between text in sections (vertical spacing)
 * - make the text thinner in sections body text
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
import grad12 from '../images/Grad_12.png'
import pcImage from '../images/programming-category.png' //TODO: replace with better images --------------------------

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
// styling for header text in sections
const sectionHeaderStyles = {
  position: 'relative',
  zIndex: 2,
  fontWeight: 'bold',
  fontFamily: 'Helvetica, Arial, sans-serif',
  fontSize: { xs: '10vh', sm: '12vh', md: '15vh' },
}

// styling for the text in sections
const sectionTextStyles = {
  fontWeight: 'bold',
  fontSize: { xs: '0.6rem', sm: '0.8rem', md: '1rem' },
  mb: 4,
}

// component for section header text
const SectionHeaderText = ({ children }) => (
  <Typography variant="h1" component="h1" sx={sectionHeaderStyles}>
    {children}
  </Typography>
)

// component for section body text
const SectionBodyText = ({ children }) => (
  <Typography variant="h6" component="h3" gutterBottom sx={sectionTextStyles}>
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
        sx={{ textAlign: 'center', mb: 5, mt: -5, fontWeight: 'bold' }}
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
        margin: '50px 0',
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
            {/* //TODO: connect buttons to backend? doesnt work on netlify (bc of ProtectedRoute?) ------------------*/}
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
        height="80vh"
        overflow="hidden"
      >
        <Box
          // background for hero section
          position="relative"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          width="100%"
          height="100%"
          overflow="hidden"
          sx={{
            backgroundImage: `url(${grad12})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'bottom 30% left 10%',
          }}
        >
          {/* text in hero section */}
          <SectionHeaderText>Learn.</SectionHeaderText>
          <SectionHeaderText>Prepare.</SectionHeaderText>
          <SectionHeaderText>Win.</SectionHeaderText>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => onGetStarted('signUp')}
            sx={{
              mt: 4,
              mb: 2,
              py: 1.5,
              px: 4,
              fontSize: '1.1rem',
              fontWeight: 'bold',
              position: 'relative',
              zIndex: 2,
            }}
          >
            Get Started <DoubleArrowRoundedIcon sx={{ ml: 1 }} />
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
            {/* //TODO: change this text? ---------------------------------------------------------------------------*/}
            Your path to coding excellence begins here.
          </Typography>
        </Box>
      </Box>

      {/* features section */}
      {/* //TODO: make container size responsive and have whitespace on left and right sides -----------------------*/}
      <Box>
        <Box
          sx={{
            bgcolor: 'background.default',
            py: 0, //TODO: was 6 but change so it's visible on the landing page on all screen sizes -------------------
          }}
        >
          <Timeline number={1} title="Develop" />
          <SectionText
            title="Real-time Compiler"
            description={
              <>
                <SectionBodyText>Instant Feedback</SectionBodyText>
                <Typography variant="body1" sx={{ mb: 4 }}>
                  Get real-time results as soon as you run your code. No delays,
                  no waiting.
                </Typography>
                <SectionBodyText>Optimized for Performance</SectionBodyText>
                <Typography variant="body1" sx={{ mb: 4 }}>
                  Experience lightning-fast code execution.
                </Typography>
                <SectionBodyText>Cloud-Based Execution</SectionBodyText>
                <Typography variant="body1" sx={{ mb: 4 }}>
                  Your code runs in the cloud, meaning no local setup is needed.
                </Typography>
              </>
            }
            image={pcImage}
            imageAlt="Real-time Compiler"
          />
          <LanguageLogos />
          <Timeline number={2} title="Learn" />
          <SectionText
            title="AI Assistant"
            description={
              <>
                <SectionBodyText>Smart Problem Breakdown</SectionBodyText>
                <Typography variant="body1" sx={{ mb: 4 }}>
                  Get intelligent insights that dissect complex coding
                  challenges.
                </Typography>
                <SectionBodyText>Real-Time Code Review</SectionBodyText>
                <Typography variant="body1" sx={{ mb: 4 }}>
                  Write code and receive instant feedback.
                </Typography>
              </>
            }
            image={pcImage}
            imageAlt="AI Tutor"
          />
          <Timeline number={3} title="Connect" />
          <SectionText
            title="Community"
            description={
              <>
                <SectionBodyText>Collaborate with ACM Members</SectionBodyText>
                <Typography variant="body1" sx={{ mb: 4 }}>
                  Share your solutions and learn from peers.
                </Typography>
                <SectionBodyText>Exclusive ACM Resources</SectionBodyText>
                <Typography variant="body1" sx={{ mb: 4 }}>
                  Gain access to coding workshops and study groups.
                </Typography>
              </>
            }
            image={pcImage}
            imageAlt="Community"
          />

          {/* final call to action */}
          <Container>
            <Box sx={{ mb: { xs: 4, sm: 6, md: 8 } }}>
              <Box
                sx={{
                  mt: { xs: 4, sm: 6, md: 8 },
                  bgcolor: 'grey.100',
                  p: { xs: 3, sm: 4, md: 6 },
                  borderRadius: 4,
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <Typography variant="h5" gutterBottom>
                  Ready to Improve Your Coding Skills?
                </Typography>
                <Typography variant="body1" gutterBottom sx={{ mb: 4 }}>
                  Join CodeCoach today and get access to real-time feedback,
                  AI-driven problem solving, and a supportive community.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => onGetStarted('signUp')}
                  sx={{ px: 5, py: 2 }}
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
