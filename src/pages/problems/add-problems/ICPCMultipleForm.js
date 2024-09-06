import React, { useState, useCallback } from 'react'
import { Button, Typography, Box } from '@mui/material'
import PDFUploaderPanel from '../../../components/add-problems/multiple-problems/pdf-elements/PDFUploaderPanel'
import FormFields from '../../../components/add-problems/multiple-problems/form-elements/FormFields'
import QuestionsSection from '../../../components/add-problems/multiple-problems/form-elements/QuestionsSection'
import AnswersSection from '../../../components/add-problems/multiple-problems/form-elements/AnswersSection'
import PDFParser from '../../../components/add-problems/multiple-problems/pdf-elements/PDFParser'
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
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async () => {
    if (questionFile) {
      setUploading(true)
      try {
        const {
          keywordRegex,
          descriptionStartRegex,
          descriptionEndRegex,
          answerParsingMethod,
        } = formData

        const questions = await parser.parsePdf(
          questionFile,
          'question',
          answerParsingMethod,
          keywordRegex,
          descriptionStartRegex,
          descriptionEndRegex
        )

        const answers = answerFile
          ? await parser.parsePdf(
              answerFile,
              'answer',
              answerParsingMethod,
              keywordRegex,
              descriptionStartRegex,
              descriptionEndRegex
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
  }

  const handleSendToDatabase = () => {
    if (formData.questions.length === 0) {
      setError('Please add at least one question.')
      return
    }

    console.log('Sending to Database...')

    const transformedData = formData.questions.map((question, index) => {
      const answer = formData.answers.find((ans) => ans.questionIndex === index)
      return {
        type: 'icpc',
        title: question.title,
        timeLimit: question.timeLimit || '',
        memoryLimit: question.memoryLimit || '',
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

    transformedData.forEach((data, idx) => {
      console.log(`Sending item ${idx + 1}:`, JSON.stringify(data, null, 2))
    })

    console.log('All items sent successfully')
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

  const subregions = {
    'World Finals': ['ICPC World Finals'],
    'Europe Contests': [
      'European Championship',
      'Central Europe Regional Contest (CERC)',
      'Northern Eurasia Finals (NERC)',
      'Northwestern Europe Regional Contest (NWERC)',
      'Southeastern Europe Regional Contest (SEERC)',
      'Southwestern Europe Regional Contest (SWERC)',
      'Benelux Algorithm Programming Contest (BAPC)',
      'CTU Open Contest (Czech Technical University)',
      'German Collegiate Programming Contest (GCPC)',
      'Nordic Collegiate Programming Contest (NCPC)',
      'UK and Ireland Programming Contest (UKIPC)',
    ],
    'Asia Pacific Contests': [
      'Asia Pacific Championship',
      'Indonesia',
      'Japan',
      'Philippines',
      'Singapore',
      'South Korea',
      'Taiwan',
      'Vietnam',
    ],
    'Asia East Continent Contests': [
      'Hangzhou',
      'Hefei',
      'Hongkong',
      'Jinan',
      'Macau',
      'Nanjing',
      'Shanghai',
      'Shenyang',
      'Yinchuan',
    ],
    'North America Contests': [
      'North America Championship',
      'Mid-Atlantic USA Regional Contest',
      'North Central Regional Contest',
      'Rocky Mountain Regional Contest',
    ],
    'Latin American Contests': [
      'Latin America Championship',
      'Latin American Regional Contest',
    ],
    'Africa and Arab Contests': ['Arab Collegiate Programming Championship'],
  }

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
    </div>
  )
}

export default ICPCMultipleForm
