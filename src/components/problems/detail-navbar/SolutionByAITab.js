/**
 * This tab is for the solution by AI button.
 * It will prompt the AI to generate a solution for the problem
 */

import React, { useState } from 'react'
import styled from 'styled-components'
import SolveByAIButton from '../SolveByAIButton'
import NavbarStack from './NavbarStack'

const HintDisplay = styled.div`
  margin-top: 20px;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 5px;
  white-space: pre-line;
`

const SolutionByAITab = ({ problem }) => {
  const storedLocation = 'solutionText' + problem._id

  const [solutionText, setSolutionText] = useState(() => {
    return (
      localStorage.getItem(storedLocation) || 'AI solution will appear here'
    )
  })

  const updateSolutionText = (newSolution) => {
    localStorage.setItem(storedLocation, newSolution)
    setSolutionText(newSolution)
  }

  return (
    <NavbarStack>
      <h1>Solution By AI</h1>
      <SolveByAIButton
        title={problem.title}
        question={problem.description}
        answer={'testing'}
        updateSolutionText={updateSolutionText} // Pass the update function as a prop
      />
      <HintDisplay>{solutionText}</HintDisplay>
    </NavbarStack>
  )
}

export default SolutionByAITab
