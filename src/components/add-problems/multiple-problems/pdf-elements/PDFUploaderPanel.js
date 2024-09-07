import React from 'react'
import { Grid, Typography } from '@mui/material'
import PDFUploader from './PDFUploader'
import { useDropzone } from 'react-dropzone'

const PDFUploaderPanel = ({
  questionFileProps,
  answerFileProps,
  uploading,
  error,
}) => {
  const { onDrop: onDropQuestions, ...questionOtherProps } = questionFileProps
  const { onDrop: onDropAnswers, ...answerOtherProps } = answerFileProps

  const questionDropzone = useDropzone({
    accept: 'application/pdf',
    onDrop: onDropQuestions,
    noClick: true,
    noKeyboard: true,
  })
  const answerDropzone = useDropzone({
    accept: 'application/pdf',
    onDrop: onDropAnswers,
    noClick: true,
    noKeyboard: true,
  })

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <PDFUploader
          {...questionOtherProps}
          getRootProps={questionDropzone.getRootProps}
          getInputProps={questionDropzone.getInputProps}
          uploading={uploading}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <PDFUploader
          {...answerOtherProps}
          getRootProps={answerDropzone.getRootProps}
          getInputProps={answerDropzone.getInputProps}
          uploading={uploading}
        />
      </Grid>
      {error && <Typography color="error">{error}</Typography>}
    </Grid>
  )
}

export default PDFUploaderPanel
