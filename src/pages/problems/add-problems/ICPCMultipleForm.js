import React, { useState, useCallback } from 'react'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import PDFUploaderPanel from '../../../components/add-problems/multiple-problems/pdf-elements/PDFUploaderPanel'
import FormFields from '../../../components/add-problems/multiple-problems/form-elements/FormFields'
import QuestionsSection from '../../../components/add-problems/multiple-problems/form-elements/QuestionsSection'
import AnswersSection from '../../../components/add-problems/multiple-problems/form-elements/AnswersSection'
import PDFParser from '../../../components/add-problems/multiple-problems/pdf-elements/PDFParser'
import { getSubregions } from '../../../components/problems/subregions'
import { addProblem } from '../../../api'
import debounce from 'lodash/debounce'
import cloneDeep from 'lodash/cloneDeep'
import './ICPCMultipleForm.css'

const parser = new PDFParser()

const initialFormData = {
  questions: [],
  answers: [],
  contestRegion: '',
  contestSubRegion: '',
  contestYear: '',
  keywordRegex: 'Problem',
  descriptionStartRegex: '',
  descriptionEndRegex: 'Input',
}

const ICPCMultipleForm = () => {
  const [formData, setFormData] = useState(initialFormData)
  const [error, setError] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [questionFile, setQuestionFile] = useState(null)
  const [answerFile, setAnswerFile] = useState(null)
  const [questionFileName, setQuestionFileName] = useState('')
  const [answerFileName, setAnswerFileName] = useState('')
  const [openDialog, setOpenDialog] = useState(false)

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

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => {
      const newFormData = cloneDeep(prevData)
      newFormData[name] = value
      return newFormData
    })
  }

  const handleSubmit = debounce(async () => {
    if (questionFile) {
      setUploading(true)
      try {
        const {
          keywordRegex,
          descriptionStartRegex,
          descriptionEndRegex,
          answerKeywordRegex,
        } = formData

        const questions = await parser.parsePdf(
          questionFile,
          'question',
          keywordRegex,
          descriptionStartRegex,
          descriptionEndRegex
        )

        const answers = answerFile
          ? await parser.parsePdf(
              answerFile,
              'answer',
              '',
              '',
              '',
              answerKeywordRegex
            )
          : []

        setFormData((prevData) => ({
          ...prevData,
          questions,
          answers,
        }))
      } catch (e) {
        setError(e.message)
      }
      setUploading(false)
    } else {
      setError('Please select at least a question file.')
    }
  }, 300) // Debounce to prevent multiple rapid submissions

  const resetForm = () => {
    setFormData(initialFormData)
    setQuestionFile(null)
    setAnswerFile(null)
    setQuestionFileName('')
    setAnswerFileName('')
    setError(null)
  }

  // handle errors and confirm sending to database
  const handleSendToDatabase = () => {
    if (formData.questions.length === 0) {
      setError('Please add at least one question.')
      return
    }
    setOpenDialog(true)
  }

  // send data to database
  const confirmSendToDatabase = () => {
    setOpenDialog(false)
    console.log('Sending to Database...')

    const transformedData = formData.questions.map((question, index) => {
      const answer = formData.answers.find((ans) => ans.questionIndex === index)
      return {
        type: 'icpc',
        title: question.title,
        description: question.description,
        exampleInputs: question.exampleInputs,
        exampleOutputs: question.exampleOutputs,
        videoLink: question.videoLink || '',
        testCases: question.testCases,
        comments: question.comments || '',
        contestRegion: formData.contestRegion,
        contestSubRegion: formData.contestSubRegion,
        contestYear: formData.contestYear,
        hint: answer ? answer.answerContent : '',
      }
    })

    transformedData.forEach(async (data, idx) => {
      console.log(`Sending item ${idx + 1}:`, JSON.stringify(data, null, 2))
      try {
        await addProblem(data)
        console.log(`Item ${idx + 1} sent successfully`)
      } catch (e) {
        console.error(`Error sending item ${idx + 1}:`, e)
      }
    })

    console.log('All items sent successfully')
    resetForm() // Reset the form after processing
  }

  const cancelSendToDatabase = () => {
    setOpenDialog(false)
  }

  const handleQuestionChange = (index, field, value) => {
    setFormData((prevData) => {
      const updatedQuestions = [...prevData.questions]
      updatedQuestions[index] = { ...updatedQuestions[index], [field]: value }
      return { ...prevData, questions: updatedQuestions }
    })
  }

  const handleTestCaseChange = (questionIndex, testCaseIndex, field, value) => {
    setFormData((prevData) => {
      const updatedQuestions = [...prevData.questions]
      const updatedTestCases = [...updatedQuestions[questionIndex].testCases]
      updatedTestCases[testCaseIndex] = {
        ...updatedTestCases[testCaseIndex],
        [field]: value,
      }
      updatedQuestions[questionIndex] = {
        ...updatedQuestions[questionIndex],
        testCases: updatedTestCases,
      }
      return { ...prevData, questions: updatedQuestions }
    })
  }

  const addTestCase = (questionIndex) => {
    setFormData((prevData) => {
      const updatedQuestions = [...prevData.questions]
      const updatedTestCases = [
        ...updatedQuestions[questionIndex].testCases,
        { input: '', output: '' },
      ]
      updatedQuestions[questionIndex] = {
        ...updatedQuestions[questionIndex],
        testCases: updatedTestCases,
      }
      return { ...prevData, questions: updatedQuestions }
    })
  }

  const removeTestCase = (questionIndex, testCaseIndex) => {
    setFormData((prevData) => {
      const updatedQuestions = [...prevData.questions]
      const updatedTestCases = updatedQuestions[questionIndex].testCases.filter(
        (_, idx) => idx !== testCaseIndex
      )
      updatedQuestions[questionIndex] = {
        ...updatedQuestions[questionIndex],
        testCases: updatedTestCases,
      }
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

  const subregions = getSubregions()
  return (
    <div className="container">
      <Typography variant="h4" gutterBottom>
        PDF Parser
      </Typography>
      <PDFUploaderPanel
        questionFileProps={{
          fileType: 'question',
          file: questionFile,
          fileName: questionFileName,
          handleFileInputChange,
          onDrop,
        }}
        answerFileProps={{
          fileType: 'answer',
          file: answerFile,
          fileName: answerFileName,
          handleFileInputChange,
          onDrop,
        }}
        uploading={uploading}
        error={error}
      />
      <FormFields
        formData={formData}
        handleChange={handleChange}
        subregions={subregions}
      />
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
      <QuestionsSection
        questions={formData.questions}
        handleQuestionChange={handleQuestionChange}
        handleDeleteQuestion={handleDeleteQuestion}
        handleTestCaseChange={handleTestCaseChange}
        addTestCase={addTestCase}
        removeTestCase={removeTestCase}
        handleAddQuestion={handleAddQuestion}
      />
      <AnswersSection
        answers={formData.answers}
        questions={formData.questions}
        handleAnswerChange={handleAnswerChange}
        handleAddAnswer={handleAddAnswer}
        handleDeleteAnswer={handleDeleteAnswer}
      />
      <Box mt={2}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleSendToDatabase}
          style={{ marginTop: '16px' }}
        >
          Send to Database
        </Button>
      </Box>
      <Dialog open={openDialog} onClose={cancelSendToDatabase}>
        <DialogTitle>Confirm Send</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to send the data to the database?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelSendToDatabase} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmSendToDatabase} color="secondary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ICPCMultipleForm
