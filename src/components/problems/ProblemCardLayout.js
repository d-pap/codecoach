import React from 'react'
import { Card, CardContent, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const ProblemCardLayout = ({ problem }) => {
  return (
    <Link to={`/problems/${problem._id}`} style={{ textDecoration: 'none' }}>
      <Card
        variant="outlined"
        sx={{
          margin: '10px',
          cursor: 'pointer',
          transition: 'transform 0.2s, box-shadow 0.2s, background-color 0.2s',
          '&:hover': {
            transform: 'scale(1.02)',
            boxShadow: 3,
            backgroundColor: 'rgba(0, 0, 0, 0.1)', // Adjust the color and opacity as needed
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
    </Link>
  )
}
export default ProblemCardLayout
