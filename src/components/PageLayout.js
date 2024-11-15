import { Container, Box, Typography } from '@mui/material'

const PageLayout = ({ children, sx = {}, title, description }) => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h2" align="center" gutterBottom>
        {title}
      </Typography>
      <Typography variant="subtitle1" align="center" gutterBottom>
        {description}
      </Typography>
      <Box sx={{ mt: 4, mb: 8, ...sx }}>{children}</Box>
    </Container>
  )
}

export default PageLayout
