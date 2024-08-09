import React from 'react'
import { Card, CardContent, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const ProblemCardLayout = ({ problem }) => {
  const navigate = useNavigate() // Initialize the useNavigate hook
  const path = `/problems/${problem._id}` // Set the path to the problem details

  const handleNavigate = () => {
    navigate(path, { state: { problem } })
  }

  return (
    <Card
      onClick={handleNavigate} // Navigate to the problem details on card click
      variant="outlined"
      sx={{
        margin: '10px',
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s, background-color 0.2s',
        '&:hover': {
          transform: 'scale(1.02)',
          boxShadow: 3,
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      <CardContent>
        <Typography variant="h6">{problem.title}</Typography>
        <Typography variant="body2" color="textSecondary">
          {problem.description}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default ProblemCardLayout
