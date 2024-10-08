import React from 'react'
import { Card, CardContent, Typography } from '@mui/material'
import styled from '@mui/material/styles/styled'
import { useNavigate } from 'react-router-dom'

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '95%',
  height: '125px',
  margin: '1px',
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
  height: '100%', // Ensure CardContent takes full height of the Card
  //padding: theme.spacing(2),
}))

const CardTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Ubuntu',
  fontWeight: 'bold',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}))

const CardBody = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontFamily: 'Ubuntu',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  whiteSpace: 'normal',
  paddingLeft: theme.spacing(0),
}))

const ProblemCardLayout = ({ problem }) => {
  const navigate = useNavigate() // Initialize the useNavigate hook
  const path = `/problems/${problem._id}` // Set the path to the problem details

  const handleNavigate = () => {
    navigate(path, { state: { problem } })
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <StyledCard
        onClick={handleNavigate} // Navigate to the problem details on card click
        variant="outlined"
      >
        <StyledCardContent>
          <CardTitle variant="h5" gutterBottom>
            {problem.title}
          </CardTitle>
          <CardBody variant="body">{problem.description}</CardBody>
        </StyledCardContent>
      </StyledCard>
    </div>
  )
}

export default ProblemCardLayout
