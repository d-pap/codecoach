// Education.js
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

const Education = ({ educations, setEducations }) => {
  const handleAdd = () => {
    setEducations([
      ...educations,
      {
        institution: '',
        degree: '',
        fieldOfStudy: '',
        startDate: '',
        endDate: '',
      },
    ])
  }

  const handleRemove = (index) => {
    const list = [...educations]
    list.splice(index, 1)
    setEducations(list)
  }

  const handleChange = (index, field, value) => {
    const list = [...educations]
    list[index][field] = value
    setEducations(list)
  }

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" component="h2">
        Education
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        Detail your academic background to highlight your skills and
        qualifications.
      </Typography>
      {educations.map((education, index) => (
        <Box key={index} sx={{ mb: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={11}>
              <TextField
                label="Institution Name"
                placeholder="e.g., University of Michigan"
                value={education.institution}
                onChange={(e) =>
                  handleChange(index, 'institution', e.target.value)
                }
                variant="outlined"
                margin="normal"
                fullWidth
                helperText="Enter the full name of the institution you attended."
              />
              <TextField
                label="Degree"
                placeholder="e.g., Bachelor of Science in Computer Science"
                value={education.degree}
                onChange={(e) => handleChange(index, 'degree', e.target.value)}
                variant="outlined"
                margin="normal"
                fullWidth
                helperText="Specify the degree you earned."
              />
              <TextField
                label="Field of Study"
                placeholder="e.g., Computer Science"
                value={education.fieldOfStudy}
                onChange={(e) =>
                  handleChange(index, 'fieldOfStudy', e.target.value)
                }
                variant="outlined"
                margin="normal"
                fullWidth
                helperText="Mention your major or field of study."
              />
              <TextField
                label="Start Date"
                placeholder="e.g., June 2020"
                value={education.startDate}
                onChange={(e) =>
                  handleChange(index, 'startDate', e.target.value)
                }
                variant="outlined"
                margin="normal"
                fullWidth
                helperText="Provide the month and year you started your studies."
              />
              <TextField
                label="End Date"
                placeholder="e.g., December 2024"
                value={education.endDate}
                onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                variant="outlined"
                margin="normal"
                fullWidth
                helperText="If you're currently enrolled, enter 'Present'. Otherwise, enter the month and year you graduated."
              />
            </Grid>
            <Grid item xs={1}>
              <IconButton
                onClick={() => handleRemove(index)}
                sx={{ color: 'error.main' }}
                aria-label="delete education"
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
        {educations.length > 0 ? 'Add More Education' : 'Add Education'}
      </Button>
    </Box>
  )
}

export default Education
