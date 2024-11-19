// AdditionalActivities.js
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

const AdditionalActivities = ({
  additionalActivities,
  setAdditionalActivities,
}) => {
  const handleAdd = () => {
    setAdditionalActivities([...additionalActivities, ''])
  }

  const handleRemove = (index) => {
    const list = [...additionalActivities]
    list.splice(index, 1)
    setAdditionalActivities(list)
  }

  const handleChange = (index, value) => {
    const list = [...additionalActivities]
    list[index] = value
    setAdditionalActivities(list)
  }

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
        Additional Activities
      </Typography>
      {additionalActivities.map((activity, index) => (
        <Grid container spacing={2} key={index}>
          <Grid item xs={11}>
            <TextField
              label={`Activity ${index + 1}`}
              value={activity}
              onChange={(e) => handleChange(index, e.target.value)}
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
      ))}
      <Button
        variant="contained"
        color="secondary"
        startIcon={<Add />}
        onClick={handleAdd}
        sx={{ mt: 2 }}
      >
        Add Activity
      </Button>
    </Box>
  )
}

export default AdditionalActivities
