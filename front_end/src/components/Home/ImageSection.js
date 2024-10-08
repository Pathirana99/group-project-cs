import React, { useState } from 'react';
import "./imageSection.css";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

export default function ImageSection() {
  // Define state for the search inputs
  const [area, setArea] = useState('');
  const [boardingType, setBoardingType] = useState('');
  const [distance, setDistance] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [facilities, setFacilities] = useState('');

  return (
    <div className="image-section">
      <img src="/images/1.4.jpg" alt="Home Section" />
      <div className="overlay">
        <h1>Find your perfect home <br /> away from home</h1>

        {/* Search inputs */}
        <div className="buttons-section">
          
          {/* Area Search */}
          <FormControl className="search-item" fullWidth>

            <Select
              value={area}
              onChange={(e) => setArea(e.target.value)}
              displayEmpty
              variant="outlined"
            >
              <MenuItem value="">Area</MenuItem>
              <MenuItem value="Area 1">Area 1</MenuItem>
              <MenuItem value="Area 2">Area 2</MenuItem>
              <MenuItem value="Area 3">Area 3</MenuItem>
            </Select>
          </FormControl>

          {/* Boarding Type Search */}
          <FormControl className="search-item" fullWidth>
            <InputLabel>Boarding Type</InputLabel>
            <Select
              value={boardingType}
              onChange={(e) => setBoardingType(e.target.value)}
              displayEmpty
              variant="outlined"
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="Hostel">Hostel</MenuItem>
              <MenuItem value="Apartment">Apartment</MenuItem>
              <MenuItem value="Shared Room">Shared Room</MenuItem>
            </Select>
          </FormControl>

          {/* Distance Search */}
          <TextField
            label="Distance"
            variant="outlined"
            type="number"
            className="search-item"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
          />

          {/* Price Range Search */}
          <TextField
            label="Price Range"
            variant="outlined"
            type="number"
            className="search-item"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
          />

          {/* Facilities Search */}
          <FormControl className="search-item" fullWidth>
            <InputLabel>Facilities</InputLabel>
            <Select
              value={facilities}
              onChange={(e) => setFacilities(e.target.value)}
              displayEmpty
              variant="outlined"
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="Wi-Fi">Wi-Fi</MenuItem>
              <MenuItem value="Gym">Gym</MenuItem>
              <MenuItem value="Parking">Parking</MenuItem>
            </Select>
          </FormControl>

          {/* Search Button */}
          <Button variant="contained" className="search-button" color="primary">
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}
