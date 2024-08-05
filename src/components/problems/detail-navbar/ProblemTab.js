/**
 * This tab will be used to display the problem to the user.
 */

import React from 'react'
import NavbarStack from './NavbarStack'

const ProblemTab = ({ problem }) => {
  return (
    <NavbarStack>
      <h2>Description</h2>
      <p>{problem.description}</p>
      <h2>Example Inputs</h2>
      <pre>{JSON.stringify(problem.exampleInputs, null, 2)}</pre>
      <h2>Example Outputs</h2>
      <pre>{JSON.stringify(problem.exampleOutputs, null, 2)}</pre>
      <h2>Test Cases</h2>
      <pre>{JSON.stringify(problem.testCases, null, 2)}</pre>
    </NavbarStack>
  )
}

export default ProblemTab
