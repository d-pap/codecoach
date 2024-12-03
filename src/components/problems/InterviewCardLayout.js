import React, { Suspense } from 'react'
import styled from '@mui/material/styles/styled'
import { useNavigate } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CenteredCircleLoader from '../utility/CenteredLoader'

// Styled components
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

// Difficulty color function
const difficultyColor = (difficulty) => {
  switch (difficulty) {
    case 'Easy':
      return 'green'
    case 'Medium':
      return 'orange' // Orange is more visible than yellow
    case 'Hard':
      return 'red'
    default:
      return 'grey'
  }
}

// InterviewCardLayout component
const InterviewCardLayout = ({ interview = {} }) => {
  const navigate = useNavigate()
  const path = `/problems/${interview._id}`

  const handleNavigate = () => {
    if (interview._id) {
      navigate(path, { state: { interview } })
    }
  }

  return (
    <Suspense fallback={<CenteredCircleLoader />}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <StyledCard onClick={handleNavigate} variant="outlined">
          <StyledCardContent>
            {/* Header Line: Topics, Difficulty, Companies */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              {/* Topics on the left */}
              <Box flex={1}>
                <Typography variant="overline" color="primary.light500">
                  {interview.topics && interview.topics.length > 0
                    ? interview.topics.join(', ')
                    : 'No Topics Available'}
                </Typography>
              </Box>
              {/* Difficulty in the middle */}
              <Box flex={0}>
                <Typography
                  variant="overline"
                  color="primary.light500"
                  style={{ color: difficultyColor(interview.difficulty) }}
                >
                  {interview.difficulty || 'Unknown Difficulty'}
                </Typography>
              </Box>
              {/* Companies on the right */}
              <Box flex={1} textAlign="right">
                <Typography variant="overline" color="primary.light500">
                  {interview.companies && interview.companies.length > 0
                    ? interview.companies.join(', ')
                    : 'No Companies Available'}
                </Typography>
              </Box>
            </Box>
            {/* Title */}
            <CardTitle variant="body1" gutterBottom>
              {interview.title || 'Untitled Question'}
            </CardTitle>
            {/* Description */}
            <CardBody variant="small">
              {interview.description || 'No description provided.'}
            </CardBody>
          </StyledCardContent>
        </StyledCard>
      </div>
    </Suspense>
  )
}

export default InterviewCardLayout
