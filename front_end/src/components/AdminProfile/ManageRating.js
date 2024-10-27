import React, { useState, useEffect } from 'react';
import { Button,Table, TableRow, TableCell, TableBody, TableHead } from '@mui/material';
import axios from 'axios';

const ManageRating = () => {
  const [pendingRatings, setPendingRatings] = useState([]);
  //const [selectedRating, setSelectedRating] = useState(null);

  useEffect(() => {
    const fetchPendingRatings = async () => {
      try {
        const response = await axios.get('/api/pending-ratings'); // Replace with backend endpoint
        setPendingRatings(response.data);
      } catch (error) {
        console.error('Error fetching pending ratings:', error);
      }
    };
    fetchPendingRatings();
  }, []);

  const handleApprove = async (id) => {
    await axios.put(`/api/ratings/${id}/approve`);
    setPendingRatings(pendingRatings.filter(rating => rating.id !== id)); // Remove from the list
  };

  const handleReject = async (id) => {
    await axios.put(`/api/ratings/${id}/reject`);
    setPendingRatings(pendingRatings.filter(rating => rating.id !== id)); // Remove from the list
  };

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{fontFamily:'"Josefin Sans", sans-serif',fontSize:'24px'}}>#</TableCell>
            <TableCell sx={{fontFamily:'"Josefin Sans", sans-serif',fontSize:'24px'}}>PlaceId</TableCell>
            <TableCell sx={{fontFamily:'"Josefin Sans", sans-serif',fontSize:'24px'}}>User</TableCell>
            <TableCell sx={{fontFamily:'"Josefin Sans", sans-serif',fontSize:'24px'}}>Rating</TableCell>
            <TableCell sx={{fontFamily:'"Josefin Sans", sans-serif',fontSize:'24px'}}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pendingRatings.map((rating, index) => (
            <TableRow key={rating.id}>
              <TableCell sx={{fontFamily:'"Josefin Sans", sans-serif',fontSize:'20px'}}>{index + 1}</TableCell>
              <TableCell sx={{fontFamily:'"Josefin Sans", sans-serif',fontSize:'20px'}}>{rating.placeName}</TableCell>
              <TableCell sx={{fontFamily:'"Josefin Sans", sans-serif',fontSize:'20px'}}>{rating.userName}</TableCell>
              <TableCell sx={{fontFamily:'"Josefin Sans", sans-serif',fontSize:'20px'}}>{rating.score}</TableCell>
              <TableCell sx={{fontFamily:'"Josefin Sans", sans-serif',fontSize:'20px'}}>{rating.review}</TableCell>
              <TableCell>
                <Button variant="contained" onClick={() => handleApprove(rating.id)} sx={{margin:'5px',backgroundColor:'#72d6c9','&:hover': {backgroundColor:'#3DC0B9'}}}>
                  Approve
                </Button>
                <Button  variant="contained" onClick={() => handleReject(rating.id)} sx={{margin:'5px',backgroundColor:'#72d6c9','&:hover': {backgroundColor:'#3DC0B9'}}}>
                  Reject
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ManageRating;
