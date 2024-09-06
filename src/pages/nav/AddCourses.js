import React from 'react'
import { Box, Container, Typography } from '@mui/material'

const AddCourses = () => {
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
          Add Courses
        </Typography>
      </Container>
    </Box>
  )
}

export default AddCourses
