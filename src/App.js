import React from "react"
import "./App.css"
import Navbar from "./components/Navbar"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/home"
import About from "./pages/about"
import Problems from "./pages/problems"
import ProblemDetail from "./pages/problemDetail"
import SignUp from "./pages/signup"
import LlmChat from "./pages/llmChat"

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/problems" element={<Problems />} />
        <Route path="/problems/:id" element={<ProblemDetail />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/llm-chat" element={<LlmChat />} />
      </Routes>
    </Router>
  )
}

export default App
