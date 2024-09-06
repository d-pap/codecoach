import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Rating,
  Button,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Box,
} from '@mui/material'

const difficultyLabels = {
  1: 'Very Easy',
  2: 'Easy',
  3: 'Medium',
  4: 'Hard',
  5: 'Very Hard',
}

const aiRatingLabels = {
  1: 'Not Helpful',
  2: 'Somewhat Helpful',
  3: 'Helpful',
  4: 'Very Helpful',
  5: 'Extremely Helpful',
}

function FeedbackDialog({ open, onClose, onSubmit }) {
  const [problemRating, setProblemRating] = useState(0)
  const [aiRating, setAiRating] = useState(0)
  const [quickFeedback, setQuickFeedback] = useState([])
  const [detailedFeedback, setDetailedFeedback] = useState('')
  const [hoverProblemRating, setHoverProblemRating] = useState(-1)
  const [hoverAiRating, setHoverAiRating] = useState(-1)

  const handleQuickFeedback = (event, newFeedback) => {
    setQuickFeedback(newFeedback)
  }

  const handleSubmit = () => {
    onSubmit({ problemRating, aiRating, quickFeedback, detailedFeedback })
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Tell us what you think!</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <Typography>Rate the problem difficulty:</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Rating
              value={problemRating}
              onChange={(event, newValue) => setProblemRating(newValue)}
              onChangeActive={(event, newHover) =>
                setHoverProblemRating(newHover)
              }
              getLabelText={(value) => difficultyLabels[value]}
            />
            <Typography variant="body2" sx={{ ml: 2 }}>
              {
                difficultyLabels[
                  hoverProblemRating !== -1 ? hoverProblemRating : problemRating
                ]
              }
            </Typography>
          </Box>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography>How helpful was the AI assistant?</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Rating
              value={aiRating}
              onChange={(event, newValue) => setAiRating(newValue)}
              onChangeActive={(event, newHover) => setHoverAiRating(newHover)}
              getLabelText={(value) => aiRatingLabels[value]}
            />
            <Typography variant="body2" sx={{ ml: 2 }}>
              {aiRatingLabels[hoverAiRating !== -1 ? hoverAiRating : aiRating]}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography>Quick Feedback:</Typography>
          <ToggleButtonGroup
            value={quickFeedback}
            onChange={handleQuickFeedback}
            aria-label="quick feedback"
            multiple
          >
            <ToggleButton value="helpful" aria-label="helpful">
              Helpful
            </ToggleButton>
            <ToggleButton value="not helpful" aria-label="not helpful">
              Not Helpful
            </ToggleButton>
            <ToggleButton value="too easy" aria-label="too easy">
              Too Easy
            </ToggleButton>
            <ToggleButton value="too difficult" aria-label="too difficult">
              Too Difficult
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Box>
          <Typography sx={{ mb: 1 }}>Any additional comments?</Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={detailedFeedback}
            onChange={(e) => setDetailedFeedback(e.target.value)}
            //margin="normal"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Submit Feedback
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default FeedbackDialog
