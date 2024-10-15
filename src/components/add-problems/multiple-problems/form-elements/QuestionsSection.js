import React, { Suspense, lazy } from 'react'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
// Dynamically import MUI components to optimize bundle size
//const Button = lazy(() => import('@mui/material/Button'))
const Box = lazy(() => import('@mui/material/Box'))
//const Typography = lazy(() => import('@mui/material/Typography'))

// Dynamically import the QuestionCard component
const QuestionCard = lazy(() => import('./QuestionCard'))

/**
 * QuestionsSection Component
 * Renders a section for managing questions with the ability to add and delete questions.
 *
 * @param {Object} props - Component properties
 * @param {Array} props.questions - Array of question objects
 * @param {Function} props.handleQuestionChange - Function to handle changes in question fields
 * @param {Function} props.handleDeleteQuestion - Function to delete a question
 * @param {Function} props.handleTestCaseChange - Function to handle changes in test cases
 * @param {Function} props.addTestCase - Function to add a new test case
 * @param {Function} props.removeTestCase - Function to remove a test case
 * @param {Function} props.handleAddQuestion - Function to add a new question
 */
const QuestionsSection = ({
  questions,
  handleQuestionChange,
  handleDeleteQuestion,
  handleTestCaseChange,
  addTestCase,
  removeTestCase,
  handleAddQuestion,
}) => (
  // Suspense wraps dynamically imported components to handle loading states
  <Suspense fallback={<div>Loading Questions...</div>}>
    <Box mt={2}>
      {/* Section Title */}
      <Typography variant="h6">Questions:</Typography>

      {/* Render each QuestionCard */}
      {questions.map((question, index) => (
        <QuestionCard
          key={`question-${index}`}
          question={question}
          index={index}
          handleQuestionChange={handleQuestionChange}
          handleDeleteQuestion={() => handleDeleteQuestion(index)}
          handleTestCaseChange={handleTestCaseChange}
          addTestCase={addTestCase}
          removeTestCase={removeTestCase}
        />
      ))}

      {/* Add Question Button */}
      <Button
        variant="contained"
        onClick={handleAddQuestion}
        style={{ marginTop: '16px' }}
      >
        Add Question
      </Button>
    </Box>
  </Suspense>
)

export default QuestionsSection
