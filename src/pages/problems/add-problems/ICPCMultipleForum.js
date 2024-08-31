import React, { useState, useCallback } from 'react'
import {
  Button,
  Typography,
  Grid,
  Box,
  Stack,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material'
import { useDropzone } from 'react-dropzone'
import './ICPCMultipleForum.css'
import PDFUploader from '../../../components/add-problems/multiple-problems/PDFUploader'
import QuestionCard from '../../../components/add-problems/multiple-problems/QuestionCard'
import AnswerCard from '../../../components/add-problems/multiple-problems/AnswerCard'
import PDFParser from '../../../components/add-problems/multiple-problems/PDFParser'
import CustomLabel from '../../../components/add-problems/multiple-problems/CustomLabel'

const parser = new PDFParser()

const ICPCMultipleForum = () => {
  const [formData, setFormData] = useState({
    questions: [],
    answers: [],
    contestRegion: '',
    contestSubRegion: '',
    contestYear: '',
    keywordRegex: 'Problem', // Default regex pattern
    descriptionStartRegex: '', // Add default regex pattern for description start
    descriptionEndRegex: 'Input', // Add default regex pattern for description end
  })
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
        const questions = await parser.parsePdf(
          questionFile,
          'question',
          formData.keywordRegex,
          formData.descriptionStartRegex,
          formData.descriptionEndRegex // Pass the description regexes
        )
        const answers = answerFile
          ? await parser.parsePdf(answerFile, 'answer')
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

      <Stack spacing={2} mt={2}>
        <TextField
          required
          name="keywordRegex"
          value={formData.keywordRegex}
          onChange={handleChange}
          label="Regex for Splitting Questions"
          variant="outlined"
          style={{ width: '100%', marginTop: '16px' }}
        />
        <TextField
          name="descriptionStartRegex"
          value={formData.descriptionStartRegex}
          onChange={handleChange}
          label="Regex for Description Start"
          variant="outlined"
          style={{ width: '100%', marginTop: '16px' }}
        />
        <TextField
          required
          name="descriptionEndRegex"
          value={formData.descriptionEndRegex}
          onChange={handleChange}
          label="Regex for Description End"
          variant="outlined"
          style={{ width: '100%', marginTop: '16px' }}
        />
        <CustomLabel>Region and Year:</CustomLabel>
        <FormControl fullWidth>
          <InputLabel id="region-label">Contest Region *</InputLabel>
          <Select
            required
            labelId="region-label"
            name="contestRegion"
            label="Contest Region"
            value={formData.contestRegion}
            onChange={handleChange}
          >
            <MenuItem value="World Finals">World Finals</MenuItem>
            <MenuItem value="Europe Contests">Europe Contests</MenuItem>
            <MenuItem value="Asia Pacific Contests">
              Asia Pacific Contests
            </MenuItem>
            <MenuItem value="Asia East Continent Contests">
              Asia East Continent Contests
            </MenuItem>
            <MenuItem value="North America Contests">
              North America Contests
            </MenuItem>
            <MenuItem value="Latin American Contests">
              Latin American Contests
            </MenuItem>
            <MenuItem value="Africa and Arab Contests">
              Africa and Arab Contests
            </MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="sub-region-label">Contest Sub Region *</InputLabel>
          <Select
            required
            labelId="sub-region-label"
            name="contestSubRegion"
            label="Contest Sub Region"
            value={formData.contestSubRegion}
            onChange={handleChange}
            disabled={!formData.contestRegion}
          >
            {subregions[formData.contestRegion]?.map((subregion) => (
              <MenuItem key={subregion} value={subregion}>
                {subregion}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          required
          type="number"
          name="contestYear"
          value={formData.contestYear}
          onChange={handleChange}
          label="Please Input a Contest Year"
          variant="outlined"
          inputProps={{
            min: 2000,
            max: 2030,
          }}
          style={{ width: '100%', marginTop: '16px' }}
        />
      </Stack>

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
            handleDeleteQuestion={() => handleDeleteQuestion(index)}
            handleTestCaseChange={handleTestCaseChange}
            addTestCase={addTestCase}
            removeTestCase={removeTestCase}
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
            handleDeleteAnswer={() => handleDeleteAnswer(index)}
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

export default ICPCMultipleForum
