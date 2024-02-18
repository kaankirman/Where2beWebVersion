import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, Autocomplete } from '@react-google-maps/api';
import { Cookies, useCookies } from 'react-cookie';


interface GoogleMapsComponentProps {
  apiKey: string;
  isDialogOpen: boolean;
  onLocationDataChange?: (latLon: { lat: any; lon: any }) => void;
}

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};


const defaultZoom = 10;

const GoogleMapsComponent: React.FC<GoogleMapsComponentProps> = ({ apiKey, isDialogOpen, onLocationDataChange }) => {
  const [searchBox, setSearchBox] = useState<google.maps.places.Autocomplete | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null);
  const defaultCenter = { lat: 37.7749, lng: -122.4194 };
  const [cookies, setCookie, removeCookie] = useCookies(['email', 'accessToken', 'folder_id', 'lat', 'lng', 'title', 'description']);

  const onPlaceChanged = () => {
    if (searchBox) {
      const places = searchBox.getPlace();
      if (places.geometry && places.geometry.location) {
        const place = places;
        setSelectedPlace(place);
        {
          onLocationDataChange &&
          onLocationDataChange(
            {
              lat: place.geometry?.location?.lat(),
              lon: place.geometry?.location?.lng(),
            }
          );
        }
      }
    }
  };

  

  return (
    <LoadScript googleMapsApiKey={apiKey} libraries={['places']}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={selectedPlace?.geometry?.location || defaultCenter}
        zoom={selectedPlace ? 14 : defaultZoom}
      >
        {selectedPlace && selectedPlace.geometry && selectedPlace.geometry.location && (
          <Marker
            position={{
              lat: selectedPlace.geometry.location.lat() ,
              lng: selectedPlace.geometry.location.lng() 
            }}
          />
        )}
        {
          !isDialogOpen ? null :
            (
              <Autocomplete
                onLoad={(autocomplete) => setSearchBox(autocomplete)}
                onPlaceChanged={onPlaceChanged}
              >
                <input
                  type="text"
                  placeholder="Search for a location"
                  style={{
                    boxSizing: `border-box`,
                    border: `1px solid transparent`,
                    width: `240px`,
                    height: `32px`,
                    padding: `0 12px`,
                    borderRadius: `10px`,
                    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                    fontSize: `14px`,
                    outline: `none`,
                    textOverflow: `ellipses`,
                    position: 'absolute',
                    left: '50%',
                    marginLeft: '-120px',
                    marginTop: '10px',
                  }}
                />
              </Autocomplete>
            )
        }
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapsComponent;
