import React from 'react'
import { Card, CardContent, CardHeader, TextField, Button } from '@mui/material'

const QuestionCard = ({
  question,
  index,
  handleQuestionChange,
  handleDeleteQuestion,
}) => {
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
          label="Title"
          value={question.title}
          onChange={(e) => handleQuestionChange(index, 'title', e.target.value)}
          variant="outlined"
          margin="normal"
        />
        <TextField
          fullWidth
          label="Description"
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
          label="Input"
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
          label="Output"
          value={question.exampleOutputs}
          onChange={(e) =>
            handleQuestionChange(index, 'exampleOutputs', e.target.value)
          }
          variant="outlined"
          margin="normal"
          multiline
          rows={2}
        />
        <Button
          variant="contained"
          color="error"
          onClick={handleDeleteQuestion}
          style={{ marginTop: '16px' }}
        >
          Delete Question
        </Button>
      </CardContent>
    </Card>
  )
}

export default QuestionCard
