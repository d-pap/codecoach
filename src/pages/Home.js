import React from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import { styled } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import { CardMedia } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import programmingCategory from '../images/programming-category.png'
import interviewImage from '../images/interview-category.png'
import icpcImage from '../images/icpc-category.png'
import grad15 from '../images/Grad_15.png'
import grad14 from '../images/Grad_14.png'
import grad16 from '../images/Grad_16.png'
import { Link } from 'react-router-dom'

const FeaturedCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[10],
  },
}))

export const Home = () => {
  const navigate = useNavigate()

  // Dummy data for Featured Problems
  const featuredProblems = [
    {
      id: 1,
      title: 'Password Suspects',
      description:
        'Write a program to determine the number of possible passwords based on known substrings and print them if there are at most 42.',
      link: '/problems/66f6bfda52d0bd7693b47090',
    },
    {
      id: 2,
      title: 'Net Loss',
      description:
        'Help Rose find the optimal coefficients for a polygonal approximation of polynomials given memory constraints.',
      link: '/problems/66f6bfdad8ac88fa6f3f31b0',
    },
    {
      id: 3,
      title: 'Huffman Codes',
      description:
        'Write a program to determine the total number of distinct frequency distributions that could produce a given Huffman encoding.',
      link: '/problems/66f6bfda282aa11c12a882af',
    },
  ]

  // Dummy data for Recommended Resources
  const recommendedResources = [
    {
      id: 1,
      title: 'LeetCode',
      description:
        'Practice coding problems and prepare for technical interviews.',
      link: 'https://leetcode.com/',
    },
    {
      id: 2,
      title: 'HackerRank',
      description:
        'Enhance your coding skills through challenges and competitions.',
      link: 'https://www.hackerrank.com/',
    },
    {
      id: 3,
      title: 'Codeforces',
      description:
        'Participate in programming contests and improve your problem-solving skills.',
      link: 'https://codeforces.com/',
    },
  ]

  return (
    <>
      <Box
        position="relative"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height={{ xs: '60vh', sm: '70vh', md: '80vh' }}
        overflow="hidden"
      >
        <Box
          position="relative"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          width="100%"
          height="100%"
          overflow="hidden"
          sx={{
            backgroundImage: `url(${grad16})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <Typography
            variant="h1"
            component="h1"
            fontWeight="bold"
            fontFamily="Helvetica, Arial, sans-serif"
            color="text.primary"
            sx={{
              position: 'relative',
              zIndex: 2,
              fontSize: { xs: '3rem', sm: '4rem', md: '5rem' },
              textAlign: 'center',
            }}
          >
            codecoach
          </Typography>
          <Typography
            variant="h4"
            color="text.secondary"
            sx={{
              position: 'relative',
              zIndex: 2,
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
              textAlign: 'center',
            }}
          >
            {' '}
            {/* //TODO: change this text */}
            Your AI-Powered Coding Coach
          </Typography>
          <Typography
            variant="h4"
            color="text.secondary"
            sx={{
              position: 'relative',
              zIndex: 2,
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
              textAlign: 'center',
            }}
          >
            {' '}
            {/* //TODO: change this text */}
            SECOND LINE TEXT HERE
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => navigate('/problems')}
            sx={{
              mt: 4,
              py: 1.5,
              px: 4,
              fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
              fontWeight: 'bold',
              position: 'relative',
              zIndex: 2,
            }}
          >
            Get Started
          </Button>
        </Box>
      </Box>
      <Container maxWidth="lg">
        {/* Upcoming competitions section */}
        <Box sx={{ mb: { xs: 4, sm: 6, md: 8 }, mt: { xs: 4, sm: 6, md: 8 } }}>
          <Typography
            variant="h4"
            sx={{
              mb: 2,
              fontWeight: 'bold',
              fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
            }}
          >
            Upcoming Competitions
          </Typography>
          <Typography
            variant="subtitle"
            sx={{
              mb: 2,
              color: 'text.secondary', // TODO: change font and colors
            }}
          >
            Check out upcoming competitions and start preparing today
          </Typography>
          <Link
            to="/home" // TODO: change link type, link page, colors and arrow style - link to UMD ACM club page???
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '1rem',
              color: 'your-secondary-color',
              textDecoration: 'none',
            }}
          >
            Explore upcoming competitions{' '}
            <ArrowForwardIcon style={{ marginLeft: '0.25rem' }} />
          </Link>

          {/* Full-width card for main ICPC competition */}
          <Card
            sx={{
              display: 'flex', // TODO: change height of card
              mb: 4,
              height: '400px',
              maxHeight: '400px',
            }}
          >
            <CardMedia
              component="img" // TODO: change to image of competition
              sx={{ width: '60%', objectFit: 'contain' }}
              image={grad15}
              alt="Competition illustration"
            />
            <CardContent
              sx={{
                width: '40%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Typography
                variant="h6"
                gutterBottom // TODO: change competition dates and names, add links?
              >
                ICPC Competition: July 5, 2025
              </Typography>
              <Typography
                variant="h6"
                gutterBottom // TODO: change competition dates and names, add links?
              >
                Google Code Jam: August 15, 2025
              </Typography>
              <Typography
                variant="h6"
                gutterBottom // TODO: change competition dates and names, add links?
              >
                Facebook Hacker Cup: September 1, 2025
              </Typography>
            </CardContent>
          </Card>

          {/* two cards for other, smaller competitions coming up OR make them for "how to sign up" and "how to prepare"? */}
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image="/path-to-image1.jpg"
                  alt="Card image 1"
                />
                <CardContent>
                  <Typography
                    variant="h6" // TODO: change this section ? make it link to ACM club how to sign up page?
                    gutterBottom
                  >
                    How to Sign Up
                  </Typography>
                  <Typography variant="body2">
                    This is some example text content for the first card. You
                    can add more details about competitions or related
                    information here.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image="/path-to-image2.jpg"
                  alt="Card image 2"
                />
                <CardContent>
                  <Typography
                    variant="h6" // TODO: change this section ? make it link to ACM club how to prepare page?
                    gutterBottom
                  >
                    How to Prepare
                  </Typography>
                  <Typography variant="body2">
                    This is some example text content for the second card. You
                    can add more details about competitions or related
                    information here.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Featured problems section */}
        <Box sx={{ mb: { xs: 4, sm: 6, md: 8 }, mt: { xs: 4, sm: 6, md: 8 } }}>
          <Typography
            variant="h4"
            sx={{
              mb: 2,
              fontWeight: 'bold',
              fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
            }}
          >
            Featured Problems
          </Typography>
          <Typography
            variant="subtitle"
            sx={{
              mb: 2,
              color: 'text.secondary', // TODO: change font and colors
            }}
          >
            Check out our featured problems and start preparing today
          </Typography>
          <Link
            to="/problems" // TODO: change link type, link page, colors and arrow style
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '1rem',
              color: 'your-secondary-color',
              textDecoration: 'none',
            }}
          >
            Explore problems{' '}
            <ArrowForwardIcon style={{ marginLeft: '0.25rem' }} />
          </Link>

          {/* full width card for problems */}
          <Card
            sx={{
              display: 'flex',
              mb: 4,
              maxHeight: '400px',
            }}
          >
            <CardMedia
              component="img" // TODO: change to image of an AI assistant?
              sx={{ width: '60%', objectFit: 'contain' }}
              image={grad16}
              alt="Problem illustration"
            />
            <CardContent
              sx={{
                width: '40%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Typography
                variant="h6"
                gutterBottom // TODO: change competition dates and names, add links?
              >
                Explore Problems
              </Typography>
              <Typography
                variant="body1"
                gutterBottom // TODO: talk about AI assistant here
              >
                Prepare for your next competition by solving problems from
                previous competitions
              </Typography>
            </CardContent>
          </Card>

          <Grid container spacing={4}>
            {featuredProblems.map((problem) => (
              <Grid item xs={12} sm={6} md={4} key={problem.id}>
                <FeaturedCard elevation={3}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      {problem.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {problem.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary" href={problem.link}>
                      Solve Now
                    </Button>
                  </CardActions>
                </FeaturedCard>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Interview prep section */}
        <Box sx={{ mb: { xs: 4, sm: 6, md: 8 }, mt: { xs: 4, sm: 6, md: 8 } }}>
          <Typography
            variant="h4"
            sx={{
              mb: 2,
              fontWeight: 'bold',
              fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
            }}
          >
            Interview Prep
          </Typography>
          <Typography
            variant="subtitle"
            sx={{
              mb: 2,
              color: 'text.secondary', // TODO: change font and colors
            }}
          >
            Check out our interview prep section and start preparing today
          </Typography>
          <Link
            to="/interviews" // TODO: change link type, link page, colors and arrow style
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '1rem',
              color: 'your-secondary-color',
              textDecoration: 'none',
            }}
          >
            Explore Interview Prep{' '}
            <ArrowForwardIcon style={{ marginLeft: '0.25rem' }} />
          </Link>

          {/* Full-width card */}
          <Card
            sx={{
              display: 'flex', // TODO: change height of card
              mb: 4,
              maxHeight: '400px',
            }}
          >
            <CardMedia
              component="img" // TODO: change to image of interview prep
              sx={{ width: '60%', objectFit: 'contain' }}
              image={grad14}
              alt="Interview illustration"
            />
            <CardContent
              sx={{
                width: '40%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Typography
                variant="h6"
                gutterBottom // TODO: change interview section, add links?
              >
                FAANG Interview Prep
              </Typography>
              <Typography
                variant="body1"
                gutterBottom // TODO: change competition dates and names, add links?
              >
                Prepare by reviewing common interview questions from FAANG
                companies
              </Typography>
            </CardContent>
          </Card>

          {/* Two cards in a row */}
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image="/path-to-image1.jpg"
                  alt="Card image 1"
                />
                <CardContent>
                  <Typography
                    variant="h6" // TODO: change this section ?
                    gutterBottom
                  >
                    Behavioral Questions
                  </Typography>
                  <Typography
                    variant="body2" // TODO: change this text
                  >
                    This is some example text content for the first card. You
                    can add more details about competitions or related
                    information here.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image="/path-to-image2.jpg"
                  alt="Card image 2"
                />
                <CardContent>
                  <Typography
                    variant="h6" // TODO: change this section? maybe link it to UMD resume resources page?
                    gutterBottom
                  >
                    Resume Resources
                  </Typography>
                  <Typography
                    variant="body2" // TODO: change this text
                  >
                    This is some example text content for the second card. You
                    can add more details about competitions or related
                    information here.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Join community section */}
        <Box sx={{ mb: { xs: 4, sm: 6, md: 8 } }}>
          <Box
            sx={{
              mt: { xs: 4, sm: 6, md: 8 },
              bgcolor: 'grey.100',
              p: { xs: 3, sm: 4, md: 6 },
              borderRadius: 4,
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage:
                  'radial-gradient(circle, rgba(0,0,0,0.05) 1px, transparent 1px)',
                backgroundSize: '20px 20px',
                opacity: 0.5,
              },
            }}
          >
            <Typography variant="h5" gutterBottom>
              Join the Community
            </Typography>
            <Typography variant="body1" gutterBottom>
              Connect with fellow ACM enthusiasts, share knowledge, and
              collaborate on challenging problems. Our community is dedicated to
              fostering a supportive environment where you can grow your skills
              and achieve your competitive programming goals.
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate('/home')}
              sx={{ mt: 2 }}
            >
              Explore UMD ACM
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default Home
