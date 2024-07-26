import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { fetchProblemById } from "../api"

function ProblemDetail() {
  const [problem, setProblem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
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
        setLoading(false)
      } catch (err) {
        setError("Error fetching problem details")
        setLoading(false)
      }
    }
    getProblem()
  }, [id])

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>
  if (!problem) return <div>Problem not found</div>

  /**
   * Page styling
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
