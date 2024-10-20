import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
const boardingTypes = ['Apartment', 'Annex','Room'];
const distances = ['< 1 km', '1 - 3 km', '3 - 5 km', '5+ km'];
const priceRanges = [{ label: '< Rs.5000', min: 0, max: 5000 },
  { label: 'Rs.5000 - Rs.10 000', min: 5000, max: 10000 },
  { label: 'Rs.10 000 - Rs.15 000', min: 10000, max: 15000 },
  { label: 'Rs.15 000 - Rs.30 000', min: 15000, max: 30000 },
  { label: 'Rs.30 000 - Rs.50 000', min: 30000, max: 50000 },
  { label: 'Rs.50 000 +', min: 50000, max: Infinity }];
const facilities = ['Wi-Fi', 'A/C', 'Parking', 'Laundry', 'Cooking', 'Study Area', 'Pet Allowed', 'Meal Services', 'Garden View'];

export default function SearchBar({ isListPlacesPage }) {
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedBoardingType, setSelectedBoardingType] = useState('');
  const [selectedDistance, setSelectedDistance] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false); // Ensure this line is present
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Detect screen size

  const navigate = useNavigate();

  useEffect(() => {
    // Function to handle resize and detect if on mobile/tablet
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  const handleSearch = () => {
    // Handle the search logic here
    navigate('/list-places', {
      state: {
        selectedArea,
        selectedBoardingType,
        selectedDistance,
        selectedPriceRange,
        selectedFacilities
      }
    });
  };

  return (
    <div className="search-bar">

       {/* Expand/Collapse Icon */}
       {isListPlacesPage && (
         <Button className="expand-button" onClick={() => setIsExpanded(!isExpanded)}>
         {isExpanded ? "Search with Filters" : "Search with Filters"}
       </Button>
      )}

      {/* Show the search bar fields only when expanded or on desktop */}
      {(isExpanded || !isMobile) && (
        <>
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
        value={selectedPriceRange ? selectedPriceRange.label : ''} // Show label if selected
        onChange={(e) => {
          const selectedRange = priceRanges.find(range => range.label === e.target.value);
          setSelectedPriceRange(selectedRange); // Store the whole object (min/max)
        }}
        variant="outlined"
        fullWidth
        style={{ marginBottom: '10px' }}
      >
        {priceRanges.map((range) => (
          <MenuItem key={range.label} value={range.label}>
            {range.label}
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
      </>
      )}
    </div>
  );
}
