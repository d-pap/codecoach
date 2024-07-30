import React from 'react'
import { Button, Stack, TextField } from '@mui/material'

const TestCase = ({ index, testCase, handleTestCaseChange, removeTestCase }) => {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <label>Input: </label>
      <TextField
        type="text"
        name="input"
        value={testCase.input}
        onChange={(e) => handleTestCaseChange(index, e)}
        label=""
        variant="standard"
      />
      <label>Output: </label>
      <TextField
        type="text"
        name="output"
        value={testCase.output}
        onChange={(e) => handleTestCaseChange(index, e)}
        label=""
        variant="standard"
      />
      <Button
        variant="contained"
        type="button"
        onClick={removeTestCase}
      >
        Remove
      </Button>
    </Stack>
  )
}

export default TestCase