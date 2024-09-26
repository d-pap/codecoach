/**
 * This tab will be used to display the problem to the user.
 */

import React, { Suspense, lazy } from 'react'
import CenteredCircleLoader from '../../utility/CenteredLoader'

// Dynamically import NavbarStack to optimize bundle size
const NavbarStack = lazy(() => import('./NavbarStack'))

/**
 * ProblemTab component to display problem details.
 *
 * @param {object} props - Component props
 * @param {object} props.problem - Problem details
 * @returns {JSX.Element} The rendered ProblemTab component
 */
const ProblemTab = ({ problem }) => {
  return (
    // Suspense handles the loading state of NavbarStack
    <Suspense fallback={<CenteredCircleLoader />}>
      <NavbarStack>
        <h3>Description</h3>
        <p>{problem.description}</p>
        <h3>Input</h3>
        <pre>{JSON.stringify(problem.exampleInputs, null, 2)}</pre>
        <h3>Output</h3>
        <pre>{JSON.stringify(problem.exampleOutputs, null, 2)}</pre>
        <h3>Examples</h3>
        <pre>{JSON.stringify(problem.testCases, null, 2)}</pre>
      </NavbarStack>
    </Suspense>
  )
}

export default ProblemTab
