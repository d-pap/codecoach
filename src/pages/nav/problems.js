// /**
//  * Problems page
//  * This page shows all of the problems and is where
//  * users will select a problem they want to solve,
//  * then be taken to the Problem Detail page to solve it.
//  */

import React, { useState, useEffect } from 'react'
import { fetchProblems } from '../../api'
import ProblemCard from '../../components/problems/ProblemCardLayout'
import { Stack, Select, MenuItem, InputLabel, FormControl } from '@mui/material'

function Problems() {
  const [problems, setProblems] = useState([])
  const [region, setRegion] = useState('all')
  const [year, setYear] = useState('all')
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

  // Filtering the problems based on selected region and year
  const filteredProblems = problems.filter((problem) => {
    const regionMatch = region === 'all' || problem.contestRegion === region
    const yearMatch = year === 'all' || problem.contestYear === year
    return regionMatch && yearMatch
  })

  const handleRegionChange = (event) => {
    setRegion(event.target.value)
  }

  const handleYearChange = (event) => {
    setYear(event.target.value)
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  return (
    <div className="newsletter_section layout_padding">
      <div className="header">
        <h1>Problems</h1>
      </div>
      <div className="container">
        <div id="leftcolumn" style={{ width: '15%' }}>
          <h3>Filters</h3>
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel id="region-label">ICPC Contest Region</InputLabel>
            <Select
              labelId="region-label"
              value={region}
              onChange={handleRegionChange}
              label="ICPC Contest Region"
            >
              <MenuItem value="all">All Regions</MenuItem>
              <MenuItem value="World">World</MenuItem>
              <MenuItem value="NA">North America</MenuItem>
              <MenuItem value="EU">Europe</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel id="year-label">ICPC Contest Year</InputLabel>
            <Select
              labelId="year-label"
              value={year}
              onChange={handleYearChange}
              label="ICPC Contest Year"
            >
              <MenuItem value="all">All Years</MenuItem>
              <MenuItem value="2021">2021</MenuItem>
              <MenuItem value="2020">2020</MenuItem>
              <MenuItem value="2019">2019</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div id="rightcolumn" style={{ flex: 1 }}>
          <ul>
            {filteredProblems.length > 0 ? (
              filteredProblems.map((problem) => (
                <Stack key={problem._id} spacing={2}>
                  <ProblemCard problem={problem} />
                </Stack>
              ))
            ) : (
              <p>No problems found</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Problems
