// ResumeForm.js

import React, { Suspense } from 'react'
import { Button, Typography, Paper, LinearProgress } from '@mui/material'
import DoubleArrowRoundedIcon from '@mui/icons-material/DoubleArrowRounded'
import CenteredCircleLoader from '../utility/CenteredLoader'

// Lazy-loaded components
const Description = React.lazy(() => import('./Description'))
const WorkExperience = React.lazy(() => import('./WorkExperience'))
const Education = React.lazy(() => import('./Education'))
const Skills = React.lazy(() => import('./Skills'))
const Projects = React.lazy(() => import('./Projects'))
const AdditionalActivities = React.lazy(() => import('./AdditionalActivities'))
const AdditionalComments = React.lazy(() => import('./AdditionalComments'))
const JobDescription = React.lazy(() => import('./JobDescription'))

const ResumeForm = ({
  description,
  setDescription,
  workExperiences,
  setWorkExperiences,
  educations,
  setEducations,
  skills,
  setSkills,
  projects,
  setProjects,
  additionalActivities,
  setAdditionalActivities,
  additionalComments,
  setAdditionalComments,
  jobDescription,
  setJobDescription,
  isLoading,
  chatCount,
  chatLimit,
  handleGenerateClick,
}) => {
  return (
    <Paper
      elevation={3}
      sx={{
        p: { xs: 2, sm: 4, md: 6 },
        mb: { xs: 4, sm: 6, md: 8 },
        position: 'relative',
        boxShadow: 'none',
      }}
    >
      {isLoading && <LinearProgress sx={{ mb: 2 }} />}

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
        You have used {chatCount} out of {chatLimit} daily resume generations.
      </Typography>
    </Paper>
  )
}

export default ResumeForm
