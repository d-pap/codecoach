import React, { Suspense, lazy } from 'react'
import { useDropzone } from 'react-dropzone'
import Typography from '@mui/material/Typography'
// Dynamically import MUI components to optimize bundle size
const Grid = lazy(() => import('@mui/material/Grid'))
//const Typography = lazy(() => import('@mui/material/Typography'))
// Dynamically import the PDFUploader component
const PDFUploader = lazy(() => import('./PDFUploader'))

/**
 * PDFUploaderPanel Component
 * Handles the upload of question and answer PDF files.
 *
 * @param {Object} props - Component properties
 * @param {Object} props.questionFileProps - Props for the question file uploader
 * @param {Object} props.answerFileProps - Props for the answer file uploader
 * @param {boolean} props.uploading - Indicates if a file is being uploaded
 * @param {string} props.error - Error message to display
 */
const PDFUploaderPanel = ({
  questionFileProps,
  answerFileProps,
  uploading,
  error,
}) => {
  // Destructure drop handlers and other props for questions and answers
  const { onDrop: onDropQuestions, ...questionOtherProps } = questionFileProps
  const { onDrop: onDropAnswers, ...answerOtherProps } = answerFileProps

  // Initialize dropzone for questions and answers
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
    // Suspense wraps dynamically imported components to handle loading states
    <Suspense fallback={<div>Loading Uploaders...</div>}>
      <Grid container spacing={2}>
        {/* Question PDF Uploader */}
        <Grid item xs={12} sm={6}>
          <PDFUploader
            {...questionOtherProps}
            getRootProps={questionDropzone.getRootProps}
            getInputProps={questionDropzone.getInputProps}
            uploading={uploading}
          />
        </Grid>
        {/* Answer PDF Uploader */}
        <Grid item xs={12} sm={6}>
          <PDFUploader
            {...answerOtherProps}
            getRootProps={answerDropzone.getRootProps}
            getInputProps={answerDropzone.getInputProps}
            uploading={uploading}
          />
        </Grid>
        {/* Display error message if any */}
        {error && (
          <Grid item xs={12}>
            <Typography color="error">{error}</Typography>
          </Grid>
        )}
      </Grid>
    </Suspense>
  )
}

export default PDFUploaderPanel
