/**
 * Main component of app. Gets rendered by index.js
 * Central hub where we assemble our other components and
 * tie everything together like layout, routes, etc.
 */
import React from "react"
import "./App.css"
// import Navbar from "./components/Navbar"
import Header from "./components/Header-Footer/Header"
import Footer from "./components/Header-Footer/Footer"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages"
import About from "./pages/about"
import Problems from "./pages/problems"
import ProblemDetail from "./pages/problemDetail"
import SignUp from "./pages/signup"
import AddProblems from "./pages/nav/addProblems";

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
      </Routes>
      <Footer />
    </Router>
  )
}

export default App;
