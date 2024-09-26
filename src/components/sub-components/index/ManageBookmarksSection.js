import React from 'react'
import { Paper, Typography, Link } from '@mui/material'
const ManageBookmarksSection = () => {
  return (
    <Paper elevation={3} sx={{ padding: 3 }}>
      <Typography variant="h6">Manage Bookmarks</Typography>
      <Typography variant="body2">
        You have not bookmarked any problem yet.
      </Typography>
      <Link href="#" sx={{ marginTop: 2 }}>
        Know more
      </Link>
    </Paper>
  )
}
export default ManageBookmarksSection