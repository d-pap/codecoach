import React, { useEffect, useState } from 'react';
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
import CustomLabel from '../../../components/add-problems/multiple-problems/custom-elements/CustomLabel';

const InterviewFormDialog = ({ open, onClose, rowData, onSubmit }) => {
  const [formData, setFormData] = useState(rowData);

  useEffect(() => {
    if (rowData) {
      setFormData(rowData); // Initialize form data when rowData changes
    }
  }, [rowData]);

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Submit Interview Problem</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <CustomLabel>Title:</CustomLabel>
          <TextField
            name="title"
            value={formData.title || ''}
            label="Title"
            fullWidth
            InputProps={{ readOnly: true }}
          />

          <CustomLabel>Description:</CustomLabel>
          <TextField
            name="description"
            value={formData.description || ''}
            label="Description"
            fullWidth
            multiline
            InputProps={{ readOnly: true }}
          />

          <CustomLabel>Example Inputs:</CustomLabel>
          <TextField
            name="exampleInputs"
            value={formData.exampleInputs || ''}
            label="Example Inputs"
            fullWidth
            multiline
            InputProps={{ readOnly: true }}
          />

          <CustomLabel>Example Outputs:</CustomLabel>
          <TextField
            name="exampleOutputs"
            value={formData.exampleOutputs || ''}
            label="Example Outputs"
            fullWidth
            multiline
            InputProps={{ readOnly: true }}
          />

          <CustomLabel>Difficulty:</CustomLabel>
          <FormControl fullWidth>
            <InputLabel>Difficulty</InputLabel>
            <Select
              name="difficulty"
              value={formData.difficulty || ''}
              readOnly
            >
              <MenuItem value={formData.difficulty}>{formData.difficulty}</MenuItem>
            </Select>
          </FormControl>

          {/* Additional fields can be added here as necessary */}
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
