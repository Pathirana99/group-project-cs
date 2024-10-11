import React, { useState } from 'react';
import './searchBar.css';
import { TextField, Button, MenuItem, Autocomplete } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

// Grouped Areas
const areas = [
  { title: 'Colombo', region: 'Western' },
  { title: 'Gampaha', region: 'Western' },
  { title: 'Kaluthara', region: 'Western' },
  { title: 'Kandy', region: 'Central' },
  { title: 'Matale', region: 'Central' },
  { title: 'Nuwara Eliya', region: 'Central' },
  { title: 'Galle', region: 'Southern' },
  { title: 'Matara', region: 'Southern' },
  { title: 'Hambantota', region: 'Southern' },
  { title: 'Jaffna', region: 'Northern' },
  { title: 'Kilinochchi', region: 'Northern' },
  { title: 'Mannar', region: 'Northern' },
  { title: 'Vavuniya', region: 'Northern' },
  { title: 'Mullaitivu', region: 'Northern' },
  { title: 'Anuradhapura', region: 'North Central' },
  { title: 'Polonnaruwa', region: 'North Central' },
  { title: 'Ratnapura', region: 'Sabaragamuwa' },
  { title: 'Kegalle', region: 'Sabaragamuwa' },
  
  { title: 'University of Ruhuna', region: 'University' },
  { title: 'University of Colombo', region: 'University' },
  { title: 'University of Kelaniya', region: 'University' },
  { title: 'University of Moratuwa', region: 'University' },
  { title: 'University of Peradeniya', region: 'University' },
  { title: 'Eastern University', region: 'University' },
  { title: 'Rajarata University', region: 'University' },
  { title: 'Sabaragamuwa University', region: 'University' },
  { title: 'University of Sri Jayawardenapura', region: 'University' },
  { title: 'Wayamba University', region: 'University' },
  { title: 'University of Vavuniya', region: 'University' },
];

// Other search options
const boardingTypes = ['Single Room', 'Shared Room', 'Apartment', 'Annex'];
const distances = ['< 1 km', '1 - 3 km', '3 - 5 km', '5+ km'];
const priceRanges = ['< Rs.5000', 'Rs.5000 - Rs.10 000', 'Rs.10 000 - Rs.15 000', 'Rs.15 000 - Rs.30 000', 'Rs.30 000 - Rs.50 000', 'Rs.50 000 +'];
const facilities = ['Wi-Fi', 'A/C', 'Parking', 'Laundry', 'Cooking', 'Study Area', 'Pet Allowed', 'Meal Services', 'Garden View'];

export default function SearchBar() {
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedBoardingType, setSelectedBoardingType] = useState('');
  const [selectedDistance, setSelectedDistance] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [selectedFacilities, setSelectedFacilities] = useState([]);

  const handleSearch = () => {
    // Handle the search logic here
    console.log({
      selectedArea,
      selectedBoardingType,
      selectedDistance,
      selectedPriceRange,
      selectedFacilities,
    });
  };

  return (
    <div className="search-bar">
      {/* Grouped Area Autocomplete */}
      <Autocomplete
        className="custom-autocomplete"
        id="area"
        options={areas}
        groupBy={(option) => option.region} // Group by region
        getOptionLabel={(option) => option.title} // Show the title of each area
        value={selectedArea}
        onChange={(event, newValue) => setSelectedArea(newValue)}
        renderInput={(params) => <TextField {...params} label="Area" variant="outlined" />}
        style={{ marginBottom: '10px' }}
      />

      {/* Boarding House Type */}
      <TextField
        select
        id="type"
        label="Type of Place"
        value={selectedBoardingType}
        onChange={(e) => setSelectedBoardingType(e.target.value)}
        variant="outlined"
        fullWidth
        style={{ marginBottom: '10px' }}
      >
        {boardingTypes.map((type) => (
          <MenuItem key={type} value={type}>
            {type}
          </MenuItem>
        ))}
      </TextField>

      {/* Distance */}
      <TextField
        select
        id="distance"
        label="Distance"
        value={selectedDistance}
        onChange={(e) => setSelectedDistance(e.target.value)}
        variant="outlined"
        fullWidth
        style={{ marginBottom: '10px' }}
      >
        {distances.map((distance) => (
          <MenuItem key={distance} value={distance}>
            {distance}
          </MenuItem>
        ))}
      </TextField>

      {/* Price Range */}
      <TextField
        select
        id="price"
        label="Price Range"
        value={selectedPriceRange}
        onChange={(e) => setSelectedPriceRange(e.target.value)}
        variant="outlined"
        fullWidth
        style={{ marginBottom: '10px' }}
      >
        {priceRanges.map((range) => (
          <MenuItem key={range} value={range}>
            {range}
          </MenuItem>
        ))}
      </TextField>

      {/* Facilities */}
      <Autocomplete
        multiple
        id="facilities"
        options={facilities}
        value={selectedFacilities}
        onChange={(event, newValue) => setSelectedFacilities(newValue)}
        renderInput={(params) => <TextField {...params} label="Facilities" variant="outlined" />}
        style={{ marginBottom: '10px' }}
      />

      {/* Search Button */}
      <Button className="search-button" variant="contained" color="primary" onClick={handleSearch}>
        <SearchIcon />
      </Button>
    </div>
  );
}
