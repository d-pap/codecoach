/**
 * Section for loading Interview questions and displaying to the user.
 * The user can filter the questions by ... (to be determined based on data format)
 */

import { Box, Container, Typography } from '@mui/material'
import React from 'react'
//import { InterviewFilter } from '../../../components/problems/problem-filters/InterviewFilter'

function Interview() {
  return (
    <Box sx={{ bgcolor: 'background.default', py: 6 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h1"
          component="h1"
          gutterBottom
          align="center"
          sx={{ mb: 6 }}
        >
          Interview Questions
        </Typography>
      </Container>
    </Box>
  )
}

export default Interview
