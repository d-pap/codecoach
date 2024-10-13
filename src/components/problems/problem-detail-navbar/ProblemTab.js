/**
 * This tab will be used to display the problem to the user.
 */

import React, { Suspense, lazy } from 'react'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import CenteredCircleLoader from '../../utility/CenteredLoader'
import theme from '../../../theme'
// Dynamically import NavbarStack to optimize bundle size
const NavbarStack = lazy(() => import('./NavbarStack'))

const ProblemDetailsHeaders = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  marginTop: theme.spacing(1),
}))

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
      <NavbarStack>
        <Box>
          <ProblemDetailsHeaders variant="h6" sx={{ fontWeight: 'bold' }}>
            {' '}
            Description
          </ProblemDetailsHeaders>
          <Typography
            variant="small"
            sx={{
              lineHeight: '1.75rem',
            }}
          >
            {problem.description}
          </Typography>

          <ProblemDetailsHeaders variant="h6" sx={{ fontWeight: 'bold' }}>
            Input
          </ProblemDetailsHeaders>
          <Typography
            variant="small"
            sx={{
              lineHeight: '1.75rem',
            }}
          >
            {problem.exampleInputs}
          </Typography>

          <ProblemDetailsHeaders variant="h6" sx={{ fontWeight: 'bold' }}>
            Output
          </ProblemDetailsHeaders>
          <Typography
            variant="small"
            sx={{
              lineHeight: '1.75rem',
            }}
          >
            {problem.exampleOutputs}
          </Typography>

          <ProblemDetailsHeaders variant="h6" sx={{ fontWeight: 'bold' }}>
            Examples
          </ProblemDetailsHeaders>
          <pre
            style={{
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word',
              overflowWrap: 'break-word',
              maxWidth: '100%',
              fontFamily:
                'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
              fontSize: '0.875rem',
              backgroundColor: theme.palette.grey[100],
              borderRadius: theme.spacing(2),
              margin: '1rem 0',
              padding: theme.spacing(2),
              paddingLeft: theme.spacing(3),
            }}
          >
            {JSON.stringify(problem.testCases, null, 2)}
          </pre>
        </Box>
      </NavbarStack>
    </Suspense>
  )
}

export default ProblemTab
