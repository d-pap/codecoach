/**
 * Hint button for problem-solving page that will call the LLM
 * (temporary placement and styling for now and can update it later)
 *
 * Makes a post request to APIGW endpoint (not yet made) that will
 * trigger an AWS Lambda function (not yet made) to send the problem
 * and a pre-defined prompt to Mistral LLM and then return the response
 * to the user to help them solve the problem.
 */

import React, { useState, Suspense, lazy } from 'react'
import { Button } from '@mui/material'

// Dynamic import for getHint to optimize bundle size
const getHint = lazy(() => import('../../../api').then(module => ({ default: module.getHint })))

/**
 * Prompts the AI to generate a hint for the problem
 * once the user clicks the button. The AI will use
 * inferences given the problem itself and the hints stored
 * in the database for that problem.
 *
 * @param {string} title - Problem title
 * @param {string} question - Problem description
 * @param {string} answer - Problem answer
 * @param {function} updateHintText - Function to update the hint text in the parent component
 * @returns {JSX.Element} The rendered HintByAIButton component
 */
const HintByAIButton = ({ title, question, answer, updateHintText }) => {
  const [isLoading, setIsLoading] = useState(false)

  // Function to handle getting a hint from the AI
  const handleGetHint = async () => {
    setIsLoading(true)
    try {
      // Dynamically import getHint when needed
      const hintModule = await getHint
      const hintText = await hintModule.default(title, question, answer)
      updateHintText(hintText)
    } catch (error) {
      console.error('Error fetching hint:', error)
      updateHintText('Error fetching hint. Please try again.')
    }
    setIsLoading(false)
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <Button
          variant="contained"
          type="button"
          onClick={handleGetHint}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Get Hint'}
        </Button>
      </div>
    </Suspense>
  )
}

export default HintByAIButton
