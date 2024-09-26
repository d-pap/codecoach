/**
 * Main component of app. Gets rendered by index.js
 * Central hub where we assemble our other components and
 * tie everything together like layout, routes, etc.
 */
import React, { useEffect, useState, Suspense, lazy } from 'react'
import './App.css'
import { Amplify, Auth } from 'aws-amplify'
import '@aws-amplify/ui-react/styles.css'
import awsExports from './aws-exports'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import { ThemeProvider, Box, LinearProgress } from '@mui/material'
import Header from './components/Header-Footer/Header'
import Footer from './components/Header-Footer/Footer'
import ProtectedRoute from './components/auth/ProtectedRoute'
import theme from './theme'
import AuthModal from './components/auth/AuthModal'

// Dynamic Imports
const LandingPage = lazy(() => import('./pages/LandingPage'))
const Home = lazy(() => import('./pages'))
const About = lazy(() => import('./pages/nav/about'))
const Problems = lazy(() => import('./pages/nav/problems'))
const ProblemDetail = lazy(() => import('./pages/problems/problemDetail'))
const ManageProblemsPage = lazy(() => import('./pages/nav/manageProblems'))
const SingleFormLayout = lazy(() => import('./pages/problems/add-problems/ICPCSingleForm'))
const ICPCMultipleForm = lazy(() => import('./pages/problems/add-problems/ICPCMultipleForm'))
const InterviewForm = lazy(() => import('./pages/problems/add-problems/InterviewForm'))
const EditICPCProblem = lazy(() => import('./pages/problems/edit-problems/editICPCProblem'))
const EditInterviewProblem = lazy(() => import('./pages/problems/edit-problems/editInterviewProblem'))
const ICPC = lazy(() => import('./pages/problems/problem-types/ICPC'))
const Interview = lazy(() => import('./pages/problems/problem-types/Interview'))

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

  const handleCloseAuth = () => {
    setShowAuth(false)
  }
  const handleAuthenticated = () => {
    setIsAuthenticated(true)
    setShowAuth(false)
  }

  if (isLoading) {
    return <LinearProgress />
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
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route
                  path="/"
                  element={
                    isAuthenticated ? (
                      <Navigate to="/home" replace />
                    ) : (
                      <>
                        <LandingPage onGetStarted={handleShowAuth} />
                        <AuthModal
                          open={showAuth}
                          onClose={handleCloseAuth}
                          initialState={authScreen}
                          onAuthenticated={handleAuthenticated}
                        />
                      </>
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
                  path="/problems/:problemId"
                  element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <ProblemDetail />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/manage-problems"
                  element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <ManageProblemsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/manage-problems/add-single-icpc"
                  element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <SingleFormLayout />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/manage-problems/add-multiple-icpc"
                  element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <ICPCMultipleForm />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/manage-problems/edit-icpc"
                  element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <EditICPCProblem />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/manage-problems/add-interview"
                  element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <InterviewForm />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/manage-problems/edit-interview"
                  element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <EditInterviewProblem />
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
              </Routes>
            </Suspense>
          </Box>
          <Footer />
        </Box>
      </ThemeProvider>
    </Router>
  )
}

export default App
