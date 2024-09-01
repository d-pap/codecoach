import React from 'react'
import { Button, Box, Typography } from '@mui/material'
import QuestionCard from './QuestionCard'

const QuestionsSection = ({
  questions,
  handleQuestionChange,
  handleDeleteQuestion,
  handleTestCaseChange,
  addTestCase,
  removeTestCase,
  handleAddQuestion,
}) => (
  <Box mt={2}>
    <Typography variant="h6">Questions:</Typography>
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
    <Button
      variant="contained"
      onClick={handleAddQuestion}
      style={{ marginTop: '16px' }}
    >
      Add Question
    </Button>
  </Box>
)

export default QuestionsSection
