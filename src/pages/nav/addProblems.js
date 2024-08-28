import React from 'react'
import { Box, Button, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const OriginalPage = () => {
  const navigate = useNavigate()

  const handleNavigateToForm = () => {
    navigate('/addProblems/singleICPC')
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
        <Button variant="contained" onClick={handleNavigateToForm}>
          Go to Problem Form
        </Button>
      </Stack>
    </Box>
  )
}

export default OriginalPage
