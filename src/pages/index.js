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

// Styled components
const OnboardingCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: '#FFF3CD',
  color: '#856404',
}))

const RoadmapCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: '#FFF',
  color: '#333',
  textAlign: 'center',
}))

const StreakCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: '#FFF',
  color: '#333',
  textAlign: 'center',
}))

const SectionHeader = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}))

const Home = () => {
  return (
    <Container>
      <Box sx={{ marginTop: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <OnboardingCard elevation={3}>
              <Typography variant="h6">Not sure where to start?</Typography>
              <Typography variant="body1">
                You have not completed onboarding
              </Typography>
              <Button variant="contained" sx={{ marginTop: 2 }}>
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
                <Box>W</Box>
                <Box>T</Box>
                <Box>F</Box>
                <Box>S</Box>
                <Box>S</Box>
                <Box>M</Box>
                <Box>T</Box>
              </Box>
              <Link href="#" sx={{ marginTop: 2 }}>
                View Profile
              </Link>
            </StreakCard>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ marginTop: 4 }}>
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
            <Button variant="outlined">All Roadmaps</Button>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ marginTop: 4 }}>
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
