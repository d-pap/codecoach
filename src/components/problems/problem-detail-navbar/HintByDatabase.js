/**
 * The user can view the hints stored in the database for the problem
 * (this is the one provided by the icpc team).
 *
 * It can also be a video link (also provided by the icpc team).
 */

import React from 'react'
import NavbarStack from './NavbarStack'
import { Typography } from '@mui/material'

const HintByDatabaseTab = ({ problem }) => {
  return (
    <NavbarStack>
      <Typography variant="h6">Hint By Database</Typography>
      <Typography variant="body1">{problem.hint}</Typography>
    </NavbarStack>
  )
}

export default HintByDatabaseTab
