import React, { Suspense, lazy } from 'react'

// Dynamically import MUI components to optimize bundle size
const Button = lazy(() => import('@mui/material/Button'))
const Box = lazy(() => import('@mui/material/Box'))
const Typography = lazy(() => import('@mui/material/Typography'))

// Dynamically import the AnswerCard component
const AnswerCard = lazy(() => import('./AnswerCard'))

/**
 * AnswersSection Component
 * Renders a section for managing answers with the ability to add and delete answers.
 *
 * @param {Object} props - Component properties
 * @param {Array} props.answers - Array of answer objects
 * @param {Array} props.questions - Array of question objects
 * @param {Function} props.handleAnswerChange - Function to handle changes in answer fields
 * @param {Function} props.handleAddAnswer - Function to add a new answer
 * @param {Function} props.handleDeleteAnswer - Function to delete an answer
 */
const AnswersSection = ({
  answers,
  questions,
  handleAnswerChange,
  handleAddAnswer,
  handleDeleteAnswer,
}) => (
  // Suspense wraps dynamically imported components to handle loading states
  <Suspense fallback={<div>Loading Answers...</div>}>
    <Box mt={2}>
      {/* Section Title */}
      <Typography variant="h6" mt={4}>
        Answers:
      </Typography>
      
      {/* Render each AnswerCard */}
      {answers.map((answer, index) => (
        <AnswerCard
          key={`answer-${index}`}
          answer={answer}
          index={index}
          handleAnswerChange={handleAnswerChange}
          questions={questions}
          handleDeleteAnswer={() => handleDeleteAnswer(index)}
        />
      ))}
      
      {/* Add Answer Button */}
      <Button
        variant="contained"
        onClick={handleAddAnswer}
        style={{ marginTop: '16px' }}
      >
        Add Answer
      </Button>
    </Box>
  </Suspense>
)

export default AnswersSection
