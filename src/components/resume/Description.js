// Description.js
import React from 'react'
import { TextField, Typography, Box } from '@mui/material'

const Description = ({ description, setDescription }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" component="h2">
        Professional Summary
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          mb: 2,
        }}
      >
        A brief overview of your professional background and career objectives.
      </Typography>
      <TextField
        label="Professional Summary"
        placeholder="e.g., Final year undergraduate in Computer Science at University of Michigan. Results-driven software engineer with 1 year of experience developing scalable web applications..."
        multiline
        rows={4}
        fullWidth
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        variant="outlined"
        margin="normal"
        helperText="Provide a concise and professional summary of your skills, experiences, and career goals that capture your professional identity."
      />
    </Box>
  )
}

export default Description
