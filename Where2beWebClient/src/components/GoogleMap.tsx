import React, { CSSProperties, useState } from 'react';
import { GoogleMap, LoadScript, Marker, Autocomplete } from '@react-google-maps/api';
import { useCookies } from 'react-cookie';


interface GoogleMapsComponentProps {
  apiKey: string;
  isDialogOpen: boolean;
  onLocationDataChange?: (latLon: { lat: any; lon: any }) => void;
  mapContainerStyle : {
    width: CSSProperties['width'],
    height: CSSProperties['height'],
  };
}

const defaultZoom = 10;

const GoogleMapsComponent: React.FC<GoogleMapsComponentProps> = ({ apiKey, isDialogOpen, onLocationDataChange,mapContainerStyle }) => {
  const [searchBox, setSearchBox] = useState<google.maps.places.Autocomplete | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null);
  const defaultCenter = { lat: 37.8746429, lng: 32.4931554 };
  const [cookies, ,removeCookie] = useCookies(['email', 'accessToken', 'folder_id', 'lat', 'lng', 'title', 'description']);
  let newCenter: { lat: any; lng: any; } | null = null;

  const onPlaceChanged = () => {
    if (searchBox) {
      const places = searchBox.getPlace();
      if (places.geometry && places.geometry.location) {
        const place = places;
        setSelectedPlace(place);
        {
          removeCookie('lat');
          removeCookie('lng');
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

  const handleGoogleMap = () => {
    let center = defaultCenter;
    let zoom = defaultZoom;

    if (cookies.lat && cookies.lng) {
      newCenter = { lat: cookies.lat, lng: cookies.lng };
    }
    if (selectedPlace && selectedPlace.geometry && selectedPlace.geometry.location) {
      newCenter = {
        lat: selectedPlace.geometry.location.lat(),
        lng: selectedPlace.geometry.location.lng()
      };
    }
    if (newCenter) {
      center = newCenter;
      zoom = 14;
    }
    return { center, zoom };
  }

  const { center, zoom } = handleGoogleMap();

  return (
    <LoadScript googleMapsApiKey={apiKey} libraries={['places']}>
      {isDialogOpen || cookies.lat? 
      (<GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={zoom}
      >
        {
          cookies.lat && cookies.lng ? (
            <Marker position={{ lat: cookies.lat, lng: cookies.lng }} />
          ) : null
        }
        {selectedPlace && selectedPlace.geometry && selectedPlace.geometry.location && (
          <Marker
            position={{
              lat: selectedPlace.geometry.location.lat(),
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
      </GoogleMap>) : null}
    </LoadScript>
  );
};

export default GoogleMapsComponent;
