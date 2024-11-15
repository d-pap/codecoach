import React, { useState, useRef, useEffect, Suspense, lazy } from 'react'
import { sendResume } from '../api'
import {
  Container,
  Typography,
  Button,
  Paper,
  LinearProgress,
} from '@mui/material'
import DoubleArrowRoundedIcon from '@mui/icons-material/DoubleArrowRounded'
import { useTheme } from '@mui/material/styles'
import ReactMarkdown from 'react-markdown'
import DOMPurify from 'dompurify'
import CenteredCircleLoader from '../components/utility/CenteredLoader'

// Lazy-loaded components
const Description = lazy(() => import('../components/resume/Description'))
const WorkExperience = lazy(() => import('../components/resume/WorkExperience'))
const Education = lazy(() => import('../components/resume/Education'))
const Skills = lazy(() => import('../components/resume/Skills'))
const Projects = lazy(() => import('../components/resume/Projects'))
const AdditionalActivities = lazy(
  () => import('../components/resume/AdditionalActivities')
)
const AdditionalComments = lazy(
  () => import('../components/resume/AdditionalComments')
)
const JobDescription = lazy(() => import('../components/resume/JobDescription'))
const SensitiveInfoWarning = lazy(
  () => import('../components/resume/SensitiveInfoWarning')
)

const SafeMarkdown = ({ content }) => {
  const sanitizedContent = DOMPurify.sanitize(content)
  return (
    <ReactMarkdown
      children={sanitizedContent}
      components={{
        hr: () => null,
      }}
    />
  )
}

const Resume = () => {
  const [description, setDescription] = useState('')
  const [workExperiences, setWorkExperiences] = useState([])
  const [educations, setEducations] = useState([])
  const [skills, setSkills] = useState([])
  const [projects, setProjects] = useState([])
  const [additionalActivities, setAdditionalActivities] = useState([])
  const [additionalComments, setAdditionalComments] = useState('')
  const [jobDescription, setJobDescription] = useState('')

  const [isWarningOpen, setIsWarningOpen] = useState(false)
  const [aiResponse, setAiResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const responseRef = useRef(null)
  const muiTheme = useTheme()

  // Chat limit state
  const [chatCount, setChatCount] = useState(0)
  const chatLimit = 5

  const resetChatCountIfNeeded = () => {
    const savedDate = localStorage.getItem('resumeDate')
    const today = new Date().toDateString()
    if (savedDate !== today) {
      localStorage.setItem('resumeDate', today)
      setChatCount(0)
    } else {
      const savedCount = localStorage.getItem('resumeCount')
      setChatCount(savedCount ? parseInt(savedCount, 10) : 0)
    }
  }

  useEffect(() => {
    resetChatCountIfNeeded()
  }, [])

  const incrementChatCount = () => {
    setChatCount((prevCount) => {
      const newCount = prevCount + 1
      localStorage.setItem('resumeCount', newCount)
      localStorage.setItem('resumeDate', new Date().toDateString())
      return newCount
    })
  }

  const handleGenerateClick = () => {
    setIsWarningOpen(true)
  }

  const handleCloseWarning = () => {
    setIsWarningOpen(false)
  }

  const handleConfirmWarning = async () => {
    if (chatCount >= chatLimit) {
      alert(
        'You have reached the maximum number of resume generations for today.'
      )
      setIsWarningOpen(false)
      return
    }

    setIsWarningOpen(false)
    setIsLoading(true)

    // Sanitize inputs before processing
    const sanitizedDescription = DOMPurify.sanitize(description)
    const sanitizedAdditionalComments = DOMPurify.sanitize(additionalComments)
    const sanitizedJobDescription = DOMPurify.sanitize(jobDescription)
    // Similarly sanitize other fields as needed

    const message = {
      description: sanitizedDescription,
      workExperiences,
      educations,
      skills,
      projects,
      additionalActivities,
      additionalComments: sanitizedAdditionalComments,
      jobDescription: sanitizedJobDescription,
    }

    const formattedMessage = `
            I would like to create a professional resume based on the following information:

            *Job Description:*
            ${message.jobDescription}

            *Personal Description:*
            ${message.description}

            **Work Experiences:**
            ${message.workExperiences
              .map(
                (exp, index) => `
            ${index + 1}. **Position:** ${exp.position}
            **Company:** ${exp.company}
            **Duration:** ${exp.startDate} - ${exp.endDate}
            **Responsibilities:**
            - ${exp.responsibilities.join('\n  - ')}
            `
              )
              .join('\n')}

            **Education:**
            ${message.educations
              .map(
                (edu, index) => `
            ${index + 1}. **Degree:** ${edu.degree}
            **Field of Study:** ${edu.fieldOfStudy}
            **Institution:** ${edu.institution}
            **Duration:** ${edu.startDate} - ${edu.endDate}
            `
              )
              .join('\n')}

            **Skills:**
            ${message.skills.join(', ')}

            **Projects:**
            ${message.projects
              .map(
                (project, index) => `
            ${index + 1}. **Project Name:** ${project.name}
            **Role:** ${project.role}
            **Description:** ${project.description}
            `
              )
              .join('\n')}

            **Additional Activities:**
            ${message.additionalActivities.join(', ')}

            **Additional Comments:**
            ${message.additionalComments}

            Please organize this information into a well-formatted resume.`

    console.log('Formatted Message:', formattedMessage)

    try {
      const response = await sendResume(formattedMessage)
      setAiResponse(response)
      incrementChatCount() // Increment count after successful generation

      if (responseRef.current) {
        responseRef.current.scrollIntoView({ behavior: 'smooth' })
      }

      console.log('Resume generated successfully:', response)
    } catch (error) {
      console.error('Error generating resume:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Header Section */}
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          align="center"
          sx={{ mb: 2 }}
        >
          Resume Builder
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          sx={{
            mb: 4,
            px: { xs: 2, sm: 4, md: 6 },
            lineHeight: 1.6,
            maxWidth: '80vw',
            mx: 'auto',
          }}
        >
          Welcome to our AI-powered resume builder! Our AI can help generate a
          polished template, but it may include inaccuracies. Please review and
          customize the content carefully to ensure accuracy. <br />
          <br />
          For your privacy and security, avoid including personal information.{' '}
          <br />
        </Typography>
      </Container>

      {/* Main Content */}
      <Container maxWidth="md">
        {isLoading && <LinearProgress sx={{ mb: 2 }} />}

        <Paper
          elevation={3}
          sx={{
            p: { xs: 2, sm: 4, md: 6 },
            mb: { xs: 4, sm: 6, md: 8 },
            position: 'relative',
          }}
        >
          <Suspense fallback={<CenteredCircleLoader />}>
            <Description
              description={description}
              setDescription={setDescription}
            />
            <WorkExperience
              workExperiences={workExperiences}
              setWorkExperiences={setWorkExperiences}
            />
            <Education educations={educations} setEducations={setEducations} />
            <Skills skills={skills} setSkills={setSkills} />
            <Projects projects={projects} setProjects={setProjects} />
            <AdditionalActivities
              additionalActivities={additionalActivities}
              setAdditionalActivities={setAdditionalActivities}
            />
            <AdditionalComments
              additionalComments={additionalComments}
              setAdditionalComments={setAdditionalComments}
            />
            <JobDescription
              jobDescription={jobDescription}
              setJobDescription={setJobDescription}
            />
          </Suspense>

          <Button
            variant="contained"
            color="primary"
            onClick={handleGenerateClick}
            fullWidth
            sx={{
              mt: 4,
              py: 1.5,
              px: 4,
              fontWeight: 'bold',
              fontSize: { xs: '0.8rem', sm: '1rem', md: '1.1rem' },
            }}
            disabled={isLoading || chatCount >= chatLimit}
          >
            {chatCount >= chatLimit
              ? 'Daily Limit Reached'
              : isLoading
                ? 'Generating...'
                : 'Generate Resume'}
            <DoubleArrowRoundedIcon sx={{ ml: 0.5 }} />
          </Button>

          <Typography
            variant="caption"
            color="textSecondary"
            align="center"
            sx={{ mt: 1 }}
          >
            You have used {chatCount} out of {chatLimit} daily resume
            generations.
          </Typography>

          {isLoading && <CenteredCircleLoader />}

          {aiResponse && (
            <Paper
              elevation={2}
              sx={{
                mt: 6,
                p: { xs: 2, sm: 3, md: 4 },
                backgroundColor: muiTheme.palette.background.default,
              }}
              ref={responseRef}
            >
              <Typography variant="h5" gutterBottom>
                AI-Generated Resume
              </Typography>
              <SafeMarkdown content={aiResponse.response.response} />
            </Paper>
          )}
        </Paper>
      </Container>

      <Suspense fallback={<div>Loading...</div>}>
        <SensitiveInfoWarning
          open={isWarningOpen}
          onClose={handleCloseWarning}
          onConfirm={handleConfirmWarning}
        />
      </Suspense>
    </>
  )
}

export default Resume
