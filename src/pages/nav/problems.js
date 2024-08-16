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
import CodeIcon from '@mui/icons-material/Code'
import BusinessIcon from '@mui/icons-material/Business'
import SchoolIcon from '@mui/icons-material/School'
import icpcImage from '../../images/icpc-category.png'
import programmingImage from '../../images/programming-category.png'
import interviewImage from '../../images/interview-category.png'

const StyledCard = styled(Card)(({ theme }) => ({
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

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: 0,
  paddingTop: '56.25%',
  backgroundColor: theme.palette.primary.main,
  /*
   * the code below is if we show icons instead of images in the cards:
   * - delete the code above and use the code below for icons
   */
  // paddingTop: '56.25%', // 16:9 aspect ratio
  // backgroundColor: theme.palette.primary.main,
  // display: 'flex',
  // alignItems: 'center',
  // justifyContent: 'center',
}))

/*
 * the code below is if we show icons instead of images in the cards:
 */
// for the icon in the card instead of the image:
// const IconWrapper = styled(Box)(({ theme }) => ({
//   fontSize: '4rem',
//   color: theme.palette.primary.contrastText,
// }))

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

  const problemCategories = [
    {
      title: 'ICPC',
      description:
        'ICPC stands for The International Collegiate Programming Contest. This contest is one of the most prestigious competitive programming contests globally. The problems included in the ICPC section are derived from various past ICPC competitions and cover a broad range of topics.',
      path: '/problems/icpc',
      icon: <SchoolIcon />,
      image: icpcImage,
    },
    {
      title: 'Programming',
      description:
        'The Programming section includes a variety of problems designed to enhance your coding skills and problem-solving abilities. Topics covered in this section span a wide array of common programming challenges such as algorithms, data structures, complexity analysis, sorting and searching, dynamic programming, and more.',
      path: '/problems/programming',
      icon: <CodeIcon />,
      image: programmingImage,
    },
    {
      title: 'Interview',
      description:
        'The Interview section focuses on questions commonly asked by FAANG (Facebook, Amazon, Netflix, Google) companies during technical interviews. This section is designed to help students and professionals prepare for the types of questions they might encounter in real-world technical interviews.',
      path: '/problems/interview',
      icon: <BusinessIcon />,
      image: interviewImage,
    },
  ]

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
          {problemCategories.map((category) => (
            <Grid item xs={12} sm={6} md={4} key={category.title}>
              <StyledCard>
                <StyledCardMedia image={category.image} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {category.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {category.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ mt: 'auto' }}>
                  <Button
                    size="large"
                    fullWidth
                    variant="contained"
                    onClick={() => navigateTo(category.path)}
                    disabled={loading}
                  >
                    Explore {category.title} Problems
                  </Button>
                </CardActions>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default Problems
