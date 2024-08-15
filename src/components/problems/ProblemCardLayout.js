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
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <Card
        onClick={handleNavigate} // Navigate to the problem details on card click
        variant="outlined"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '95%',
          height: '125px', // Fixed height for the card
          margin: '1px',
          cursor: 'pointer',
          transition: 'transform 0.2s, box-shadow 0.2s, background-color 0.2s',
          '&:hover': {
            transform: 'scale(1.02)',
            boxShadow: 3,
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%', // Ensure CardContent takes full height of the Card
            padding: '8px', // Adjust padding if necessary
          }}
        >
          <Typography
            variant="h6"
            noWrap
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              fontFamily: 'Inter, sans-serif', //! set font of the title in the card
            }}
          >
            {problem.title}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 3, // Number of lines to show before truncating
              WebkitBoxOrient: 'vertical',
              whiteSpace: 'normal',
              fontFamily: 'Inter, sans-serif', //! set font of the description in the card
            }}
          >
            {problem.description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProblemCardLayout
