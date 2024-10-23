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
import multipleICPCImage from '../../images/add-icpc.png'
import interviewImage from '../../images/add-interview.jpg'
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
  backgroundSize: 'contain',
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

  const handleNavigateToMultipleICPCForm = () => {
    navigate('/manage-problems/add-multiple-icpc')
  }

  const handleNavigateToInterviewForm = () => {
    navigate('/manage-problems/add-interview')
  }

  return (
    <Box sx={{ bgcolor: 'background.default', py: 6 }}>
      <Container maxWidth="md">
        {/* Title Section */}
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          align="center"
          sx={{ mb: 4 }}
        >
          Add Questions
        </Typography>

        {/* Cards Section */}
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={5}>
            <CategoryCard
              image={multipleICPCImage}
              onClick={handleNavigateToMultipleICPCForm}
              buttonText="Add Multiple ICPC Questions"
              title="Add ICPC Questions"
              description="Bulk add ICPC questions. Supports PDF upload and RegEx parsing for quicker input."
            />
          </Grid>

          <Grid item xs={12} sm={6} md={5}>
            <CategoryCard
              image={interviewImage}
              onClick={handleNavigateToInterviewForm}
              buttonText="Add Interview Questions"
              title="Add Interview Questions"
              description="Add interview questions to the database. To Be Implemented."
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default ManageProblemsPage
