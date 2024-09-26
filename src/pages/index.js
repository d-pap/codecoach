import React, { Suspense, lazy } from 'react'
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

const OnboardingSection = lazy(() => import('../components/sub-components/index/OnboardingSection'))
const StreakSection = lazy(() => import('../components/sub-components/index/StreakSection'))
const RoadmapsSection = lazy(() => import('../components/sub-components/index/RoadmapsSection'))
const ManageBookmarksSection = lazy(() => import('../components/sub-components/index/ManageBookmarksSection'))
const ExploreBlogsSection = lazy(() => import('../components/sub-components/index/ExploreBlogsSection'))

// Styled components
const SectionHeader = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}))

const Home = () => {
  const navigate = useNavigate()

  return (
    <Container>
      <Box sx={{ pt: 4 }}>
        {/* Onboarding and Streak sections with Suspense */}
        <Grid container spacing={4}>
        <Suspense fallback={<div>Loading Onboarding...</div>}>
            <Grid item xs={12} md={6}>
              <OnboardingSection navigate={navigate} />
            </Grid>
          </Suspense>
          <Suspense fallback={<div>Loading Streak...</div>}>
            <Grid item xs={12} md={6}>
              <StreakSection />
            </Grid>
          </Suspense>
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
        <Suspense fallback={<div>Loading Roadmaps...</div>}>
            <Grid item xs={12} md={6}>
              <RoadmapsSection />
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
                variant="outlined"
                onClick={() => navigate('/problems')} // redirect to problems page
              >
                All Roadmaps
              </Button>
            </Grid>
          </Suspense>
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
          <Suspense fallback={<div>Loading Bookmarks...</div>}>
            <Grid item xs={12} md={6}>
              <ManageBookmarksSection />
            </Grid>
          </Suspense>
          <Suspense fallback={<div>Loading Blogs...</div>}>
            <Grid item xs={12} md={6}>
              <ExploreBlogsSection />
            </Grid>
          </Suspense>
        </Grid>
      </Box>
    </Container>
  )
}

export default Home
