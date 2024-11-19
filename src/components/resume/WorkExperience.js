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
      <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
        Work Experience
      </Typography>
      {workExperiences.map((experience, index) => (
        <Box key={index} sx={{ mb: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={11}>
              <TextField
                label="Company"
                value={experience.company}
                onChange={(e) => handleChange(index, 'company', e.target.value)}
                variant="outlined"
                margin="normal"
                fullWidth
              />
              <TextField
                label="Position"
                value={experience.position}
                onChange={(e) =>
                  handleChange(index, 'position', e.target.value)
                }
                variant="outlined"
                margin="normal"
                fullWidth
              />
              <TextField
                label="Start Date"
                value={experience.startDate}
                onChange={(e) =>
                  handleChange(index, 'startDate', e.target.value)
                }
                variant="outlined"
                margin="normal"
                fullWidth
              />
              <TextField
                label="End Date"
                value={experience.endDate}
                onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                variant="outlined"
                margin="normal"
                fullWidth
              />
              <TextField
                label="Responsibilities"
                multiline
                rows={4}
                value={experience.responsibilities}
                onChange={(e) =>
                  handleChange(index, 'responsibilities', e.target.value)
                }
                variant="outlined"
                margin="normal"
                fullWidth
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
        Add Work Experience
      </Button>
    </Box>
  )
}

export default WorkExperience
