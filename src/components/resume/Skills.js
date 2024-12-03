// Skills.js
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

const Skills = ({ skills, setSkills }) => {
  const handleAdd = () => {
    setSkills([...skills, ''])
  }

  const handleRemove = (index) => {
    const list = [...skills]
    list.splice(index, 1)
    setSkills(list)
  }

  const handleChange = (index, value) => {
    const list = [...skills]
    list[index] = value
    setSkills(list)
  }

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" component="h2">
        Skills
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        List your key skills to demonstrate your professional capabilities.
      </Typography>
      {skills.map((skill, index) => (
        <Grid container spacing={2} key={index}>
          <Grid item xs={11}>
            <TextField
              label={`Skill ${index + 1}`}
              placeholder="e.g., JavaScript, React, Node.js"
              value={skill}
              onChange={(e) => handleChange(index, e.target.value)}
              variant="outlined"
              margin="normal"
              fullWidth
              helperText="Enter your skills separated by commas."
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
      ))}
      <Button
        variant="contained"
        color="secondary"
        startIcon={<Add />}
        onClick={handleAdd}
        sx={{ mt: 2 }}
      >
        {skills.length > 0 ? 'Add More Skills' : 'Add Skill'}
      </Button>
    </Box>
  )
}

export default Skills
