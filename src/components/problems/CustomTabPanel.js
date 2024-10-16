/**
 * This function outlines the custom tab panel for the problem detail page.
 *
 * The dynamic import is used to load the Box component only when needed, optimizing bundle size.
 */

import React from 'react'
import Box from '@mui/material/Box'
import CenteredCircleLoader from '../utility/CenteredLoader'

function CustomTabPanel(props) {
  // Destructure the properties passed to the component
  const { children, value, index, ...other } = props

  // Return the tab panel component, displaying the content only when the selected index matches
  return (
    <div
      role="tabpanel"
      hidden={value !== index} // Hide content if it's not the active tab
      id={`simple-tabpanel-${index}`} // Assign an id for accessibility
      aria-labelledby={`simple-tab-${index}`} // Associate with tab control for accessibility
      {...other} // Spread the rest of the props
    >
      {/* Render the children inside the Box component when the tab is active */}
      {value === index && (
        <React.Suspense fallback={<CenteredCircleLoader />}>
          <Box sx={{ p: 2 }}>{children}</Box>
        </React.Suspense>
      )}
    </div>
  )
}

export default CustomTabPanel
