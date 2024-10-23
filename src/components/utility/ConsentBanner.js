import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import theme from '../../theme';
import { useCookies } from 'react-cookie';

const ConsentBanner = ({ onAccept }) => {
    const [visible, setVisible] = useState(false);
    const [cookies, setCookie] = useCookies(['userConsent']);

    useEffect(() => {
        const consent = cookies.userConsent;
        if (!consent) {
            setVisible(true);
        }
    }, [cookies]);

    const handleAccept = () => {
        // Set the 'userConsent' cookie to 'true' with a 1-year expiration
        setCookie('userConsent', 'true', {
            path: '/codecoach',
            maxAge: 365 * 24 * 60 * 60, // 1 year in seconds
            secure: true, // Ensure cookie is sent over HTTPS
            sameSite: 'Lax', // Helps protect against CSRF attacks
        });

        setVisible(false);
    };

    if (!visible) return null;

    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: 0,
                width: '100%',
                backgroundColor: theme.palette.primary.black,
                color: theme.palette.text.white,
                padding: theme.spacing(2),
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                zIndex: 1300, // Ensure it stays above other elements
                boxShadow: theme.shadows[4],
            }}
        >
            <Typography variant="body1" sx={{ color: theme.palette.primary, fontWeight: 500 }}>
                We use cookies to improve your experience. By continuing, you accept our use of cookies.
            </Typography>
            <Button
                variant="contained"
                onClick={handleAccept}
                sx={{
                    fontWeight: 700,
                    color: theme.palette.primary,
                    backgroundColor: theme.palette.primary.blue,
                    '&:hover': {
                        backgroundColor: theme.palette.primary.green,
                    },
                }}
            >
                Accept
            </Button>
        </Box>
    );
};

export default ConsentBanner;
