import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const PageLayout = ({ children, title, subtitle, overline, sx = {} }) => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 8,
      }}
    >
      {/* wrapper for overline, title, subtitle, and optional buttons */}
      <Box
        sx={{
          textAlign: 'center',
          mb: 4,
        }}
      >
        {overline && (
          <Typography
            variant="subtitle2"
            sx={{
              mb: '12px',
              fontWeight: 'bold',
              letterSpacing: '0.05em',
              lineHeight: '24px',
              color: (theme) => theme.palette.primary.light700,
              fontFamily: 'Inter, Helvetica, Roboto, Arial, sans-serif',
            }}
          >
            {overline}
          </Typography>
        )}

        {title && (
          <Typography
            variant="h2"
            gutterBottom
            sx={{
              letterSpacing: '-0.02em',
              mb: '24px',
              fontFamily: 'Inter, Helvetica, Roboto, Arial, sans-serif',
            }}
          >
            {title}
          </Typography>
        )}

        {subtitle && (
          <Typography
            variant="body2"
            sx={{
              maxWidth: '800px',
              mx: 'auto',
              mb: 4,
              lineHeight: '30px',
              fontFamily: 'Inter, Helvetica, Roboto, Arial, sans-serif',
            }}
          >
            {subtitle}
          </Typography>
        )}
      </Box>

      {/* wrapper for main content */}
      <Box sx={{ mt: 4, mb: 8, ...sx }}>{children}</Box>
    </Container>
  )
}

export default PageLayout
