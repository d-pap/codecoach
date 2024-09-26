import React from 'react'
import { Paper, Typography, Link } from '@mui/material'
const ExploreBlogsSection = () => {
  return (
    <Paper elevation={3} sx={{ padding: 3 }}>
      <Typography variant="h6">Explore Our Blogs Today</Typography>
      <Typography variant="body2">
        Read blogs about various topics in programming. Get expert
        guidance from CodeChef on coding.
      </Typography>
      <Link href="#" sx={{ marginTop: 2 }}>
        View all
      </Link>
    </Paper>
  )
}
export default ExploreBlogsSection