// the stack structure for the navbar

import React, { Suspense, lazy } from 'react'

// Dynamically import the Stack component from MUI to enable code splitting
const Stack = lazy(() =>
  import('@mui/material').then((module) => ({ default: module.Stack }))
)

/**
 * NavbarStack component to structure the navbar using MUI's Stack.
 *
 * Utilizes dynamic imports to load the Stack component only when needed,
 * optimizing the bundle size.
 *
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Child components to be wrapped by Stack
 * @returns {JSX.Element} The rendered NavbarStack component
 */
const NavbarStack = ({ children }) => {
  return (
    // Suspense handles the loading state of the dynamically imported Stack component
    <Suspense fallback={<div>Loading Navbar...</div>}>
      <Stack direction="column" spacing={2}>
        {children}
      </Stack>
    </Suspense>
  )
}

export default NavbarStack
