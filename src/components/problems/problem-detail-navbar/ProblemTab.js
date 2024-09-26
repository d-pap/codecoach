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
    <Suspense fallback={<CenteredCircleLoader />}>
      <NavbarStack >
        <h3>Description</h3>
        <p>{problem.description}</p>
        <h3>Input</h3>
        <p>{problem.exampleInputs}</p>
        <h3>Output</h3>
        <p>{problem.exampleOutputs}</p>
        <h3>Examples</h3>
        <pre
          style={{
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
            maxWidth: '100%',
          }}
        >
          {JSON.stringify(problem.testCases, null, 2)}
        </pre>
      </NavbarStack>
    </Suspense>
  )
}

export default ProblemTab
