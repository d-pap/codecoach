import React, { useState, useEffect } from 'react';
import { Fab } from '@mui/material'; // Floating Action Button from MUI
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'; // Icon for the button
import { styled } from '@mui/material/styles';

const ScrollToTopButton = styled(Fab)(({ theme }) => ({
    position: 'fixed',
    bottom: theme.spacing(4),
    right: theme.spacing(4),
    zIndex: 1000,
    backgroundColor: 'rgba(0, 123, 255, 0.3)', // Sheer (semi-transparent) blue color
    color: '#fff',
    boxShadow: "none",
    Width: '10px', // Smaller width
    minheight: '10px', // Smaller height
    transition: 'background-color 0.3s ease, transform 0.3s ease',
    '&:hover': {
        backgroundColor: 'rgba(0, 123, 255, 0.9)', // Darker blue on hover
        transform: 'scale(1.1)', // Slightly increase size on hover
    },
}));

function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when the user scrolls down
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <ScrollToTopButton
            color="primary"
            size="small"
            onClick={scrollToTop}
            style={{ display: isVisible ? 'flex' : 'none' }}
        >
            <KeyboardArrowUpIcon />
        </ScrollToTopButton>
    );
}

export default ScrollToTop;
