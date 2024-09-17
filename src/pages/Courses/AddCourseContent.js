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
import { fetchProblems } from '../../api'; // Assuming fetchProblems is available to fetch ICPC problems

const AddCourseContent = ({ newClassName }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProblems, setSelectedProblems] = useState([]);
  const [problems, setProblems] = useState([]);
  const [filteredProblems, setFilteredProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const problemsPerPage = 10;

  // Fetch ICPC problems when the component loads
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

  // Filter problems based on search term
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

  const handleSubmit = () => {
    console.log('Selected problems for', newClassName, ':', selectedProblems);
    // Further processing like sending to the backend
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  // Calculate the problems to display on the current page
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
        {currentProblems.length > 0 ? (
          currentProblems.map((problem) => (
            <Paper key={problem._id} elevation={2} sx={{ mt: 2, p: 2 }}>
              <Typography variant="subtitle1">{problem.title}</Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={() => handleProblemChange(problem._id)}
                    checked={selectedProblems.includes(problem._id)}
                  />
                }
                label={problem.title}
              />
            </Paper>
          ))
        ) : (
          <Typography variant="body1">No problems found</Typography>
        )}
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
