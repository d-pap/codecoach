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
      <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
        Education
      </Typography>
      {educations.map((education, index) => (
        <Box key={index} sx={{ mb: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={11}>
              <TextField
                label="Institution"
                value={education.institution}
                onChange={(e) =>
                  handleChange(index, 'institution', e.target.value)
                }
                variant="outlined"
                margin="normal"
                fullWidth
              />
              <TextField
                label="Degree"
                value={education.degree}
                onChange={(e) => handleChange(index, 'degree', e.target.value)}
                variant="outlined"
                margin="normal"
                fullWidth
              />
              <TextField
                label="Field of Study"
                value={education.fieldOfStudy}
                onChange={(e) =>
                  handleChange(index, 'fieldOfStudy', e.target.value)
                }
                variant="outlined"
                margin="normal"
                fullWidth
              />
              <TextField
                label="Start Date"
                value={education.startDate}
                onChange={(e) =>
                  handleChange(index, 'startDate', e.target.value)
                }
                variant="outlined"
                margin="normal"
                fullWidth
              />
              <TextField
                label="End Date"
                value={education.endDate}
                onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                variant="outlined"
                margin="normal"
                fullWidth
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
        Add Education
      </Button>
    </Box>
  )
}

export default Education
