import React from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  IconButton,
} from '@mui/material'
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material'

/**
 * QuestionCard Component
 * Renders a card for an individual question with fields to edit its content and manage test cases.
 *
 * @param {Object} props - Component properties
 * @param {Object} props.question - The question data
 * @param {number} props.index - The index of the question
 * @param {Function} props.handleQuestionChange - Function to handle changes in question fields
 * @param {Function} props.handleDeleteQuestion - Function to delete the question
 * @param {Function} props.handleTestCaseChange - Function to handle changes in test cases
 * @param {Function} props.addTestCase - Function to add a new test case
 * @param {Function} props.removeTestCase - Function to remove a test case
 */
const QuestionCard = ({
  question,
  index,
  handleQuestionChange,
  handleDeleteQuestion,
  handleTestCaseChange,
  addTestCase,
  removeTestCase,
}) => {
  // Provide a default empty array for testCases if undefined
  const testCases = question.testCases || []

  return (
    <Card
      key={`question-${index}`}
      variant="outlined"
      style={{ marginBottom: '16px' }}
    >
      <CardHeader title={`Question ${index + 1}`} />
      <CardContent>
        <TextField
          fullWidth
          label="Problem Title"
          value={question.title}
          onChange={(e) => handleQuestionChange(index, 'title', e.target.value)}
          variant="outlined"
          margin="normal"
        />
        <TextField
          fullWidth
          label="Problem Description"
          value={question.description}
          onChange={(e) =>
            handleQuestionChange(index, 'description', e.target.value)
          }
          variant="outlined"
          margin="normal"
          multiline
          rows={4}
        />
        <TextField
          fullWidth
          label="Input Description"
          value={question.exampleInputs}
          onChange={(e) =>
            handleQuestionChange(index, 'exampleInputs', e.target.value)
          }
          variant="outlined"
          margin="normal"
          multiline
          rows={2}
        />
        <TextField
          fullWidth
          label="Output Description"
          value={question.exampleOutputs}
          onChange={(e) =>
            handleQuestionChange(index, 'exampleOutputs', e.target.value)
          }
          variant="outlined"
          margin="normal"
          multiline
          rows={2}
        />

        {/* Comments Section */}
        <TextField
          fullWidth
          label="Additional Comments"
          value={question.comments || ''}
          onChange={(e) =>
            handleQuestionChange(index, 'comments', e.target.value)
          }
          variant="outlined"
          margin="normal"
          multiline
          rows={2}
        />

        <Typography variant="h6" mt={2}>
          Test Cases:
        </Typography>
        {testCases.map((testCase, testCaseIdx) => (
          <Box key={testCaseIdx} mb={2} display="flex" alignItems="center">
            <Grid container spacing={2}>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  label={`Input ${testCaseIdx + 1}`}
                  value={testCase.input}
                  onChange={(e) =>
                    handleTestCaseChange(
                      index,
                      testCaseIdx,
                      'input',
                      e.target.value
                    )
                  }
                  variant="outlined"
                  margin="normal"
                  multiline
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  label={`Output ${testCaseIdx + 1}`}
                  value={testCase.output}
                  onChange={(e) =>
                    handleTestCaseChange(
                      index,
                      testCaseIdx,
                      'output',
                      e.target.value
                    )
                  }
                  variant="outlined"
                  margin="normal"
                  multiline
                />
              </Grid>
              <Grid
                item
                xs={2}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <IconButton
                  color="secondary"
                  onClick={() => removeTestCase(index, testCaseIdx)}
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Box>
        ))}

        <Box display="flex" justifyContent="flex-start" mt={2}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => addTestCase(index)}
            sx={{ mr: 2 }}
          >
            Add Test Case
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteQuestion}
          >
            Delete Question
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}

export default QuestionCard
