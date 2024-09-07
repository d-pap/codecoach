import React, { useState } from 'react'
import {
  Box,
  Stack,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material'
import TestCase from '../../../components/add-problems/TestCase'
import { addProblem } from '../../../api'
import {
  handleChange,
  handleTestCaseChange,
  addTestCase,
  removeTestCase,
} from '../../../components/add-problems/ICPCFormHandlers'
import CustomLabel from '../../../components/add-problems/multiple-problems/custom-elements/CustomLabel'

const textFieldStyle = {
  width: '100%',
  minHeight: '50px',
  resize: 'vertical',
}

const ICPCFormPage = () => {
  const [formData, setFormData] = useState({
    type: '',
    title: '',
    timeLimit: '',
    memoryLimit: '',
    description: '',
    exampleInputs: '',
    exampleOutputs: '',
    videoLink: '',
    testCases: [{ input: '', output: '' }],
    comments: '',
    contestRegion: '',
    contestSubRegion: '',
    contestYear: '',
    hint: '',
  })

  const subregions = {
    'World Finals': ['ICPC World Finals'],
    'Europe Contests': [
      'European Championship',
      'Central Europe Regional Contest (CERC)',
      'Northern Eurasia Finals (NERC)',
      'Northwestern Europe Regional Contest (NWERC)',
      'Southeastern Europe Regional Contest (SEERC)',
      'Southwestern Europe Regional Contest (SWERC)',
      'Benelux Algorithm Programming Contest (BAPC)',
      'CTU Open Contest (Czech Technical University)',
      'German Collegiate Programming Contest (GCPC)',
      'Nordic Collegiate Programming Contest (NCPC)',
      'UK and Ireland Programming Contest (UKIPC)',
    ],
    'Asia Pacific Contests': [
      'Asia Pacific Championship',
      'Indonesia',
      'Japan',
      'Philippines',
      'Singapore',
      'South Korea',
      'Taiwan',
      'Vietnam',
    ],
    'Asia East Continent Contests': [
      'Hangzhou',
      'Hefei',
      'Hongkong',
      'Jinan',
      'Macau',
      'Nanjing',
      'Shanghai',
      'Shenyang',
      'Yinchuan',
    ],
    'North America Contests': [
      'North America Championship',
      'Mid-Atlantic USA Regional Contest',
      'North Central Regional Contest',
      'Rocky Mountain Regional Contest',
    ],
    'Latin American Contests': [
      'Latin America Championship',
      'Latin American Regional Contest',
    ],
    'Africa and Arab Contests': ['Arab Collegiate Programming Championship'],
  }

  const handleSubmits = async (e, formData, setFormData) => {
    e.preventDefault()
    try {
      await addProblem(formData)
      setFormData({
        type: 'icpc',
        title: '',
        description: '',
        exampleInputs: '',
        exampleOutputs: '',
        videoLink: '',
        testCases: [{ input: '', output: '' }],
        comments: '',
        contestRegion: '',
        contestSubRegion: '',
        contestYear: '',
        hint: '',
      })
      alert('Problem added successfully!')
    } catch (error) {
      console.error('Error adding problem:', error)
      alert('Failed to add problem. Please try again.')
    }
  }

  return (
    <Box
      component="section"
      display="flex"
      justifyContent="center" // Center horizontally
      padding={3}
      width="100%" // Full width of the container
    >
      <Box
        component="form"
        onSubmit={(e) => handleSubmits(e, formData, setFormData)}
        width="80%" // Set the width to 80%
      >
        <Stack spacing={2}>
          <CustomLabel>Type: </CustomLabel>
          <FormControl fullWidth>
            <InputLabel id="type-label">Type</InputLabel>
            <Select
              labelId="type-label"
              name="type"
              value={formData.type}
              onChange={(e) => handleChange(e, formData, setFormData)}
              label="Type"
              required
            >
              <MenuItem value="icpc">ICPC</MenuItem>
              <MenuItem value="interview">Interview</MenuItem>
            </Select>
          </FormControl>

          <CustomLabel>Title: </CustomLabel>
          <TextField
            type="text"
            name="title"
            value={formData.title}
            onChange={(e) => handleChange(e, formData, setFormData)}
            required
            label="Please input a title"
            variant="outlined"
            style={textFieldStyle}
          />
          <CustomLabel>Problem Description: </CustomLabel>
          <TextField
            name="description"
            value={formData.description}
            onChange={(e) => handleChange(e, formData, setFormData)}
            required
            label="Please input a problem description"
            variant="outlined"
            style={textFieldStyle}
            multiline
          />
          <CustomLabel>Time and Memory Limits: </CustomLabel>
          <TextField
            type="text"
            name="timeLimit"
            value={formData.timeLimit}
            onChange={(e) => handleChange(e, formData, setFormData)}
            label="Please input a time limit"
            variant="outlined"
            style={textFieldStyle}
          />
          <TextField
            type="text"
            name="memoryLimit"
            value={formData.memoryLimit}
            onChange={(e) => handleChange(e, formData, setFormData)}
            label="Please input a memory limit"
            variant="outlined"
            style={textFieldStyle}
          />
          <CustomLabel>Input Description: </CustomLabel>
          <TextField
            name="exampleInputs"
            value={formData.exampleInputs}
            onChange={(e) => handleChange(e, formData, setFormData)}
            label="Please input an input description"
            variant="outlined"
            style={textFieldStyle}
            multiline
          />
          <CustomLabel>Output Description: </CustomLabel>
          <TextField
            name="exampleOutputs"
            value={formData.exampleOutputs}
            onChange={(e) => handleChange(e, formData, setFormData)}
            label="Please input an output description"
            variant="outlined"
            style={textFieldStyle}
            multiline
          />

          <div>
            <CustomLabel>Test Cases: </CustomLabel>
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
          <CustomLabel>Additional comments: </CustomLabel>
          <TextField
            name="comments"
            value={formData.comments}
            onChange={(e) => handleChange(e, formData, setFormData)}
            label="Please input any additional comments"
            variant="outlined"
            style={textFieldStyle}
            multiline
          />

          <CustomLabel>Region and Year: </CustomLabel>
          <FormControl fullWidth>
            <InputLabel id="region-label">Contest Region *</InputLabel>
            <Select
              required
              labelId="region-label"
              name="contestRegion"
              label="Contest Region"
              value={formData.contestRegion}
              onChange={(e) => handleChange(e, formData, setFormData)}
            >
              <MenuItem value="World Finals">World Finals</MenuItem>
              <MenuItem value="Europe Contests">Europe Contests</MenuItem>
              <MenuItem value="Asia Pacific Contests">
                Asia Pacific Contests
              </MenuItem>
              <MenuItem value="Asia East Continent Contests">
                Asia East Continent Contests
              </MenuItem>
              <MenuItem value="North America Contests">
                North America Contests
              </MenuItem>
              <MenuItem value="Latin American Contests">
                Latin American Contests
              </MenuItem>
              <MenuItem value="Africa and Arab Contests">
                Africa and Arab Contests
              </MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="sub-region-label">Contest Sub Region *</InputLabel>
            <Select
              required
              labelId="sub-region-label"
              name="contestSubRegion"
              label="Contest Sub Region"
              value={formData.contestSubRegion}
              onChange={(e) => handleChange(e, formData, setFormData)}
              disabled={!formData.contestRegion}
            >
              {subregions[formData.contestRegion]?.map((subregion) => (
                <MenuItem key={subregion} value={subregion}>
                  {subregion}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            required
            type="number"
            name="contestYear"
            value={formData.contestYear}
            onChange={(e) => handleChange(e, formData, setFormData)}
            label="Please input a contest year"
            variant="outlined"
            inputProps={{
              min: 2000,
              max: 2030,
            }}
            style={textFieldStyle}
          />

          <CustomLabel>Hint/Solution: </CustomLabel>
          <TextField
            name="hint"
            value={formData.hint}
            onChange={(e) => handleChange(e, formData, setFormData)}
            label="Please input a hint/solution"
            variant="outlined"
            style={textFieldStyle}
            multiline
          />
          <TextField
            type="text"
            name="videoLink"
            value={formData.videoLink}
            onChange={(e) => handleChange(e, formData, setFormData)}
            label="Please input a video link"
            variant="outlined"
            style={textFieldStyle}
          />

          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Stack>
      </Box>
    </Box>
  )
}

export default ICPCFormPage
