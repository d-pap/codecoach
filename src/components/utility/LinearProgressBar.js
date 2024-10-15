import React from 'react'
import { LinearProgress } from '@mui/material'
import './LinearProgressBar.css'

const LinearProgressBar = ({ isLoading }) => {
  return (
    <div
      className={`linear-progress-container ${!isLoading ? 'linear-progress-hidden' : ''}`}
    >
      <LinearProgress />
    </div>
  )
}

export default LinearProgressBar
