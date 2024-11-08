import React, { useState, useEffect } from 'react';
import { Fab } from '@mui/material'; // Floating Action Button from MUI
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'; // Icon for the button
import { styled } from '@mui/material/styles';


const ScrollToTopButton = styled(Fab)(({ theme }) => ({
    position: 'fixed',
    bottom: theme.spacing(4),
    right: theme.spacing(4),
    zIndex: 1000,
    
    opacity: 0.8,
    color: '#fff',
    boxShadow: "none",
    minWidth: '10px', 
    minHeight: '10px', 
    transition: 'background-color 0.3s ease, transform 0.3s ease',
    '&:hover': {
        backgroundColor: '#0f172a', 
        transform: 'scale(1.1)', 
        opacity: 1, 
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
            color="black"
            size="small"
            onClick={scrollToTop}
            style={{ display: isVisible ? 'flex' : 'none' }}
        >
            <KeyboardArrowUpIcon />
        </ScrollToTopButton>
    );
}

export default ScrollToTop;
