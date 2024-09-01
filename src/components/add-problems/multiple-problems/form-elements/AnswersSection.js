import React from 'react'
import { Button, Box, Typography } from '@mui/material'
import AnswerCard from './AnswerCard'

const AnswersSection = ({
  answers,
  questions,
  handleAnswerChange,
  handleAddAnswer,
  handleDeleteAnswer,
}) => (
  <Box mt={2}>
    <Typography variant="h6" mt={4}>
      Answers:
    </Typography>
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
    <Button
      variant="contained"
      onClick={handleAddAnswer}
      style={{ marginTop: '16px' }}
    >
      Add Answer
    </Button>
  </Box>
)

export default AnswersSection
