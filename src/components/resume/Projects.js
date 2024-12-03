// Projects.js
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
import { useTheme } from '@mui/material/styles'

const Projects = ({ projects, setProjects }) => {
  const muiTheme = useTheme()

  const handleAdd = () => {
    setProjects([...projects, { name: '', role: '', description: '' }])
  }

  const handleRemove = (index) => {
    const list = [...projects]
    list.splice(index, 1)
    setProjects(list)
  }

  const handleChange = (index, field, value) => {
    const list = [...projects]
    list[index][field] = value
    setProjects(list)
  }

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" component="h2">
        Projects
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        Showcase your standout projects to highlight your technical and creative
        capabilities.
      </Typography>
      {projects.map((project, index) => (
        <Box
          key={index}
          sx={{
            mb: 3,
            borderBottom: `1px solid ${muiTheme.palette.divider}`,
            pb: 2,
          }}
        >
          {/* First Row: Project Name and Role */}
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={5}>
              <TextField
                label="Project Name"
                placeholder="e.g., E-Commerce Website"
                value={project.name}
                onChange={(e) => handleChange(index, 'name', e.target.value)}
                variant="outlined"
                margin="normal"
                fullWidth
                helperText="Enter the name of the project."
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                label="Role"
                placeholder="e.g., Lead Developer"
                value={project.role}
                onChange={(e) => handleChange(index, 'role', e.target.value)}
                variant="outlined"
                margin="normal"
                fullWidth
                helperText="Enter your role in the project."
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <IconButton
                onClick={() => handleRemove(index)}
                sx={{ color: 'error.main', mt: 2 }}
              >
                <Delete />
              </IconButton>
            </Grid>
          </Grid>
          {/* Second Row: Description */}
          <Grid container spacing={2} alignItems="flex-start">
            <Grid item xs={12}>
              <TextField
                label="Description"
                placeholder="e.g., Developed a full stack e-commerce platform using React and Node.js, implemented secure payment processing and user authentication..."
                value={project.description}
                onChange={(e) =>
                  handleChange(index, 'description', e.target.value)
                }
                variant="outlined"
                margin="normal"
                fullWidth
                multiline
                rows={3} // Increased rows for better visibility
                helperText="Provide a brief overview of the project's objectives, technologies used, and your contributions."
              />
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
        {projects.length > 0 ? 'Add More Projects' : 'Add Project'}
      </Button>
    </Box>
  )
}

export default Projects
