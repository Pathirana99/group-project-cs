import React from 'react';
import './comfortSection.css';

const ComfortSection = () => {
  // Function to focus the appropriate search field in the search bar
  const focusSearchBar = (id) => {
    const searchInput = document.getElementById(id);
    if (searchInput) {
      searchInput.focus();
    }
  };

  return (
    <div className="comfort-container">
      <h2 className="comfort-title">Customize Your Comfort</h2>
      <div className="comfort-features">
        <div className="feature" onClick={() => focusSearchBar('facilities')}>
          <img src="/images/1.5.png" alt="Study Area" />
          <p>Study Area</p>
        </div>
        <div className="feature" onClick={() => focusSearchBar('facilities')}>
          <img src="/images/1.6.png" alt="Cooking" />
          <p>Cooking</p>
        </div>
        <div className="feature" onClick={() => focusSearchBar('facilities')}>
          <img src="/images/1.7.png" alt="Free WiFi" />
          <p>Free WIFI</p>
        </div>
        <div className="feature" onClick={() => focusSearchBar('facilities')}>
          <img src="/images/1.8.png" alt="Pet Allowed" />
          <p>Pet Allowed</p>
        </div>
      </div>
    </div>
  );
}

export default ComfortSection;
