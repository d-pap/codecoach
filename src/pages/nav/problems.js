// /**
//  * Problems page
//  * This page shows all of the problems and is where
//  * users will select a problem they want to solve,
//  * then be taken to the Problem Detail page to solve it.
//  */

import React, { useState, useEffect } from 'react'
import {
  Button,
  Stack,
  Typography,
  Paper,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { fetchProblems } from '../../api'

function Problems() {
  const navigate = useNavigate()
  const theme = useTheme()
  const isLaptopScreen = useMediaQuery(theme.breakpoints.up('md'))

  const [loading, setLoading] = useState(true)
  const [problems, setProblems] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadProblems() {
      try {
        const data = await fetchProblems()
        setProblems(data)
        setLoading(false)
      } catch (err) {
        setError('Error fetching problems')
        setLoading(false)
      }
    }
    loadProblems()
  }, [])

  /**
   * Once the problems are loaded, they are stored in the state and can be passed to the problem pages.
   * The state is preserved when navigating between pages, so the problems are available to the problem pages.
   * The database will theoretically not be queried again when the user goes back to the problems page.
   */
  const navigateTo = (path) => {
    if (!loading) {
      navigate(path, { state: { problems } })
    }
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <div className="header" style={{ marginBottom: '20px' }}>
        <h1>Problems</h1>
      </div>
      <div
        className="button-container"
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <Stack spacing={4} alignItems="center">
          <Paper
            elevation={3}
            style={{
              padding: '20px',
              backgroundColor: '#f5f5f5',
              borderRadius: '8px',
              width: isLaptopScreen ? '500px' : '90%', // Set width based on screen size
              maxWidth: '600px', // Optional: max width for very large screens
            }}
          >
            <Button
              variant="contained"
              onClick={() => navigateTo('/problems/icpc')}
              style={{ width: '100%', marginBottom: '16px' }}
              disabled={loading}
            >
              ICPC
            </Button>
            <Typography
              variant="body1"
              align="center"
              style={{ maxWidth: '100%' }}
            >
              ICPC stands for The International Collegiate Programming Contest.
              This contest is one of the most prestigious competitive
              programming contests globally. The problems included in the ICPC
              section are derived from various past ICPC competitions and cover
              a broad range of topics. Participants are challenged with complex
              algorithmic problems that test their problem-solving skills under
              time constraints. These problems are designed to challenge
              participants’ ability to apply theoretical knowledge to practical
              scenarios and to think critically and efficiently.
            </Typography>
          </Paper>
          <Paper
            elevation={3}
            style={{
              padding: '20px',
              backgroundColor: '#f5f5f5',
              borderRadius: '8px',
              width: isLaptopScreen ? '500px' : '90%', // Set width based on screen size
              maxWidth: '600px', // Optional: max width for very large screens
            }}
          >
            <Button
              variant="contained"
              onClick={() => navigateTo('/problems/programming')}
              style={{ width: '100%', marginBottom: '16px' }}
              disabled={loading}
            >
              Programming
            </Button>
            <Typography
              variant="body1"
              align="center"
              style={{ maxWidth: '100%' }}
            >
              The Programming section includes a variety of problems designed to
              enhance your coding skills and problem-solving abilities. Topics
              covered in this section span a wide array of common programming
              challenges such as algorithms, data structures, complexity
              analysis, sorting and searching, dynamic programming, and more.
              This section aims to provide a comprehensive training ground for
              individuals to refine their programming skills, prepare for coding
              interviews, or simply enjoy solving interesting and challenging
              problems.
            </Typography>
          </Paper>
          <Paper
            elevation={3}
            style={{
              padding: '20px',
              backgroundColor: '#f5f5f5',
              borderRadius: '8px',
              width: isLaptopScreen ? '500px' : '90%', // Set width based on screen size
              maxWidth: '600px', // Optional: max width for very large screens
            }}
          >
            <Button
              variant="contained"
              onClick={() => navigateTo('/problems/interview')}
              style={{ width: '100%', marginBottom: '16px' }}
              disabled={loading}
            >
              Interview
            </Button>
            <Typography
              variant="body1"
              align="center"
              style={{ maxWidth: '100%' }}
            >
              The Interview section focuses on questions commonly asked by FANG
              (Facebook, Amazon, Netflix, Google) companies during technical
              interviews. This section is designed to help students and
              professionals prepare for the types of questions they might
              encounter in real-world technical interviews. Topics include
              algorithmic problem solving, system design, coding challenges, and
              behavioral questions. Each question is crafted to mimic real
              interview scenarios, helping candidates to practice and improve
              their responses to excel in their job interviews.
            </Typography>
          </Paper>
        </Stack>
      </div>
    </div>
  )
}

export default Problems
