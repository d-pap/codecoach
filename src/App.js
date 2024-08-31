/**
 * Main component of app. Gets rendered by index.js
 * Central hub where we assemble our other components and
 * tie everything together like layout, routes, etc.
 */

import React, { useEffect, useState } from 'react'
import './App.css'
import { Amplify, Auth } from 'aws-amplify'
import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css' // amplify ui styles
import awsExports from './aws-exports'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import { ThemeProvider, Box } from '@mui/material'
import LandingPage from './pages/LandingPage'
import Header from './components/Header-Footer/Header'
import Footer from './components/Header-Footer/Footer'
import Home from './pages'
import About from './pages/nav/about'
import Problems from './pages/nav/problems'
import ProblemDetail from './pages/problems/problemDetail'
import AddProblems from './pages/nav/addProblems'
import ICPC from './pages/problems/problem-types/ICPC'
import Interview from './pages/problems/problem-types/Interview'
import Programming from './pages/problems/problem-types/Programming'
import ProtectedRoute from './components/ProtectedRoute'
import theme from './theme'

Amplify.configure(awsExports)

function App() {
  const [showAuth, setShowAuth] = useState(false)
  const [authScreen, setAuthScreen] = useState('signin')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      await Auth.currentAuthenticatedUser()
      setIsAuthenticated(true)
    } catch (error) {
      setIsAuthenticated(false)
    }
    setIsLoading(false)
  }

  const handleShowAuth = (mode) => {
    setAuthScreen(mode)
    setShowAuth(true)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
          }}
        >
          {isAuthenticated && <Header />}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Routes>
              <Route
                path="/"
                element={
                  // if logged in already, redirect to home
                  // if not logged in, show landing page
                  isAuthenticated ? (
                    <Navigate to="/home" replace />
                  ) : showAuth ? (
                    <Authenticator
                      initialState={authScreen}
                      className="custom-authenticator"
                      //socialProviders={['google']}
                    >
                      {() => {
                        setIsAuthenticated(true)
                        return <Navigate to="/home" replace />
                      }}
                    </Authenticator>
                  ) : (
                    <LandingPage onGetStarted={handleShowAuth} />
                  )
                }
              />
              <Route
                path="/home"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/about"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <About />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/problems"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Problems />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/problems/:id"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <ProblemDetail />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/addProblems"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <AddProblems />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/problems/icpc"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <ICPC />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/problems/interview"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Interview />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/problems/programming"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Programming />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </ThemeProvider>
    </Router>
  )
}

export default App
