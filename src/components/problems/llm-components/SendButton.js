// SendButton.js
import React from 'react';
import { Tooltip, Button } from '@mui/material';

const SendButton = ({
    handleSendSanitized,
    isLoading,
    chatCount,
    MAX_CHAT_COUNT,
    input,
    tooltipsEnabled,
}) => (
    <Tooltip
        title={`You have ${MAX_CHAT_COUNT - chatCount} messages left for today.`}
        enterDelay={500}
        disableHoverListener={!tooltipsEnabled}
    >
        <div>
            <Button
                onClick={() => handleSendSanitized('user')}
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
);

export default SendButton;
