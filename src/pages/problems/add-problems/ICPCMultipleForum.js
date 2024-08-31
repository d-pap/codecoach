import React, { useState, useCallback } from 'react'
import { Button, Typography, Grid, Box } from '@mui/material'
import { useDropzone } from 'react-dropzone'
import './ICPCMultipleForum.css'
import PDFUploader from '../../../components/add-problems/multiple-problems/PDFUploader'
import QuestionCard from '../../../components/add-problems/multiple-problems/QuestionCard'
import AnswerCard from '../../../components/add-problems/multiple-problems/AnswerCard'
import PDFParser from '../../../components/add-problems/multiple-problems/PDFParser'

const parser = new PDFParser()

const ICPCMultipleForum = () => {
  const [formData, setFormData] = useState({ questions: [], answers: [] })
  const [error, setError] = useState(null)
  const [questionFile, setQuestionFile] = useState(null)
  const [answerFile, setAnswerFile] = useState(null)
  const [questionFileName, setQuestionFileName] = useState('')
  const [answerFileName, setAnswerFileName] = useState('')
  const [uploading, setUploading] = useState(false)

  const onDrop = useCallback((acceptedFiles, fileType) => {
    if (acceptedFiles.length === 0) {
      setError('No valid PDF file selected.')
      return
    }

    const file = acceptedFiles[0]
    if (file.type !== 'application/pdf') {
      setError('Invalid file type. Please upload a PDF file.')
      return
    }

    if (fileType === 'question') {
      setQuestionFile(file)
      setQuestionFileName(file.name)
    } else if (fileType === 'answer') {
      setAnswerFile(file)
      setAnswerFileName(file.name)
    }
    setError(null)
  }, [])

  const handleFileInputChange = (event, fileType) => {
    const file = event.target.files[0]
    if (file) {
      if (fileType === 'question') {
        setQuestionFile(file)
        setQuestionFileName(file.name)
        onDrop([file], 'question')
      } else if (fileType === 'answer') {
        setAnswerFile(file)
        setAnswerFileName(file.name)
        onDrop([file], 'answer')
      }
      setError(null)
    }
  }

  const handleSubmit = async () => {
    if (questionFile && answerFile) {
      setUploading(true)
      try {
        const questions = await parser.parsePdf(questionFile, 'question')
        const answers = await parser.parsePdf(answerFile, 'answer')
        setFormData((prevData) => ({ ...prevData, questions, answers }))
      } catch (e) {
        setError(e.message)
      }
      setUploading(false)
    } else if (questionFile) {
      setUploading(true)
      try {
        const questions = await parser.parsePdf(questionFile, 'question')
        setFormData((prevData) => ({ ...prevData, questions }))
      } catch (e) {
        setError(e.message)
      }
      setUploading(false)
    } else {
      setError('Please select at least a question file.')
    }
  }

  const handleQuestionChange = (index, field, value) => {
    setFormData((prevData) => {
      const updatedQuestions = [...prevData.questions]
      updatedQuestions[index] = { ...updatedQuestions[index], [field]: value }
      return { ...prevData, questions: updatedQuestions }
    })
  }

  const handleAnswerChange = (index, field, value) => {
    setFormData((prevData) => {
      const updatedAnswers = [...prevData.answers]
      updatedAnswers[index] = { ...updatedAnswers[index], [field]: value }
      return { ...prevData, answers: updatedAnswers }
    })
  }

  const handleAddQuestion = () => {
    setFormData((prevData) => ({
      ...prevData,
      questions: [
        ...prevData.questions,
        {
          title: '',
          description: '',
          exampleInputs: '',
          exampleOutputs: '',
          testCases: [{ input: '', output: '' }],
        },
      ],
    }))
  }

  const handleDeleteQuestion = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      questions: prevData.questions.filter((_, i) => i !== index),
    }))
  }

  const handleAddAnswer = () => {
    setFormData((prevData) => ({
      ...prevData,
      answers: [...prevData.answers, { answerContent: '', questionIndex: -1 }],
    }))
  }

  const handleDeleteAnswer = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      answers: prevData.answers.filter((_, i) => i !== index),
    }))
  }

  const {
    getRootProps: getRootPropsForQuestions,
    getInputProps: getInputPropsForQuestions,
  } = useDropzone({
    accept: '.pdf',
    onDrop: (acceptedFiles) => onDrop(acceptedFiles, 'question'),
    noClick: true,
  })

  const {
    getRootProps: getRootPropsForAnswers,
    getInputProps: getInputPropsForAnswers,
  } = useDropzone({
    accept: '.pdf',
    onDrop: (acceptedFiles) => onDrop(acceptedFiles, 'answer'),
    noClick: true,
  })

  return (
    <div className="container">
      <Typography variant="h4" gutterBottom>
        PDF Parser
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <PDFUploader
            fileType="question"
            file={questionFile}
            fileName={questionFileName}
            handleFileInputChange={handleFileInputChange}
            getRootProps={getRootPropsForQuestions}
            getInputProps={getInputPropsForQuestions}
            uploading={uploading}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <PDFUploader
            fileType="answer"
            file={answerFile}
            fileName={answerFileName}
            handleFileInputChange={handleFileInputChange}
            getRootProps={getRootPropsForAnswers}
            getInputProps={getInputPropsForAnswers}
            uploading={uploading}
          />
        </Grid>
      </Grid>
      {error && <Typography color="error">{error}</Typography>}
      <Box mt={2}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          className="submit-button"
          disabled={uploading}
        >
          Submit
        </Button>
      </Box>
      <Box mt={2}>
        <Typography variant="h6">Questions:</Typography>
        {formData.questions.map((question, index) => (
          <QuestionCard
            key={`question-${index}`}
            question={question}
            index={index}
            handleQuestionChange={handleQuestionChange}
            handleDeleteQuestion={() => handleDeleteQuestion(index)} // added prop
          />
        ))}
        <Button
          variant="contained"
          onClick={handleAddQuestion}
          style={{ marginTop: '16px' }}
        >
          Add Question
        </Button>
        <Typography variant="h6" mt={4}>
          Answers:
        </Typography>
        {formData.answers.map((answer, index) => (
          <AnswerCard
            key={`answer-${index}`}
            answer={answer}
            index={index}
            handleAnswerChange={handleAnswerChange}
            questions={formData.questions}
            handleDeleteAnswer={() => handleDeleteAnswer(index)} // added prop
          />
        ))}
        <Button
          variant="contained"
          onClick={handleAddAnswer}
          style={{ marginTop: '16px' }}
        >
          Add Answer
        </Button>
      </Box>
    </div>
  )
}

export default ICPCMultipleForum
