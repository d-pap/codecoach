import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const PageLayout = ({ children, title, subtitle, overline, sx = {} }) => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 8,
        //py: '96px', //! from inspo
      }}
    >
      {/* wrapper for overline, title, subtitle, and optional buttons */}
      <Box
        sx={{
          textAlign: 'center',
          mb: 4,
          //mb: '96px', //! from inspo
        }}
      >
        {overline && (
          <Typography
            variant="subtitle2"
            sx={{
              mb: '12px', //! from inspo
              fontWeight: 'bold',
              letterSpacing: '0.05em',
              lineHeight: '24px', //! from inspo
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
              letterSpacing: '-0.02em', //! from inspo
              mb: '24px', //! from inspo
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
              lineHeight: '30px', //! from inspo
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
