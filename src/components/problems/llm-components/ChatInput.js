// ChatInput.js
import React, { useState } from 'react';
import { Box, TextField, Button, Tooltip, IconButton } from '@mui/material';
import { useCookies } from 'react-cookie';
import DeleteIcon from '@mui/icons-material/Delete';
import DOMPurify from 'dompurify';

const ChatInput = ({
  input,
  setInput,
  handleSend,
  isLoading,
  chatCount,
  MAX_CHAT_COUNT,
  handleDelete,
}) => {
  const [cookies] = useCookies(['userConsent', 'tooltipsEnabled']);
  const [tooltipsEnabled] = useState(() => {
    if (cookies.userConsent) {
      const tooltipEnabledValue =
        cookies.tooltipsEnabled !== undefined
          ? JSON.parse(cookies.tooltipsEnabled)
          : true;
      return tooltipEnabledValue;
    } else {
      return true;
    }
  });

  // Function to sanitize input using DOMPurify
  const sanitizeInput = (dirtyInput) => {
    return DOMPurify.sanitize(dirtyInput);
  };

  const handleInputChange = (e) => {
    const dirtyValue = e.target.value;
    const cleanValue = sanitizeInput(dirtyValue);
    setInput(cleanValue);
  };

  const handleOnPressEnter = (event) => {
    if (event.key === 'Enter' && !isLoading && !event.shiftKey) {
      // Prevent sending on Shift+Enter for new lines
      if (chatCount >= MAX_CHAT_COUNT || input.trim() === '') {
        event.preventDefault();
        if (chatCount >= MAX_CHAT_COUNT) {
          alert('You have reached the maximum number of messages for today.');
        }
        return;
      }
      handleSend('user');
    }
  };

  return (
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
        inputProps={{
          maxLength: 1000, // Set a reasonable max length
        }}
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
              isLoading ||
              chatCount >= MAX_CHAT_COUNT ||
              input.trim() === ''
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
  );
};

export default ChatInput;
