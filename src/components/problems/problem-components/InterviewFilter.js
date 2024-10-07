/**
 * Filter interview problems based on ... (to be determined based on data format)
 */

import React from 'react'

function InterviewFilter(problems, difficulty, company, topic) {
  return problems.filter((problem) => {
    const difficultyMatch =
      difficulty === 'all' || problem.difficulty === difficulty
    const companyMatch = company === 'all' || problem.company === company
    const topicMatch = topic === 'all' || problem.topic === topic
    return difficultyMatch && companyMatch && topicMatch
  })
}

export default InterviewFilter
