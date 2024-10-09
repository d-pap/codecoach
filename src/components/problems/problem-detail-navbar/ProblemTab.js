import React, { Suspense, lazy } from 'react';
import CenteredCircleLoader from '../../utility/CenteredLoader';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// Dynamically import NavbarStack to optimize bundle size
const NavbarStack = lazy(() => import('./NavbarStack'));

// Difficulty color function
const difficultyColor = (difficulty) => {
  switch (difficulty) {
    case 'Easy':
      return 'green';
    case 'Medium':
      return 'orange'; // Orange is more visible than yellow
    case 'Hard':
      return 'red';
    default:
      return 'grey';
  }
};

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
          <Box sx={{ flexGrow: 1, marginBottom: 2 }}>
            <Grid container alignItems="center">
              {/* Topics - Left Aligned */}
              <Grid item xs={12} sm={4}>
                <Typography variant="caption" color="textSecondary">
                  <strong>Topics:</strong>{' '}
                  {problem.topics && problem.topics.length > 0
                    ? problem.topics.join(', ')
                    : 'No Topics Available'}
                </Typography>
              </Grid>
              
              {/* Difficulty - Center Aligned */}
              <Grid item xs={12} sm={4} container justifyContent="center">
                <Typography
                  variant="caption"
                  style={{ color: difficultyColor(problem.difficulty) }}
                >
                  <strong>Difficulty:</strong> {problem.difficulty || 'Unknown Difficulty'}
                </Typography>
              </Grid>
              
              {/* Companies - Right Aligned */}
              <Grid item xs={12} sm={4} container justifyContent="flex-end">
                <Typography variant="caption" color="textSecondary">
                  <strong>Companies:</strong>{' '}
                  {problem.companies && problem.companies.length > 0
                    ? problem.companies.join(', ')
                    : 'No Companies Available'}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        )}
        <Box component="section">
          <Typography variant="h6">Description</Typography>
          <Typography variant="body1">{problem.description}</Typography>
        </Box>
        <Box component="section" sx={{ marginTop: 2 }}>
          <Typography variant="h6">Input</Typography>
          <Typography variant="body1">{problem.exampleInputs}</Typography>
        </Box>
        <Box component="section" sx={{ marginTop: 2 }}>
          <Typography variant="h6">Output</Typography>
          <Typography variant="body1">{problem.exampleOutputs}</Typography>
        </Box>
        <Box component="section" sx={{ marginTop: 2 }}>
          <Typography variant="h6">Examples</Typography>
          <pre
            style={{
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word',
              overflowWrap: 'break-word',
              maxWidth: '100%',
              backgroundColor: '#f5f5f5',
              padding: '10px',
              borderRadius: '4px',
            }}
          >
            {JSON.stringify(problem.testCases, null, 2)}
          </pre>
        </Box>
      </NavbarStack>
    </Suspense>
  );
};

export default ProblemTab;
