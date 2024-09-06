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
      <h3>Input</h3>
      <p>{JSON.stringify(problem.exampleInputs, null, 2)}</p>
      <h3>Output</h3>
      <p>{JSON.stringify(problem.exampleOutputs, null, 2)}</p>
      <h3>Examples</h3>
      <pre>{JSON.stringify(problem.testCases, null, 2)}</pre>
    </NavbarStack>
  )
}

export default ProblemTab
