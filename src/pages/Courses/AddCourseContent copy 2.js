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
import { addProblemID, fetchCourse } from '../../api copy'; // Updated imports to include fetchCourse
import { fetchProblems, fetchProblemById } from '../../api'; 
import { useNavigate } from 'react-router-dom'; 

const AddCourseContent = ({ newClassName, courseId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProblems, setSelectedProblems] = useState([]);
  const [problems, setProblems] = useState([]);
  const [filteredProblems, setFilteredProblems] = useState([]);
  const [courseProblems, setCourseProblems] = useState([]); // State to store the course's problem details
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const problemsPerPage = 10;

  const navigate = useNavigate(); 

  // Load problems and course problems using the actual API
  useEffect(() => {
    async function loadProblems() {
      try {
        const data = await fetchProblems();
        setProblems(data);
        setFilteredProblems(data);
      } catch (err) {
        setError('Error fetching problems');
      }
    }

    async function loadCourseProblems() {
      try {
        const course = await fetchCourse(courseId); // Fetch the course with problem IDs
        const problemDetails = await Promise.all(
          course.problemIds.map(id => fetchProblemById(id)) // Fetch problem details by ID
        );
        setCourseProblems(problemDetails); // Store the fetched problem details
        setSelectedProblems(course.problemIds); // Set selected problems from course
      } catch (err) {
        setError('Error fetching course problems');
      }
    }

    loadProblems();
    loadCourseProblems();
  }, [courseId]); // Load course problems when courseId changes

  // Filter the problems based on the search term
  useEffect(() => {
    setFilteredProblems(
      problems.filter(problem =>
        problem.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, problems]);

  // Update the selected problems when user checks/unchecks problems
  const handleProblemChange = (problemId) => {
    setSelectedProblems(prev => {
      if (prev.includes(problemId)) {
        return prev.filter(id => id !== problemId);
      }
      return [...prev, problemId];
    });
  };

  // Submit the selected problems and add them to the course
  const handleSubmit = async () => {
    const errors = [];
    for (const problemId of selectedProblems) {
      try {
        console.log(`Attempting to add problem ${problemId} to course ${courseId}`);
        await addProblemID(courseId, problemId); // Add problem using API
      } catch (error) {
        console.error(`Error adding problem ${problemId}:`, error.message);
        errors.push(`Problem ${problemId} failed to add: ${error.message}`);
      }
    }

    if (errors.length > 0) {
      setError(`Failed to add some problems: \n${errors.join('\n')}`);
    } else {
      console.log('All selected problems added successfully!');
      // Fetch the updated course after adding problems
      await fetchCourseProblems(); // Fetch and reload course problems
    }
  };

  // Fetch the updated course and its problem details
  const fetchCourseProblems = async () => {
    try {
      const course = await fetchCourse(courseId); // Fetch the course with problem IDs
      const problemDetails = await Promise.all(
        course.problemIds.map(id => fetchProblemById(id)) // Fetch problem details by ID
      );
      setCourseProblems(problemDetails); // Store the fetched problem details
    } catch (error) {
      setError('Error fetching course problems');
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
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

      {/* Display the list of added problems */}
      {courseProblems.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Added Problems for {newClassName}:</Typography>
          {courseProblems.map((problem) => (
            <Paper key={problem._id} elevation={2} sx={{ mt: 2, p: 2 }}>
              <Typography variant="subtitle1">{problem.title}</Typography>
              <Typography variant="body2">{problem.description}</Typography>
            </Paper>
          ))}
        </Box>
      )}

      {/* Button to navigate back to Courses */}
      <Button 
        color="secondary" 
        variant="outlined" 
        onClick={() => navigate('/Courses')} // Navigate to Courses
        sx={{ mt: 4 }}
      >
        Back to Courses
      </Button>
    </Box>
  );
};

export default AddCourseContent;
