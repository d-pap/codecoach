import React from 'react'
import { useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import { styled } from '@mui/system'

// Updated SectionTitle component with titleVariant prop
const SectionTitle = ({ title, subtitle, titleVariant = 'h4' }) => (
  <>
    <Typography
      variant={titleVariant}
      sx={{
        mb: 2,
      }}
    >
      {title}
    </Typography>
    {subtitle && (
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        {subtitle}
      </Typography>
    )}
  </>
)

// Styled component for the video card
const VideoCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  mb: 4,
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': { transform: 'translateY(-5px)', boxShadow: theme.shadows[6] },
}))

const Help = () => {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  // Video data
  const videos = [
    {
      id: 1,
      title: 'Using the Built-in Compiler and AI',
      summary:
        'Learn how to solve programming problems using our built-in compiler. Choose from multiple languages like Python, Java, C, and C++. Customize your coding environment with various themes including dark, light, and color-highlighted options. Utilize the AI chat to break down problems, analyze your code, and receive a score. Explore the problem tab for problem statements, the hint tab for quick hints, and the forum for discussions.',
      videoUrl: 'https://www.youtube.com/embed/your_video_id_1', // Replace with your video URL
    },
    {
      id: 2,
      title: 'Resume Builder Overview',
      summary:
        'Discover how to build your resume using our AI-powered resume builder. Add sections such as education, work experience, projects, and skills. Include the job description and additional commands to the AI for a tailored resume. After completion, press submit to generate a resume ready for you to copy. Please note that the generated resume may contain inaccuracies; users are advised to edit it accordingly.',
      videoUrl: 'https://www.youtube.com/embed/your_video_id_2', // Replace with your video URL
    },
  ]

  return (
    <Container maxWidth="lg">
      <Typography
        variant="h2"
        component="h1"
        gutterBottom
        align="center"
        sx={{ mb: 2, mt: 4 }}
      >
        How to CodeCoach Effectively
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        sx={{ mb: 4, color: 'text.secondary' }}
      >
        Learn about how to solve problems, or build a resume using our website.
        We have made two videos avilable to help you get started.
      </Typography>
      <Box sx={{ mt: { xs: 4, sm: 6, md: 8 } }}>
        {videos.map((video) => (
          <Box key={video.id} sx={{ mb: { xs: 4, sm: 6, md: 8 } }}>
            <SectionTitle title={video.title} subtitle="" titleVariant="h5" />
            <VideoCard>
              <CardMedia
                component="iframe"
                src={video.videoUrl}
                title={video.title}
                sx={{
                  height: isSmallScreen ? '200px' : '400px',
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <CardContent>
                <Typography variant="body1">{video.summary}</Typography>
              </CardContent>
            </VideoCard>
          </Box>
        ))}
      </Box>
    </Container>
  )
}

export default Help
