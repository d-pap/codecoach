import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { addProblem } from '../../../api'; // Ensure this path is correct

const InterviewFormDialog = ({ rowData, onClose }) => {
  const [formData, setFormData] = useState(rowData);

  useEffect(() => {
    if (rowData) setFormData(rowData);
  }, [rowData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const filteredTestCases = formData.testCases.filter(
        (tc) => tc.input.trim() !== '' && tc.output.trim() !== ''
      );

      if (filteredTestCases.length === 0) {
        alert('Please provide at least one test case with input and output.');
        return;
      }

      const submissionData = { ...formData, testCases: filteredTestCases };
      await addProblem(submissionData);

      alert('Problem added successfully!');
      onClose(); // Close the dialog after successful submission
    } catch (error) {
      console.error('Error submitting problem:', error);
      alert('Failed to add problem. Please try again.');
    }
  };

  return (
    <Dialog>
      <DialogTitle>Edit Problem</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <TextField
            label="Title"
            name="title"
            value={formData.title || ''}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Description"
            name="description"
            value={formData.description || ''}
            onChange={handleChange}
            fullWidth
            multiline
          />
          <TextField
            label="Example Inputs"
            name="exampleInputs"
            value={formData.exampleInputs || ''}
            onChange={handleChange}
            fullWidth
            multiline
          />
          <TextField
            label="Example Outputs"
            name="exampleOutputs"
            value={formData.exampleOutputs || ''}
            onChange={handleChange}
            fullWidth
            multiline
          />
          <TextField
            label="Test Case Input"
            name="testCaseInput"
            value={formData.testCases?.[0]?.input || ''}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                testCases: [{ ...prevData.testCases[0], input: e.target.value }],
              }))
            }
            fullWidth
            multiline
          />
          <TextField
            label="Test Case Output"
            name="testCaseOutput"
            value={formData.testCases?.[0]?.output || ''}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                testCases: [{ ...prevData.testCases[0], output: e.target.value }],
              }))
            }
            fullWidth
            multiline
          />
          <TextField
            label="Comments"
            name="comments"
            value={formData.comments || ''}
            onChange={handleChange}
            fullWidth
            multiline
          />
          <FormControl fullWidth>
            <InputLabel>Difficulty</InputLabel>
            <Select
              name="difficulty"
              value={formData.difficulty || ''}
              onChange={handleChange}
            >
              <MenuItem value="Easy">Easy</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Hard">Hard</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Companies"
            name="companies"
            value={formData.companies?.join(', ') || ''}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                companies: e.target.value.split(',').map((c) => c.trim()),
              }))
            }
            fullWidth
          />
          <TextField
            label="Topics"
            name="topics"
            value={formData.topics?.join(', ') || ''}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                topics: e.target.value.split(',').map((t) => t.trim()),
              }))
            }
            fullWidth
          />
          <TextField
            label="Hint"
            name="hint"
            value={formData.hint || ''}
            onChange={handleChange}
            fullWidth
            multiline
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InterviewFormDialog;
