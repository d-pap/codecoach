/**
 * Problem Solving page
 * Where the user will solve the code problems
 * and submit solutions after selecting a problem
 * from the problems list on the Problems page
 */

import React, { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { fetchProblemById } from '../../api'
import ProblemDetailLayout from '../../components/problems/ProblemDetailLayout'
import ProblemDetails from '../../components/problems/ProblemDetails'
import { LinearProgress } from '@mui/material'

function ProblemDetail() {
  const location = useLocation()
  const problemFromLocation = location.state?.problem
  const { problemId } = useParams() // extract problem ID from URL

  const [problem, setProblem] = useState(problemFromLocation || null)
  const [isLoading, setIsLoading] = useState(!problemFromLocation)
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!problemFromLocation) {
      setIsLoading(true)
      fetchProblemById(problemId)
        .then((data) => {
          // Remove _id from testCases attribute
          const cleanedData = {
            ...data,
            testCases: data.testCases.map(({ _id, ...rest }) => rest),
          }
          setProblem(cleanedData)
          setIsLoading(false)
        })
        .catch((err) => {
          setError(err)
          setIsError(true)
          setIsLoading(false)
        })
    }
  }, [problemId, problemFromLocation])

  if (isLoading) {
    return <LinearProgress /> // You can replace this with a skeleton loader if preferred
  }

  if (isError) {
    return <div>Error loading problem: {error.message}</div>
  }

  if (!problem) {
    return <div>Problem not found</div>
  }

  /**
   * Page rendering
   */
  return (
    <ProblemDetailLayout
      problem={problem}
      problemDetails={<ProblemDetails problem={problem} />}
    />
  )
}

export default ProblemDetail
