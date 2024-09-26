import React from 'react'
import { Paper, Typography, Button } from '@mui/material'
import { styled } from '@mui/system'
// Styled component for OnboardingCard
const OnboardingCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.caution.bg,
  color: theme.palette.caution.main,
}))
const OnboardingSection = ({ navigate }) => {
  return (
    <OnboardingCard elevation={3}>
      <Typography variant="h6">Not sure where to start?</Typography>
      <Typography variant="body1">
        You have not completed onboarding
      </Typography>
      <Button
        variant="contained"
        onClick={() => navigate('/problems')} // redirect to problems page
        sx={{
          marginTop: 2, // Adjust margin as needed
        }}
      >
        Get Started
      </Button>
    </OnboardingCard>
  )
}
export default OnboardingSection