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
  //Stack,
  Typography,
  Paper,
  //useMediaQuery,
  useTheme,
  styled,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { fetchProblems } from '../../api'
// import './problems.css'

const ButtonStyled = styled(Button)(({ theme }) => ({
  width: '100%',
  height: '50px', // slightly taller to accentuate buttons
  borderRadius: '6px',
  //font: 'inherit', // font in `body` tag of `App.css` (DM Sans currently)
  color: theme.palette.primary.contrastText, // color of button text
  backgroundColor: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
    transition: 'background-color 0.3s ease',
  },
}))

const TypographyBodyStyled = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(2), // padding around the text in the paper boxes
  //font: 'inherit', // font in `body` tag of `App.css` (DM Sans currently)
}))

const PaperStyled = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2), // padding around the paper boxes for buttons
  boxShadow: theme.shadows[3],
  borderRadius: theme.spacing(2), // rounded corners
}))

function Problems() {
  const navigate = useNavigate()
  useTheme()
  // const theme = useTheme()
  //const isLaptopScreen = useMediaQuery(theme.breakpoints.up('md'))

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
        // warn the user that there was an error
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
    <Box sx={{ bgcolor: 'background.default', py: 4 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          align="center"
          sx={{ mb: 4 }}
        >
          Problems
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={{
                //backgroundColor: 'lightblue', // background color of the box around paper
                padding: 1, // padding around boxes for paper areas
              }}
            >
              <PaperStyled>
                <ButtonStyled
                  variant="contained"
                  onClick={() => navigateTo('/problems/icpc')}
                  disabled={loading}
                >
                  ICPC
                </ButtonStyled>
                <TypographyBodyStyled variant="body1" align="left">
                  ICPC stands for The International Collegiate Programming
                  Contest. This contest is one of the most prestigious
                  competitive programming contests globally. The problems
                  included in the ICPC section are derived from various past
                  ICPC competitions and cover a broad range of topics.
                  Participants are challenged with complex algorithmic problems
                  that test their problem-solving skills under time constraints.
                  These problems are designed to challenge participants’ ability
                  to apply theoretical knowledge to practical scenarios and to
                  think critically and efficiently.
                </TypographyBodyStyled>
              </PaperStyled>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={{
                //backgroundColor: 'lightcoral', // background color of the box around paper
                padding: 1, // padding around boxes for paper areas
              }}
            >
              <PaperStyled>
                <ButtonStyled
                  variant="contained"
                  onClick={() => navigateTo('/problems/programming')}
                  disabled={loading}
                >
                  Programming
                </ButtonStyled>
                <TypographyBodyStyled variant="body1" align="left">
                  The Programming section includes a variety of problems
                  designed to enhance your coding skills and problem-solving
                  abilities. Topics covered in this section span a wide array of
                  common programming challenges such as algorithms, data
                  structures, complexity analysis, sorting and searching,
                  dynamic programming, and more. This section aims to provide a
                  comprehensive training ground for individuals to refine their
                  programming skills, prepare for coding interviews, or simply
                  enjoy solving interesting and challenging problems.
                </TypographyBodyStyled>
              </PaperStyled>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={{
                //backgroundColor: 'lightgreen', // background color of the box around paper
                padding: 1, // padding around boxes for paper areas
              }}
            >
              <PaperStyled>
                <ButtonStyled
                  variant="contained"
                  onClick={() => navigateTo('/problems/interview')}
                  disabled={loading}
                >
                  Interview
                </ButtonStyled>
                <TypographyBodyStyled variant="body1" align="left">
                  The Interview section focuses on questions commonly asked by
                  FANG (Facebook, Amazon, Netflix, Google) companies during
                  technical interviews. This section is designed to help
                  students and professionals prepare for the types of questions
                  they might encounter in real-world technical interviews.
                  Topics include algorithmic problem solving, system design,
                  coding challenges, and behavioral questions. Each question is
                  crafted to mimic real interview scenarios, helping candidates
                  to practice and improve their responses to excel in their job
                  interviews.
                </TypographyBodyStyled>
              </PaperStyled>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Problems
