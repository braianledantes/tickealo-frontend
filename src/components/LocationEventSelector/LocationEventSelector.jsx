import { useState } from "react";
import { AdvancedMarker, APIProvider, Map, Pin } from "@vis.gl/react-google-maps";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";
const MAP_ID = import.meta.env.VITE_GOOGLE_MAPS_MAP_ID || "";

export default function LocationEventSelector({ direccion, onLocationSelect }) {
  const [position, setPosition] = useState({ lat: -38.9432, lng: -68.0621 });
  const [marker, setMarker] = useState(null);

  const handleClick = (e) => {
    const location = e.detail.latLng;
    if (!location) return;

    setMarker({ key: "marker", location });

    // Geocoding para obtener dirección, ciudad y provincia
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location }, (results, status) => {
      if (status === "OK" && results[0]) {
        const addressComponents = results[0].address_components;

        // Extraer ciudad y provincia
        const cityComp =
          addressComponents.find((comp) => comp.types.includes("locality")) ||
          addressComponents.find((comp) =>
            comp.types.includes("administrative_area_level_2")
          );

        const provinceComp = addressComponents.find((comp) =>
          comp.types.includes("administrative_area_level_1")
        );

        const city = cityComp ? cityComp.long_name : "";
        const province = provinceComp ? provinceComp.long_name : "";

        // Extraer calle y número
        const streetComp = addressComponents.find((comp) =>
          comp.types.includes("route")
        );
        const numberComp = addressComponents.find((comp) =>
          comp.types.includes("street_number")
        );

        const street = streetComp ? streetComp.long_name : "";
        const number = numberComp ? numberComp.long_name : "";

        const formattedAddress = [street, number, city, province]
          .filter(Boolean)
          .join(", ");

        onLocationSelect({
          latitud: location.lat,
          longitud: location.lng,
          direccion: formattedAddress,
          ciudad: city,
          provincia: province,
        });
      } else {
        onLocationSelect({
          latitud: location.lat,
          longitud: location.lng,
          direccion: "",
          ciudad: "",
          provincia: "",
        });
      }
    });
  };

  return (
    <APIProvider apiKey={API_KEY}>
      <Map
        className="w-full h-80 rounded-lg"
        defaultZoom={13}
        colorScheme="DARK"
        defaultCenter={position}
        mapId={MAP_ID}
        streetViewControl={false}
        fullscreenControl={false}
        mapTypeControl={false}
        onClick={handleClick}
      >
        {marker && (
          <AdvancedMarker key={marker.key} position={marker.location}>
            <Pin background="#9810fa" glyphColor="#000" borderColor="#000" />
          </AdvancedMarker>
        )}
      </Map>
    </APIProvider>
  );
}
