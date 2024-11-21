import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const PageLayout = ({ children, title, subtitle, overline, sx = {} }) => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        py: '96px', //! from inspo
      }}
    >
      {/* wrapper for overline, title, subtitle, and optional buttons */}
      <Box
        sx={{
          textAlign: 'center',
          mb: '96px', //! from inspo
        }}
      >
        {overline && (
          <Typography
            variant="subtitle2"
            sx={{
              mb: '12px', //! from inspo
              fontWeight: 'bold',
              //color: '#4e3aba',
              //fontSize: '0.75rem',
              //letterSpacing: '0.05em',
              //lineHeight: '1rem',
              fontSize: '16px', //! from inspo
              lineHeight: '24px', //! from inspo
            }}
          >
            {overline}
          </Typography>
        )}

        {title && (
          <Typography
            variant="h1"
            gutterBottom
            sx={{
              fontSize: '48px', //! from inspo - same as normal h1 size in theme.js
              lineHeight: '60px', //! from inspo
              letterSpacing: '-0.02em', //! from inspo
              mb: '24px', //! from inspo
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
              fontSize: '20px', //! from inspo
              lineHeight: '30px', //! from inspo
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
