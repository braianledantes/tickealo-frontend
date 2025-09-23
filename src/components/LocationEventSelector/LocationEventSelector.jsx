import { AdvancedMarker, APIProvider, Map, Pin } from "@vis.gl/react-google-maps";
import { useState } from "react";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";
const MAP_ID = import.meta.env.VITE_GOOGLE_MAPS_MAP_ID || "";

export default function LocationEventSelector({ onLocationSelect }) {
  const [marker, setMarker] = useState(null);
  const [address, setAddress] = useState(null);

  const handleClick = (e) => {
    const location = e.detail.latLng;
    if (!location) return;
    setMarker({ key: 'algo', location: location });

    // eslint-disable-next-line no-undef
    const geocoder = new google.maps.Geocoder();

    // obtiene los datos de la ubicacion clickeada
    geocoder.geocode({ location }, (result, status) => {
      if (status === 'OK') {
        if (result && result[0]) {
          onLocationSelect({
            latitude: location.lat,
            longitude: location.lng,
            address: result[0].formatted_address,
            placeId: result[0].place_id,
          });
          setAddress(result[0].formatted_address);
        } else {
          setAddress('No results found');
        }
      } else {
        setAddress('Geocoder failed due to: ' + status);
      }
    })
  }

  return (
    <APIProvider apiKey={API_KEY} >
      <Map className="w-full h-full rounded-lg"
        defaultZoom={13}
        colorScheme="DARK"
        streetViewControl={false}
        fullscreenControl={false}
        cameraControl={false}
        mapTypeControl={false}
        defaultTilt={0}
        defaultCenter={{ lat: -38.943245275389835, lng: -68.06217042298118 }}
        mapId={MAP_ID}
        onClick={handleClick}
      >
        {marker && <PoiMarker poi={marker} />}
      </Map>
      {address && (
        <div className="mt-2 text-white bg-black/30 p-2 rounded">
          <strong>Address:</strong> {address}
        </div>
      )}
    </APIProvider>
  )
}

const PoiMarker = ({ poi }) => {
  return (
    <AdvancedMarker
      key={poi.key}
      position={poi.location}
    >
      <Pin background={'#9810fa'} glyphColor={'#000'} borderColor={'#000'} />
    </AdvancedMarker>
  );
};