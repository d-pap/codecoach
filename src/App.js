// import React from "react"
// import "./App.css"
// import Navbar from "./components/Navbar"
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
// import Home from "./pages"
// import About from "./pages/about"
// import Problems from "./pages/problems"
// import SignUp from "./pages/signup"

// function App() {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/problems" element={<Problems />} />
//         <Route path="/sign-up" element={<SignUp />} />
//       </Routes>
//     </Router>
//   )
// }

// export default App

// src/App.js
import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/index"
import About from "./pages/about"
import Problems from "./pages/problems"
import SignUp from "./pages/signup"

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/problems" element={<Problems />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  )
}

export default App
