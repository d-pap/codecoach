import React from 'react'
import { Box, Avatar, CircularProgress, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import aiAvatar from '../../../images/aiAvatar.svg'

const Messages = ({ chatHistory, isLoading, scrollContainerRef }) => {
  const theme = useTheme()

  const formatChatContent = (content, role) => {
    const textColor = role === 'user' ? 'common.white' : 'text.primary'

    return (
      <Box sx={{ p: 1 }}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            // Paragraphs
            p: ({ node, ...props }) => (
              <Typography
                {...props}
                sx={{
                  mb: 0.5,
                  fontSize: '0.875rem',
                  lineHeight: '1.5',
                  letterSpacing: '0.01em',
                  color: textColor,
                }}
              />
            ),
            // Headings
            h1: ({ node, ...props }) => (
              <Typography
                variant="h4"
                {...props}
                sx={{
                  mb: 1,
                  fontSize: '1.25rem',
                  lineHeight: '1.5',
                  letterSpacing: '0.01em',
                  color: textColor,
                }}
              />
            ),
            // ... other elements
            // Code Blocks and Inline Code
            code({ node, inline, className, children, ...props }) {
              const hasLanguage = /language-(\w+)/.exec(className || '')
              if (!inline && hasLanguage) {
                return (
                  <SyntaxHighlighter
                    style={oneDark}
                    language={hasLanguage[1]}
                    PreTag="div"
                    customStyle={{
                      borderRadius: '12px',
                      marginBottom: '0.5em',
                      fontSize: '0.875rem',
                      lineHeight: '1.5',
                      letterSpacing: '0.01em',
                    }}
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                )
              } else {
                return (
                  <code
                    {...props}
                    style={{
                      backgroundColor: 'rgba(27,31,35,0.05)',
                      padding: '0.2em 0.4em',
                      borderRadius: '6px',
                      fontFamily: 'monospace',
                      fontSize: '0.875rem',
                      lineHeight: '1.5',
                      letterSpacing: '0.01em',
                      color: textColor,
                    }}
                  >
                    {children}
                  </code>
                )
              }
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </Box>
    )
  }

  return (
    <Box
      ref={scrollContainerRef}
      sx={{
        flex: 1,
        overflowY: 'auto',
        mb: 2,
        p: 2,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Avatar and Call-to-Action */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Avatar
          alt="AI Robot"
          src={aiAvatar}
          sx={{ width: 80, height: 80, mb: 1 }}
        />
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 'bold', textAlign: 'center' }}
        >
          codecoach answers your questions instantly!
        </Typography>
      </Box>

      {/* Chat Messages */}
      {Array.isArray(chatHistory.data) &&
        chatHistory.data.map((chat, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: chat.role === 'user' ? 'flex-end' : 'flex-start',
              mb: 2,
            }}
          >
            {chat.role === 'assistant' && (
              <Avatar
                alt="AI"
                src={aiAvatar}
                sx={{
                  width: 30,
                  height: 30,
                  mr: 1,
                  alignSelf: 'flex-end',
                }}
              />
            )}
            <Box
              sx={{
                bgcolor: chat.role === 'user' ? 'primary.main' : 'grey.200',
                color: chat.role === 'user' ? 'common.white' : 'text.primary',
                borderRadius:
                  chat.role === 'user'
                    ? '20px 20px 5px 20px'
                    : '20px 20px 20px 5px',
                p: 2,
                maxWidth: '80%',
                wordBreak: 'break-word',
              }}
            >
              {formatChatContent(chat.content, chat.role)}
            </Box>
          </Box>
        ))}

      {/* Loading Indicator */}
      {isLoading && (
        <Box
          sx={{
            alignSelf: 'flex-start',
            bgcolor: 'background.paper',
            borderRadius: 2,
            p: 2,
            mb: 2,
            maxWidth: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress size={20} />
        </Box>
      )}
    </Box>
  )
}

export default Messages
