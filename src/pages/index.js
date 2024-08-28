import React from 'react'
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  Link,
} from '@mui/material'
import { styled } from '@mui/system'
import { useNavigate } from 'react-router-dom'

// Styled components
const OnboardingCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.caution.bg,
  color: theme.palette.caution.main,
}))

const RoadmapCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  textAlign: 'center',
}))

const StreakCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  textAlign: 'center',
}))

const SectionHeader = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}))

const Home = () => {
  const navigate = useNavigate()

  return (
    <Container>
      <Box
        //* Onboarding section
        sx={{
          marginTop: 6,
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <OnboardingCard elevation={3}>
              <Typography variant="h6">Not sure where to start?</Typography>
              <Typography variant="body1">
                You have not completed onboarding
              </Typography>
              <Button
                variant="contained"
                onClick={() => navigate('/problems')} // redirect to problems page
                sx={{ marginTop: 2 }}
              >
                Get Started
              </Button>
            </OnboardingCard>
          </Grid>
          <Grid item xs={12} md={6}>
            <StreakCard elevation={3}>
              <Typography variant="h6">Daily Streak</Typography>
              <Typography variant="body2">CURRENT 0 days</Typography>
              <Typography variant="body2">LONGEST 0 days</Typography>
              <Typography variant="body2">FREEZES 0 left</Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: 2,
                }}
              >
                <Box>S</Box>
                <Box>M</Box>
                <Box>T</Box>
                <Box>W</Box>
                <Box>T</Box>
                <Box>F</Box>
                <Box>S</Box>
              </Box>
              <Link href="#" sx={{ marginTop: 2 }}>
                View Profile
              </Link>
            </StreakCard>
          </Grid>
        </Grid>
      </Box>

      <Box
        //* Roadmaps section
        sx={{
          marginTop: 4,
        }}
      >
        <SectionHeader variant="h5">Roadmaps for you</SectionHeader>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <RoadmapCard elevation={3}>
              <Typography variant="h6">Python with Beginner DSA</Typography>
              <Typography variant="body2">
                977 Problems • 400k+ learners
              </Typography>
              <Typography variant="body2">
                Learn the basics of Python and data structures. Use practice
                modules to boost your coding and logic skills.
              </Typography>
            </RoadmapCard>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              variant="outlined"
              onClick={() => navigate('/problems')} // redirect to problems page
            >
              All Roadmaps
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Box
        //* Manage Bookmarks and Explore Blogs section
        sx={{
          paddingBottom: 4,
          marginTop: 4,
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ padding: 3 }}>
              <Typography variant="h6">Manage Bookmarks</Typography>
              <Typography variant="body2">
                You have not bookmarked any problem yet.
              </Typography>
              <Link href="#" sx={{ marginTop: 2 }}>
                Know more
              </Link>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ padding: 3 }}>
              <Typography variant="h6">Explore Our Blogs Today</Typography>
              <Typography variant="body2">
                Read blogs about various topics in programming. Get expert
                guidance from CodeChef on coding.
              </Typography>
              <Link href="#" sx={{ marginTop: 2 }}>
                View all
              </Link>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default Home
