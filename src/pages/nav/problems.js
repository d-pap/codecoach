/**
 * Problems page
 * This page shows all of the problems and is where
 * users will select a problem they want to solve,
 * then be taken to the Problem Detail page to solve it.
 */
import React, { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Grid,
  Button,
  Typography,
  styled,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  CircularProgress,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { fetchProblems } from '../../api'
import icpcImage from '../../images/icpc-category.png'
import programmingImage from '../../images/programming-category.png'
import interviewImage from '../../images/interview-category.png'

const CardStyled = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.spacing(2),
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[8],
  },
}))

const CardMediaStyled = styled(CardMedia)(({ theme }) => ({
  // the 2 lines below make sure to keep the aspect ratio of the image 16:9
  height: 0, // important
  paddingTop: '56.25%', // important - 16:9 aspect ratio
  backgroundColor: theme.palette.background.paper, // bg color if image doesnt load
}))

const CardTitle = styled(Typography)(({ theme }) => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}))

//! Make reusable card component. will improve readability and maintainability and performance (with the use of children prop)
function CategoryCard({ image, onClick, loading, buttonText, children }) {
  return (
    <CardStyled>
      <CardMediaStyled image={image} />
      <CardContent>{children}</CardContent>
      <CardActions sx={{ mt: 'auto', display: 'flex', alignItems: 'center' }}>
        <Button
          size="large"
          fullWidth
          variant="contained"
          onClick={onClick}
          disabled={loading}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {buttonText}
          {loading && (
            <CircularProgress
              size={24}
              sx={{ color: 'white', marginLeft: 2 }}
            />
          )}
        </Button>
      </CardActions>
    </CardStyled>
  )
}

function Problems() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [problems, setProblems] = useState([])

  useEffect(() => {
    async function loadProblems() {
      try {
        const data = await fetchProblems()
        setProblems(data)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching problems', err)
        setLoading(false)
      }
    }
    loadProblems()
  }, [])

  const navigateTo = (path) => {
    if (!loading) {
      navigate(path, { state: { problems } })
    }
  }
  return (
    <Box sx={{ bgcolor: 'background.default', py: 6 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          align="center"
          sx={{
            mb: 6,
          }}
        >
          Explore Problem Categories
        </Typography>
        <Grid container spacing={4}>
          {/* ICPC problem section */}
          <Grid item xs={12} sm={6} md={4}>
            <CategoryCard
              image={icpcImage}
              onClick={() => navigateTo('/problems/icpc')}
              loading={loading}
              buttonText="Explore ICPC Problems"
            >
              <CardTitle gutterBottom variant="h5" component="div">
                ICPC
              </CardTitle>
              <Typography variant="body2">
                ICPC stands for The International Collegiate Programming
                Contest. This contest is one of the most prestigious competitive
                programming contests globally. The problems included in the ICPC
                section are derived from various past ICPC competitions and
                cover a broad range of topics.
              </Typography>
            </CategoryCard>
          </Grid>
          {/* Programming section */}
          <Grid item xs={12} sm={6} md={4}>
            <CategoryCard
              image={programmingImage}
              onClick={() => navigateTo('/problems/programming')}
              loading={loading}
              buttonText="Explore Programming Problems"
            >
              <CardTitle gutterBottom variant="h5" component="div">
                Programming
              </CardTitle>
              <Typography variant="body2">
                The Programming section includes a variety of problems designed
                to enhance your coding skills and problem-solving abilities.
                Topics covered in this section span a wide array of common
                programming challenges such as algorithms, data structures,
                complexity analysis, sorting and searching, dynamic programming,
                and more.
              </Typography>
            </CategoryCard>
          </Grid>
          {/* Interview section */}
          <Grid item xs={12} sm={6} md={4}>
            <CategoryCard
              image={interviewImage}
              onClick={() => navigateTo('/problems/interview')}
              loading={loading}
              buttonText="Explore Interview Problems"
            >
              <CardTitle gutterBottom variant="h5" component="div">
                Interview
              </CardTitle>
              <Typography variant="body2">
                The Interview section focuses on questions commonly asked by
                FAANG (Facebook, Amazon, Netflix, Google) companies during
                technical interviews. This section is designed to help students
                and professionals prepare for the types of questions they might
                encounter in real-world technical interviews.
              </Typography>
            </CategoryCard>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Problems
