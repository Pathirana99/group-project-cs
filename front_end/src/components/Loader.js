// Loader.js
import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const Loader = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      {/* Your Logo */}
      <img src="/images/1.png" alt="Logo" width="400" />
      
      {/* MUI Circular Progress (Spinner) */}
      <CircularProgress sx={{ mt: 2 }} />
    </Box>
  );
};

export default Loader;
