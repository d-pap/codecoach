import React from 'react'
import { useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { Link } from 'react-router-dom'
import { Link as MuiLink } from '@mui/material'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import DoubleArrowRoundedIcon from '@mui/icons-material/DoubleArrowRounded'
import { styled } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import { CardMedia } from '@mui/material'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import grad16 from '../images/Grad_16.png'
import competitionImage from '../images/competitions2.svg'
import interviewsImage from '../images/interviewsbw.svg'
import problemsImage from '../images/problemsbw.svg'
import signUpImage from '../images/howtosignup.svg'
import prepareImage from '../images/howtoprepare.svg'
import behaviorImage from '../images/behavioral.svg'
import resumeResourcesImage from '../images/resumeresources.svg'

/**
 * section title component
 */
const SectionTitle = ({ title, subtitle, link, linkText }) => (
  <>
    <Typography
      variant="h4"
      sx={{
        mb: 2,
        fontWeight: 'bold',
        fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
      }}
    >
      {title}
    </Typography>
    <Typography variant="subtitle" sx={{ mb: 2, color: 'text.secondary' }}>
      {subtitle}
    </Typography>
    <Link
      to={link}
      style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '1rem',
        textDecoration: 'none',
      }}
    >
      {linkText}{' '}
      <ArrowForwardRoundedIcon sx={{ ml: 0.5, fontSize: '1.25rem' }} />
    </Link>
  </>
)

/**
 * section cards components
 */
const FullWidthCard = ({ image, alt, content }) => (
  <Card sx={{ display: 'flex', mb: 4, maxHeight: '400px' }}>
    <CardMedia
      component="img"
      sx={{ width: '60%', objectFit: 'contain' }}
      image={image}
      alt={alt}
    />
    <CardContent
      sx={{
        width: '40%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {content}
    </CardContent>
  </Card>
)

/**
 * two column cards component
 */
const TwoColumnCards = ({ cards }) => {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Grid container spacing={4}>
      {cards.map((card, index) => (
        <Grid item xs={12} sm={6} key={index}>
          <MuiLink
            href={card.link}
            underline="none"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition:
                  'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': { transform: 'translateY(-5px)', boxShadow: 6 },
              }}
            >
              {!isSmallScreen && (
                <Box sx={{ height: '200px', overflow: 'hidden' }}>
                  <CardMedia
                    component="img"
                    sx={{
                      height: '100%',
                      objectFit: 'contain',
                      objectPosition: 'center',
                    }}
                    image={card.image}
                    alt={card.alt}
                  />
                </Box>
              )}
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {card.title}
                </Typography>
                <Typography variant="body2">{card.description}</Typography>
              </CardContent>
            </Card>
          </MuiLink>
        </Grid>
      ))}
    </Grid>
  )
}

/**
 * featured problems grid component
 */
const FeaturedProblemsGrid = ({ problems }) => (
  <Grid container spacing={4}>
    {problems.map((problem) => (
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
            <Button
              variant="contained"
              size="small"
              color="primary"
              href={problem.link}
            >
              Solve Now
            </Button>
          </CardActions>
        </FeaturedCard>
      </Grid>
    ))}
  </Grid>
)

/**
 * section component
 */
const Section = ({
  title,
  subtitle,
  link,
  linkText,
  fullWidthCard,
  twoColumnCards,
  featuredProblems,
}) => (
  <Box sx={{ mb: { xs: 4, sm: 6, md: 8 }, mt: { xs: 4, sm: 6, md: 8 } }}>
    <SectionTitle
      title={title}
      subtitle={subtitle}
      link={link}
      linkText={linkText}
    />
    {fullWidthCard && <FullWidthCard {...fullWidthCard} />}
    {twoColumnCards && <TwoColumnCards cards={twoColumnCards} />}
    {featuredProblems && <FeaturedProblemsGrid problems={featuredProblems} />}
  </Box>
)

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

  const heroContent = {
    title: 'codecoach',
    subtitles: ['Level up your coding skills', 'with AI-driven feedback'],
    buttonText: 'Explore Problems',
    buttonLink: '/problems',
  }

  /**
   * section content definitions
   */
  const sections = [
    {
      title: 'Upcoming Competitions',
      subtitle: 'Check out upcoming competitions and start preparing today',
      link: 'https://umdearborn.edu/cecs/life-cecs/student-clubs-organizations',
      linkText: 'Explore upcoming competitions',
      fullWidthCard: {
        image: competitionImage,
        alt: 'Competition illustration',
        content: (
          <>
            <Typography variant="h6" gutterBottom>
              ICPC NA Qualifier: Oct. 5, 2024
            </Typography>
            <Typography variant="h6" gutterBottom>
              ICPC East Central NA Regionals: Nov. 9, 2024
            </Typography>
            <Typography variant="h6" gutterBottom>
              ICPC World Finals: TBD
            </Typography>
          </>
        ),
      },
      twoColumnCards: [
        {
          image: signUpImage,
          alt: 'How to Sign Up',
          title: 'How to Sign Up',
          description:
            'Ready to test your skills? Join our ACM club and take part in challenges that push your coding limits.',
          link: 'https://umdearborn.edu/cecs/life-cecs/student-clubs-organizations',
        },
        {
          image: prepareImage,
          alt: 'How to Prepare',
          title: 'How to Prepare',
          description:
            'Gear up for success! Find additional resources and tips to help you prepare for upcoming competitions.',
          link: 'https://umdearborn.edu/cecs/life-cecs/student-clubs-organizations',
        },
      ],
    },
    {
      title: 'Featured Problems',
      subtitle: 'Check out our featured problems and start preparing today',
      link: '/problems',
      linkText: 'Explore problems',
      fullWidthCard: {
        image: problemsImage,
        alt: 'Problem illustration',
        content: (
          <>
            <Typography variant="h6" gutterBottom>
              Explore Problems
            </Typography>
            <Typography variant="body1" gutterBottom>
              Prepare for your next competition by solving problems from
              previous competitions
            </Typography>
          </>
        ),
      },
      featuredProblems: [
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
      ],
    },
    {
      title: 'Interview Prep',
      subtitle:
        'Explore common technical interview questions from FAANG companies',
      link: '/interviews',
      linkText: 'Explore interview prep',
      fullWidthCard: {
        image: interviewsImage,
        alt: 'Interview illustration',
        content: (
          <>
            <Typography variant="h6" gutterBottom>
              FAANG Interview Prep
            </Typography>
            <Typography variant="body1" gutterBottom>
              Prepare by reviewing common interview questions from FAANG
              companies
            </Typography>
          </>
        ),
      },
      twoColumnCards: [
        {
          image: behaviorImage,
          alt: 'Behavioral Questions',
          title: 'Behavioral Questions',
          description:
            'Ace your next interview by mastering common behavioral questions. Learn what to expect and how to give answers that impress.',
          link: 'https://umdearborn.edu/career-services/job-and-internship-prep/interviewing',
        },
        {
          image: resumeResourcesImage,
          alt: 'Resume Resources',
          title: 'Resume Resources',
          description:
            'Craft a standout resume with resources tailored to your career path. Learn how to showcase your skills and experience effectively.',
          link: 'https://umdearborn.edu/career-services/job-and-internship-prep/resumes-and-cover-letters',
        },
      ],
    },
  ]

  return (
    <>
      {/* hero section */}
      <Box
        position="relative"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height={{ xs: '60vh', sm: '70vh', md: '80vh' }}
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
            fontSize: {
              xs: '10vh',
              sm: '10vh',
              md: '12vh',
              lg: '12vh',
              xl: '12vh',
            },
            textAlign: 'center',
          }}
        >
          {heroContent.title}
        </Typography>
        {heroContent.subtitles.map((subtitle, index) => (
          <Typography
            key={index}
            variant="h4"
            color="text.secondary"
            sx={{
              position: 'relative',
              zIndex: 2,
              mt: index === 0 ? 2 : 0,
              fontSize: {
                xs: '1rem',
                sm: '1.226rem',
                md: '1.5rem',
                lg: '1.8rem',
                xl: '2rem',
              },
              textAlign: 'center',
            }}
          >
            {subtitle}
          </Typography>
        ))}
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate(heroContent.buttonLink)}
          sx={{
            mt: 6,
            py: 1.5,
            px: 4,
            fontWeight: 'bold',
            fontSize: { xs: '0.8rem', sm: '1rem', md: '1.1rem' },
            position: 'relative',
            zIndex: 2,
          }}
        >
          {heroContent.buttonText} <DoubleArrowRoundedIcon sx={{ ml: 0.5 }} />
        </Button>
      </Box>

      {/* sections */}
      <Container maxWidth="lg">
        {sections.map((section, index) => (
          <Section key={index} {...section} />
        ))}

        {/* join community section */}
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
              color="primary"
              onClick={() =>
                navigate(
                  'https://umdearborn.edu/cecs/life-cecs/student-clubs-organizations'
                )
              }
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
