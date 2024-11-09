/**
 * Courses page
 * This can be temporary if we want to use it for something else
 * or delete it completely. Was initially only made to construct navbar
 */
import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { getAllCourses, getCourseByIdProblems } from '../api'
// course card component
const CourseCard = ({ course, comingSoon }) => (
  <Card
    sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <CardContent
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          {course.title}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          {course.description}
        </Typography>
      </Box>

      <Box
        sx={{
          mt: 'auto',
          width: '100%',
        }}
      >
        {comingSoon && (
          <Button
            variant="contained"
            disabled
            sx={{
              mt: 2,
              width: '100%',
            }}
          >
            Coming Soon
          </Button>
        )}
        {!comingSoon && (
          <Button
            variant="contained"
            color="primary"
            sx={{
              mt: 2,
              width: '100%',
            }}
          >
            View Course
          </Button>
        )}
      </Box>
    </CardContent>
  </Card>
)

const CourseList = () => {
  // fetch all courses
  const {
    data: courses = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['courses'],
    queryFn: getAllCourses,
  })

  // separate courses into categories
  const featuredCourses = courses.slice(0, 3)
  const regularCourses = courses.filter(
    (course) => course.problemIds.length > 0
  )
  const comingSoonCourses = courses.filter(
    (course) => course.problemIds.length === 0
  )

  return (
    <Box sx={{ minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 8, textAlign: 'center' }}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{ mb: 4, fontWeight: 'bold' }}
          >
            Courses
          </Typography>
          <Typography
            variant="body2"
            sx={{
              maxWidth: '800px',
              mx: 'auto',
              color: '#475569',
              lineHeight: 1.6,
              textAlign: 'center',
            }}
          >
            Join one of our curated courses to learn and practice coding
            problems. This is your place to prepare for competitive coding
            events and technical interviews.
          </Typography>
        </Box>

        {/* Featured Courses Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" sx={{ mb: 2, fontWeight: 'bold' }}>
            Featured Courses
          </Typography>
          <Grid container spacing={2}>
            {featuredCourses.map((course) => (
              <Grid item xs={12} sm={4} md={4} key={course._id}>
                <CourseCard course={course} />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Regular Courses Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" sx={{ mb: 2, fontWeight: 'bold' }}>
            Courses
          </Typography>
          <Grid container spacing={2}>
            {regularCourses.map((course) => (
              <Grid item xs={12} sm={4} md={4} key={course._id}>
                <CourseCard course={course} />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Coming Soon Courses Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" sx={{ mb: 2, fontWeight: 'bold' }}>
            Coming Soon
          </Typography>
          <Grid container spacing={2}>
            {comingSoonCourses.map((course) => (
              <Grid item xs={12} sm={4} md={4} key={course._id}>
                <CourseCard course={course} comingSoon />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  )
}
export default CourseList
