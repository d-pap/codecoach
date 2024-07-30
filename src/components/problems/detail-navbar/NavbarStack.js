// the stack structure for the navbar

import React from 'react'
import { Stack } from '@mui/material'

const NavbarStack = ({ children }) => {
  return (
    <Stack direction="column" spacing={2}>
      {children}
    </Stack>
  )
}

export default NavbarStack
