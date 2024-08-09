/**
 * Section for loading ICPC questions and displaying to the user.
 * The user can filter the questions by region and year.
 */

import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import ProblemCardLayout from '../../../components/problems/ProblemCardLayout'
import {
  ICPCFilter,
  ICPCFilterDisplay,
} from '../../../components/problems/problem-filters/ICPCFilter'
import { Stack } from '@mui/material'
import ResizableColumn from '../../../components/utility/ResizableColumn'

function ICPC() {
  const location = useLocation()
  const problems = location.state?.problems
  const [region, setRegion] = useState('all')
  const [year, setYear] = useState('all')
  const [filteredProblems, setFilteredProblems] = useState(problems)

  useEffect(() => {
    setFilteredProblems(ICPCFilter(problems, region, year))
  }, [problems, region, year])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [resizableColumnProps, setResizableColumnProps] = useState({
    initialWidth: 0,
    minWidth: 0,
    maxWidth: 0,
  })

  useEffect(() => {
    function getResizableColumnProps() {
      const windowWidth = window.innerWidth

      // Calculate dimensions based on window width
      const minWidth = windowWidth * 0.2
      const maxWidth = windowWidth * 0.3
      const initialWidth = windowWidth * 0.25

      return { initialWidth, maxWidth, minWidth }
    }

    const updateColumnProps = () => {
      setResizableColumnProps(getResizableColumnProps())
    }

    updateColumnProps()
    window.addEventListener('resize', updateColumnProps)
    return () => window.removeEventListener('resize', updateColumnProps)
  }, [])

  const handleRegionChange = (event) => {
    setRegion(event.target.value)
  }

  const handleYearChange = (event) => {
    setYear(event.target.value)
  }

  return (
    <div className="newsletter_section layout_padding">
      <div className="header">
        <h1>ICPC Problems</h1>
      </div>
      <div className="container" style={{ display: 'flex' }}>
        <ResizableColumn
          initialWidth={resizableColumnProps.initialWidth}
          minWidth={resizableColumnProps.minWidth}
          maxWidth={resizableColumnProps.maxWidth}
        >
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
                  <ProblemCardLayout problem={problem} />
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
