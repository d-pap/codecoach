// /**
//  * Main component of app. Gets rendered by index.js
//  * Central hub where we assemble our other components and
//  * tie everything together like layout, routes, etc.
//  */

// import React from 'react'
// import './App.css'
// // import Navbar from "./components/Navbar"
// import Header from './components/Header-Footer/Header'
// import Footer from './components/Header-Footer/Footer'
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import Home from './pages'
// import About from './pages/nav/about'
// import Problems from './pages/nav/problems'
// import SignUp from './pages/nav/signup'
// import ProblemDetail from './pages/problems/problemDetail'
// import AddProblems from './pages/nav/addProblems'
// import ICPC from './pages/problems/problem-types/ICPC'
// import Interview from './pages/problems/problem-types/Interview'
// import Programming from './pages/problems/problem-types/Programming'
// import { Box } from '@mui/material'
// import { createTheme, ThemeProvider } from '@mui/material/styles'
// import theme from './theme'

// // const theme = createTheme({
// //   /**
// //    * TODO:
// //    * - fonts
// //    * - colors for button hover, links(?)
// //    * - divider color
// //    *
// //    */
// //   palette: {
// //     mode: 'light',
// //     primary: {
// //       // for buttons bg, active links
// //       main: '#6C63FF',
// //     },
// //     background: {
// //       default: '#fffffe', // main background color
// //       paper: '#fffffe', // card background, etc.
// //       caution: '#FFF3CD', // caution color
// //     },
// //     text: {
// //       primary: '#333333', // default font color
// //       secondary: '#6C63FF', // secondary font color
// //     },
// //     divider: '#0000001f', // default color
// //     caution: {
// //       main: '#856404', // caution font color
// //       bg: '#FFF3CD', // caution background color
// //     },
// //   },
// //   shape: {
// //     borderRadius: 8, // border radius
// //   },
// //   spacing: 8, // default spacing unit
// //   typography: {
// //     fontFamily: 'Roboto, Helvetica, Arial, sans-serif', //TODO: update these fonts here and in index.css!
// //     fontSize: 14, // default font size
// //     fontWeightLight: 300, //? what are these for and how are they used?
// //     fontWeightRegular: 400,
// //     fontWeightMedium: 500,
// //     fontWeightBold: 700,
// //     h1: {
// //       fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
// //       fontWeight: 700,
// //       fontSize: '6rem',
// //       lineHeight: 1.167, // default h1 line height
// //       letterSpacing: '-0.01562em', // default h1 letter spacing
// //       color: '#000000', //TODO: update color
// //     },
// //     h2: {
// //       fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
// //       fontWeight: 300,
// //       fontSize: '3.75rem',
// //     },
// //     h3: {
// //       fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
// //       fontWeight: 400,
// //       fontSize: '3rem',
// //     },
// //     h4: {
// //       fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
// //       fontWeight: 400,
// //       fontSize: '2.125rem',
// //     },
// //     h5: {
// //       fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
// //       fontWeight: 400,
// //       fontSize: '1.5rem',
// //     },
// //     h6: {
// //       fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
// //       fontWeight: 500,
// //       fontSize: '1.25rem',
// //     },
// //     subtitle1: {
// //       fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
// //       fontWeight: 400,
// //       fontSize: '1rem',
// //     },
// //     body1: {
// //       fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
// //       fontWeight: 400,
// //       fontSize: '1rem',
// //       lineHeight: 1.5, // default body text line height
// //       letterSpacing: '0.00938em', // default body text letter spacing
// //       color: '#333333',
// //     },
// //     body2: {
// //       fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
// //       fontWeight: 400,
// //       fontSize: '0.875rem',
// //       lineHeight: 1.43, // default body text line height
// //       letterSpacing: '0.01071em', // default body text letter spacing
// //       color: '#333333',
// //     },
// //     button: {
// //       //TODO: update this
// //       fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
// //       fontWeight: 500,
// //       fontSize: '0.875rem',
// //       lineHeight: 1.75, // default button text line height
// //       letterSpacing: '0.02857em', // default button text letter spacing
// //       textTransform: 'none', //! dont capitalize button text?
// //     },
// //   },
// //   components: {
// //     MuiButton: {
// //       styleOverrides: {
// //         root: {
// //           textTransform: 'none', // don't capitalize button text
// //           borderRadius: 16, // button border radius
// //         },
// //       },
// //     },
// //   },
// // })

// function App() {
//   return (
//     <Router>
//       <ThemeProvider theme={theme}>
//         <Box // wrap the entire app in a flex container to make app take full viewport height
//           sx={{
//             display: 'flex',
//             flexDirection: 'column',
//             minHeight: '100vh', // make app take up the full height of the screen
//           }}
//         >
//           {/* <Navbar /> */}
//           <Header />
//           <Box // wrap main content area in a flex container to push footer down on pages with little content
//             component="main"
//             sx={{
//               flexGrow: 1, // main area grows to push footer down
//               display: 'flex',
//               flexDirection: 'column',
//             }}
//           >
//             <Routes>
//               <Route path="/" element={<Home />} />
//               <Route path="/about" element={<About />} />
//               <Route path="/problems" element={<Problems />} />
//               <Route path="/problems/:id" element={<ProblemDetail />} />
//               <Route path="/sign-up" element={<SignUp />} />
//               <Route path="/addProblems" element={<AddProblems />} />
//               <Route path="/problems/icpc" element={<ICPC />} />
//               <Route path="/problems/interview" element={<Interview />} />
//               <Route path="/problems/programming" element={<Programming />} />
//             </Routes>
//           </Box>
//           <Footer />
//         </Box>
//       </ThemeProvider>
//     </Router>
//   )
// }

// export default App

import React, { useState } from 'react'
import './App.css'

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
//import SignUp from './components/SignUp'
import AddProblems from './pages/nav/addProblems'
import ICPCFormPage from './pages/problems/add-problems/ICPCFormPage'
import ICPC from './pages/problems/problem-types/ICPC'
import Interview from './pages/problems/problem-types/Interview'
import Programming from './pages/problems/problem-types/Programming'
import theme from './theme'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleLogin = () => {
    //! implement login logic here
    setIsAuthenticated(true)
  }

  const handleRegister = () => {
    //! implement registration logic here
    setIsAuthenticated(true)
  }

  //! bypass authentication for development
  //! set to false to enable authentication (after implementing the logic)
  const bypassAuth = false

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
          {(isAuthenticated || bypassAuth) && <Header />}
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
                  isAuthenticated || bypassAuth ? (
                    <Navigate to="/home" />
                  ) : (
                    <LandingPage
                      onLogin={handleLogin}
                      onRegister={handleRegister}
                    />
                  )
                }
              />
              <Route
                path="/home"
                element={
                  isAuthenticated || bypassAuth ? <Home /> : <Navigate to="/" />
                }
              />
              <Route
                path="/about"
                element={
                  isAuthenticated || bypassAuth ? (
                    <About />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              <Route
                path="/problems"
                element={
                  isAuthenticated || bypassAuth ? (
                    <Problems />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              <Route
                path="/problems/:id"
                element={
                  isAuthenticated || bypassAuth ? (
                    <ProblemDetail />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              <Route
                path="/addProblems"
                element={
                  isAuthenticated || bypassAuth ? (
                    <AddProblems />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              <Route
                path="/addProblems/singleICPC"
                element={
                  isAuthenticated || bypassAuth ? (
                    <ICPCFormPage />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              <Route
                path="/problems/icpc"
                element={
                  isAuthenticated || bypassAuth ? <ICPC /> : <Navigate to="/" />
                }
              />
              <Route
                path="/problems/interview"
                element={
                  isAuthenticated || bypassAuth ? (
                    <Interview />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              <Route
                path="/problems/programming"
                element={
                  isAuthenticated || bypassAuth ? (
                    <Programming />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
            </Routes>
          </Box>
          {(isAuthenticated || bypassAuth) && <Footer />}
        </Box>
      </ThemeProvider>
    </Router>
  )
}

export default App
