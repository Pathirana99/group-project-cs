import React, { useState } from 'react';
import "./searchBar.css";
import { TextField, Button, MenuItem, Autocomplete } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

// Grouped Areas
const areas = [
  { title: 'Colombo', region: 'Western' },
  { title: 'Gampaha', region: 'Western' },
  { title: 'Kandy', region: 'Central' },
  { title: 'Matale', region: 'Central' },
  { title: 'Galle', region: 'Southern' },
  { title: 'Matara', region: 'Southern' },
  { title: 'Jaffna', region: 'Northern' },
  // Add more areas and regions here
];

// Other search options
const boardingTypes = ['Single Room', 'Shared Room', 'Apartment'];
const distances = ['< 1 km', '1 - 3 km', '3 - 5 km', '5+ km'];
const priceRanges = ['< $100', '$100 - $300', '$300 - $500', '$500+'];
const facilities = ['Wi-Fi', 'AC', 'Parking', 'Laundry'];

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
        label="Boarding House Type"
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
        options={facilities}
        value={selectedFacilities}
        onChange={(event, newValue) => setSelectedFacilities(newValue)}
        renderInput={(params) => <TextField {...params} label="Facilities" variant="outlined" />}
        style={{ marginBottom: '10px' }}
      />

      {/* Search Button */}
      <Button className="search-button" variant="contained" color="primary" onClick={handleSearch}>
      <SearchIcon/>
      </Button>
    </div>
  );
}
