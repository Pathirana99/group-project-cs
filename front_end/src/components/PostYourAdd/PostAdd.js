import React, { useState } from 'react';
import './postAdd.css'; // Import the CSS file
import { TextField, Button, RadioGroup, FormControlLabel, Radio, Autocomplete } from '@mui/material'; // Using Material-UI components
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const citiesByProvince = [
  { city: 'Colombo', province: 'Western' },
  { city: 'Gampaha', province: 'Western' },
  { city: 'Kaluthara', province: 'Western' },
  { city: 'Kandy', province: 'Central' },
  { city: 'Matale', province: 'Central' },
  { city: 'Nuwara Eliya', province: 'Central' },
  { city: 'Galle', province: 'Southern' },
  { city: 'Matara', province: 'Southern' },
  { city: 'Hambantota', province: 'Southern' },
  { city: 'Jaffna', province: 'Northern' },
  { city: 'Kilinochchi', province: 'Northern' },
  { city: 'Mannar', province: 'Northern' },
  { city: 'Vavuniya', province: 'Northern' },
  { city: 'Mullaitivu', province: 'Northern' },
  { city: 'Anuradhapura', province: 'North Central' },
  { city: 'Polonnaruwa', province: 'North Central' },
  { city: 'Ratnapura', province: 'Sabaragamuwa' },
  { city: 'Kegalle', province: 'Sabaragamuwa' }
];

const PostAdd = () => {
  // State to manage the current step

  const [location, setLocation] = useState({ lat: 6.9271, lng: 79.8612 }); // Default location (Colombo)
  const [loadingLocation, setLoadingLocation] = useState(false); // For loading state when fetching location

  // Get current location using browser geolocation and update the map center
  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      setLoadingLocation(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude }); // Update the map center and marker
          setLoadingLocation(false); // Stop loading after fetching location
        },
        (error) => {
          console.error('Error fetching location:', error);
          setLoadingLocation(false);
          alert('Could not retrieve current location.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  // Map container styles
  const mapContainerStyle = {
    height: '300px',
    width: '100%',
    borderRadius: '16px',
    border: '1px solid rgba(0, 0, 0, 0.1)',
  };


  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phoneNumbers: [''],
    placeType: 'Apartment', // Default selection
    city: '',
    street: ''
  });
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e, index) => {
    if (index !== undefined) {
      const updatedPhoneNumbers = [...formData.phoneNumbers];
      updatedPhoneNumbers[index] = e.target.value;
      setFormData({ ...formData, phoneNumbers: updatedPhoneNumbers });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form
    let formErrors = {};
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      formErrors.email = 'Please enter a valid email address';
    }
    if (!formData.name) {
      formErrors.name = 'Name is required';
    }

    // First phone number is required
    if (!formData.phoneNumbers[0].match(/^\d{10}$/)) {
      formErrors[`phone0`] = 'Please enter a valid 10-digit phone number';
    }

    // Validate additional phone numbers only if they are provided
    formData.phoneNumbers.slice(1).forEach((phone, index) => {
      if (phone && !phone.match(/^\d{10}$/)) {
        formErrors[`phone${index + 1}`] = 'Please enter a valid 10-digit phone number';
      }
    });

    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      // Submit the form if no errors
      console.log('Form submitted:', formData);
    }
  };

  // Add new phone number field
  const addPhoneNumber = () => {
    setFormData({ ...formData, phoneNumbers: [...formData.phoneNumbers, ''] });
  };

  // Handle place type change
  const handlePlaceTypeChange = (event) => {
    setFormData({ ...formData, placeType: event.target.value });
  };

  return (
    <div className="postadd">
      <h1>Register Your Boarding Place</h1>
      <img
        src='/images/2.1.png'
        alt="boarding place icon"
        className="icon"
      />
      <div className="post-add-container">
  
        {/* Email, Name, Phone Number Section */}
        <div className="form-section">
          <form onSubmit={handleSubmit}>
            <label>E-mail</label>
            <TextField
              label="Email"
              name="email"
              type="text"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              fullWidth
              required
            />
  
            <label>Name</label>   
            <TextField
              label="Your Name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              fullWidth
              required
            />
  
            <label>Add Your Phone Number(s)</label>
            {formData.phoneNumbers.map((phone, index) => (
              <div key={index} className="phone-number-row">
                <TextField
                  label={`Phone Number ${index + 1}`}
                  name={`phone${index}`}
                  type="text"
                  value={phone}
                  onChange={(e) => handleChange(e, index)}
                  error={!!errors[`phone${index}`]}
                  helperText={errors[`phone${index}`]}
                  fullWidth
                  required={index === 0} 
                  inputProps={{ maxLength: 10 }}
                />
              </div>
            ))}
            <div className="add-phone-link" onClick={addPhoneNumber}>
              <span>+</span> Add another phone number
            </div>
        </form>
      </div>
  
        {/* Boarding Place Type Section */}
        <div className="form-section">
          <label>Boarding Place Type</label>
          <div className="boarding-place-type-section">
            <RadioGroup
              row
              name="placeType"
              value={formData.placeType}
              onChange={handlePlaceTypeChange}
            >
              <FormControlLabel
                value="Apartment"
                control={<Radio className="custom-radio" />}
                label="Apartment"
                className="radio-button"
              />
              <FormControlLabel
                value="Annex"
                control={<Radio className="custom-radio" />}
                label="Annex"
                className="radio-button"
              />
              <FormControlLabel
                value="Room"
                control={<Radio className="custom-radio" />}
                label="Room"
                className="radio-button"
              />
              <FormControlLabel
                value="Other"
                control={<Radio className="custom-radio" />}
                label="Other"
                className="radio-button"
              />
            </RadioGroup>
          </div>
        </div>
  
        {/* Location and Map Section */}
        <div className="form-section">
          <label>Location</label>
          <div className="location-section">
            <Autocomplete
              options={citiesByProvince.map(item => item.city)}
              value={formData.city}
              onChange={(event, newValue) => {
                setFormData({ ...formData, city: newValue || '' });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="City"
                  fullWidth
                  variant="outlined"
                  required
                />
              )}
              style={{ marginTop: '16px' }}
            />
  
            <div style={{ marginTop: '16px' }}>
              <TextField
                label="Street"
                name="street"
                value={formData.street}
                onChange={handleChange}
                fullWidth
                required
              />
            </div>
          </div>
  
          {/* Google Maps Section */}
          <div className="mapSection">
            <LoadScript googleMapsApiKey="AIzaSyAZVdMOfQEqb3T04P_-HTMR_Vg4aTIoVz8">
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={location}
                zoom={15}
              >
                <Marker position={location} />
              </GoogleMap>
            </LoadScript>
          </div>
  
          {/* Get Current Location Button */}
          <Button
            variant="outlined"
            startIcon={<MyLocationIcon />}
            className="currentLocationButton"
            onClick={handleGetCurrentLocation}
            disabled={loadingLocation}
          >
            {loadingLocation ? 'Loading...' : 'Get Current Location'}
          </Button>
        </div>
        
        <div className="buttonSection">
        <Button
          type="back"
          variant="contained" 
          color="primary"
          style={{ marginTop: '20px' }}
        >
          Back
        </Button>

        <Button
          type="continue"
          variant="contained" 
          color="primary"
          style={{ marginTop: '20px' }}
        >
          Continue
        </Button>
        </div>

      </div>
    </div>
  );
  
};

export default PostAdd;
