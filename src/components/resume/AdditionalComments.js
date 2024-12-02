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
      <Typography variant="h5" component="h2">
        Additional Instructions
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        Add any extra instructions or preferences for your resume creation.
      </Typography>
      <TextField
        label="Additional Instructions"
        placeholder="e.g., Please use a modern template and emphasize my leadership skills..."
        multiline
        rows={4}
        fullWidth
        value={
          additionalComments === 'No Additional Comments'
            ? ''
            : additionalComments
        }
        onChange={(e) => setAdditionalComments(e.target.value)}
        variant="outlined"
        margin="normal"
        helperText="Provide any specific instructions you'd like the AI to consider when creating your resume."
      />
    </Box>
  )
}

export default AdditionalComments
