// import React, { useState, useEffect } from 'react'
// import { Fab } from '@mui/material' // Floating Action Button from MUI
// import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp' // Icon for the button
// import { styled } from '@mui/material/styles'

// // Define the color constants
// const DEFAULT_COLOR = '#6b7280' // Gray color (e.g., Tailwind's gray-500)
// const DARKEN_COLOR = '#374151' // Darker gray (e.g., Tailwind's gray-700)

// // Create a styled Fab component with conditional styling based on the 'darken' prop
// const ScrollToTopButton = styled(Fab, {
//   shouldForwardProp: (prop) => prop !== 'darken', // Prevent 'darken' prop from being passed to the DOM
// })(({ theme, darken }) => ({
//   position: 'fixed',
//   bottom: theme.spacing(4),
//   right: theme.spacing(4),
//   zIndex: 1000,

//   // Default styling
//   backgroundColor: DEFAULT_COLOR,
//   opacity: 0.8,
//   color: '#fff',
//   boxShadow: 'none',
//   minWidth: '40px', // Adjusted for better visibility
//   minHeight: '40px', // Adjusted for better visibility
//   transition:
//     'background-color 0.3s ease, transform 0.3s ease, opacity 0.3s ease',

//   // Conditional styling when 'darken' is true
//   ...(darken && {
//     backgroundColor: DARKEN_COLOR,
//     opacity: 1,
//   }),

//   '&:hover': {
//     backgroundColor: DARKEN_COLOR, // Darker color on hover
//     transform: 'scale(1.1)', // Slightly enlarge on hover
//     opacity: 1, // Fully opaque on hover
//   },
// }))

// function ScrollToTop() {
//   const [isVisible, setIsVisible] = useState(false)
//   const [isAtBottom, setIsAtBottom] = useState(false)

//   useEffect(() => {
//     const toggleVisibility = () => {
//       const scrollTop = window.pageYOffset || document.documentElement.scrollTop
//       const windowHeight = window.innerHeight
//       const docHeight = document.documentElement.scrollHeight

//       // Show the button after scrolling down 300px
//       if (scrollTop > 300) {
//         setIsVisible(true)
//       } else {
//         setIsVisible(false)
//       }

//       // Check if the user has scrolled to the bottom (with a 5px threshold)
//       if (scrollTop + windowHeight >= docHeight - 5) {
//         setIsAtBottom(true)
//       } else {
//         setIsAtBottom(false)
//       }
//     }

//     // Attach the scroll event listener
//     window.addEventListener('scroll', toggleVisibility)

//     // Initial check in case the user is already at the bottom on load
//     toggleVisibility()

//     // Clean up the event listener on component unmount
//     return () => window.removeEventListener('scroll', toggleVisibility)
//   }, [])

//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: 'smooth', // Smooth scroll
//     })
//   }

//   return (
//     <ScrollToTopButton
//       color="primary"
//       size="small"
//       onClick={scrollToTop}
//       darken={isAtBottom} // Pass the 'isAtBottom' state as the 'darken' prop
//       style={{ display: isVisible ? 'flex' : 'none' }} // Show or hide the button based on 'isVisible'
//       aria-label="Scroll to top" // Accessibility label
//     >
//       <KeyboardArrowUpIcon />
//     </ScrollToTopButton>
//   )
// }

// export default ScrollToTop

import React, { useState, useEffect } from 'react'
import { Fab } from '@mui/material' // Floating Action Button from MUI
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp' // Icon for the button
import { styled } from '@mui/material/styles'

// Define the color constants
const DEFAULT_COLOR = '#6b7280' // Gray color (e.g., Tailwind's gray-500)
const DARKEN_COLOR = '#374151' // Darker gray (e.g., Tailwind's gray-700)

// Create a styled Fab component with conditional styling based on the 'darken' prop
const ScrollToTopButton = styled(Fab, {
  shouldForwardProp: (prop) => prop !== 'darken', // Prevent 'darken' prop from being passed to the DOM
})(({ darken }) => ({
  position: 'fixed',
  bottom: 100, // Use fixed spacing to avoid theme dependency
  right: 5,
  zIndex: 1000,

  // Default styling
  backgroundColor: DEFAULT_COLOR,
  opacity: 0.8,
  color: '#fff',
  boxShadow: 'none',
  minWidth: '40px', // Adjusted for better visibility
  minHeight: '40px', // Adjusted for better visibility
  transition: 'background-color 0.3s ease, transform 0.3s ease, opacity 0.3s ease',

  // Conditional styling when 'darken' is true
  ...(darken && {
    backgroundColor: DARKEN_COLOR,
    opacity: 1,
  }),

  '&:hover': {
    backgroundColor: DARKEN_COLOR, // Darker color on hover
    transform: 'scale(1.1)', // Slightly enlarge on hover
    opacity: 1, // Fully opaque on hover
  },
}))

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const [isAtBottom, setIsAtBottom] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const windowHeight = window.innerHeight
      const docHeight = document.documentElement.scrollHeight

      // Show the button after scrolling down 300px
      setIsVisible(scrollTop > 300)

      // Check if the user has scrolled to the bottom (with a 5px threshold)
      setIsAtBottom(scrollTop + windowHeight >= docHeight - 5)
    }

    // Attach the scroll event listener
    window.addEventListener('scroll', toggleVisibility)

    // Initial check in case the user is already at the bottom on load
    toggleVisibility()

    // Clean up the event listener on component unmount
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Smooth scroll
    })
  }

  return (
    <ScrollToTopButton
      size="small"
      onClick={scrollToTop}
      darken={isAtBottom} // Pass the 'isAtBottom' state as the 'darken' prop
      style={{ display: isVisible ? 'flex' : 'none' }} // Show or hide the button based on 'isVisible'
      aria-label="Scroll to top" // Accessibility label
    >
      <KeyboardArrowUpIcon />
    </ScrollToTopButton>
  )
}

export default ScrollToTop
