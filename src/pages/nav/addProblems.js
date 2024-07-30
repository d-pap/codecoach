/**
 * Adding a problem page
 * This page allows us to add a new problem to the database
 * given a title, description, example inputs, example outputs,
 * along with a solution/hint
 *
 * This is temporary and will be avilable only to the admin
 * once we adminster users and roles
 */

import React, { useState } from 'react'
import { Box, Stack, Button, TextField } from '@mui/material'

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

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleTestCaseChange = (index, e) => {
    const { name, value } = e.target
    const testCases = [...formData.testCases]
    testCases[index][name] = value
    setFormData({
      ...formData,
      testCases,
    })
  }

  const addTestCase = () => {
    setFormData({
      ...formData,
      testCases: [...formData.testCases, { input: '', output: '' }],
    })
  }

  const removeTestCase = (index) => {
    const testCases = formData.testCases.filter((_, idx) => idx !== index)
    setFormData({
      ...formData,
      testCases,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const payload = { ...formData }
    console.log(JSON.stringify(payload, null, 2)) // or send the payload to a server

    alert('Input submitted!')

    // Clear the form
    setFormData({
      title: '',
      timeLimit: '',
      memoryLimit: '',
      problemDescription: '',
      inputDescription: '',
      outputDescription: '',
      videoLink: '',
      testCases: [{ input: '', output: '' }],
    })

    // Reload the page
    window.location.reload()
  }

  return (
    <Box component="section" display={"flex"} padding={3} width={"95%"}>
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <Stack spacing={2}>
          <label>Title: </label>
          <TextField
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            label="Please input a title"
            variant="outlined"
          />
          <label>Problem Description: </label>
          <TextField
            name="problemDescription"
            value={formData.problemDescription}
            onChange={handleChange}
            required
            label="Please input a problem description"
            variant="outlined"
          />
          <label>Time Limit: </label>
          <TextField
            type="text"
            name="timeLimit"
            value={formData.timeLimit}
            onChange={handleChange}
            label="Please input a time limit"
            variant="outlined"
          />
          <label>Memory Limit: </label>
          <TextField
            type="text"
            name="memoryLimit"
            value={formData.memoryLimit}
            onChange={handleChange}
            label="Please input a memory limit"
            variant="outlined"
          />
          <label>Input Description: </label>
          <TextField
            name="inputDescription"
            value={formData.inputDescription}
            onChange={handleChange}
            label="Please input a input description"
            variant="outlined"
          />
          <label>Output Description: </label>
          <TextField
            name="outputDescription"
            value={formData.outputDescription}
            onChange={handleChange}
            label="Please input a output description"
            variant="outlined"
          />
          <label>Video: </label>
          <TextField
            type="text"
            name="videoLink"
            value={formData.videoLink}
            onChange={handleChange}
            label="Please input a video link"
            variant="outlined"
          />
          <div>
            <label>Test Cases: </label>
            <Button
              variant="contained"
              type="button"
              onClick={addTestCase}
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
                <Stack
                  key={idx}
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
                    onChange={(e) =>
                      handleTestCaseChange(idx, e)
                    }
                    label=""
                    variant="standard"
                  />
                  <label>Output: </label>
                  <TextField
                    type="text"
                    name="output"
                    value={testCase.output}
                    onChange={(e) =>
                      handleTestCaseChange(idx, e)
                    }
                    label=""
                    variant="standard"
                  />
                  <Button
                    variant="contained"
                    type="button"
                    onClick={() => removeTestCase(idx)}
                  >
                    Remove
                  </Button>
                </Stack>
              ))}
            </Stack>
          </div>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Stack>
      </form>
    </Box >
  )
}

export default AddProblems
