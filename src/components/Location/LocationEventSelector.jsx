import { useState, useEffect, useRef } from "react";
import { AdvancedMarker, APIProvider, Map, Pin } from "@vis.gl/react-google-maps";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";
const MAP_ID = import.meta.env.VITE_GOOGLE_MAPS_MAP_ID || "";

export default function LocationEventSelector({ direccion, onLocationSelect, country, capital, iso }) {
  const [position, setPosition] = useState({ lat: -38.9432, lng: -68.0621 });
  const [marker, setMarker] = useState(null);
  const [googleLoaded, setGoogleLoaded] = useState(false);
  const mapRef = useRef(null);
  const [mapKey, setMapKey] = useState(0); 

  // Cargar script
  useEffect(() => {
    if (window.google && window.google.maps) {
      setGoogleLoaded(true);
      return;
    }
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`;
    script.async = true;
    script.onload = () => setGoogleLoaded(true);
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  // Geocoding al cambiar país/capital
  useEffect(() => {
    if (!country || !googleLoaded) return;

    const geocoder = new window.google.maps.Geocoder();
    const address = capital ? `${capital}, ${country}` : country;

    geocoder.geocode({ address }, (results, status) => {
      if (status === "OK" && results[0]) {
        const loc = results[0].geometry.location;
        const newPos = { lat: loc.lat(), lng: loc.lng() };
        setPosition(newPos);
        setMarker(null);

        setMapKey(prev => prev + 1);

        if (mapRef.current?.googleMap) {
          mapRef.current.googleMap.panTo(newPos);
        }
      }
    });
  }, [country, capital, googleLoaded]);

  const handleClick = (e) => {
    const location = e.detail.latLng;
    if (!location) return;

    setMarker({ key: "marker", location });

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location }, (results, status) => {
      if (status === "OK" && results[0]) {
        const ac = results[0].address_components;
        const cityComp = ac.find(c => c.types.includes("locality")) || ac.find(c => c.types.includes("administrative_area_level_2"));
        const provinceComp = ac.find(c => c.types.includes("administrative_area_level_1"));
        const streetComp = ac.find(c => c.types.includes("route"));
        const numberComp = ac.find(c => c.types.includes("street_number"));

        const city = cityComp?.long_name || "";
        const province = provinceComp?.long_name || "";
        const street = streetComp?.long_name || "";
        const number = numberComp?.long_name || "";
        const formattedAddress = [street, number, city, province].filter(Boolean).join(", ");

        onLocationSelect({
          latitud: location.lat,
          longitud: location.lng,
          direccion: formattedAddress,
          ciudad: city,
          provincia: province,
          pais: country || "",
          isoCodigoPais: iso,
        });
      }
    });
  };

  if (!googleLoaded) return <p className="text-center">Cargando mapa...</p>;

  return (
    <APIProvider apiKey={API_KEY}>
      <Map
        key={mapKey}
        ref={mapRef}
        className="w-full h-80 rounded-lg"
        defaultZoom={13}
        mapId={MAP_ID}
        colorScheme="DARK"
        defaultCenter={position}
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
