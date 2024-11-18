// TextInput.js
import React from 'react';
import { TextField } from '@mui/material';

const TextInput = ({
    input,
    handleInputChange,
    handleOnPressEnter,
    isLoading,
    chatCount,
    MAX_CHAT_COUNT,
}) => (
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
);

export default TextInput;
