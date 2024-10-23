import React, { useState,useEffect } from 'react';
import {TextField,FormControl,Select,MenuItem,Button,Card,CardContent,IconButton} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import './additionalDetails.css'; // Importing the CSS file for styling
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';

const AdditionalDetails = ({ formData, updateFormData,setIsImageValid ,showRoomSection}) => {
  const [rooms, setRooms] = useState(formData?.additionalDetails || [{ title: '', status: 'Available Now', capacity: 0 }]);
  const [images, setImages] = useState( formData?.additionalDetails || []);
  const [errorMessage, setErrorMessage] = useState('');
  // When rooms change, update the formData in the parent component (PostAdd.js)
  useEffect(() => {
    updateFormData({ additionalDetails: rooms });
  }, [rooms, updateFormData]);

   // Image validation: at least 5 images are required
   useEffect(() => {
    if (images.length >= 5) {
      setErrorMessage('');
      setIsImageValid(true); // Inform PostAdd that images are valid
    } else {
      setErrorMessage('Please upload at least 5 photos.');
      setIsImageValid(false); // Inform PostAdd that images are not valid
    }
  }, [images, setIsImageValid]);


  const handleRoomChange = (index, field, value) => {
    const newRooms = [...rooms];
    newRooms[index][field] = value;
    setRooms(newRooms);
  };

  const handleAddRoom = () => {
    setRooms([...rooms, { title: '', status: 'Available Now', capacity: 0 }]);
  };

  const handleRemoveRoom = (index) => {
    const newRooms = rooms.filter((_, i) => i !== index);
    setRooms(newRooms);
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      title: ''
    }));

    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleTitleChange = (index, title) => {
    const newImages = [...images];
    newImages[index].title = title;
    setImages(newImages);
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    if (files.length + images.length > 30) {
      alert('You can only upload up to 30 images.');
      return;
    }

    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      title: ''
    }));

    setImages((prevImages) => [...prevImages, ...newImages]);
  };


  return (
    <div className="additional-container">
        <div className="form-container">
        {showRoomSection && (
          <div>
        <h4>Room Details & Availability</h4>
        {rooms.map((room, index) => (
            <Card key={index} className="room-card">
            <CardContent>
                <h6 gutterBottom>
                ROOM {index + 1}
                </h6>

                <div className="form-row">
                    <div className="form-group">
                        <label>Room Title</label>
                        <TextField
                            className="form-input"
                            variant="outlined"
                            placeholder="Single Room"
                            value={room.title}
                            onChange={(e) => handleRoomChange(index, 'title', e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Room Status</label>
                        <FormControl className="form-input">
                            <Select
                            value={room.status}
                            onChange={(e) => handleRoomChange(index, 'status', e.target.value)}
                            className="custom-select"
                            >
                            <MenuItem value="Available Now">Available Now</MenuItem>
                            <MenuItem value="Available Soon">Available Soon</MenuItem>
                            <MenuItem value="Not Available">Not Available</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    <div className="form-group">
                        <label>Capacity</label>
                        <TextField
                            className="form-input"
                            type="number"
                            variant="outlined"
                            value={room.capacity}
                            onChange={(e) => handleRoomChange(index, 'capacity', e.target.value)}
                            inputProps={{
                                min: 0,
                                step: 1,
                                pattern: "[0-9]*",
                              }}
                        />
                    </div>
                </div>

                {/* Remove button - only show if more than one room */}
                {rooms.length > 1 && (
                <IconButton
                    className="remove-button"
                    color="error"
                    onClick={() => handleRemoveRoom(index)}
                >
                    <RemoveCircleOutlineIcon />
                </IconButton>
                )}
            </CardContent>
            </Card>
        ))}
        <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddRoom}
            className="add-button"
        >
            Add More
        </Button>
        </div>
        )}
         {/* Image Upload Section */}
        <div className="image-upload">
         <h4>Upload Pictures of Your Place</h4>
         {errorMessage && <p className="error-text">{errorMessage}</p>}
        <div className="upload-container">
          <div
            className="upload-box"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          > 
            <div className="form-group">
            <img src='/images/2.3.png' alt="upload icon" className="imageUpload-icon" />
            <p>Upload Images</p>
            </div>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
            />
          </div>
          <div className="image-preview-container">
            {images.map((image, index) => (
              <div key={index} className="image-preview">
                <img src={image.preview} alt={`Preview ${index + 1}`} />
                <input
                  type="text"
                  placeholder="Image Title"
                  value={image.title}
                  onChange={(e) => handleTitleChange(index, e.target.value)}
                />
                <IconButton
                  onClick={() => removeImage(index)}
                  aria-label="delete"
                  size="small"
                  className="delete-icon"
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>

    </div>
  );
};

export default AdditionalDetails;
