/**
 * Component that displays the problem details on problem solving page
 * Use wherever we need to display problem details.
 */
import React from "react"
import styled from "styled-components"

// styled container to show problem details
const DetailContainer = styled.div`
  h1 {
    color: #333;
  }
  h2 {
    color: #666;
    margin-top: 20px;
  }
  pre {
    background-color: #f5f5f5;
    padding: 10px;
    border-radius: 5px;
  }
`

// render the problem details
const ProblemDetails = ({ problem }) => {
  if (!problem) return <div>Loading problem details...</div>

  return (
    <DetailContainer>
      <h1>{problem.title}</h1>
      <p>{problem.description}</p>
      <h2>Example Inputs:</h2>
      <pre>{JSON.stringify(problem.exampleInputs, null, 2)}</pre>
      <h2>Example Outputs:</h2>
      <pre>{JSON.stringify(problem.exampleOutputs, null, 2)}</pre>
      <h2>Test Cases:</h2>
      <pre>{JSON.stringify(problem.testCases, null, 2)}</pre>
    </DetailContainer>
  )
}

export default ProblemDetails
