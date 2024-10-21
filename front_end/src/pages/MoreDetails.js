import React,{useState, useRef} from 'react';
import { Typography, Button,Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import { useLocation } from 'react-router-dom';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import './moreDetails.css';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import ChatPopup from '../components/ChatPopup';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';

export default function MoreDetails() {
  const { state } = useLocation();
  const { place } = state || {};

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAZVdMOfQEqb3T04P_-HTMR_Vg4aTIoVz8', // Add your API key here
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const thumbnailRef = useRef();
  const [isChatOpen, setIsChatOpen] = useState(false);

  if (!place) {
    return <Typography>Place not found</Typography>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const mapCenter = {
    lat: place.latitude || 6.0241, // Default latitude (Matara for example)
    lng: place.longitude || 80.2168, // Default longitude (Matara for example)
  };


  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % place.imageUrls.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex - 1 + place.imageUrls.length) % place.imageUrls.length
    );
  };

  const scrollLeft = () => {
    if (thumbnailRef.current) {
      thumbnailRef.current.scrollBy({ left: -100, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (thumbnailRef.current) {
      thumbnailRef.current.scrollBy({ left: 100, behavior: 'smooth' });
    }
  };

  const handleOpenChat = () => {
    setIsChatOpen(true);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };


  return (
    <div className="moredetails">  
      <div className='navbar'>
        <NavigationBar/>
      </div>
      <div className="more-details-container">
        {/* Main Content with Image Slider and Details */}
        <div className="content-section">
          <div className="left-section">
            <div className="image-slider">
            <Paper elevation={3} className="slider-container">
                <img
                  src={place.imageUrls[currentIndex]}
                  alt={`Img ${currentIndex + 1}`}
                  className="main-image"
                />
                <div className="slider-controls">
                  <Button onClick={handlePrev} disabled={place.imageUrls.length <= 1}>
                    &lt;
                  </Button>
                  <Button onClick={handleNext} disabled={place.imageUrls.length <= 1}>
                    &gt;
                  </Button>
                </div>
              </Paper>

              {/* Thumbnail Images with Horizontal Scroll */}
              <div className="thumbnail-slider">
                <Button onClick={scrollLeft}>&lt;</Button>
                <div className="thumbnail-container" ref={thumbnailRef}>
                  {place.imageUrls.map((imageUrl, index) => (
                    <Paper
                      elevation={2}
                      key={index}
                      className={`thumbnail-image ${index === currentIndex ? 'active' : ''}`}
                      onClick={() => setCurrentIndex(index)}
                    >
                      <img src={imageUrl} alt={`Thumbnail ${index + 1}`} />
                    </Paper>
                  ))}
                </div>
                <Button onClick={scrollRight}>&gt;</Button>
              </div>
            </div>

            {/* Property Info */}
            <div className="property-info">
              <Typography variant="h4"sx={{fontSize:'32px',margin:'2px',fontFamily:'"Josefin Sans", sans-serif'}}>{place.title}</Typography>
              <Typography variant="subtitle1" sx={{fontSize:'20px',margin:'2px',fontFamily:'"Josefin Sans", sans-serif'}}>{place.area}</Typography>
              <Typography variant="body2" sx={{fontSize:'20px',margin:'2px',fontFamily:'"Josefin Sans", sans-serif'}}>Posted Date: {place.date}</Typography>
            </div>

            {/* Facilities */}
            <div className="facilities-section">
              <Typography variant="h6" sx={{fontSize:'24px',margin:'2px',fontFamily:'"Josefin Sans", sans-serif'}}>Facilities:</Typography>
              <ul className="facilities-list" >
                {place.facilities.map((facility, index) => (
                  <li key={index}>
                    <Typography sx={{fontSize:'20px',margin:'2px',fontFamily:'"Josefin Sans", sans-serif'}}> -: {facility}</Typography> 
                  </li>
                ))}
              </ul>
            </div>
            {/* Description */}
            <div className="description-section">
              <Typography variant="h6" sx={{fontSize:'24px',margin:'2px',fontFamily:'"Josefin Sans", sans-serif'}}>Description:</Typography>
              <Typography variant="body2" sx={{fontSize:'20px',margin:'2px',fontFamily:'"Josefin Sans", sans-serif',fontWeight:'normal',color:'gray'}}>{place.description}</Typography>
            </div>

                 <div className="room-section">   {/* Room Details Table */}
                <Typography variant="h6" sx={{fontSize:'24px',margin:'2px',fontFamily:'"Josefin Sans", sans-serif'}}>Room Details:</Typography>
                {place.rooms && place.rooms.length > 0 ? (
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontSize: '20px',fontFamily:'"Josefin Sans", sans-serif' }}>Room Title</TableCell>
                          <TableCell sx={{ fontSize: '20px',fontFamily:'"Josefin Sans", sans-serif' }}>Capacity</TableCell>
                          <TableCell sx={{ fontSize: '20px',fontFamily:'"Josefin Sans", sans-serif' }}>Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {place.rooms.map((room, index) => (
                          <TableRow key={index}>
                            <TableCell sx={{ fontSize: '20px',fontFamily:'"Josefin Sans", sans-serif' }}>{room.title}</TableCell>
                            <TableCell sx={{ fontSize: '20px',fontFamily:'"Josefin Sans", sans-serif' }}>{room.capacity}</TableCell>
                            <TableCell sx={{ fontSize: '20px',fontFamily:'"Josefin Sans", sans-serif' }}>{room.status}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <Typography variant="body2">No rooms available.</Typography>
                )}
                </div>  
          </div>

          {/* Right Section - Contact and Price Details */}
          <div className="right-section">
                <div className="contact-details">
                          {/* Loop through the array of phone numbers */}
              {place.phone?.map((phoneNumber, index) => (
                <Typography variant="body1" key={index} sx={{fontSize:'20px',margin:'2px',fontFamily:'"Josefin Sans", sans-serif'}}>
                  <CallIcon/>  {phoneNumber}
                </Typography>
              ))}

              {/* Email */}
              <Typography variant="body1" sx={{fontSize:'20px',margin:'2px',fontFamily:'"Josefin Sans", sans-serif'}}><EmailIcon/> {place.email}</Typography>

              <div className="contact-buttons">
                {/* Chat Button */}
                <Button variant="contained" className="chat-button" onClick={handleOpenChat}>Chat</Button>
              </div>
            </div>

            {/* Chat Popup */}
              <ChatPopup open={isChatOpen} handleClose={handleCloseChat} ownerName={place.email.split('@')[0]} />

            <div className="price-details">
              <Typography variant="h6" sx={{fontSize:'24px',margin:'2px',fontFamily:'"Josefin Sans", sans-serif'}}>Price Details</Typography>
              <Typography variant="body1" sx={{fontSize:'20px',margin:'2px',fontFamily:'"Josefin Sans", sans-serif'}}>LKR {place.price.toLocaleString()} { place.rentDuration}</Typography>
              <Typography variant="body2" sx={{fontSize:'20px',margin:'2px',fontFamily:'"Josefin Sans", sans-serif'}} >No Prepayment Required</Typography>
              {place.advancePayment && place.advancePaymentDuration !== 'None' ? (
                <>
                  <Typography variant="body2"  sx={{fontSize:'20px',margin:'2px',fontFamily:'"Josefin Sans", sans-serif'}} >Advance Payment: Rs. {place.advancePayment}</Typography>
                  <Typography variant="body2"  sx={{fontSize:'20px',margin:'2px',fontFamily:'"Josefin Sans", sans-serif'}} >Advance Payment Duration: {place.advancePaymentDuration}</Typography>
                </>
              ) : (
                <Typography variant="body2"  sx={{fontSize:'20px',margin:'2px',fontFamily:'"Josefin Sans", sans-serif'}} >No Advance Payment</Typography>
              )}
              {place.billsIncluded === 'Yes' && (
                <Typography variant="body2" sx={{fontSize:'20px',margin:'2px',fontFamily:'"Josefin Sans", sans-serif'}}>Bills Included</Typography>
              )}
            </div>
            {/* Google Map */}
            <div className="map-section">
              <Typography variant="h6">Map:</Typography>
              <GoogleMap
                center={mapCenter}
                zoom={15}
                
              >
                {/* Marker for the location */}
                <Marker position={mapCenter} />
              </GoogleMap>
            </div>
          </div>
        </div>
        <div className='footer'>
        <Footer/>
      </div>
      </div>
     
    </div>
  );
}
