/**
 * Main component of app. Gets rendered by index.js
 * Central hub where we assemble our other components and
 * tie everything together like layout, routes, etc.
 */
import React, { useEffect, useState, Suspense, lazy } from 'react'
import { Amplify, Auth } from 'aws-amplify'
// eslint-disable-next-line
import '@aws-amplify/ui-react/styles.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import Box from '@mui/material/Box'
import CenteredCircleLoader from './components/utility/CenteredLoader'
import awsExports from './aws-exports'
import Header from './components/Header-Footer/Header'
import Footer from './components/Header-Footer/Footer'
import ProtectedRoute from './components/auth/ProtectedRoute'
import theme from './theme'
import AuthModal from './components/auth/AuthModal'
import CenteredLoader from './components/utility/CenteredLoader'
import Problems from './pages/Problems'
import ProblemSolving from './pages/ProblemSolving'
import './App.css'
import ScrollToTop from './components/utility/ScrollToTop'
import AddCourseContent from './pages/AddCourseContent'

// Dynamic Imports
const LandingPage = lazy(() => import('./pages/LandingPage'))
const Home = lazy(() => import('./pages/Home'))
const Courses = lazy(() => import('./pages/Courses'))
const ManageProblemsPage = lazy(() => import('./pages/problems/ManageProblems'))
const SingleFormLayout = lazy(
  () => import('./pages/problems/add-problems/ICPCSingleForm')
)
const ICPCMultipleForm = lazy(
  () => import('./pages/problems/add-problems/ICPCMultipleForm')
)
const InterviewForm = lazy(
  () => import('./pages/problems/add-problems/InterviewForm')
)

const Interview = lazy(() => import('./pages/Interview'))
const Resume = lazy(() => import('./pages/Resume'))
const NotFound = lazy(() => import('./pages/NotFound'))

Amplify.configure(awsExports)

function App() {
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
          <AppContent />
        </Box>
      </ThemeProvider>
    </Router>
  )
}

function AppContent() {
  const [showAuth, setShowAuth] = useState(false)
  const [authScreen, setAuthScreen] = useState('signin')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const location = useLocation() // get the current route (for conditional rendering footer)

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
    return <CenteredCircleLoader />
  }

  const handleAcceptCookies = () => {
    localStorage.setItem('userConsent', 'true')
  }

  //! exclude footer on problem solving page only
  const excludeFooterPaths = ['/problems/']
  const shouldShowFooter = !excludeFooterPaths.some((path) =>
    location.pathname.startsWith(path)
  )

  return (
    <>
      {isAuthenticated && <Header />}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <ScrollToTop />
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
            path="/courses"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Suspense fallback={<CenteredLoader />}>
                  <Courses />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="/courses/:courseId/add-content"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <AddCourseContent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/problems/:problemId"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <ProblemSolving />
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
            path="/problems"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Problems />
              </ProtectedRoute>
            }
          />
          <Route
            path="/interviews"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Suspense fallback={<CenteredLoader />}>
                  <Interview />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="/resume"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Resume />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>
      {shouldShowFooter && <Footer />}
    </>
  )
}

export default App
