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
import { addProblemID, fetchCourse } from '../../api copy'; // Updated imports to include fetchCourse and fetchProblemById
import { fetchProblems, fetchProblemById } from '../../api';
import { useNavigate, useParams } from 'react-router-dom';

// const AddCourseContent = ({ newClassName, courseId }) => {
const AddCourseContent = ({ newClassName }) => {
  const { courseId } = useParams(); // Get the courseId from the URL
  console.log(`Course ID from URL: ${courseId}`);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProblems, setSelectedProblems] = useState([]);
  const [problems, setProblems] = useState([]);
  const [filteredProblems, setFilteredProblems] = useState([]);
  const [courseProblems, setCourseProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const problemsPerPage = 10;

  const navigate = useNavigate();

  // Load problems using the actual API
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
    fetchCourseProblems();
  }, []);

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
        await addProblemID(courseId, problemId); // Add problem to course via the API
      } catch (error) {
        console.error(`Error adding problem ${problemId}:`, error.message);
        errors.push(`Problem ${problemId} failed to add: ${error.message}`);
      }
    }

    if (errors.length > 0) {
      setError(`Failed to add some problems: \n${errors.join('\n')}`);
    } else {
      console.log('All selected problems added successfully!');
      await fetchCourseProblems(); // Fetch updated course problems after submission
    }
  };

  // Fetch the updated course and its problem details
  const fetchCourseProblems = async () => {
    try {
      const course = await fetchCourse(courseId);  // Fetch course details including problem IDs
      const problemDetails = await Promise.all(
        course.problemIds.map(id => fetchProblemById(id))  // Fetch each problem detail by ID
      );
      setCourseProblems(problemDetails);  // Set course problems to state
      setSelectedProblems(problemDetails.map(problem => problem._id)); 
    } catch (error) {
      setError('Error fetching course problems: ' + error.message);
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
                checked={selectedProblems.includes(problem._id)} // Mark as checked if already selected
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

      {/* Display the list of added problems after submission */}
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
        onClick={() => navigate('/Courses')} // Navigate back to Courses
        sx={{ mt: 4 }}
      >
        Back to Courses
      </Button>
    </Box>
  );
};

export default AddCourseContent;
