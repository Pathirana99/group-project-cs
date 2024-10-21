import React,{ useState, useEffect,useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography,Button } from '@mui/material';
import './listPlaces.css';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import NavigationBar from '../components/NavigationBar';
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import SquareFootIcon from '@mui/icons-material/SquareFoot';



export default function ListPlaces() {
  const location = useLocation();
  const navigate = useNavigate();
  // Destructure the selected filters from the location state, or default to empty
  const {
    selectedArea = null,
    selectedBoardingType = null,
    selectedDistance = null,
    selectedPriceRange = null,
    selectedFacilities = []
  } = location.state || {};


  const filteredData = [
    {
        id: 1,
        phone: ["0711982521", "0771234567"],
        email: "lakmal@gmail.com",
        title: 'Apartment near University of Ruhuna',
        date: "2024-10-11",
        area: 'Matara',
        price: 15000,
        rentDuration:'Per Month',
        advancePayment: 5000,
        advancePaymentDuration: 'Months',
        billsIncluded: 'NO',
        type: 'Apartment',
        facilities: ['Wi-Fi', 'Parking'],
        distance: 2,
        latitude: 6.0241,
        longitude: 80.2168,
        rooms: [
          {
            title: "Room 1",
            capacity: 2,
            status: "Available Now",
          },
          {
            title: "Room 2",
            capacity: 1,
            status: "Available Soon",
          },
        ],
        imageUrls: [
          "/images/3.4.jpg",
          "/images/3.5.jpg",
          "/images/3.5.jpg",
          "/images/3.5.jpg",
          "/images/3.5.jpg",
          "/images/3.5.jpg"
        ],
        beds: 3,
        baths: 2,
        sqft: 1000,
        description: 'Spacious 3 bedroom apartment near the University of Ruhuna, with modern amenities including Wi-Fi and parking, perfect for students or families. Located just 2 km from the university, this apartment provides easy access to nearby facilities and a peaceful environment for living.'
      },
      {
        id: 2,
        phone: ["0711982521", "0771234567"],
        email: "nuwan23@gmail.com",
        title: 'Single Room near Moratuwa University',
        date: '2024-10-21',
        area: 'University of Moratuwa',
        price: 12000,
        rentDuration:'Per Month',
        advancePayment:'' ,
        advancePaymentDuration: 'None',
        billsIncluded: 'Yes',
        type: 'Single Room',
        facilities: ['A/C', 'Laundry'],
        distance: 10,
        latitude: 5.9414,
        longitude: 80.5707,
        rooms: [
          {
            title: "Room 1",
            capacity: 2,
            status: " Not Available",
          }
        ],
         imageUrls: [
          "/images/3.2.jpg",
          "/images/3.3.jpeg",
          "/images/3.3.jpeg",
          "/images/3.3.jpeg",
          "/images/3.3.jpeg",
          "/images/3.3.jpeg",
          "/images/3.5.jpg",
          "/images/3.5.jpg",
          "/images/3.5.jpg",
          "/images/3.5.jpg",
          "/images/3.5.jpg"
        ],
        beds: 1,
        baths: 1,
        sqft: 500,
        description: 'Cozy single room with air conditioning and laundry services, conveniently located near the University of Colombo. Ideal for students looking for affordable accommodation with all essential services nearby.'
      }
  ];

  // Filter data based on search parameters
  const filteredPlaces = filteredData.filter(place => {

    const placeDistance = place.distance; // Numeric distance from the database

  // Function to check if place distance falls within the selected range
  const isDistanceInRange = () => {
    if (!selectedDistance) return true; // If no distance is selected, include all
    switch (selectedDistance) {
      case '< 1 km':
        return placeDistance < 1;
      case '1 - 3 km':
        return placeDistance >= 1 && placeDistance <= 3;
      case '3 - 5 km':
        return placeDistance >= 3 && placeDistance <= 5;
      case '5+ km':
        return placeDistance > 5;
      default:
        return true;
    }
  };
    return (
      (!selectedArea || place.area === selectedArea.title) && // Check area
      (!selectedBoardingType || place.type === selectedBoardingType) && // Check type
      isDistanceInRange() && // Check distance using the new function
      (!selectedPriceRange || (place.price >= selectedPriceRange.min && place.price <= selectedPriceRange.max)) && // Check price range
      (selectedFacilities.length === 0 || selectedFacilities.every(facility => place.facilities.includes(facility))) // Check facilities
    );
  });

  // Function to dynamically generate the title based on filters
  const generateTitle = useCallback(() => {
    let titleParts = [];

    if (selectedArea) {
      titleParts.push(`in ${selectedArea.title}`);
    }

    if (selectedBoardingType) {
      titleParts.push(selectedBoardingType);
    }

    if (selectedDistance) {
      titleParts.push(`within ${selectedDistance}`);
    }

    if (selectedPriceRange) {
      titleParts.push(`under Rs.${selectedPriceRange.max}`);
    }

    if (titleParts.length === 0) {
      return "Available Places";
    }

    return `Places ${titleParts.join(" ")}`;
  }, [selectedArea, selectedBoardingType, selectedDistance, selectedPriceRange]);

  // State for the title
  const [title, setTitle] = useState("Available Places");

  // Update the title when filters change
  useEffect(() => {
    setTitle(generateTitle());
  }, [generateTitle]);

  
  const handleMoreDetails = (place) => {
    navigate(`/more-details/${place.id}`, { state: { place } }); // Navigate to MoreDetails page with the placeId
  };

  return (
    <div className="listplaces">
    <div className="navBar">
      <NavigationBar />
    </div>
    <div className="listplaces-container">
      <div className="listplaces-searchbar">
        <SearchBar isListPlacesPage={true} />
      </div>
      <div className="listplaces-title">
        <Typography variant="h4">{title}</Typography>
      </div>
      <img
        src='/images/2.5.png'
        alt="boarding place icon"
        className="listplaces-icon"
      />
      <div className="places-container">
        {filteredPlaces.length > 0 ? (
          filteredPlaces.map((place) => (
            <div className="place-card" key={place.id}>
              <Card className="custom-card">
                <CardMedia component="img" height="200" image={place.imageUrls?.[0]} alt={place.title} className="custom-media" />
                <CardContent>
                  <Typography variant="h6" className="place-title">{place.title}</Typography>
                  <Typography variant="subtitle1" className="place-price">Rs.{place.price.toLocaleString()} Per Month</Typography>
                  <Typography className="place-description">{place.description.substring(0, 100)}...</Typography>
                  <div className="place-icons">
                    <BedIcon /> {place.beds} beds &nbsp;
                    <BathtubIcon /> {place.baths} bath &nbsp;
                    <SquareFootIcon /> {place.sqft} sqft
                  </div>
                  <Button variant="contained" className="more-details-button" onClick={() => handleMoreDetails(place)}>
                    More Details
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))
        ) : (
          <Typography>No places found matching your search criteria.</Typography>
        )}
      </div>
      <div className="footer">
      <Footer />
    </div>
    </div>
  </div>
  );
}
