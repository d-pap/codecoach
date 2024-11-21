// Resume.js

import React, { useState, useRef, useEffect, Suspense } from 'react'
import { sendResume } from '../api'
import { Container, Typography } from '@mui/material'
import DOMPurify from 'dompurify'

import ResumeForm from '../components/resume/ResumeForm'
import ResumeResult from '../components/resume/ResumeResult'
import CenteredCircleLoader from '../components/utility/CenteredLoader'

const SensitiveInfoWarning = React.lazy(
  () => import('../components/resume/SensitiveInfoWarning')
)

const Resume = () => {
  // State hooks for resume fields
  const [description, setDescription] = useState('')
  const [workExperiences, setWorkExperiences] = useState([])
  const [educations, setEducations] = useState([])
  const [skills, setSkills] = useState([])
  const [projects, setProjects] = useState([])
  const [additionalActivities, setAdditionalActivities] = useState([])
  const [additionalComments, setAdditionalComments] = useState('')
  const [jobDescription, setJobDescription] = useState('')

  // State hooks for UI feedback and loading
  const [isWarningOpen, setIsWarningOpen] = useState(false)
  const [aiResponse, setAiResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [copySuccess, setCopySuccess] = useState('') // New state for copy success message

  const responseRef = useRef(null)

  // Chat limit state
  const [chatCount, setChatCount] = useState(0)
  const chatLimit = 5

  // Function to reset chat count if a new day has started
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

  // useEffect to initialize chat count and load last resume
  useEffect(() => {
    resetChatCountIfNeeded()

    // Load last resume from localStorage
    const savedResume = localStorage.getItem('lastResume')
    if (savedResume) {
      setAiResponse(JSON.parse(savedResume))
    }
  }, [])

  // Function to increment chat count
  const incrementChatCount = () => {
    setChatCount((prevCount) => {
      const newCount = prevCount + 1
      localStorage.setItem('resumeCount', newCount)
      localStorage.setItem('resumeDate', new Date().toDateString())
      return newCount
    })
  }

  // Handler for Generate Resume button click
  const handleGenerateClick = () => {
    setIsWarningOpen(true)
  }

  // Handler to close the warning dialog
  const handleCloseWarning = () => {
    setIsWarningOpen(false)
  }

  // Handler to confirm resume generation
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
        - ${exp.responsibilities}
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

      Please organize this information into a well-formatted resume.
    `

    console.log('Formatted Message:', formattedMessage)

    try {
      const response = await sendResume(formattedMessage)
      setAiResponse(response)
      localStorage.setItem('lastResume', JSON.stringify(response)) // Save to localStorage
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

  // **Modified handleCopy Function**
  // This function copies the rendered text with formatting preserved
  const handleCopy = () => {
    if (responseRef.current) {
      const resumeElement = responseRef.current
      const range = document.createRange()
      range.selectNodeContents(resumeElement)
      const selection = window.getSelection()
      selection.removeAllRanges()
      selection.addRange(range)

      try {
        const successful = document.execCommand('copy')
        if (successful) {
          setCopySuccess('Resume copied to clipboard!')
          // Clear the message after a few seconds
          setTimeout(() => setCopySuccess(''), 3000)
        } else {
          throw new Error('Copy command was unsuccessful')
        }
      } catch (err) {
        console.error('Could not copy text: ', err)
      } finally {
        selection.removeAllRanges()
      }
    }
  }

  return (
    <>
      {/* Header Section */}
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
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
        <ResumeForm
          description={description}
          setDescription={setDescription}
          workExperiences={workExperiences}
          setWorkExperiences={setWorkExperiences}
          educations={educations}
          setEducations={setEducations}
          skills={skills}
          setSkills={setSkills}
          projects={projects}
          setProjects={setProjects}
          additionalActivities={additionalActivities}
          setAdditionalActivities={setAdditionalActivities}
          additionalComments={additionalComments}
          setAdditionalComments={setAdditionalComments}
          jobDescription={jobDescription}
          setJobDescription={setJobDescription}
          isLoading={isLoading}
          chatCount={chatCount}
          chatLimit={chatLimit}
          handleGenerateClick={handleGenerateClick}
        />

        {isLoading && <CenteredCircleLoader />}

        {aiResponse && (
          <ResumeResult
            aiResponse={aiResponse}
            copySuccess={copySuccess}
            handleCopy={handleCopy}
            responseRef={responseRef}
          />
        )}
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
