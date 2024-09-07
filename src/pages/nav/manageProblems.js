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
  Divider,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'
import icpcImage from '../../images/icpc_logo.png'
import multipleICPCImage from '../../images/pdf-parser.jpg'
import interviewImage from '../../images/interview-icon.png'
import editICPCImage from '../../images/placeholder.jpg'
import editInterviewImage from '../../images/placeholder.jpg'

const CardStyled = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  borderRadius: theme.spacing(2),
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[8],
  },
}))

const CardMediaStyled = styled(CardMedia)(({ theme }) => ({
  height: 140,
  backgroundColor: theme.palette.background.paper,
}))

function CategoryCard({ image, onClick, buttonText, title, description }) {
  return (
    <CardStyled>
      <CardMediaStyled image={image} />
      <CardContent>
        <Typography gutterBottom variant="h6">
          {title}
        </Typography>
        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'center' }}>
        <Button size="large" fullWidth variant="contained" onClick={onClick}>
          {buttonText}
        </Button>
      </CardActions>
    </CardStyled>
  )
}

const ManageProblemsPage = () => {
  const navigate = useNavigate()

  const handleNavigateToSingleICPCForm = () => {
    navigate('/manage-problems/singleICPC')
  }

  const handleNavigateToMultipleICPCForm = () => {
    navigate('/manage-problems/multipleICPC')
  }

  const handleNavigateToInterviewForm = () => {
    navigate('/manage-problems/interview')
  }

  const handleNavigateToEditICPCForm = () => {
    navigate('/manage-problems/editICPC')
  }

  const handleNavigateToEditInterviewForm = () => {
    navigate('/manage-problems/editInterview')
  }

  return (
    <Box sx={{ bgcolor: 'background.default', py: 6 }}>
      <Container maxWidth="md">
        {/* ICPC Section */}
        <Typography variant="h4" align="center" gutterBottom>
          Manage ICPC Questions
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <CategoryCard
              image={icpcImage}
              onClick={handleNavigateToSingleICPCForm}
              buttonText="Add Single ICPC Question"
              title="Add Single ICPC Question"
              description="Add a single ICPC question with fields like region, year, title, description, input, output, and sample test cases."
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CategoryCard
              image={multipleICPCImage}
              onClick={handleNavigateToMultipleICPCForm}
              buttonText="Add Multiple ICPC Questions"
              title="Add Multiple ICPC Questions"
              description="Bulk add ICPC questions. Supports PDF upload and RegEx parsing for quicker input."
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CategoryCard
              image={editICPCImage}
              onClick={handleNavigateToEditICPCForm}
              buttonText="Edit ICPC Questions"
              title="Edit ICPC Questions"
              description="Modify existing ICPC questions by changing title, description, input/output, and test cases."
            />
          </Grid>
        </Grid>

        {/* Divider between sections */}
        <Divider sx={{ my: 6 }} />

        {/* Interview Section */}
        <Typography variant="h4" align="center" gutterBottom>
          Manage Interview Questions
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <CategoryCard
              image={interviewImage}
              onClick={handleNavigateToInterviewForm}
              buttonText="Add Interview Questions"
              title="Add Interview Questions"
              description="Add interview questions to the database. To Be Implemented."
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CategoryCard
              image={editInterviewImage}
              onClick={handleNavigateToEditInterviewForm}
              buttonText="Edit Interview Questions"
              title="Edit Interview Questions"
              description="Modify existing interview questions with updated input/output examples and descriptions."
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default ManageProblemsPage
