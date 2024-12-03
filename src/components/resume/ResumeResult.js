import React from 'react'
import { Paper, Typography, IconButton, Box, Tooltip } from '@mui/material'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { useTheme } from '@mui/material/styles'
import ReactMarkdown from 'react-markdown'
import rehypeSanitize from 'rehype-sanitize'

// SafeMarkdown component to render and sanitize Markdown content
const SafeMarkdown = ({ content }) => {
  const muiTheme = useTheme()

  return (
    <ReactMarkdown
      children={content}
      rehypePlugins={[rehypeSanitize]}
      components={{
        h1: ({ children }) => (
          <Typography
            variant="h1"
            sx={{
              fontWeight: 'bold',
              fontSize: '1.5rem',
            }}
          >
            {children}
          </Typography>
        ),
        h2: ({ children }) => (
          <Typography
            variant="h2"
            sx={{
              //marginBottom: '0.5em', //! default margin bottom for h2
              //lineHeight: '0.5',
              fontWeight: 'bold',
              fontSize: '1.25rem',
            }}
          >
            {children}
          </Typography>
        ),
        h3: ({ children }) => (
          <Typography
            variant="h3"
            sx={{
              fontWeight: 'bold',
              fontSize: '1.125rem',
            }}
          >
            {children}
          </Typography>
        ),
        h4: ({ children }) => (
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              fontSize: '1rem',
            }}
          >
            {children}
          </Typography>
        ),
        h5: ({ children }) => (
          <Typography
            variant="h5"
            sx={{
              fontWeight: 'bold',
              fontSize: '1rem',
            }}
          >
            {children}
          </Typography>
        ),
        h6: ({ children }) => (
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              fontSize: '1rem',
            }}
          >
            {children}
          </Typography>
        ),
        p: ({ children }) => (
          <Typography variant="body1">{children}</Typography>
        ),
        strong: ({ children }) => (
          <Typography component="span" sx={{ fontWeight: 'bold' }}>
            {children}
          </Typography>
        ),
        ul: ({ children }) => (
          <Typography
            component="ul"
            sx={{ marginLeft: '1.5em', paddingLeft: 0, marginTop: '0em' }}
          >
            {children}
          </Typography>
        ),
        //hr: () => null,
      }}
    />
  )
}

const ResumeResult = ({ aiResponse, copySuccess, handleCopy, responseRef }) => {
  const muiTheme = useTheme()

  if (!aiResponse || !aiResponse.response || !aiResponse.response.response) {
    return null
  }

  //! clean up the AI response markdown to remove formatting (backticks and "markdown" in AI response)
  const cleanedAiResponse = aiResponse.response.response
    .replace(/```markdown\n/g, '') // remove opening markdown block
    .replace(/```$/g, '') // remove closing backticks
    .trim() // remove any extra whitespace at start/end

  console.log('Cleaned AI Response:', cleanedAiResponse)

  //! split the cleaned AI response into resume and instructions
  const [resumeContent, instructionsContent] =
    cleanedAiResponse.split(/\n---\n\n/)

  return (
    <Paper
      elevation={2}
      sx={{
        mt: 6,
        mb: 6,
        p: { xs: 2, sm: 3, md: 4 },
        backgroundColor: muiTheme.palette.background.default,
        // Enable horizontal scrolling if needed
        //overflowX: 'auto',
        maxWidth: '100%',
      }}
      ref={responseRef}
    >
      {/* Header with "Your Resume Template" and Copy Button */}
      <Box display="flex" justifyContent="flex-end" alignItems="center" mb={2}>
        {/* Copy to Clipboard IconButton with Tooltip */}
        <Tooltip title="Copy to clipboard">
          <IconButton
            color="primary"
            onClick={handleCopy}
            aria-label="copy resume to clipboard"
          >
            <ContentCopyIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Display success message */}
      {copySuccess && (
        <Snackbar open={copySuccess} autoHideDuration={6000}>
          <Alert severity="success">{copySuccess}</Alert>
        </Snackbar>
      )}

      {/* Render the resume with Markdown */}
      <Box
        sx={{
          maxWidth: '100%',
          overflowX: 'hidden',
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word',
          overflowWrap: 'break-word',
          wordBreak: 'break-word',
        }}
      >
        <SafeMarkdown content={resumeContent} />
      </Box>
    </Paper>
  )
}

export default ResumeResult
