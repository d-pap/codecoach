// AdditionalComments.js
import React from 'react'
import { TextField, Typography, Box } from '@mui/material'

const AdditionalComments = ({ additionalComments, setAdditionalComments }) => {
  // Handler for when the TextField loses focus
  const handleBlur = () => {
    if (additionalComments.trim() === '') {
      setAdditionalComments('No Additional Comments')
    }
  }

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
        Additional Comments/Modifications (optional)
      </Typography>
      <TextField
        label="Any additional instructions or information"
        placeholder="No Additional Comments"
        multiline
        rows={4}
        fullWidth
        value={additionalComments || ''}
        onChange={(e) => setAdditionalComments(e.target.value)}
        onBlur={handleBlur} // Add the onBlur event handler
        variant="outlined"
        margin="normal"
      />
    </Box>
  )
}

export default AdditionalComments
