import React, { Suspense, lazy } from 'react'
import { Box, Container, Typography, Button, Grid } from '@mui/material'
import { styled } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import CenteredCircleLoader from '../components/utility/CenteredLoader'

// Lazy-loaded components
const OnboardingSection = lazy(
  () => import('../components/sub-components/index/OnboardingSection')
)
const StreakSection = lazy(
  () => import('../components/sub-components/index/StreakSection')
)
const RoadmapsSection = lazy(
  () => import('../components/sub-components/index/RoadmapsSection')
)
const ManageBookmarksSection = lazy(
  () => import('../components/sub-components/index/ManageBookmarksSection')
)
const ExploreBlogsSection = lazy(
  () => import('../components/sub-components/index/ExploreBlogsSection')
)

// Styled components
const SectionHeader = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}))

const Home = () => {
  const navigate = useNavigate()

  return (
    <Container>
      <Suspense fallback={<CenteredCircleLoader />}>
        <Box sx={{ pt: 4 }}>
          {/* Onboarding and Streak sections */}
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <OnboardingSection navigate={navigate} />
            </Grid>
            <Grid item xs={12} md={6}>
              <StreakSection />
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
              <RoadmapsSection />
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
                variant="outlined"
                onClick={() => navigate('/problems/icpc')} // Redirect to problems page
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
              <ManageBookmarksSection />
            </Grid>
            <Grid item xs={12} md={6}>
              <ExploreBlogsSection />
            </Grid>
          </Grid>
        </Box>
      </Suspense>
    </Container>
  )
}

export default Home
