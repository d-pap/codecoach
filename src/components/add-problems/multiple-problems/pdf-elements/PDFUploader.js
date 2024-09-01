import React from 'react'
import { Box, Typography, Button } from '@mui/material'

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
    <div>
      <Typography variant="h6" gutterBottom>
        Upload {fileType === 'question' ? 'Question' : 'Answer'} PDF
      </Typography>
      <Box {...getRootProps({ className: `dropzone` })} className="dropzone">
        <input {...getInputProps()} />
        <Typography variant="body1" className="dropzone-text">
          Drag 'n' drop a {fileType === 'question' ? 'question' : 'answer'} PDF
          file here, or click to select one
        </Typography>
      </Box>
      {fileName && (
        <Typography variant="body1" className="file-name">
          Selected {fileType === 'question' ? 'question' : 'answer'} file:{' '}
          {fileName}
        </Typography>
      )}
      <Button
        variant="contained"
        onClick={() => document.getElementById(`${fileType}-upload`).click()}
        className="upload-button"
        disabled={uploading}
      >
        Upload {fileType === 'question' ? 'Question' : 'Answer'} PDF
      </Button>
      <input
        id={`${fileType}-upload`}
        type="file"
        accept=".pdf"
        style={{ display: 'none' }}
        onChange={(e) => handleFileInputChange(e, fileType)}
      />
    </div>
  )
}

export default PDFUploader
