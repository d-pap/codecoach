import React from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@mui/material'

const AnswerCard = ({
  answer,
  index,
  handleAnswerChange,
  questions,
  handleDeleteAnswer,
}) => {
  return (
    <Card
      key={`answer-${index}`}
      variant="outlined"
      style={{ marginBottom: '16px' }}
    >
      <CardHeader title={`Answer ${index + 1}`} />
      <CardContent>
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
  )
}

export default AnswerCard
