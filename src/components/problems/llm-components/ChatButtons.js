// ChatButtons.js
import React, { useState } from 'react';
import { Box, Button, Tooltip } from '@mui/material';
import { useCookies } from 'react-cookie';
import { useTheme } from '@mui/material/styles';

const ChatButtons = ({
    handleSend,
    isLoading,
    chatCount,
    MAX_CHAT_COUNT,
    includeCode,
    setIncludeCode,
}) => {
    const theme = useTheme();
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

    return (
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
    );
};

export default ChatButtons;
