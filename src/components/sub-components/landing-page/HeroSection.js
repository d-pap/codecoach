import React from 'react'
import { Container, Box, Typography, Button } from '@mui/material'
import { styled } from '@mui/system'
import Trophy from '../../../images/icpc-trophy.png'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'

const HighlightedText = styled('span')(({ theme }) => ({
  backgroundColor: theme.palette.text.primary,
  color: theme.palette.common.white,
  padding: theme.spacing(0.5, 2),
  borderRadius: theme.spacing(5),
}))

const ImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '50%',
  height: '350px',
  padding: theme.spacing(2),
  background: 'radial-gradient(circle, #6C63FF, #fffffe)',
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  overflow: 'unset',
}))

const HeroSection = ({ onGetStarted }) => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 'auto',
        padding: (theme) => theme.spacing(4),
        py: 8,
      }}
    >
      {/* Left Side with Text */}
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
        <Button variant="contained" size="large" onClick={onGetStarted}>
          Get started for free <KeyboardDoubleArrowRightIcon sx={{ ml: 1 }} />
        </Button>
      </Box>

      {/* Right Side with Image */}
      <ImageContainer>
        <Box
          component="img"
          src={Trophy}
          alt="Trophy"
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

export default HeroSection
