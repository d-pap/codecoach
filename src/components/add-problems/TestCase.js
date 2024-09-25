import React, { Suspense } from 'react'

// Dynamically import MUI components to optimize performance
const Button = React.lazy(() => import('@mui/material/Button'))
const Stack = React.lazy(() => import('@mui/material/Stack'))
const TextField = React.lazy(() => import('@mui/material/TextField'))

const TestCase = ({ index, testCase, handleTestCaseChange, removeTestCase }) => {
  return (
    // Using Suspense to display a fallback while components are being loaded
    <Suspense fallback={<div>Loading...</div>}>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <label>Input: </label>
        {/* Dynamically loaded TextField component */}
        <TextField
          type="text"
          name="input"
          value={testCase.input}
          onChange={(e) => handleTestCaseChange(index, e)}
          label=""
          variant="standard"
        />
        <label>Output: </label>
        {/* Dynamically loaded TextField component */}
        <TextField
          type="text"
          name="output"
          value={testCase.output}
          onChange={(e) => handleTestCaseChange(index, e)}
          label=""
          variant="standard"
        />
        {/* Dynamically loaded Button component */}
        <Button variant="contained" type="button" onClick={removeTestCase}>
          Remove
        </Button>
      </Stack>
    </Suspense>
  )
}

export default TestCase
