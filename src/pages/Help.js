import React from 'react'
import { useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/system'
import PageLayout from '../components/PageLayout'
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

  // Updated Video data with embed URLs
  const videos = [
    {
      id: 1,
      title: 'Using the Built-in Compiler and AI',
      summary:
        'Learn how to solve programming problems using our built-in compiler. Choose from multiple languages like Python, Java, C, and C++. Customize your coding environment with various themes including dark, light, and color-highlighted options. Utilize the AI chat to break down problems, analyze your code, and receive a score. Explore the problem tab for problem statements, the hint tab for quick hints, and the forum for discussions.',
      videoUrl: 'https://www.youtube.com/embed/YUJ7elRJAbQ?si=HDTL_qkRGZUqG2yB',
    },
    {
      id: 2,
      title: 'Resume Builder Overview',
      summary:
        'Discover how to build your resume using our AI-powered resume builder. Add sections such as education, work experience, projects, and skills. Include the job description and additional commands to the AI for a tailored resume. After completion, press submit to generate a resume ready for you to copy. Please note that the generated resume may contain inaccuracies; users are advised to edit it accordingly.',
      videoUrl: 'https://www.youtube.com/embed/tD5C9ciBcXA?si=jO-QkkNVs5tuAvk0',
    },
  ]

  return (
    <PageLayout
      overline="Help"
      title="We're here to help"
      subtitle="Need assistance? Find answers to FAQs, guides, and tips to get the most out of your experience."
    >
      <Box sx={{ mt: { xs: 4, sm: 6, md: 8 } }}>
        {videos.map((video) => (
          <Box key={video.id} sx={{ mb: { xs: 4, sm: 6, md: 8 } }}>
            <SectionTitle title={video.title} subtitle="" titleVariant="h5" />
            <VideoCard>
              <Box
                sx={{
                  position: 'relative',
                  paddingTop: '56.25%', // 16:9 Aspect Ratio
                }}
              >
                <iframe
                  src={video.videoUrl}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                  }}
                ></iframe>
              </Box>
              <CardContent>
                <Typography variant="body1">{video.summary}</Typography>
              </CardContent>
            </VideoCard>
          </Box>
        ))}
      </Box>
    </PageLayout>
  )
}

export default Help
