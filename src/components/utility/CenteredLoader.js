import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const CenteredCircleLoader = () => {
    return (
        <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Full viewport height
      }}
    >
      <CircularProgress />
    </Box>
    );
};

export default CenteredCircleLoader;