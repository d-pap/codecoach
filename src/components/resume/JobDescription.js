// JobDescription.js
import React from 'react';
import { TextField, Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import theme from '../../theme'; // Adjust the path if necessary

const JobDescription = ({ jobDescription, setJobDescription }) => {
    const muiTheme = useTheme();

    return (
        <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
                Job Description
            </Typography>
            <TextField
                label="Job description for which you are applying"
                multiline
                rows={4}
                fullWidth
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                variant="outlined"
                margin="normal"
            />
        </Box>
    );
};

export default JobDescription;
