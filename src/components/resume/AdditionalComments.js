// AdditionalComments.js
import React from 'react';
import { TextField, Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import theme from '../../theme'; // Adjust the path if necessary

const AdditionalComments = ({ additionalComments, setAdditionalComments }) => {
    const muiTheme = useTheme();

    return (
        <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
                Additional Comments
            </Typography>
            <TextField
                label="Any additional instructions or information"
                multiline
                rows={4}
                fullWidth
                value={additionalComments}
                onChange={(e) => setAdditionalComments(e.target.value)}
                variant="outlined"
                margin="normal"
            />
        </Box>
    );
};

export default AdditionalComments;
