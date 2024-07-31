/**
 * Problems page
 * This page shows all of the problems and is where
 * users will select a problem they want to solve,
 * then be taken to the Problem Detail page to solve it.
 */

import React, { useState, useEffect } from 'react'
import { fetchProblems } from '../../api'
import ProblemCard from '../../components/problems/ProblemCardLayout'
import { Stack } from '@mui/material'

function Problems() {
  const [problems, setProblems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function getProblems() {
      try {
        const data = await fetchProblems()
        setProblems(data)
        setLoading(false)
      } catch (err) {
        setError('Error fetching problems')
        setLoading(false)
      }
    }
    getProblems()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  return (
    <div className="newsletter_section layout_padding">
      <div className="header">
        <h1>Problems</h1>
        <h3>Select a problem to get started</h3>
      </div>
      <div className="container">
        <div id="leftcolumn">
          <div className="dropdown">
            <label htmlFor="language">Choose language: </label>
            <select id="language">
              <option value="python">Python</option>
              <option value="cpp">C++</option>
              <option value="java">Java</option>
            </select>
          </div>
          <div className="dropdown">
            <label htmlFor="difficulty">Choose difficulty: </label>
            <select id="difficulty">
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>
        <div id="rightcolumn">
          <ul>
            {problems.map((problem) => (
              <Stack key={problem._id} spacing={2}>
                <ProblemCard problem={problem} />
              </Stack>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Problems
