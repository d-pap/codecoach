/**
 * Problem Solving page
 * Where the user will solve the code problems
 * and submit solutions after selected a problem
 * from the problems list on Problems page
 */

import React, { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { fetchProblemById } from '../../api'
import ProblemDetailLayout from '../../components/problems/ProblemDetailLayout'
import ProblemDetails from '../../components/problems/ProblemDetails'

function ProblemDetail() {
  // state variables
  const location = useLocation() // get location object
  const problemFromLocation = location.state?.problem // get problem from location state
  const { id } = useParams() // extract problem ID from URL
  const [problem, setProblem] = useState(null) // hold problem data
  const [loading, setLoading] = useState(true) // indicate if data is still loading
  const [error, setError] = useState(null) // hold any error message

  useEffect(() => {
    // run side effect to get problem data when component mounts or ID changes
    async function getProblem() {
      try {
        let problem = problemFromLocation
        if (!problemFromLocation) {
          problem = await fetchProblemById(id)
        }

        // filter out `_id` field from test cases
        const filteredProlem = {
          ...problem,
          testCases: problem.testCases.map(({ _id, ...rest }) => rest),
        }
        setProblem(filteredProlem)
        setLoading(false) // set loading to false
      } catch (err) {
        // error message if fetch fails
        setError('Error fetching problem details')
        setLoading(false) // set loading to false bc fetch attempt is complete
      }
    }
    getProblem()
  }, [id, problemFromLocation]) // dependency array with ID to re-fetch if ID changes

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>
  if (!problem) return <div>Problem not found</div>

  /**
   * Page rendering
   */
  return (
    <ProblemDetailLayout
      // render layout and pass ProblemDetails and
      // codeEditor as props
      problemDetails={<ProblemDetails problem={problem} />}
    />
  )
}

export default ProblemDetail
