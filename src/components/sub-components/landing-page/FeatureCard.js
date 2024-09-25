import React from 'react'
import { Box, Typography } from '@mui/material'
import { styled } from '@mui/system'

const StyledFeatureCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[3],
}))

const FeatureCard = ({ title, description }) => {
  return (
    <StyledFeatureCard>
      <Typography variant="h5" component="h3" gutterBottom>
        {title}
      </Typography>
      <Typography>{description}</Typography>
    </StyledFeatureCard>
  )
}

export default FeatureCard
