import React, { useState } from 'react';
import { CardContent, CardMedia,DialogContentText, Typography, Rating, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton } from '@mui/material';
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import DeleteIcon from '@mui/icons-material/Delete';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import './ownerPostedAdds.css'; 

export default function OwnerPostedAdds() {
  const [ownerData, setOwnerData] =useState ([
    {
      id: 1,
      title: 'Apartment near University of Ruhuna',
      date: "2024-10-11",
      price: 15000,
      rentDuration: 'Per Month',
      rating: 3,
      rooms: [
        { title: "Room 1", capacity: 2, status: "Available Now" },
        { title: "Room 2", capacity: 1, status: "Available Soon" }
      ],
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
      rooms: [
        { title: "Room 1", capacity: 1, status: "Available Now" }
      ],
      beds: 1,
      baths: 1,
      sqft: 500,
      imageUrls: ["/images/3.2.jpg", "/images/3.3.jpeg"],
      description: 'Cozy single room with air conditioning...',
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [editData, setEditData] = useState({});
  const [images, setImages] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [deleteId, setDeleteId] = useState(null);


  const handleEditClick = (place) => {
    setEditData(place);
    setImages(place.imageUrls);
    setRooms(place.rooms); 
    setOpenDialog(true);
  };

  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDeleteImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  const handleUploadImage = (e) => {
    const newImage = URL.createObjectURL(e.target.files[0]);
    setImages([...images, newImage]);
  };

  const handleRoomChange = (index, field, value) => {
    const updatedRooms = [...rooms];
    updatedRooms[index][field] = value;
    setRooms(updatedRooms);
  };

  const handleAddRoom = () => {
    setRooms([...rooms, { title: "", capacity: 1, status: "" }]);
  };

  const handleDeleteRoom = (index) => {
    const updatedRooms = rooms.filter((_, i) => i !== index);
    setRooms(updatedRooms);
  };

  const handleSaveChanges = () => {
    const updatedData = {
      ...editData,
      imageUrls: images, // Updated images
      rooms: rooms,
    };
    console.log("Updated data:", updatedData);
    setOpenDialog(false);
  };

  const handleRemove = (id) => {
    // Show confirmation dialog before deleting
    setDeleteId(id);
    setOpenConfirmDialog(true);
  };

  const confirmRemove = () => {
    setOwnerData((prevData) => prevData.filter((item) => item.id !== deleteId));
    setOpenConfirmDialog(false);
    setDeleteId(null);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
    setDeleteId(null);
  };

  return (
    <div className="owner-posted-ads">
      <Typography variant="h4" className="owner-title">Your Posted Ads</Typography>
      <div className="places-container">
        {ownerData.length > 0 ? (
          ownerData.map((place) => (
            <div key={place.id} className="place-card">
              <CardMedia
                component="img"
                height="200"
                image={place.imageUrls[0]}
                alt={place.title}
              />
              <CardContent className="place-content">
                <Typography variant="h6" className="place-title">{place.title}</Typography>
                <Typography variant="subtitle1" className="place-price">Rs.{place.price.toLocaleString()} {place.rentDuration}</Typography>
                <Rating name="read-only" value={place.rating || 0} readOnly size="small" max={5} />
                <Typography className="place-description">{place.description.substring(0, 100)}...</Typography>
                <div className="place-icons">
                  <BedIcon /> {place.beds} beds &nbsp;
                  <BathtubIcon /> {place.baths} bath &nbsp;
                  <SquareFootIcon /> {place.sqft} sqft
                </div>
                <Button variant="outlined" color="primary" onClick={() => handleEditClick(place)} style={{ marginTop: '10px' }}>
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleRemove(place.id)}
                  style={{ marginTop: '10px',backgroundColor:'red' }}
                >
                  Remove
                </Button>
              </CardContent>
            </div>
          ))
        ) : (
          <Typography>No ads found.</Typography>
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm" >
        <DialogTitle sx={{fontSize:"32px",fontWeight:'600',color:'#3DC0B9',marginBottom:'0',fontFamily:'"Josefin Sans", sans-serif'}}>
            Edit Your Ad</DialogTitle>
        <DialogContent>
          {/* Form Fields */}
          <TextField
            name="title"
            label='name'
            fullWidth
            margin="dense"
            value={editData.title || ''}
            onChange={handleChange}
          />
          <TextField
            name="price"
            label="Price"
            type="number"
            fullWidth
            margin="dense"
            value={editData.price || ''}
            onChange={handleChange}
          />
          <TextField
            name="rentDuration"
            label="Rent Duration"
            fullWidth
            margin="dense"
            value={editData.rentDuration || ''}
            onChange={handleChange}
          />
          <TextField
            name="beds"
            label="Beds"
            type="number"
            fullWidth
            margin="dense"
            value={editData.beds || ''}
            onChange={handleChange}
          />
          <TextField
            name="baths"
            label="Baths"
            type="number"
            fullWidth
            margin="dense"
            value={editData.baths || ''}
            onChange={handleChange}
          />
          <TextField
            name="sqft"
            label="Sqft"
            type="number"
            fullWidth
            margin="dense"
            value={editData.sqft || ''}
            onChange={handleChange}
          />
          <TextField
            name="description"
            label="Description"
            fullWidth
            multiline
            rows={3}
            margin="dense"
            value={editData.description || ''}
            onChange={handleChange}
          />
          {/* Rooms Section */}
          <Typography variant="subtitle1" style={{ marginTop: '15px' }}>Rooms</Typography>
          {rooms.map((room, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
              <TextField
                label="Room Title"
                fullWidth
                value={room.title}
                onChange={(e) => handleRoomChange(index, 'title', e.target.value)}
              />
              <TextField
                label="Capacity"
                type="number"
                style={{ width: '80px' }}
                value={room.capacity}
                onChange={(e) => handleRoomChange(index, 'capacity', e.target.value)}
              />
              <TextField
                label="Status"
                fullWidth
                value={room.status}
                onChange={(e) => handleRoomChange(index, 'status', e.target.value)}
              />
              <IconButton color="error" onClick={() => handleDeleteRoom(index)}>
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
          <Button variant="outlined" onClick={handleAddRoom} style={{ marginTop: '10px' }}>
            Add Room
          </Button>

          {/* Image Upload and Preview */}
          <Typography variant="subtitle1" style={{ marginTop: '15px' }}>Images</Typography>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
            {images.map((image, index) => (
              <div key={index} style={{ position: 'relative' }}>
                <img src={image} alt={`Uploaded ${index}`} style={{ width: '80px', height: '80px', borderRadius: '5px' }} />
                <IconButton
                  style={{ position: 'absolute', top: '-5px', right: '-5px', backgroundColor: 'rgba(0,0,0,0.5)' }}
                  size="small"
                  color="error"
                  onClick={() => handleDeleteImage(index)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </div>
            ))}
          </div>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="upload-image"
            type="file"
            onChange={handleUploadImage}
          />
          <label htmlFor="upload-image">
            <Button variant="outlined" sx={{color:'#3DC0B9'}} component="span" startIcon={<AddPhotoAlternateIcon />} style={{ marginTop: '10px' }}>
              Upload Image
            </Button>
          </label>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} sx={{margin:'5px',backgroundColor:'#3DC0B9',fontSize:'16px',fontFamily:'"Josefin Sans", sans-serif',color:'black','&:hover': {backgroundColor:'#C8C8C8'}}}>
            Cancel</Button>
          <Button onClick={handleSaveChanges}  sx={{margin:'5px',backgroundColor:'#3DC0B9',fontSize:'16px',fontFamily:'"Josefin Sans", sans-serif',color:'black','&:hover': {backgroundColor:'#C8C8C8'}}}>
            Save Changes</Button>
        </DialogActions>
      </Dialog>

      {/* Confirm Remove Dialog */}
      <Dialog
        open={openConfirmDialog}
        onClose={handleCloseConfirmDialog}
      >
        <DialogTitle>Confirm Removal</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove this ad? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog} sx={{color:'black'}}>
            Cancel
          </Button>
          <Button onClick={confirmRemove} color="error">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
