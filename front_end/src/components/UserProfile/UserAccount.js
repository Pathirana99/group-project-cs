import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Container, Grid } from '@mui/material';
import { fetchUserData, changePassword } from '../../apiService'; // Import the API functions

const UserAccount = () => {
  const [userData, setUserData] = useState({
    userId: '',
    email: '',
    name: '',
  });
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const data = await fetchUserData(); // Call API to get user data
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    // Basic validation for password change
    if (!newPassword || !confirmPassword) {
      setError('Both password fields are required.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      await changePassword(newPassword); // Call API to update the password
      setSuccessMessage('Password changed successfully!');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      setError('Error changing password. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm" style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
      <Typography variant="h5" gutterBottom style={{ color: 'gray', fontSize: '36px' }}>
        User Account
      </Typography>

      {/* Display user details */}
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h6">User ID: {userData.userId}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Email: {userData.email}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Name: {userData.name}</Typography>
        </Grid>
      </Grid>

      <Typography variant="h6" style={{ marginTop: '20px', color: '#72d6c9' }}>Change Password</Typography>
      <form onSubmit={handleChangePassword}>
        <TextField
          label="New Password"
          type="password"
          fullWidth
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <TextField
          label="Confirm Password"
          type="password"
          fullWidth
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {error && <Typography color="error">{error}</Typography>}
        {successMessage && <Typography color="primary">{successMessage}</Typography>}
        <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '20px', backgroundColor: '#72d6c9' }}>
          Change Password
        </Button>
      </form>
    </Container>
  );
};

export default UserAccount;
