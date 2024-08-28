import React from 'react'
import { Box, Button, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const OriginalPage = () => {
  const navigate = useNavigate()

  const handleNavigateToSingleICPCForm = () => {
    navigate('/addProblems/singleICPC')
  }

  const handleNavigateToMultipleICPCForm = () => {
    navigate('/addProblems/multipleICPC')
  }

  return (
    <Box
      component="section"
      display="flex"
      justifyContent="center"
      padding={3}
      width="100%"
    >
      <Stack spacing={2}>
        <Button variant="contained" onClick={handleNavigateToSingleICPCForm}>
          Add one problem
        </Button>
        <Button variant="contained" onClick={handleNavigateToMultipleICPCForm}>
          Add problem from pdf
        </Button>
      </Stack>
    </Box>
  )
}

export default OriginalPage
