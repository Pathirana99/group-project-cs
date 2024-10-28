// src/components/OwnerProfile/OwnerRatings.js
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import Typography from '@mui/material/Typography';

// Sample data from the database
const ratingsData = [
  {
    id: 1,
    title: 'Apartment near University of Ruhuna',
    date: "2024-10-11",
    price: 15000,
    rentDuration: 'Per Month',
    rating: 3,
    beds: 3,
    baths: 2,
    sqft: 1000,
    imageUrls: ["/images/3.4.jpg", "/images/3.5.jpg"],
    description: 'Spacious 3 bedroom apartment near the University of Ruhuna...',
  },
  {
    id: 2,
    title: 'Single Room near Moratuwa University',
    date: '2024-10-21',
    price: 12000,
    rentDuration: 'Per Week',
    rating: 0,
    beds: 1,
    baths: 1,
    sqft: 500,
    imageUrls: ["/images/3.2.jpg", "/images/3.3.jpeg"],
    description: 'Cozy single room with air conditioning...',
  },
];

// Generate labels (A, B, C, ...) dynamically for each boarding house
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const formattedRatingsData = ratingsData.map((item, index) => ({
  label: alphabet[index], // Dynamically assign A, B, C, etc.
  title: item.title, // Store the title for tooltip reference
  rating: item.rating, // Keep the rating value
}));

const OwnerRatings = () => {
  return (
    <div style={{ padding: '10px', borderRadius: '8px' }}>
      <Typography variant="h5" gutterBottom sx={{ fontFamily: '"Josefin Sans", sans-serif', color: 'primary.main' }}>
        Boarding House Ratings
      </Typography>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={formattedRatingsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" label={{ value: 'Boarding Houses', position: 'insideBottom', offset: -5 }}/>
          <YAxis domain={[0, 5]} ticks={[0, 1, 2, 3, 4, 5]} label={{ value: 'Rating (0-5)', angle: -90, position: 'insideLeft' }} />
          <Tooltip formatter={(value, name, props) => [`Rating: ${value}`, `Title: ${props.payload.title}`]} />
          <Legend verticalAlign="top" wrapperStyle={{ marginBottom: 20 }}/>
          <Bar dataKey="rating" fill="#8884d8" name="Rating" />
        </BarChart>
      </ResponsiveContainer>

      {/* Legend for labels */}
      <div style={{ marginTop: '20px' }}>
        <Typography variant="h6" gutterBottom>Boarding House Legend:</Typography>
        <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
          {formattedRatingsData.map((item, index) => (
            <li key={index} style={{ marginBottom: '8px' }}>
              <strong>{item.label}</strong> - {item.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OwnerRatings;
