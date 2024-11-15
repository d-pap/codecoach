import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import {
  Box,
  Stack,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import { addProblem } from '../../../api'; // Make sure this path is correct
import CustomLabel from '../../../components/add-problems/multiple-problems/custom-elements/CustomLabel';
import { getDifficulties } from '../../../components/problems/InterviewOptions';

const InterviewForm = () => {
  const [formData, setFormData] = useState([]);
  const [difficultiesList, setDifficultiesList] = useState([]);

  // Fetch options for difficulties dropdown
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const difficulties = await getDifficulties();
        setDifficultiesList(difficulties);
      } catch (error) {
        console.error('Error fetching difficulties:', error);
      }
    };
    fetchOptions();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        const parsedData = result.data.map((row) => ({
          title: row.Title || '',
          description: row.Description || '',
          exampleInputs: row["Example Inputs"] || '',
          exampleOutputs: row["Example Outputs"] || '',
          comments: row.Comments || '',
          difficulty: row.Difficulty || '',
          companies: row.Companies ? row.Companies.split(',') : [],
          topics: row.Topics ? row.Topics.split(',') : [],
          hint: row.Hint || '',
          testCases: [
            { input: row["TestCasesInput"] || '', output: row["TestCasesOutput"] || '' }
          ],
          isSubmitted: false, // Track if the row has been submitted
        }));
        setFormData(parsedData);
      },
      error: (error) => {
        console.error("Error parsing CSV file:", error);
      }
    });
  };

  const handleSubmitButton = async (e, rowIndex) => {
    e.preventDefault();
    const rowData = formData[rowIndex];

    try {
      // Filter out test cases with empty input or output
      const filteredTestCases = rowData.testCases.filter(
        (tc) => tc.input.trim() !== '' && tc.output.trim() !== ''
      );

      if (filteredTestCases.length === 0) {
        alert('Please provide at least one test case with input and output.');
        return;
      }

      // Prepare data for submission
      const submissionData = { ...rowData, testCases: filteredTestCases };
      console.log('Submitting formData:', JSON.stringify(submissionData, null, 2));

      await addProblem(submissionData);

      // Mark row as submitted without refreshing data
      const updatedFormData = [...formData];
      updatedFormData[rowIndex] = { ...rowData, isSubmitted: true };
      setFormData(updatedFormData);

      alert('Problem added successfully!');
    } catch (error) {
      console.error('Error adding problem:', error);
      if (error.response) {
        alert(`Failed to add problem: ${error.response.data.error || 'Please try again.'}`);
      } else {
        alert('Failed to add problem. Please try again.');
      }
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" padding={3} width="100%">
      <h3>Upload CSV File</h3>
      <input type="file" accept=".csv" onChange={handleFileChange} />

      {formData.map((rowData, index) => (
        <Box
          key={index}
          component="form"
          onSubmit={(e) => handleSubmitButton(e, index)}
          width="80%"
          marginTop={4}
          padding={3}
          border={1}
          borderColor="grey.400"
        >
          <Stack spacing={2}>
            <CustomLabel>Title: </CustomLabel>
            <TextField
              type="text"
              name="title"
              value={rowData.title}
              label="Please input a title"
              variant="outlined"
              fullWidth
              required
              InputProps={{ readOnly: true }}
            />

            <CustomLabel>Description: </CustomLabel>
            <TextField
              name="description"
              value={rowData.description}
              label="Please input a problem description"
              variant="outlined"
              fullWidth
              multiline
              required
              InputProps={{ readOnly: true }}
            />

            <CustomLabel>Example Inputs: </CustomLabel>
            <TextField
              name="exampleInputs"
              value={rowData.exampleInputs}
              label="Please input example inputs"
              variant="outlined"
              fullWidth
              multiline
              required
              InputProps={{ readOnly: true }}
            />

            <CustomLabel>Example Outputs: </CustomLabel>
            <TextField
              name="exampleOutputs"
              value={rowData.exampleOutputs}
              label="Please input example outputs"
              variant="outlined"
              fullWidth
              multiline
              required
              InputProps={{ readOnly: true }}
            />
            <CustomLabel>Video Link </CustomLabel>
            <TextField
              name="videoLink"
              value={rowData.videoLink}
              label="Please input video link"
              variant="outlined"
              fullWidth
              multiline
            // required
            />

            <CustomLabel>Test Case Input: </CustomLabel>
            <TextField
              name="testCaseInput"
              value={rowData.testCases[0] ? rowData.testCases[0].input : ''}
              label="Test Case Input"
              variant="outlined"
              fullWidth
              multiline
              required
              InputProps={{ readOnly: true }}
            />

            <CustomLabel>Test Case Output: </CustomLabel>
            <TextField
              name="testCaseOutput"
              value={rowData.testCases[0] ? rowData.testCases[0].output : ''}
              label="Test Case Output"
              variant="outlined"
              fullWidth
              multiline
              required
              InputProps={{ readOnly: true }}
            />

            <CustomLabel>Comments: </CustomLabel>
            <TextField
              name="comments"
              value={rowData.comments}
              label="Please input any additional comments"
              variant="outlined"
              fullWidth
              multiline
              InputProps={{ readOnly: true }}
            />

            <CustomLabel>Difficulty: </CustomLabel>
            <FormControl fullWidth>
              <InputLabel>Difficulty</InputLabel>
              <Select
                name="difficulty"
                value={rowData.difficulty}
                label="Difficulty"
                required
                readOnly
              >
                {difficultiesList.map((difficulty) => (
                  <MenuItem key={difficulty} value={difficulty}>
                    {difficulty}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <CustomLabel>Companies: </CustomLabel>
            <TextField
              name="companies"
              value={rowData.companies.join(', ')}
              label="Companies"
              variant="outlined"
              fullWidth
              multiline
              InputProps={{ readOnly: true }}
            />

            <CustomLabel>Topics: </CustomLabel>
            <TextField
              name="topics"
              value={rowData.topics.join(', ')}
              label="Topics"
              variant="outlined"
              fullWidth
              multiline
              InputProps={{ readOnly: true }}
            />

            <CustomLabel>Hint: </CustomLabel>
            <TextField
              name="hint"
              value={rowData.hint}
              label="Please input a hint for the problem"
              variant="outlined"
              fullWidth
              multiline
              InputProps={{ readOnly: true }}
            />

            <Button
              variant="contained"
              type="submit"
              disabled={rowData.isSubmitted}
            >
              {rowData.isSubmitted ? "Submitted" : "Submit"}
            </Button>
          </Stack>
        </Box>
      ))}
    </Box>
  );
};

export default InterviewForm;
