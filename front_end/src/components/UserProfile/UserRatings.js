import React, { useState, useEffect } from 'react';
import { List, ListItem,Typography, Paper, Box, Rating, Divider } from '@mui/material';

const UserRatings = () => {
  const [ratedHouses, setRatedHouses] = useState([]);

  useEffect(() => {
    // Fetch user's rated boarding houses (mock data for now)
    setRatedHouses([
      {
        id: 1,
        name: 'Sunnyvale Apartments',
        rating: 4,
        description: 'Spacious rooms with a beautiful garden view, close to the university.',
        dateRated: '2024-10-01',
      },
      {
        id: 2,
        name: 'Green Villa',
        rating: 5,
        description: 'Excellent location with modern amenities and friendly staff.',
        dateRated: '2024-09-20',
      },
      {
        id: 3,
        name: 'Blue Ridge Annex',
        rating: 3,
        description: 'Affordable, but slightly further from the main city area.',
        dateRated: '2024-08-15',
      },
    ]);
  }, []);

  return (
    <Box sx={{ marginTop: '32px' }}>
      <Typography variant="h5" sx={{ mb: 3, fontSize: '28px', color: '#3DC0B9', fontFamily: '"Josefin Sans", sans-serif' }}>
        My Rated Boarding Houses
      </Typography>
      
      <Paper sx={{ padding: 2, backgroundColor: 'white', borderLeft: '4px solid #00BFB4' }}>
        <List>
          {ratedHouses.map((house) => (
            <React.Fragment key={house.id}>
              <ListItem alignItems="flex-start">
                <Box sx={{ width: '100%' }}>
                  {/* Boarding House Title and Rating */}
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="h6" sx={{ fontSize: '20px', fontWeight: 'bold' }}>
                      {house.name}
                    </Typography>
                    <Rating value={house.rating} readOnly precision={0.5} />
                  </Box>
                  
                  {/* Description */}
                  <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                    {house.description}
                  </Typography>
                  
                  {/* Date Rated */}
                  <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mt: 1 }}>
                    Rated on: {house.dateRated}
                  </Typography>
                </Box>
              </ListItem>
              <Divider variant="fullWidth" sx={{ my: 1 }} />
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default UserRatings;
