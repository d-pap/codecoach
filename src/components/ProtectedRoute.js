import React from 'react'
import { Navigate } from 'react-router-dom'

// ProtectedRoute component that checks if the user is authenticated
const ProtectedRoute = ({ children, isAuthenticated }) => {
  if (!isAuthenticated) {
    // if user not authenticated, redirect to landing page
    return <Navigate to="/" />
  }
  // if user is, render child components
  return children
}

export default ProtectedRoute
