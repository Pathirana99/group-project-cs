import React, { useState,useEffect } from 'react';
import {TextField,FormControl,Select,MenuItem,RadioGroup,FormControlLabel,Radio,Button,Checkbox,FormGroup} from '@mui/material';
import './addOther.css';

const AddOther = ({ formData, updateFormData }) => {
  // State for apartment form fields
  const [localFormData, setLocalFormData] = useState({
    bedrooms: 0,
    bathrooms: 0,
    floorArea: '',
    parking: 0,
    people: 0,
    price: '',
    rentDuration: 'Per Month',
    advancePayment: '',
    advancePaymentDuration: 'Months',
    billsIncluded: 'no',
    title: '',
    description: '',
    facilities: {
      acRooms: false,
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

    if (name === 'price' || name === 'advancePayment') {
      const formattedValue = formatPrice(value);
      updateFormData({ otherDetails: { ...localFormData, [name]: formattedValue } });
      setLocalFormData({ ...localFormData, [name]: formattedValue });
    } else {
     updateFormData({ otherDetails: { ...localFormData, [name]: value } });
      setLocalFormData({ ...localFormData, [name]: value });
    }

    // If advancePaymentDuration is set to "None", clear the advancePayment field
    if (name === 'advancePaymentDuration' && value === 'None') {
      
      updateFormData({
        otherDetails: {
          ...localFormData,
          advancePayment: '',
          advancePaymentDuration: value,
        }
      });
      setLocalFormData({
        ...localFormData,
        advancePayment: '',
        advancePaymentDuration: value
      });
    }
  };

  // Handler for checkbox changes
  const handleFacilityChange = (e) => {
    const { name, checked } = e.target;
    updateFormData({
      otherDetails: {
        ...localFormData,
        facilities: {
          ...localFormData.facilities,
          [name]: checked
        }
      }
    });
    setLocalFormData({
      ...localFormData,
      facilities: {
        ...localFormData.facilities,
        [name]: checked
      }
    });
  };

  useEffect(() => {
    if (formData && formData.annexDetails) {
      setLocalFormData({ ...formData.annexDetails });
    }
  }, [formData]);

  const handleQuickFillTitle = () => {
    const quickFillTitle = `${localFormData.bedrooms} bedroom in ${formData.placeType} for Rs.${localFormData.price} (per Month)`;
    setLocalFormData({ ...localFormData, title: quickFillTitle });
    updateFormData({
      otherDetails: { ...localFormData, title: quickFillTitle }
    });
  };
  
  const handleQuickFillDescription = () => {
    const quickFillDescription = `This ${localFormData.bedrooms}-bedroomoffers great amenities and is located in ${formData.city}. Priced at Rs.${localFormData.price} per month, it's ideal for families or groups.`;
    setLocalFormData({ ...localFormData, description: quickFillDescription });
    updateFormData({
      otherDetails: { ...localFormData, description: quickFillDescription }
    });
  };

  return (
    <div className="other">
      <div className="other-container">
        <div className="title">
          <h1>Fill out the details below to list your apartment on Bdoor</h1>
          <img src='/images/2.6.png' alt="boarding place icon" className="icon" />
        </div>

        {/* Apartment Details Section */}
        <div className="form-section">

          <div className="form-row">
          <div className="form-group">
            <label>Bedrooms</label>
            <TextField
              type="number"
              name="bedrooms"
              value={localFormData.bedrooms || 0}
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
              value={localFormData.bathrooms || 0}
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
              value={localFormData.floorArea || ''}
              onChange={handleInputChange}
              fullWidth
            />
            </div>
            <div className="form-group">
            <label>Parking</label>
            <TextField
              type="number"
              name="parking"
              value={localFormData.parking || 0}
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
              value={localFormData.people || 0}
              onChange={handleInputChange}
              fullWidth
              InputProps={{ inputProps: { min: 0 } }}
            />
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
              value={localFormData.price || ''}
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
                value={localFormData.rentDuration || 'Per Month'}
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
              value={localFormData.advancePayment || ''}
              onChange={handleInputChange}
              fullWidth
              
            />
            </div>
            <div className="form-group">
            <FormControl fullWidth>
              <Select
                name="advancePaymentDuration"
                value={localFormData.advancePaymentDuration || 'Months'}
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
                value={localFormData.billsIncluded || 'no'}
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
          <Button className="quickFill" variant="contained"
          onClick={() => handleQuickFillTitle()}
          >Quick Fill</Button>
          </div>
          <TextField
            name="title"
            placeholder="3 bedroom apartment in Matara for Rs.15 000 (per Month)"
            value={localFormData.title || ''}
            onChange={handleInputChange}
            fullWidth
          />
          <div className="description">
          <div className="form-row">
          <label>Description</label>
          <Button className="quickFill" variant="contained"
           onClick={() => handleQuickFillDescription()}
          >Quick Fill</Button>
          </div>
          <TextField
            name="description"
            value={localFormData.description || ''}
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
                  checked={localFormData.facilities.acRooms || false}
                  onChange={handleFacilityChange}
                  className="button-checkbox"
                  sx={{ display: "none" }} 
                />
              }
              label="A/C"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="mealServices"
                  checked={localFormData.facilities.mealServices || false}
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
                checked={localFormData.facilities.washingMachine || false}
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
                checked={localFormData.facilities.tv || false}
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
                checked={localFormData.facilities.balcony || false}
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
                checked={localFormData.facilities.gardenView || false}
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
                  checked={localFormData.facilities.freeWifi || false}
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
                  checked={localFormData.facilities.landlineTelephone || false}
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
                  checked={localFormData.facilities.petsAllowed || false}
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
                  checked={localFormData.facilities.garbageRemoval || false}
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
                  checked={localFormData.facilities.studyArea || false}
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
                  checked={localFormData.facilities.fireDetection || false}
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
                  checked={localFormData.facilities.gateCommunity || false}
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
                  checked={localFormData.facilities.cctv || false}
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
                  name="onlyMale"
                  checked={localFormData.facilities.onlyMale || false}
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
                  checked={localFormData.facilities.onlyFemale || false}
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
                  checked={localFormData.facilities.backupGenerator || false}
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
                  checked={localFormData.facilities.mainLineWater || false}
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

export default AddOther;
