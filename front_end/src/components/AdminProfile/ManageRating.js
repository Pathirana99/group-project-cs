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
            <TableCell>#</TableCell>
            <TableCell>PlaceId</TableCell>
            <TableCell>User</TableCell>
            <TableCell>Rating</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pendingRatings.map((rating, index) => (
            <TableRow key={rating.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{rating.placeName}</TableCell>
              <TableCell>{rating.userName}</TableCell>
              <TableCell>{rating.score}</TableCell>
              <TableCell>{rating.review}</TableCell>
              <TableCell>
                <Button onClick={() => handleApprove(rating.id)}>Approve</Button>
                <Button onClick={() => handleReject(rating.id)}>Reject</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ManageRating;
