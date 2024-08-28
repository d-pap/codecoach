import React, { useState } from 'react'
import {
  AppBar,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material'
import { styled } from '@mui/system'
import HeroBg from '../images/hero-bg.jpg'

const HeaderSection = styled(AppBar)(({ theme }) => ({
  background: 'transparent',
  display: 'flex',
  justifyContent: 'space-between',
  boxShadow: 'none',
  color: theme.palette.text.primary,
}))

const HeroSection = styled(Box)(({ theme }) => ({
  backgroundImage: `url(${HeroBg})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '60vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.primary,
  textAlign: 'center',
}))

const FeatureCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[3],
}))

const LandingPage = ({ onLogin, onRegister }) => {
  const [openLogin, setOpenLogin] = useState(false)
  const [openRegister, setOpenRegister] = useState(false)

  const handleOpenLogin = () => setOpenLogin(true)
  const handleCloseLogin = () => setOpenLogin(false)
  const handleOpenRegister = () => setOpenRegister(true)
  const handleCloseRegister = () => setOpenRegister(false)
  const handleLogin = () => {
    // perform login logic
    onLogin()
  }

  const handleRegister = () => {
    // perform registration logic
    onRegister()
  }

  return (
    <Box>
      <HeaderSection position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CodeCoach
          </Typography>
          <Button color="inherit" onClick={handleOpenLogin}>
            Login
          </Button>
          <Button variant="contained" onClick={handleOpenRegister}>
            Register
          </Button>
        </Toolbar>
      </HeaderSection>

      <HeroSection>
        <Container>
          <Typography variant="h2" component="h1" gutterBottom>
            Master Your Coding Skills
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            Prepare, Learn, and Excel with CodeCoach
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{ mt: 2 }}
            onClick={handleOpenRegister}
          >
            Get Started
          </Button>
        </Container>
      </HeroSection>

      <Container sx={{ mt: 8, mb: 8 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <FeatureCard>
              <Typography variant="h5" component="h3" gutterBottom>
                Diverse Problem Set
              </Typography>
              <Typography>
                Access a wide range of coding challenges across various
                difficulty levels and topics.
              </Typography>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureCard>
              <Typography variant="h5" component="h3" gutterBottom>
                Real-time Compiler
              </Typography>
              <Typography>
                Write, run, and test your code directly in the browser with our
                powerful compiler.
              </Typography>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureCard>
              <Typography variant="h5" component="h3" gutterBottom>
                Track Your Progress
              </Typography>
              <Typography>
                Monitor your improvement and compare your solutions with others
                in the community.
              </Typography>
            </FeatureCard>
          </Grid>
        </Grid>
      </Container>

      <Dialog open={openLogin} onClose={handleCloseLogin}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLogin}>Cancel</Button>
          <Button onClick={handleLogin}>Login</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openRegister} onClose={handleCloseRegister}>
        <DialogTitle>Account Details</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Full Name"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRegister}>Cancel</Button>
          <Button variant="contained" onClick={handleRegister}>
            Register
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default LandingPage
