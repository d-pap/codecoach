/**
 * This tab will be used to display the problem to the user.
 */

import React from 'react'
import NavbarStack from './NavbarStack'

const ProblemTab = ({ problem }) => {
  return (
    <NavbarStack>
      <h3>Description</h3>
      <p>{problem.description}</p>
      <h3>Example Inputs</h3>
      <pre>{JSON.stringify(problem.exampleInputs, null, 2)}</pre>
      <h3>Example Outputs</h3>
      <pre>{JSON.stringify(problem.exampleOutputs, null, 2)}</pre>
      <h3>Test Cases</h3>
      <pre>{JSON.stringify(problem.testCases, null, 2)}</pre>
    </NavbarStack>
  )
}

export default ProblemTab
