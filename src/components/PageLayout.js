import { Container, Box, Typography } from '@mui/material'

const PageLayout = ({ children, sx = {}, title, description, subtitle }) => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h2" align="center" gutterBottom sx={{ mb: 2 }}>
        {title}
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        gutterBottom
        sx={{ maxWidth: '800px', mx: 'auto' }}
      >
        {description}
      </Typography>
      <Box sx={{ mt: 4, mb: 8, ...sx }}>{children}</Box>
    </Container>
  )
}

export default PageLayout
