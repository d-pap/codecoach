import React, { Suspense, lazy } from 'react'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import CenteredCircleLoader from '../../utility/CenteredLoader'
import theme from '../../../theme'

// Dynamically import NavbarStack to optimize bundle size
const NavbarStack = lazy(() => import('./NavbarStack'))

// Difficulty color function
const difficultyColor = (difficulty) => {
  switch (difficulty) {
    case 'Easy':
      return 'green'
    case 'Medium':
      return 'orange' // Orange is more visible than yellow
    case 'Hard':
      return 'red'
    default:
      return 'grey'
  }
}

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
        {problem.type === 'interview' && (
          <Box
            sx={{
              flexGrow: 1,
              marginBottom: 2,
            }}
          >
            <Grid container alignItems="center">
              {/* Topics - Left Aligned */}
              <Grid item xs={12} sm={4} padding={1}>
                <Typography variant="caption" color="textSecondary">
                  <strong>Topics:</strong>{' '}
                  {problem.topics && problem.topics.length > 0
                    ? problem.topics.join(', ')
                    : 'No Topics Available'}
                </Typography>
              </Grid>

              {/* Difficulty - Center Aligned */}
              <Grid
                item
                xs={12}
                sm={4}
                padding={1}
                container
                justifyContent="center"
              >
                <Typography
                  variant="caption"
                  style={{ color: difficultyColor(problem.difficulty) }}
                >
                  <strong>Difficulty:</strong>{' '}
                  {problem.difficulty || 'Unknown Difficulty'}
                </Typography>
              </Grid>

              {/* Companies - Right Aligned */}
              <Grid
                item
                xs={12}
                sm={4}
                container
                padding={1}
                justifyContent="flex-end"
              >
                <Typography variant="caption" color="textSecondary">
                  <strong>Companies:</strong>{' '}
                  {problem.companies && problem.companies.length > 0
                    ? problem.companies.join(', ')
                    : 'No Companies Available'}
                </Typography>
              </Grid>
            </Grid>
            <Divider />
          </Box>
        )}
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
