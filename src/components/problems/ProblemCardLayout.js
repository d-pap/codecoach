import React, { Suspense, lazy } from 'react'
import styled from '@mui/material/styles/styled'
import { useNavigate } from 'react-router-dom'

import {
  Card,
  CardContent,
  Typography,
  Box,
  Container,
  Grid,
  Stack,
  Skeleton,
} from '@mui/material'

/* // Dynamically import MUI components to optimize bundle size
const Card = lazy(() => import('@mui/material/Card'))
const CardContent = lazy(() => import('@mui/material/CardContent'))
const Typography = lazy(() => import('@mui/material/Typography'))
const Box = lazy(() => import('@mui/material/Box'))
const Container = lazy(() => import('@mui/material/Container'))
const Grid = lazy(() => import('@mui/material/Grid'))
const Stack = lazy(() => import('@mui/material/Stack'))
const Skeleton = lazy(() => import('@mui/material/Skeleton')) */

// Styled components using MUI's styled utility
const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  cursor: 'pointer',
  borderRadius: theme.spacing(2),
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[8],
  },
}))

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
}))

const CardTitle = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}))

const CardBody = styled(Typography)(({ theme }) => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  whiteSpace: 'normal',
  paddingLeft: theme.spacing(0),
}))

const ProblemCardSkeleton = () => (
  <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
    <Container maxWidth="lg">
      <Grid
        container
        spacing={0}
        sx={{
          display: 'flex',
          flexWrap: 'nowrap',
          boxShadow:
            '0px 4px 5px -2px rgba(0, 0, 0, 0.2), 4px 0px 5px -2px rgba(0, 0, 0, 0.2), -4px 0px 5px -2px rgba(0, 0, 0, 0.2)',
          borderRadius: (theme) => theme.spacing(2),
        }}
      >
        <Box sx={{ flexGrow: 1, padding: (theme) => theme.spacing(2) }}>
          <Box sx={{ display: 'flex', justifyContent: 'right' }}>
            <Skeleton variant="text" width={150} sx={{ fontSize: '2rem' }} />
          </Box>
          <Stack spacing={2}>
            {[...Array(5)].map((_, index) => (
              <Skeleton
                key={index}
                variant="rectangular"
                height={120}
                sx={{ borderRadius: 1 }}
              />
            ))}
          </Stack>
          <Box sx={{ p: 1, display: 'flex', justifyContent: 'right' }}>
            <Skeleton
              variant="rectangular"
              width={150}
              height={40}
              sx={{ mt: 2 }}
            />
          </Box>
        </Box>
      </Grid>
    </Container>
  </Box>
)

// ProblemCardLayout component
const ProblemCardLayout = ({ problem }) => {
  const navigate = useNavigate() // Initialize the useNavigate hook
  const path = `/problems/${problem._id}` // Set the path to the problem details

  // Handle navigation to the problem details page
  const handleNavigate = () => {
    navigate(path, { state: { problem } })
  }

  return (
    // Suspense wraps dynamically imported components
    <Suspense fallback={<ProblemCardSkeleton />}>
      <div
        //* Container for each problem card
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <StyledCard
          onClick={handleNavigate} // Navigate to the problem details on card click
          variant="outlined"
        >
          <StyledCardContent>
            {/* Contest Information */}
            <Typography variant="overline" color="textSecondary">
              {problem.contestYear} {problem.contestRegion}
            </Typography>
            {/* Problem Title */}
            <CardTitle variant="h5" gutterBottom>
              {problem.title}
            </CardTitle>
            {/* Problem Description */}
            <CardBody variant="body1">{problem.description}</CardBody>
          </StyledCardContent>
        </StyledCard>
      </div>
    </Suspense>
  )
}

export default ProblemCardLayout
