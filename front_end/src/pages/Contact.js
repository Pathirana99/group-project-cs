import React from 'react';
import { Container, Grid, TextField, Button, Typography, Box } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
const Contact = () => {
  return (
    <Container maxWidth="sm" sx={{ backgroundColor: '#e0e0e0', p: 3, borderRadius: 2 }}>
      <Box textAlign="center" mb={3} sx={{ backgroundColor: '#a0e1e0', p: 2, borderRadius: 1 }}>
        <Typography variant="h4" gutterBottom>
          Contact Us
        </Typography>
      </Box>
      
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12}>
          <Box display="flex" alignItems="center">
            <LocationOnIcon sx={{ mr: 1 }} />
            <Typography variant="body1" fontWeight="bold">Address</Typography>
          </Box>
          <Typography variant="body2">No.64, Main Street, Matata</Typography>
        </Grid>

        <Grid item xs={12}>
          <Box display="flex" alignItems="center">
            <PhoneIcon sx={{ mr: 1 }} />
            <Typography variant="body1" fontWeight="bold">Phone</Typography>
          </Box>
          <Typography variant="body2">(+94) 718 535 288</Typography>
        </Grid>

        <Grid item xs={12}>
          <Box display="flex" alignItems="center">
            <EmailIcon sx={{ mr: 1 }} />
            <Typography variant="body1" fontWeight="bold">Email</Typography>
          </Box>
          <Typography variant="body2">Bdoor@gmail.com</Typography>
        </Grid>
      </Grid>

      <Box component="form" noValidate autoComplete="off" sx={{ backgroundColor: '#d0d0d0', p: 3, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom textAlign="center">
          Send Message
        </Typography>
        <TextField
          fullWidth
          label="Full Name"
          variant="outlined"
          margin="normal"
        />
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          margin="normal"
        />
        <TextField
          fullWidth
          label="Type your Message"
          variant="outlined"
          multiline
          rows={4}
          margin="normal"
        />
        <Box textAlign="center" mt={2}>
          <Button variant="contained" color="primary" endIcon={<SendIcon />} sx={{ backgroundColor: '#5ccbc4' }}>
            Send
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Contact;

