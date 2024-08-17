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
  backgroundColor: theme.palette.primary.main, // if image doesnt load
}))

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
          sx={{ mb: 6 }}
        >
          Explore Problem Categories
        </Typography>
        <Grid container spacing={4}>
          {/* ICPC problem section */}
          <Grid
            item
            xs={12} // xs screens=1 card per row
            sm={6} // sm=2 cards per row
            md={4} // md and above=3 cards per row
          >
            <CardStyled>
              <CardMediaStyled image={icpcImage} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  ICPC
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ICPC stands for The International Collegiate Programming
                  Contest. This contest is one of the most prestigious
                  competitive programming contests globally. The problems
                  included in the ICPC section are derived from various past
                  ICPC competitions and cover a broad range of topics.
                </Typography>
              </CardContent>
              <CardActions sx={{ mt: 'auto' }}>
                <Button
                  size="large"
                  fullWidth
                  variant="contained"
                  onClick={() => navigateTo('/problems/icpc')}
                  disabled={loading}
                >
                  Explore ICPC Problems
                </Button>
              </CardActions>
            </CardStyled>
          </Grid>
          {/* programming section */}
          <Grid
            item
            xs={12} // xs screens=1 card per row
            sm={6} // sm=2 cards per row
            md={4} // md and above=3 cards per row
          >
            <CardStyled>
              <CardMediaStyled image={programmingImage} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Programming
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  The Programming section includes a variety of problems
                  designed to enhance your coding skills and problem-solving
                  abilities. Topics covered in this section span a wide array of
                  common programming challenges such as algorithms, data
                  structures, complexity analysis, sorting and searching,
                  dynamic programming, and more.
                </Typography>
              </CardContent>
              <CardActions sx={{ mt: 'auto' }}>
                <Button
                  size="large"
                  fullWidth
                  variant="contained"
                  onClick={() => navigateTo('/problems/programming')}
                  disabled={loading}
                >
                  Explore Programming Problems
                </Button>
              </CardActions>
            </CardStyled>
          </Grid>
          {/* interview section */}
          <Grid
            item
            xs={12} // xs screens=1 card per row
            sm={6} // sm=2 cards per row
            md={4} // md and above=3 cards per row
          >
            <CardStyled>
              <CardMediaStyled image={interviewImage} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Interview
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  The Interview section focuses on questions commonly asked by
                  FAANG (Facebook, Amazon, Netflix, Google) companies during
                  technical interviews. This section is designed to help
                  students and professionals prepare for the types of questions
                  they might encounter in real-world technical interviews.
                </Typography>
              </CardContent>
              <CardActions sx={{ mt: 'auto' }}>
                <Button
                  size="large"
                  fullWidth
                  variant="contained"
                  onClick={() => navigateTo('/problems/interview')}
                  disabled={loading}
                >
                  Explore Interview Problems
                </Button>
              </CardActions>
            </CardStyled>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Problems
