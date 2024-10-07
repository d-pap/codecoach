/**
 * Main component of app. Gets rendered by index.js
 * Central hub where we assemble our other components and
 * tie everything together like layout, routes, etc.
 */
import React, { useEffect, useState, Suspense, lazy } from 'react'
import './App.css'
import { Amplify, Auth } from 'aws-amplify'
import '@aws-amplify/ui-react/styles.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import awsExports from './aws-exports'
import Header from './components/Header-Footer/Header'
import Footer from './components/Header-Footer/Footer'
import ProtectedRoute from './components/auth/ProtectedRoute'
import theme from './theme'
import AuthModal from './components/auth/AuthModal'
import CenteredLoader from './components/utility/CenteredLoader'
import ICPC from './pages/problems/problem-types/ICPC'
import Problems from './pages/nav/problems'
import ProblemDetail from './pages/problems/problemDetail'

// Dynamic Imports
const LandingPage = lazy(() => import('./pages/LandingPage'))
const Home = lazy(() => import('./pages'))
const About = lazy(() => import('./pages/nav/about'))
//const Problems = lazy(() => import('./pages/nav/problems'))
//const ProblemDetail = lazy(() => import('./pages/problems/problemDetail'))
const ManageProblemsPage = lazy(() => import('./pages/nav/manageProblems'))
const SingleFormLayout = lazy(
  () => import('./pages/problems/add-problems/ICPCSingleForm')
)
const ICPCMultipleForm = lazy(
  () => import('./pages/problems/add-problems/ICPCMultipleForm')
)
const InterviewForm = lazy(
  () => import('./pages/problems/add-problems/InterviewForm')
)
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
            <Routes>
              <Route
                path="/"
                element={
                  isAuthenticated ? (
                    <Navigate to="/home" replace />
                  ) : (
                    <>
                      <Suspense fallback={<CenteredLoader />}>
                        <LandingPage onGetStarted={handleShowAuth} />
                      </Suspense>
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
                    <Suspense fallback={<CenteredLoader />}>
                      <Home />
                    </Suspense>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/about"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Suspense fallback={<CenteredLoader />}>
                      <About />
                    </Suspense>
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
                    <Suspense fallback={<CenteredLoader />}>
                      <ManageProblemsPage />
                    </Suspense>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/manage-problems/add-single-icpc"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Suspense fallback={<CenteredLoader />}>
                      <SingleFormLayout />
                    </Suspense>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/manage-problems/add-multiple-icpc"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Suspense fallback={<CenteredLoader />}>
                      <ICPCMultipleForm />
                    </Suspense>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/manage-problems/add-interview"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Suspense fallback={<CenteredLoader />}>
                      <InterviewForm />
                    </Suspense>
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
                    <Suspense fallback={<CenteredLoader />}>
                      <Interview />
                    </Suspense>
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
