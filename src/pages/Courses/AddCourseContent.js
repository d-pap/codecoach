import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Paper,
  Button,
  LinearProgress,
  Pagination,
  Stack,
} from '@mui/material';
import { fetchProblems, addProblemID } from '../../api'; // Ensure this import path is correct

const AddCourseContent = ({ newClassName, courseId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProblems, setSelectedProblems] = useState([]);
  const [problems, setProblems] = useState([]);
  const [filteredProblems, setFilteredProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const problemsPerPage = 10;

  useEffect(() => {
    async function loadProblems() {
      try {
        const data = await fetchProblems();
        setProblems(data);
        setFilteredProblems(data);
      } catch (err) {
        setError('Error fetching problems');
      } finally {
        setLoading(false);
      }
    }
    loadProblems();
  }, []);

  useEffect(() => {
    setFilteredProblems(
      problems.filter(problem =>
        problem.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, problems]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleProblemChange = (problemId) => {
    setSelectedProblems(prev => {
      if (prev.includes(problemId)) {
        return prev.filter(id => id !== problemId);
      }
      return [...prev, problemId];
    });
  };

  const handleSubmit = async () => {
    // Iterate over selected problems and add each to the course
    const errors = [];
    for (const problemId of selectedProblems) {
      try {
        const updatedCourse = await addProblemID(courseId, problemId);
        console.log('Updated course with new problem:', updatedCourse);
      } catch (error) {
        console.error('Error adding problem to course:', error);
        errors.push(`Failed to add problem ${problemId} to course: ${error.message || error}`);
      }
    }

    if (errors.length > 0) {
      setError('Some problems could not be added. Check console for details.');
    } else {
      console.log('All selected problems added successfully!');
    }
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const indexOfLastProblem = currentPage * problemsPerPage;
  const indexOfFirstProblem = indexOfLastProblem - problemsPerPage;
  const currentProblems = filteredProblems.slice(indexOfFirstProblem, indexOfLastProblem);

  if (loading) {
    return <LinearProgress />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Which problems do you want students to work on for {newClassName}?
      </Typography>
      <TextField
        fullWidth
        label="Search for a problem"
        variant="outlined"
        margin="normal"
        onChange={handleSearchChange}
      />
      <FormGroup>
        {currentProblems.map((problem) => (
          <Paper key={problem._id} elevation={2} sx={{ mt: 2, p: 2 }}>
            <Typography variant="subtitle1">{problem.title}</Typography>
            <FormControlLabel
              control={<Checkbox
                onChange={() => handleProblemChange(problem._id)}
                checked={selectedProblems.includes(problem._id)}
              />}
              label={problem.title}
            />
          </Paper>
        ))}
      </FormGroup>
      <Stack spacing={2} sx={{ p: 1, display: 'flex', justifyContent: 'right' }}>
        <Pagination
          count={Math.ceil(filteredProblems.length / problemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          size="small"
        />
      </Stack>
      <Button color="primary" variant="contained" onClick={handleSubmit}>
        Submit Selections
      </Button>
    </Box>
  );
};

export default AddCourseContent;
