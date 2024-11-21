import React from 'react'
import { Paper, Typography, IconButton, Box, Tooltip } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { useTheme } from '@mui/material/styles'
import ReactMarkdown from 'react-markdown'
import rehypeSanitize from 'rehype-sanitize'

// SafeMarkdown component to render and sanitize Markdown content
const SafeMarkdown = ({ content }) => {
  return (
    <ReactMarkdown
      children={content}
      rehypePlugins={[rehypeSanitize]}
      components={{
        hr: () => null,
      }}
    />
  )
}

const ResumeResult = ({ aiResponse, copySuccess, handleCopy, responseRef }) => {
  const muiTheme = useTheme()

  if (!aiResponse || !aiResponse.response || !aiResponse.response.response) {
    return null
  }

  return (
    <Paper
      elevation={2}
      sx={{
        mt: 6,
        mb: 6,
        p: { xs: 2, sm: 3, md: 4 },
        backgroundColor: muiTheme.palette.background.default,
        // Enable horizontal scrolling if needed
        overflowX: 'auto',
      }}
      ref={responseRef}
    >
      {/* Header with "Your Resume Template" and Copy Button */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5" gutterBottom>
          Your Resume Template
        </Typography>

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
        <Typography variant="body2" color="success.main" sx={{ mb: 2 }}>
          {copySuccess}
        </Typography>
      )}

      {/* Render the resume with Markdown */}
      <Box
        sx={{
          // Ensure text wraps and doesn't overflow
          wordWrap: 'break-word',
          overflowWrap: 'break-word',
          wordBreak: 'break-word',
          // Styles for lists
          '& ul': {
            listStyleType: 'disc',
            marginLeft: '1.5em', // Adjust indentation
            paddingLeft: 0,
          },
          '& ol': {
            listStyleType: 'decimal',
            marginLeft: '1.5em', // Adjust indentation
            paddingLeft: 0,
          },
          '& li': {
            marginBottom: '0.5em', // Optional spacing between items
          },
          // Optional: styles for paragraphs inside list items
          '& li p': {
            margin: 0,
          },
        }}
      >
        <SafeMarkdown content={aiResponse.response.response} />
      </Box>
    </Paper>
  )
}

export default ResumeResult
