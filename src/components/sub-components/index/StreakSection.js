import React from 'react'
import { Paper, Typography, Box, Link } from '@mui/material'
import { styled } from '@mui/system'
// Styled component for StreakCard
const StreakCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  textAlign: 'center',
}))
const StreakSection = () => {
  return (
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
  )
}
export default StreakSection