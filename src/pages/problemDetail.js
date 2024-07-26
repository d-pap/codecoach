import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { fetchProblemById } from "../api"

function ProblemDetail() {
  // hold problem data
  const [problem, setProblem] = useState(null)
  // indicate if data is still loading
  const [loading, setLoading] = useState(true)
  // hold any error message
  const [error, setError] = useState(null)
  // extract problem ID from the URL
  const { id } = useParams()

  useEffect(() => {
    async function getProblem() {
      try {
        const data = await fetchProblemById(id)

        // filter out `_id` field from test cases
        const filteredData = {
          ...data,
          testCases: data.testCases.map(({ _id, ...rest }) => rest),
        }
        setProblem(filteredData)
        setLoading(false) // set loading to false
      } catch (err) {
        // error message if fetch fails
        setError("Error fetching problem details")
        setLoading(false) // set loading to false bc fetch attempt is complete
      }
    }
    getProblem()
  }, [id]) // dependency array with ID to re-fetch if ID changes

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>
  if (!problem) return <div>Problem not found</div>

  /**
   * Page rendering
   */
  return (
    <div>
      <h1>{problem.title}</h1>
      <h2>Description</h2>
      <p>{problem.description}</p>
      <h2>Example Inputs</h2>
      <pre>{JSON.stringify(problem.exampleInputs, null, 2)}</pre>
      <h2>Example Outputs</h2>
      <pre>{JSON.stringify(problem.exampleOutputs, null, 2)}</pre>
      <h2>Test Cases</h2>
      <pre>{JSON.stringify(problem.testCases, null, 2)}</pre>
    </div>
  )
}

export default ProblemDetail
