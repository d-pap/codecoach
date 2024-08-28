/**
 * About page
 * This can be temporary if we want to use it for something else
 * or delete it completely. Was initially only made to construct navbar
 */
import React from 'react'
import { Box, Container, Typography } from '@mui/material'

const About = () => {
  return (
    <Box sx={{ bgcolor: 'background.default', py: 6 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          align="center"
          sx={{ mb: 6 }}
        >
          Courses
        </Typography>
      </Container>
    </Box>
  )
}

export default About
