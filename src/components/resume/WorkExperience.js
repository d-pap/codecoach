// WorkExperience.js
import React from 'react'
import {
  TextField,
  Typography,
  IconButton,
  Button,
  Grid,
  Box,
} from '@mui/material'
import { Add, Delete } from '@mui/icons-material'

const WorkExperience = ({ workExperiences, setWorkExperiences }) => {
  const handleAdd = () => {
    setWorkExperiences([
      ...workExperiences,
      {
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        responsibilities: '',
      },
    ])
  }

  const handleRemove = (index) => {
    const list = [...workExperiences]
    list.splice(index, 1)
    setWorkExperiences(list)
  }

  const handleChange = (index, field, value) => {
    const list = [...workExperiences]
    list[index][field] = value
    setWorkExperiences(list)
  }

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" component="h2">
        Work Experience
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        Outline your previous roles and responsibilities to showcase your career
        progression.
      </Typography>
      {workExperiences.map((experience, index) => (
        <Box key={index} sx={{ mb: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={11}>
              <TextField
                label="Company Name"
                placeholder="e.g., ABC Corporation"
                value={experience.company}
                onChange={(e) => handleChange(index, 'company', e.target.value)}
                variant="outlined"
                margin="normal"
                fullWidth
                helperText="Enter the full name of the company you worked at."
              />
              <TextField
                label="Position"
                placeholder="e.g., Software Engineer"
                value={experience.position}
                onChange={(e) =>
                  handleChange(index, 'position', e.target.value)
                }
                variant="outlined"
                margin="normal"
                fullWidth
                helperText="Specify your official job title during your employment."
              />
              <TextField
                label="Start Date"
                placeholder="e.g., June 2020"
                value={experience.startDate}
                onChange={(e) =>
                  handleChange(index, 'startDate', e.target.value)
                }
                variant="outlined"
                margin="normal"
                fullWidth
                helperText="Provide the month and year you started this role."
              />
              <TextField
                label="End Date"
                placeholder="e.g., December 2023"
                value={experience.endDate}
                onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                variant="outlined"
                margin="normal"
                fullWidth
                helperText="If you're currently employed, enter 'Present'. Otherwise, enter the month and year you left the company."
              />
              <TextField
                label="Responsibilities"
                placeholder="e.g., Developed and maintained scalable web applications using React and Node.js, Led a team of 5 in developing and deploying new features..."
                multiline
                rows={4}
                value={experience.responsibilities}
                onChange={(e) =>
                  handleChange(index, 'responsibilities', e.target.value)
                }
                variant="outlined"
                margin="normal"
                fullWidth
                helperText="List and quantify your key responsibilities and achievements in this role."
              />
            </Grid>
            <Grid item xs={1}>
              <IconButton
                onClick={() => handleRemove(index)}
                sx={{ color: 'error.main' }}
              >
                <Delete />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
      ))}
      <Button
        variant="contained"
        color="secondary"
        startIcon={<Add />}
        onClick={handleAdd}
        sx={{ mt: 2 }}
      >
        {workExperiences.length > 0
          ? 'Add More Work Experience'
          : 'Add Work Experience'}
      </Button>
    </Box>
  )
}

export default WorkExperience
