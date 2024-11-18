// Description.js
import React from 'react';
import { TextField, Typography, Box } from '@mui/material';

const Description = ({ description, setDescription }) => {

    return (
        <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
                Personal Description
            </Typography>
            <TextField
                label="Describe yourself"
                multiline
                rows={4}
                fullWidth
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                variant="outlined"
                margin="normal"
            />
        </Box>
    );
};

export default Description;
