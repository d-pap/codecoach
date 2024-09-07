import React from 'react'
import {
  Box,
  Grid,
  Typography,
  Container,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Button,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'
import icpcImage from '../../images/placeholder.jpg'
import multipleICPCImage from '../../images/placeholder.jpg' // Placeholder for multiple ICPC
import interviewImage from '../../images/placeholder.jpg'

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
  height: 0,
  paddingTop: '56.25%',
  backgroundColor: theme.palette.background.paper,
}))

const CardTitle = styled(Typography)(({ theme }) => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}))

function CategoryCard({ image, onClick, buttonText, children }) {
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
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {buttonText}
        </Button>
      </CardActions>
    </CardStyled>
  )
}

const AddProblemsPage = () => {
  const navigate = useNavigate()

  const handleNavigateToSingleICPCForm = () => {
    navigate('/addProblems/singleICPC')
  }

  const handleNavigateToMultipleICPCForm = () => {
    navigate('/addProblems/multipleICPC')
  }

  const handleNavigateToInterviewForm = () => {
    navigate('/addProblems/interview')
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
          Add Problems
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <CategoryCard
              image={icpcImage}
              onClick={handleNavigateToSingleICPCForm}
              buttonText="Add Single ICPC Question"
            >
              <CardTitle gutterBottom variant="h5" component="div">
                Add Single ICPC Question
              </CardTitle>
              <Typography variant="body2">
                Add a single ICPC question to the database. Allows for choosing
                of region, year, title, description, input, output, and sample
                test cases. At the end, you can choose to include a hint.
              </Typography>
            </CategoryCard>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CategoryCard
              image={multipleICPCImage}
              onClick={handleNavigateToMultipleICPCForm}
              buttonText="Add Multiple ICPC Questions"
            >
              <CardTitle gutterBottom variant="h5" component="div">
                Add Multiple ICPC Questions
              </CardTitle>
              <Typography variant="body2">
                Add multiple ICPC questions to the database. Allows for all the
                same fields as single ICPC question, but in a bulk format. You
                can also upload pdf files along with RegEx to parse them.
              </Typography>
            </CategoryCard>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CategoryCard
              image={interviewImage}
              onClick={handleNavigateToInterviewForm}
              buttonText="Add Interview Questions"
            >
              <CardTitle gutterBottom variant="h5" component="div">
                Add Interview Questions
              </CardTitle>
              <Typography variant="body2">
                Add interview questions to the database. To Be Implemented...
              </Typography>
            </CategoryCard>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default AddProblemsPage
