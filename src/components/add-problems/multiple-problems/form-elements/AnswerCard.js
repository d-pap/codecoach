import React, { Suspense, lazy } from 'react'

// Dynamically import MUI components to optimize bundle size
const Card = lazy(() => import('@mui/material/Card'))
const CardContent = lazy(() => import('@mui/material/CardContent'))
const CardHeader = lazy(() => import('@mui/material/CardHeader'))
const TextField = lazy(() => import('@mui/material/TextField'))
const FormControl = lazy(() => import('@mui/material/FormControl'))
const InputLabel = lazy(() => import('@mui/material/InputLabel'))
const Select = lazy(() => import('@mui/material/Select'))
const MenuItem = lazy(() => import('@mui/material/MenuItem'))
const Button = lazy(() => import('@mui/material/Button'))

/**
 * AnswerCard Component
 * Renders a card for an individual answer with fields to edit its content.
 *
 * @param {Object} props - Component properties
 * @param {Object} props.answer - The answer data
 * @param {number} props.index - The index of the answer
 * @param {Function} props.handleAnswerChange - Function to handle changes in answer fields
 * @param {Array} props.questions - List of questions to match the answer to
 * @param {Function} props.handleDeleteAnswer - Function to delete the answer
 */
const AnswerCard = ({
  answer,
  index,
  handleAnswerChange,
  questions,
  handleDeleteAnswer,
}) => {
  return (
    // Suspense wraps dynamically imported components to handle loading states
    <Suspense fallback={<div>Loading...</div>}>
      <Card
        key={`answer-${index}`}
        variant="outlined"
        style={{ marginBottom: '16px' }}
      >
        {/* Card Header with Answer Number */}
        <CardHeader title={`Answer ${index + 1}`} />
        <CardContent>
          {/* Answer Content TextField */}
          <TextField
            fullWidth
            label="Answer Content"
            value={answer.answerContent}
            onChange={(e) =>
              handleAnswerChange(index, 'answerContent', e.target.value)
            }
            variant="outlined"
            margin="normal"
            multiline
            rows={6}
          />

          {/* Match Question Dropdown */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Match Question</InputLabel>
            <Select
              value={answer.questionIndex}
              onChange={(e) =>
                handleAnswerChange(index, 'questionIndex', e.target.value)
              }
              label="Match Question"
              required
            >
              <MenuItem value={-1}>None</MenuItem>
              {questions.map((question, i) => (
                <MenuItem key={i} value={i}>
                  {question.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Video Link TextField */}
          <TextField
            fullWidth
            label="Video Link"
            value={answer.videoLink}
            onChange={(e) =>
              handleAnswerChange(index, 'videoLink', e.target.value)
            }
            variant="outlined"
            margin="normal"
          />

          {/* Delete Answer Button */}
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteAnswer}
            style={{ marginTop: '16px' }}
          >
            Delete Answer
          </Button>
        </CardContent>
      </Card>
    </Suspense>
  )
}

export default AnswerCard
