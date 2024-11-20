import React, { Suspense } from 'react'
import styled from '@mui/material/styles/styled'
import { useNavigate } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { useQueryClient } from '@tanstack/react-query'
import CenteredCircleLoader from '../utility/CenteredLoader'

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

const ProblemCardLayout = ({ problem }) => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const path = `/problems/${problem._id}`

  const handleNavigate = () => {
    // navigate with the already fetched problem data
    navigate(path, { state: { problem } })
  }

  return (
    <Suspense fallback={<CenteredCircleLoader />}>
      <div
        //* Container for each problem card
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <StyledCard onClick={handleNavigate} variant="outlined">
          <StyledCardContent>
            {/* Contest Information */}
            <Typography variant="overline" color="primary.light500">
              {problem.contestYear} {problem.contestRegion}
            </Typography>
            {/* Problem Title */}
            <CardTitle variant="body1" gutterBottom>
              {problem.title}
            </CardTitle>
            {/* Problem Description */}
            <CardBody variant="small">{problem.description}</CardBody>
          </StyledCardContent>
        </StyledCard>
      </div>
    </Suspense>
  )
}

export default ProblemCardLayout
