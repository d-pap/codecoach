// ChatInput.jsx
import React, { useState, useEffect } from 'react'
import { Box, TextField, Button, Tooltip, IconButton } from '@mui/material'
import { useCookies } from 'react-cookie'
import DeleteIcon from '@mui/icons-material/Delete'
import { useTheme } from '@mui/material/styles'

const ChatInput = ({
  input,
  setInput,
  handleSend,
  isLoading,
  chatCount,
  MAX_CHAT_COUNT,
  handleDelete,
  includeCode,
  setIncludeCode,
}) => {
  const theme = useTheme()
  const [cookies, setCookie] = useCookies(['userConsent', 'tooltipsEnabled'])
  const [tooltipsEnabled, setTooltipsEnabled] = useState(() => {
    if (cookies.userConsent) {
      const tooltipEnabledValue =
        cookies.tooltipsEnabled !== undefined
          ? JSON.parse(cookies.tooltipsEnabled)
          : true
      return tooltipEnabledValue
    } else {
      return true
    }
  })

  const handleInputChange = (e) => {
    setInput(e.target.value)
  }

  const handleOnPressEnter = (event) => {
    if (event.key === 'Enter' && !isLoading && !event.shiftKey) {
      // Prevent sending on Shift+Enter for new lines
      if (chatCount >= MAX_CHAT_COUNT || input.trim() === '') {
        event.preventDefault()
        if (chatCount >= MAX_CHAT_COUNT) {
          alert('You have reached the maximum number of messages for today.')
        }
        return
      }
      handleSend('user')
    }
  }

  return (
    <>
      {/* Quick Action Buttons */}
      <Box
        sx={{ display: 'flex', justifyContent: 'flex-end', mt: 'auto', pt: 2 }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            maxWidth: '70%',
          }}
        >
          {/* Get a Hint Button */}
          <Button
            variant="contained"
            disabled={isLoading || chatCount >= MAX_CHAT_COUNT}
            sx={{ mb: 1, borderRadius: '20px 20px 5px 20px' }}
            onClick={() => handleSend('hint')}
          >
            Get a Hint
          </Button>

          {/* Analyze/Exclude Code Button */}
          <Tooltip
            title={'Toggle code analysis'}
            enterDelay={500}
            disableHoverListener={!tooltipsEnabled}
          >
            <div>
              <Button
                variant="outlined"
                disabled={isLoading || chatCount >= MAX_CHAT_COUNT}
                sx={{
                  mb: 1,
                  borderRadius: '20px 20px 5px 20px',
                  backgroundColor: isLoading
                    ? theme.palette.grey[300]
                    : includeCode
                      ? 'common.white'
                      : 'primary.main',
                  color: includeCode ? 'text.primary' : 'common.white',
                  '&:hover': {
                    backgroundColor: includeCode
                      ? 'action.hover'
                      : 'primary.dark',
                    color: includeCode ? 'text.primary' : 'common.white',
                    borderColor: includeCode
                      ? 'secondary.main'
                      : 'common.white',
                  },
                  transition:
                    'background-color 0.3s, border-color 0.3s, color 0.3s',
                }}
                onClick={() => setIncludeCode(!includeCode)}
              >
                {includeCode ? 'Exclude My Code' : 'Analyze My Code'}
              </Button>
            </div>
          </Tooltip>
        </Box>
      </Box>

      {/* Input Field and Send Button */}
      <Box sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
        <Tooltip
          title={'Delete the chat history'}
          enterDelay={500}
          disableHoverListener={!tooltipsEnabled}
        >
          <div>
            <IconButton
              disabled={isLoading}
              sx={{ color: 'error.main' }}
              onClick={handleDelete}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        </Tooltip>

        <TextField
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleOnPressEnter}
          placeholder={`Type a message (${MAX_CHAT_COUNT - chatCount} messages left today)...`}
          variant="outlined"
          fullWidth
          sx={{ mr: 1, '& fieldset': { borderRadius: 2 } }}
          disabled={isLoading || chatCount >= MAX_CHAT_COUNT}
          multiline
          maxRows={4}
        />

        <Tooltip
          title={`You have ${MAX_CHAT_COUNT - chatCount} messages left for today.`}
          enterDelay={500}
          disableHoverListener={!tooltipsEnabled}
        >
          <div>
            <Button
              onClick={() => handleSend('user')}
              disabled={
                isLoading || chatCount >= MAX_CHAT_COUNT || input.trim() === ''
              }
              variant="contained"
              sx={{
                bgcolor: 'primary.main',
                '&:hover': { bgcolor: 'primary.main' },
              }}
            >
              Send
            </Button>
          </div>
        </Tooltip>
      </Box>
    </>
  )
}

export default ChatInput
