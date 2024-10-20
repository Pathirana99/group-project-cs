import React from 'react';
import { Dialog,DialogContent, DialogTitle,Typography, Box } from '@mui/material';
import './successPopup.css'; // Import the CSS file

const SuccessPopup = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box className="dialog-title-center">
        <img src='/images/2.4.png' alt="success icon" className="success-icon" />
        </Box>
        <Typography variant="h5" className="dialog-text-center1">
          Registration Successful!
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1" className="dialog-text-center2">
          Your boarding place has been successfully registered. You can now proceed to manage your listing.
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessPopup;
