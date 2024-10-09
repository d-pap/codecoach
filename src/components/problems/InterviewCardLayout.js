import React, { Suspense } from 'react';
import styled from '@mui/material/styles/styled';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Skeleton from '@mui/material/Skeleton'

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
}));

const CardTitle = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}));

const CardBody = styled(Typography)(({ theme }) => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  whiteSpace: 'normal',
  paddingLeft: theme.spacing(0),
}));

// Skeleton component for loading state
const InterviewCardSkeleton = () => (
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
);

// Difficulty color function
const difficultyColor = (difficulty) => {
  switch (difficulty) {
    case 'Easy':
      return 'green';
    case 'Medium':
      return 'orange'; // Orange is more visible than yellow
    case 'Hard':
      return 'red';
    default:
      return 'grey';
  }
};

// InterviewCardLayout component
const InterviewCardLayout = ({ interview = {} }) => {
  const navigate = useNavigate();
  const path = `/problems/${interview._id}`

  const handleNavigate = () => {
    if (interview._id) {
      navigate(path, { state: { interview } });
    }
  };

  return (
    <Suspense fallback={<InterviewCardSkeleton />}>
      <div
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <StyledCard onClick={handleNavigate} variant="outlined">
          <StyledCardContent>
            {/* Header Line: Topics, Difficulty, Companies */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
              {/* Topics on the left */}
              <Box flex={1}>
                <Typography variant="caption" color="textSecondary">
                  {interview.topics && interview.topics.length > 0
                    ? interview.topics.join(', ')
                    : 'No Topics Available'}
                </Typography>
              </Box>
              {/* Difficulty in the middle */}
              <Box flex={0}>
                <Typography
                  variant="overline"
                  style={{ color: difficultyColor(interview.difficulty) }}
                >
                  {interview.difficulty || 'Unknown Difficulty'}
                </Typography>
              </Box>
              {/* Companies on the right */}
              <Box flex={1} textAlign="right">
                <Typography variant="caption" color="textSecondary">
                  {interview.companies && interview.companies.length > 0
                    ? interview.companies.join(', ')
                    : 'No Companies Available'}
                </Typography>
              </Box>
            </Box>
            {/* Title */}
            <CardTitle variant="h5" gutterBottom>
              {interview.title || 'Untitled Question'}
            </CardTitle>
            {/* Description */}
            <CardBody variant="body1">
              {interview.description || 'No description provided.'}
            </CardBody>
          </StyledCardContent>
        </StyledCard>
      </div>
    </Suspense>
  );
};

export default InterviewCardLayout;
