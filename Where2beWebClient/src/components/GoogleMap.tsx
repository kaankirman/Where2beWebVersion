import { styles } from '../assets/dialogStyles';
import React, { useState, useRef, useEffect } from 'react';
import searchImg from '../assets/search.png';

interface GoogleMapProps {
  apiKey: string;
  searchBar: boolean;
}

const GoogleMap: React.FC<GoogleMapProps> = ({ apiKey, searchBar }) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const locationInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Load the Google Maps API script dynamically
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.addEventListener('load', initializeMap);
    document.head.appendChild(script);
  }, [apiKey]);

  const initializeMap = () => {
    const initialPosition = { lat: -34.397, lng: 150.644 };
    const mapContainer = document.getElementById('mapContainer');

    if (mapContainer) {
      const mapInstance = new google.maps.Map(mapContainer, {
        center: initialPosition,
        zoom: 8,
      });
      setMap(mapInstance);
    }
  };

  const searchLocation = () => {
    if (map && locationInputRef.current) {
      const location = locationInputRef.current.value;
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: location }, (results, status) => {
        if (status === 'OK' && results[0].geometry) {
          map.setCenter(results[0].geometry.location);

          new google.maps.Marker({
            map,
            position: results[0].geometry.location,
            title: results[0].formatted_address,
          });
        } else {
          console.error('Geocode was not successful for the following reason:', status);
        }
      });
    }
  };

  return (
    <div>
      {searchBar &&
        <div>
          <label style={styles.titleStyle} htmlFor="locationInput">Enter Location:</label>
          <div style={styles.googleApiDiv} >
            <input style={styles.inputStyle} type="text" id="locationInput" ref={locationInputRef} />
            <img style={styles.googleApiDivSearchImage} onClick={searchLocation} src={searchImg} alt="Search Button" />
          </div>
        </div>
      }
      <div id="mapContainer" style={{ height: '400px' }}></div>
    </div>
  );
};

export default GoogleMap;
