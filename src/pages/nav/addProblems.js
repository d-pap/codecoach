import React, { useState } from 'react'
import {
  Box,
  Stack,
  Button,
  TextField,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
} from '@mui/material'
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
    type: 'icpc', // defult type is icpc
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
          <label>Time and Memory Limits: </label>
          <TextField
            type="text"
            name="timeLimit"
            value={formData.timeLimit}
            onChange={(e) => handleChange(e, formData, setFormData)}
            label="Please input a time limit"
            variant="outlined"
          />
          <TextField
            type="text"
            name="memoryLimit"
            value={formData.memoryLimit}
            onChange={(e) => handleChange(e, formData, setFormData)}
            label="Please input a memory limit"
            variant="outlined"
          />
          <label>Input and Output Description: </label>
          <TextField
            name="inputDescription"
            value={formData.inputDescription}
            onChange={(e) => handleChange(e, formData, setFormData)}
            label="Please input an input description"
            variant="outlined"
          />
          <TextField
            name="outputDescription"
            value={formData.outputDescription}
            onChange={(e) => handleChange(e, formData, setFormData)}
            label="Please input an output description"
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
          <label>Additional comments: </label>
          <TextField
            name="comments"
            value={formData.comments}
            onChange={(e) => handleChange(e, formData, setFormData)}
            label="Please input any additional comments"
            variant="outlined"
          />

          <label>Region and Year: </label>
          <FormControl fullWidth>
            <InputLabel id="region-label">Contest Region</InputLabel>
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
            <InputLabel id="sub-region-label">Contest Sub Region</InputLabel>
            <Select
              required
              labelId="sub-region-label"
              name="contestSubRegion"
              label="Contest Sub Region"
              value={formData.contestSubRegion}
              onChange={(e) => handleChange(e, formData, setFormData)}
              disabled={!formData.contestRegion} // Disable if no region is selected
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
            type="number" // Change type to number
            name="contestYear"
            value={formData.contestYear}
            onChange={(e) => handleChange(e, formData, setFormData)}
            label="Please input a contest year"
            variant="outlined"
            inputProps={{
              min: 2000, // Set minimum year
              max: 2030, // Set maximum year
            }}
          />

          <label>Hint/Solution: </label>
          <TextField
            name="hint"
            value={formData.hint}
            onChange={(e) => handleChange(e, formData, setFormData)}
            label="Please input a hint/solution"
            variant="outlined"
          />
          <TextField
            type="text"
            name="videoLink"
            value={formData.videoLink}
            onChange={(e) => handleChange(e, formData, setFormData)}
            label="Please input a video link"
            variant="outlined"
          />

          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Stack>
      </form>
    </Box>
  )
}

export default AddProblems
