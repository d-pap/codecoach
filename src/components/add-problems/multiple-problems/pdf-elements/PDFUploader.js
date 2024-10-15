import React, { Suspense, lazy } from 'react'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

// Dynamically import MUI components to optimize bundle size
const Box = lazy(() => import('@mui/material/Box'))
//const Typography = lazy(() => import('@mui/material/Typography'))
//const Button = lazy(() => import('@mui/material/Button'))

/**
 * PDFUploader Component
 * Handles the upload of question and answer PDF files.
 *
 * @param {Object} props - Component properties
 * @param {string} props.fileType - Type of file ('question' or 'answer')
 * @param {string} props.fileName - Name of the selected file
 * @param {Function} props.handleFileInputChange - Function to handle file input changes
 * @param {Function} props.getRootProps - Function from react-dropzone for root props
 * @param {Function} props.getInputProps - Function from react-dropzone for input props
 * @param {boolean} props.uploading - Indicates if a file is being uploaded
 */
const PDFUploader = ({
  fileType,
  file,
  fileName,
  handleFileInputChange,
  getRootProps,
  getInputProps,
  uploading,
}) => {
  return (
    // Suspense wraps dynamically imported components to handle loading states
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        {/* Upload Title */}
        <Typography variant="h6" gutterBottom>
          Upload {fileType === 'question' ? 'Question' : 'Answer'} PDF
        </Typography>

        {/* Dropzone Area */}
        <Box {...getRootProps({ className: 'dropzone' })} className="dropzone">
          <input {...getInputProps()} />
          <Typography variant="body1" className="dropzone-text">
            Drag 'n' drop a {fileType === 'question' ? 'question' : 'answer'}{' '}
            PDF file here, or click to select one
          </Typography>
        </Box>

        {/* Display Selected File Name */}
        {fileName && (
          <Typography variant="body1" className="file-name">
            Selected {fileType === 'question' ? 'question' : 'answer'} file:{' '}
            {fileName}
          </Typography>
        )}

        {/* Upload Button */}
        <Button
          variant="contained"
          onClick={() => document.getElementById(`${fileType}-upload`).click()}
          className="upload-button"
          disabled={uploading}
        >
          Upload {fileType === 'question' ? 'Question' : 'Answer'} PDF
        </Button>

        {/* Hidden File Input */}
        <input
          id={`${fileType}-upload`}
          type="file"
          accept=".pdf"
          style={{ display: 'none' }}
          onChange={(e) => handleFileInputChange(e, fileType)}
        />
      </div>
    </Suspense>
  )
}

export default PDFUploader
