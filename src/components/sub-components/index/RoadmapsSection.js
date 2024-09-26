import React from 'react'
import { Paper, Typography } from '@mui/material'
import { styled } from '@mui/system'
// Styled component for RoadmapCard
const RoadmapCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  textAlign: 'center',
}))
const RoadmapsSection = () => {
  return (
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
  )
}
export default RoadmapsSection