import React from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Card, CardContent, CardMedia } from '@mui/material';

export default function MoreDetails() {
  const { placeId } = useParams();
  
  // Dummy data for the sake of example. In real usage, fetch data based on the placeId.
  const places = [
    {
      id: 1,
      title: '3 bedroom apartment in Matara',
      area: 'Matara',
      price: 15000,
      type: 'Apartment',
      facilities: ['Wi-Fi', 'Parking'],
      distance: 2,
      imageUrl: '/path-to-image/image.png',
      description: 'Large living & dining area with a good size balcony...',
    },
    {
      id: 2,
      title: 'Single Room near Colombo University',
      area: 'Colombo',
      price: 12000,
      type: 'Single Room',
      facilities: ['A/C', 'Laundry'],
      distance: 1,
      imageUrl: '/path-to-image/image2.png',
      description: 'Cozy single room in a prime location near the university.',
    },
  ];

  const place = places.find((p) => p.id === Number(placeId)); // Find the place by id

  if (!place) {
    return <Typography>Place not found</Typography>;
  }

  return (
    <Card>
      <CardMedia
        component="img"
        height="300"
        image={place.imageUrl}
        alt={place.title}
      />
      <CardContent>
        <Typography variant="h4">{place.title}</Typography>
        <Typography variant="subtitle1">Area: {place.area}</Typography>
        <Typography variant="subtitle1">Price: Rs.{place.price} Per Month</Typography>
        <Typography variant="body2">Facilities: {place.facilities.join(', ')}</Typography>
        <Typography variant="body2">Distance: {place.distance} km</Typography>
        <Typography variant="body1">{place.description}</Typography>
      </CardContent>
    </Card>
  );
}
