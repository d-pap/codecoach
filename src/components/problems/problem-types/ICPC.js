/**
 * Section for loading ICPC questions and displaying to the user.
 * The user can filter the questions by region and year.
 */

import React, { useState, useEffect } from 'react'
import { fetchProblems } from '../../../api'
import ProblemCard from '../ProblemCardLayout'
import { ICPCFilter, ICPCFilterDisplay } from './problem-filters/ICPCFilter'
import { Stack } from '@mui/material'
import ResizableColumn from '../../formating/ResizableColumn'

function ICPC() {
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

  const filteredProblems = ICPCFilter(problems, region, year)

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
        <h1>ICPC Problems</h1>
      </div>
      <div className="container" style={{ display: 'flex' }}>
        <ResizableColumn initialWidth={200}>
          <h3>Filters</h3>
          <ICPCFilterDisplay
            region={region}
            year={year}
            onRegionChange={handleRegionChange}
            onYearChange={handleYearChange}
          />
        </ResizableColumn>
        <div id="rightcolumn" style={{ flex: 1, padding: '0 10px' }}>
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

export default ICPC
