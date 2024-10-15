/**
 * The user can view the hints stored in the database for the problem
 * (this is the one provided by the icpc team).
 *
 * It can also be a video link (also provided by the icpc team).
 */

import React, { lazy } from 'react'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'

// Dynamically import NavbarStack to optimize bundle size
const NavbarStack = lazy(() => import('./NavbarStack'))

const StyledTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  marginTop: theme.spacing(1),
}))
const HintByDatabaseTab = ({ problem }) => {
  return (
    <NavbarStack>
      <Box>
        <StyledTypography variant="h6" sx={{ fontWeight: 'bold' }}>
          Hint By Database
        </StyledTypography>
        <Typography
          variant="small"
          sx={{
            lineHeight: '1.75rem',
          }}
        >
          {problem.hint}
        </Typography>
      </Box>
    </NavbarStack>
  )
}

export default HintByDatabaseTab
