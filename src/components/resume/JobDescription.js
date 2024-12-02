// JobDescription.js
import React from 'react'
import { TextField, Typography, Box } from '@mui/material'

const JobDescription = ({ jobDescription, setJobDescription }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" component="h2">
        Job Description
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        Paste the job description for which you are applying to tailor your
        resume to the specific requirements.
      </Typography>
      <TextField
        label="Job Description"
        placeholder="Paste the job description for which you are applying here..."
        multiline
        rows={4}
        fullWidth
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        variant="outlined"
        margin="normal"
        helperText="Copy and paste the entire job description from the job posting so your resume is tailored to the specific requirements."
      />
    </Box>
  )
}

export default JobDescription
