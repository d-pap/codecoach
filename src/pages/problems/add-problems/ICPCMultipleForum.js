import React, { useState } from 'react'
import { Button, Typography } from '@mui/material'
import { PDFDocument } from 'pdf-lib'
import { useDropzone } from 'react-dropzone'

const ICPCMultipleForum = () => {
  const [formData, setFormData] = useState([])
  const [error, setError] = useState(null)

  const onDrop = async (acceptedFiles) => {
    if (acceptedFiles.length === 0) {
      setError('No valid PDF file selected.')
      return
    }

    const file = acceptedFiles[0]
    console.log('File type:', file.type) // Log the MIME type for debugging

    if (file.type !== 'application/pdf') {
      setError('Invalid file type. Please upload a PDF file.')
      return
    }

    try {
      const file = acceptedFiles[0]
      const arrayBuffer = await file.arrayBuffer()
      const pdfDoc = await PDFDocument.load(arrayBuffer)
      const pages = pdfDoc.getPages()
      let textContent = ''

      for (const page of pages) {
        const { text } = await page.getTextContent()
        textContent += text.map((item) => item.str).join(' ')
      }

      parseText(textContent)
    } catch (err) {
      setError(
        'Failed to parse PDF. Please check the file format and try again.'
      )
    }
  }

  const parseText = (text) => {
    // Basic parsing logic; this should be customized based on actual PDF content structure.
    const questions = text.split('Problem').slice(1) // Split text by 'Problem' assuming it marks the start of each problem

    const parsedData = questions.map((question, index) => {
      const parts = question.split('Input').map((part) => part.trim())
      return {
        type: `Problem ${String.fromCharCode(65 + index)}`, // Example problem type
        title: parts[0].split('\n')[0], // Example title extraction
        timeLimit: '', // You need to extract this if available
        memoryLimit: '', // You need to extract this if available
        description: parts[0], // Description extracted from the text
        exampleInputs: '', // You need to extract this if available
        exampleOutputs: '', // You need to extract this if available
        testCases: parseTestCases(parts[1]), // Extract test cases
      }
    })

    setFormData(parsedData)
  }

  const parseTestCases = (text) => {
    // Custom logic to parse test cases
    return [{ input: '', output: '' }]
  }

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'application/pdf', // Accept only PDF files
    onDrop,
    noClick: true,
  })

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        PDF Parser
      </Typography>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <Typography>
          Drag 'n' drop a PDF file here, or click to select one
        </Typography>
      </div>
      {error && <Typography color="error">{error}</Typography>}
      <Button
        variant="contained"
        onClick={() => document.querySelector('input[type="file"]').click()}
      >
        Upload PDF
      </Button>
      {/* Render formData or additional elements as needed */}
      <div>
        <Typography variant="h6">Parsed Data:</Typography>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      </div>
    </div>
  )
}

export default ICPCMultipleForum
