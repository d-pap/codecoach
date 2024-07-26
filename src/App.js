import React from "react"
import "./App.css"
import Navbar from "./components/Navbar"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages"
import About from "./pages/about"
import Problems from "./pages/problems"
import SignUp from "./pages/signup"
import LlmChat from "./pages/llmChat"

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/problems" element={<Problems />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/llm-chat" element={<LlmChat />} />
      </Routes>
    </Router>
  )
}

export default App
