import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button
} from '@mui/material';

const ClassFormDialog = ({ open, onClose, onCreate }) => {
  const [selectedValue, setSelectedValue] = useState('enter');
  const [className, setClassName] = useState('');

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleSubmit = () => {
    if (className.trim() !== '') {
      onCreate(className);
      onClose(); // Optionally close the dialog on submit
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Class</DialogTitle>
      <DialogContent>
        <FormControl component="fieldset">
          <FormLabel component="legend">Name your class</FormLabel>
          <RadioGroup
            aria-label="class name option"
            name="classNameOption"
            value={selectedValue}
            onChange={handleRadioChange}
          >
            <FormControlLabel
              value="enter"
              control={<Radio />}
              label="Enter your class name"
            />
            {selectedValue === 'enter' && (
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Class name"
                type="text"
                fullWidth
                variant="outlined"
                placeholder="e.g., Ms. Smith’s 1st period"
                helperText="This class name is what your students will see."
                value={className}
                onChange={(e) => setClassName(e.target.value)}
              />
            )}
           
          </RadioGroup>
        </FormControl>
        <Button color="primary" variant="contained" onClick={handleSubmit}>
          Create New Course
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ClassFormDialog;
