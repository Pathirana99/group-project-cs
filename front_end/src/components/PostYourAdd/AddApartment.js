import React, { useState } from 'react';
import {TextField,FormControl,Select,MenuItem,RadioGroup,FormControlLabel,Radio,Button,Checkbox,FormGroup} from '@mui/material';
import './addApartment.css';

const AddApartment = () => {
  // State for apartment form fields
  const [formData, setFormData] = useState({
    apartmentName: '',
    floorNumber: 0,
    bedrooms: 0,
    bathrooms: 0,
    floorArea: '',
    parking: 0,
    people: 0,
    petsAllowed: '',
    price: '',
    rentDuration: 'Per Month',
    advancePayment: '',
    advancePaymentDuration: 'Months',
    billsIncluded: '',
    title: '',
    description: '',
    facilities: {
      acRooms: false,
      sharedKitchen: false,
      inRoomKitchenette: false,
      mealServices: false,
      washingMachine: false,
      tv:false,
      balcony:false,
      gardenView:false,
      freeWifi:false,
      landlineTelephone:false,
      petsAllowed:false,
      garbageRemoval:false,
      studyArea:false,
      fireDetection:false,
      gateCommunity:false,
      cctv:false,
      securityServices:false,
      partiesEventsAllowed:false,
      guestsAllowed:false,
      onlyMale:false,
      onlyFemale:false,
      backupGenerator:false,
      mainLineWater:false

    }
  });

  // Function to handle price formatting
  const formatPrice = (value) => {
    // Remove non-numeric characters
    const numericValue = value.replace(/[^0-9]/g, '');
    // Format with commas
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ', ');
  };


  // Handler for text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'price' || name === 'advancePayment') {
      const formattedValue = formatPrice(value);
      setFormData({ ...formData, [name]: formattedValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    // If advancePaymentDuration is set to "None", clear the advancePayment field
    if (name === 'advancePaymentDuration' && value === 'None') {
      setFormData({
        ...formData,
        [name]: value,
        advancePayment: '', // Clear advancePayment if "None" is selected
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handler for checkbox changes
  const handleFacilityChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      facilities: {
        ...formData.facilities,
        [name]: checked
      }
    });
  };

  return (
    <div className="apartment">
      <div className="apartment-container">
        <div className="title">
          <h1>Fill out the details below to list your apartment on Bdoor</h1>
          <img src='/images/2.2.png' alt="boarding place icon" className="icon" />
        </div>

        {/* Apartment Details Section */}
        <div className="form-section">
          <div className="form-row">
            <div className="form-group">
            <label>Apartment Name</label>
            <TextField
              name="apartmentName"
              value={formData.apartmentName}
              onChange={handleInputChange}
              fullWidth
            />
            </div>
            <div className="form-group">
            <label>Floor Number</label>
            <TextField
              type="number"
              name="floorNumber"
              value={formData.floorNumber}
              onChange={handleInputChange}
              fullWidth
              InputProps={{ inputProps: { min: 0 } }} // Set minimum value
            />
            </div>
          </div>

          <div className="form-row">
          <div className="form-group">
            <label>Bedrooms</label>
            <TextField
              type="number"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleInputChange}
              fullWidth
              InputProps={{ inputProps: { min: 0 } }}
            />
            </div>
            <div className="form-group">
            <label>Bathrooms</label>
            <TextField
              type="number"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleInputChange}
              fullWidth
              InputProps={{ inputProps: { min: 0 } }}
            />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
            <label>Floor Area (sq ft)</label>
            <TextField
              name="floorArea"
              value={formData.floorArea}
              onChange={handleInputChange}
              fullWidth
            />
            </div>
            <div className="form-group">
            <label>Parking</label>
            <TextField
              type="number"
              name="parking"
              value={formData.parking}
              onChange={handleInputChange}
              fullWidth
              InputProps={{ inputProps: { min: 0 } }}
            />
            </div>
          </div>

          <div className="form-row">
          <div className="form-group">
            <label>How many people can Stay?</label>
            <TextField
              type="number"
              name="people"
              value={formData.people}
              onChange={handleInputChange}
              fullWidth
              InputProps={{ inputProps: { min: 0 } }}
            />
            </div>
            <div className="form-group">
            <label>Do you allow pets?</label>
            <div className= "radio-button-section">
              <RadioGroup
                row
                name="petsAllowed"
                value={formData.petsAllowed}
                onChange={handleInputChange}
              >
                <FormControlLabel value="yes" control={<Radio sx={{ display: "none" }} />} label ="YES" className="radio-button"/>
                <FormControlLabel value="no" control={<Radio sx={{ display: "none" }} />} label="NO" className="radio-button" />
              </RadioGroup>
            </div>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="form-section">
          <label>Expected Price (Rs.)</label>
          <div className="form-row">
            <div className="form-group">
            
            <TextField
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              fullWidth
              onKeyDown={(e) => {
                // Allow only numbers (0-9) and control keys (e.g., backspace, arrow keys)
                if (!/[0-9]/.test(e.key) && !['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)) {
                  e.preventDefault();
                }
              }}

            />
            </div>
            <div className="form-group">
            <FormControl fullWidth>
              <Select
                name="rentDuration"
                value={formData.rentDuration}
                onChange={handleInputChange}
              >
                <MenuItem value="Per Month">Per Month</MenuItem>
                <MenuItem value="Per Week">Per Week</MenuItem>
                <MenuItem value="Per Day">Per Day</MenuItem>
              </Select>
            </FormControl>
            </div>
          </div>

          <label>Advance Payment (Rs.)</label>
          <div className="form-row">
            <div className="form-group">
            <TextField
              name="advancePayment"
              value={formData.advancePayment}
              onChange={handleInputChange}
              fullWidth
              
            />
            </div>
            <div className="form-group">
            <FormControl fullWidth>
              <Select
                name="advancePaymentDuration"
                value={formData.advancePaymentDuration}
                onChange={handleInputChange}
              >
                <MenuItem value="Days">Days</MenuItem>
                <MenuItem value="Weeks">Weeks</MenuItem>
                <MenuItem value="Months">Months</MenuItem>
                <MenuItem value="Years">Years</MenuItem>
                <MenuItem value="None">None</MenuItem>
              </Select>
            </FormControl>
            </div>
          </div>

          <div className="form-row">
          <div className="form-group">
            <label>Bills Included</label>
          <div className= "radio-button-section2">
            <FormControl component="fieldset">
              <RadioGroup
                row
                name="billsIncluded"
                value={formData.billsIncluded}
                onChange={handleInputChange}
              >
                <FormControlLabel value="yes" control={<Radio sx={{ display: "none" }} />} label ="YES" className="radio-button"/>
                <FormControlLabel value="no" control={<Radio sx={{ display: "none" }} />} label="NO" className="radio-button" />
              </RadioGroup>
            </FormControl>
            </div>
            </div>
          </div>
        </div>

        {/* Title and Description Section */}
        <div className="form-section">
        <div className="form-row">
          <label>Title</label>
          <Button className="quickFill" variant="contained">Quick Fill</Button>
          </div>
          <TextField
            name="title"
            placeholder="3 bedroom apartment in Matara for Rs.15 000 (per Month)"
            value={formData.title}
            onChange={handleInputChange}
            fullWidth
          />
          <div className="description">
          <div className="form-row">
          <label>Description</label>
          <Button className="quickFill" variant="contained">Quick Fill</Button>
          </div>
          <TextField
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            multiline
            rows={4}
            fullWidth
          />
          </div>
        </div>

        {/* Facilities Section */}
        <div className="form-section">
        <label>Facilities</label>
        <div className="facilities">
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  name="acRooms"
                  checked={formData.facilities.acRooms}
                  onChange={handleFacilityChange}
                  className="button-checkbox"
                  sx={{ display: "none" }} 
                />
              }
              label="AC Rooms"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="sharedKitchen"
                  checked={formData.facilities.sharedKitchen}
                  onChange={handleFacilityChange}
                  className="button-checkbox"
                  sx={{ display: "none" }} 
                />
              }
              label="Shared Kitchen"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="inRoomKitchenette"
                  checked={formData.facilities.inRoomKitchenette}
                  onChange={handleFacilityChange}
                  className="button-checkbox"
                  sx={{ display: "none" }} 
                />
              }
              label="In-Room Kitchenette"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="mealServices"
                  checked={formData.facilities.mealServices}
                  onChange={handleFacilityChange}
                  className="button-checkbox"
                  sx={{ display: "none" }} 
                />
              }
              label="Meal Services"
            /><FormControlLabel
            control={
              <Checkbox
                name="washingMachine"
                checked={formData.facilities.washingMachine}
                onChange={handleFacilityChange}
                className="button-checkbox"
                sx={{ display: "none" }} 
              />
            }
            label="Washing Machine"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="tv"
                checked={formData.facilities.tv}
                onChange={handleFacilityChange}
                className="button-checkbox"
                sx={{ display: "none" }} 
              />
            }
            label="TV"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="balcony"
                checked={formData.facilities.balcony}
                onChange={handleFacilityChange}
                className="button-checkbox"
                sx={{ display: "none" }} 
              />
            }
            label="Balcony"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="gardenView"
                checked={formData.facilities.gardenView}
                onChange={handleFacilityChange}
                className="button-checkbox"
                sx={{ display: "none" }} 
              />
            }
            label="Garden View"
          />
          <FormControlLabel
              control={
                <Checkbox
                  name="freeWifi"
                  checked={formData.facilities.freeWifi}
                  onChange={handleFacilityChange}
                  className="button-checkbox"
                  sx={{ display: "none" }} 
                />
              }
              label="Free WiFi"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="landlineTelephone"
                  checked={formData.facilities.landlineTelephone}
                  onChange={handleFacilityChange}
                  className="button-checkbox"
                  sx={{ display: "none" }} 
                />
              }
              label="Landline Telephone"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="petsAllowed"
                  checked={formData.facilities.petsAllowed}
                  onChange={handleFacilityChange}
                  className="button-checkbox"
                  sx={{ display: "none" }} 
                />
              }
              label="Pet Allowed"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="garbageRemoval"
                  checked={formData.facilities.garbageRemoval}
                  onChange={handleFacilityChange}
                  className="button-checkbox"
                  sx={{ display: "none" }} 
                />
              }
              label="Garbage Removal"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="studyArea"
                  checked={formData.facilities.studyArea}
                  onChange={handleFacilityChange}
                  className="button-checkbox"
                  sx={{ display: "none" }} 
                />
              }
              label="Study Area"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="fireDetection"
                  checked={formData.facilities.fireDetection}
                  onChange={handleFacilityChange}
                  className="button-checkbox"
                  sx={{ display: "none" }} 
                />
              }
              label="Fire Detection"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="gateCommunity"
                  checked={formData.facilities.gateCommunity}
                  onChange={handleFacilityChange}
                  className="button-checkbox"
                  sx={{ display: "none" }} 
                />
              }
              label="Gate Community"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="cctv"
                  checked={formData.facilities.cctv}
                  onChange={handleFacilityChange}
                  className="button-checkbox"
                  sx={{ display: "none" }} 
                />
              }
              label="CCTV"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="securityServices"
                  checked={formData.facilities.securityServices}
                  onChange={handleFacilityChange}
                  className="button-checkbox"
                  sx={{ display: "none" }} 
                />
              }
              label="Security Services"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="partiesEventsAllowed"
                  checked={formData.facilities.partiesEventsAllowed}
                  onChange={handleFacilityChange}
                  className="button-checkbox"
                  sx={{ display: "none" }} 
                />
              }
              label="Parties/Events Allowed"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="guestsAllowed"
                  checked={formData.facilities.guestsAllowed}
                  onChange={handleFacilityChange}
                  className="button-checkbox"
                  sx={{ display: "none" }} 
                />
              }
              label="Guests Allowed"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="onlyMale"
                  checked={formData.facilities.onlyMale}
                  onChange={handleFacilityChange}
                  className="button-checkbox"
                  sx={{ display: "none" }} 
                />
              }
              label="Only Male"
            />
             <FormControlLabel
              control={
                <Checkbox
                  name="onlyFemale"
                  checked={formData.facilities.onlyFemale}
                  onChange={handleFacilityChange}
                  className="button-checkbox"
                  sx={{ display: "none" }} 
                />
              }
              label="Only Female"
            />
             <FormControlLabel
              control={
                <Checkbox
                  name="backupGenerator"
                  checked={formData.facilities.backupGenerator}
                  onChange={handleFacilityChange}
                  className="button-checkbox"
                  sx={{ display: "none" }} 
                />
              }
              label="Backup Generator"
            />
             <FormControlLabel
              control={
                <Checkbox
                  name="mainLineWater"
                  checked={formData.facilities.mainLineWater}
                  onChange={handleFacilityChange}
                  className="button-checkbox"
                  sx={{ display: "none" }} 
                />
              }
              label="Main Line Water"
            />
            
          </FormGroup>
        </div>
        </div>
      </div>
    </div>
  );
};

export default AddApartment;
