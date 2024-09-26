import React, { Suspense, lazy } from 'react'
import PropTypes from 'prop-types'

// Dynamically import Navigate from react-router-dom for code splitting
const Navigate = lazy(() =>
  import('react-router-dom').then(module => ({ default: module.Navigate }))
)

/**
 * ProtectedRoute component that checks if the user is authenticated
 * and conditionally renders child components or redirects to the landing page.
 *
 * @param {object} props - Component props
 * @param {boolean} props.isAuthenticated - Authentication status
 * @param {React.ReactNode} props.children - Child components to render if authenticated
 */
const ProtectedRoute = ({ children, isAuthenticated }) => {
  if (!isAuthenticated) {
    // If user is not authenticated, dynamically load Navigate to redirect
    return (
      <Suspense fallback={<div>Redirecting...</div>}>
        <Navigate to="/" />
      </Suspense>
    )
  }
  // If user is authenticated, render the child components
  return children
}

// Define prop types for better type checking
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
}

export default ProtectedRoute
