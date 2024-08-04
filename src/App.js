/**
 * Main component of app. Gets rendered by index.js
 * Central hub where we assemble our other components and
 * tie everything together like layout, routes, etc.
 */

import React from 'react'
import './App.css'
// import Navbar from "./components/Navbar"
import Header from './components/Header-Footer/Header'
import Footer from './components/Header-Footer/Footer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages'
import About from './pages/nav/about'
import Problems from './pages/nav/problems'
import SignUp from './pages/nav/signup'
import ProblemDetail from './pages/problems/problemDetail'
import AddProblems from './pages/nav/addProblems'
import ICPC from './components/problems/problem-types/ICPC'
import Interview from './components/problems/problem-types/Interview'
import Programming from './components/problems/problem-types/Programming'

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/problems" element={<Problems />} />
        <Route path="/problems/:id" element={<ProblemDetail />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/addProblems" element={<AddProblems />} />
        <Route path="/problems/icpc" element={<ICPC />} />
        <Route path="/problems/interview" element={<Interview />} />
        <Route path="/problems/programming" element={<Programming />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
