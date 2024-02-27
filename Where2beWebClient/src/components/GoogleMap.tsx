import React, { CSSProperties, useState } from 'react';
import { GoogleMap, LoadScript, Marker, Autocomplete } from '@react-google-maps/api';
import { useCookies } from 'react-cookie';
import { styles } from '../assets/homeStyles';


interface GoogleMapsComponentProps {
  apiKey: string;
  isDialogOpen: boolean;
  onLocationDataChange?: (latLon: { lat: any; lon: any }) => void;
  mapContainerStyle: {
    width: CSSProperties['width'],
    height: CSSProperties['height'],
  };
}

const defaultZoom = 10;

const GoogleMapsComponent: React.FC<GoogleMapsComponentProps> = ({ apiKey, isDialogOpen, onLocationDataChange, mapContainerStyle }) => {
  const [searchBox, setSearchBox] = useState<google.maps.places.Autocomplete | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null);
  const defaultCenter = { lat: 37.8746429, lng: 32.4931554 };
  const [cookies, , removeCookie] = useCookies(['email', 'accessToken', 'folder_id', 'lat', 'lng', 'title', 'description']);
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
    <LoadScript onLoad={handleGoogleMap} googleMapsApiKey={apiKey} libraries={['places']}>
      {isDialogOpen || cookies.lat ?
        (<GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={zoom}
        >
          {
            cookies.lat && cookies.lng ? (
              <Marker position={{ lat: newCenter!.lat, lng: newCenter!.lng }} />
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
                <Autocomplete onLoad={(autocomplete) => setSearchBox(autocomplete)} onPlaceChanged={onPlaceChanged}>
                  <input type="text" placeholder="Search for a location" style={styles.googleMapsTextInput} />
                </Autocomplete>
              )
          }
        </GoogleMap>) : null}
    </LoadScript>
  );
};

export default GoogleMapsComponent;
