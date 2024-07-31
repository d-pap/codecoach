import React, { useState } from 'react'
import { Box, Stack, Button, TextField } from '@mui/material'
import TestCase from '../../components/add-problems/TestCase'
import {
  handleChange,
  handleTestCaseChange,
  addTestCase,
  removeTestCase,
  handleSubmit,
} from '../../components/add-problems/ICPCFormHandlers'

const AddProblems = () => {
  const [formData, setFormData] = useState({
    title: '',
    timeLimit: '',
    memoryLimit: '',
    problemDescription: '',
    inputDescription: '',
    outputDescription: '',
    videoLink: '',
    testCases: [{ input: '', output: '' }],
  })

  return (
    <Box component="section" display={'flex'} padding={3} width={'95%'}>
      <form
        onSubmit={(e) => handleSubmit(e, formData, setFormData)}
        style={{ width: '100%' }}
      >
        <Stack spacing={2}>
          <label>Title: </label>
          <TextField
            type="text"
            name="title"
            value={formData.title}
            onChange={(e) => handleChange(e, formData, setFormData)}
            required
            label="Please input a title"
            variant="outlined"
          />
          <label>Problem Description: </label>
          <TextField
            name="problemDescription"
            value={formData.problemDescription}
            onChange={(e) => handleChange(e, formData, setFormData)}
            required
            label="Please input a problem description"
            variant="outlined"
          />
          <label>Time Limit: </label>
          <TextField
            type="text"
            name="timeLimit"
            value={formData.timeLimit}
            onChange={(e) => handleChange(e, formData, setFormData)}
            label="Please input a time limit"
            variant="outlined"
          />
          <label>Memory Limit: </label>
          <TextField
            type="text"
            name="memoryLimit"
            value={formData.memoryLimit}
            onChange={(e) => handleChange(e, formData, setFormData)}
            label="Please input a memory limit"
            variant="outlined"
          />
          <label>Input Description: </label>
          <TextField
            name="inputDescription"
            value={formData.inputDescription}
            onChange={(e) => handleChange(e, formData, setFormData)}
            label="Please input an input description"
            variant="outlined"
          />
          <label>Output Description: </label>
          <TextField
            name="outputDescription"
            value={formData.outputDescription}
            onChange={(e) => handleChange(e, formData, setFormData)}
            label="Please input an output description"
            variant="outlined"
          />
          <label>Video: </label>
          <TextField
            type="text"
            name="videoLink"
            value={formData.videoLink}
            onChange={(e) => handleChange(e, formData, setFormData)}
            label="Please input a video link"
            variant="outlined"
          />
          <div>
            <label>Test Cases: </label>
            <Button
              variant="contained"
              type="button"
              onClick={() => addTestCase(formData, setFormData)}
            >
              Add Test Case
            </Button>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={3}
            >
              {formData.testCases.map((testCase, idx) => (
                <TestCase
                  key={idx}
                  index={idx}
                  testCase={testCase}
                  handleTestCaseChange={(index, e) =>
                    handleTestCaseChange(index, e, formData, setFormData)
                  }
                  removeTestCase={() =>
                    removeTestCase(idx, formData, setFormData)
                  }
                />
              ))}
            </Stack>
          </div>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Stack>
      </form>
    </Box>
  )
}

export default AddProblems
