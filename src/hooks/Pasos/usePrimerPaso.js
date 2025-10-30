import { useState } from "react";
import { useCountry } from "../useCountry";

export const usePrimerPaso = (initialData, onNext) => {
  const [nombre, setNombre] = useState(initialData.nombre || "");
  const [inicioAt, setInicioAt] = useState(initialData.inicioAt || "");
  const [finAt, setFinAt] = useState(initialData.finAt || "");
  const [banner, setBanner] = useState(initialData.banner || null);

  const [lugar, setLugar] = useState({
    direccion: initialData.lugar?.direccion || "",
    ciudad: initialData.lugar?.ciudad || "",
    provincia: initialData.lugar?.provincia || "",
    latitud: initialData.lugar?.latitud || null,
    longitud: initialData.lugar?.longitud || null,
    pais: initialData.lugar?.pais || "",
    isoCodigoPais: initialData.lugar?.isoCodigoPais || "",
  });

  const [error, setError] = useState("");
  const [touched, setTouched] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(initialData.lugar?.pais || "");
  const [showOnMap, setShowOnMap] = useState(null);

  const {countries, getCountryDetails} = useCountry();

  // Cargar la capital del país para visualizar en el mapa - SOAP
    const handleCountryChange = async (pais) => {
    const selected = countries.find(c => c.name === pais);
    if (!selected) return;

    setSelectedCountry(selected.name);
    setLugar({ direccion: "", ciudad: "", provincia: "" });

    try {
      const data = await getCountryDetails(selected.isoCode);
      setShowOnMap({
        capital: data.sCapitalCity,
        country: selected.name,
        iso: selected.isoCode,
      });
    } catch (error) {
      console.error("Error al obtener datos del país:", error);
    }
  };

  // Selección de ubicación
  const handleLocationSelect = (location) => {
    if (!location) return;
    setLugar({
      direccion: location.direccion || "",
      ciudad: location.ciudad || "",
      provincia: location.provincia || "",
      latitud: location.latitud,
      longitud: location.longitud,
      pais: location.pais || "",
      isoCodigoPais: location.isoCodigoPais || "",
    });
  };

  // Validación y continuar
  const handleContinue = () => {
    setTouched(true);

    if (!nombre || !inicioAt || !finAt || !lugar.direccion || !selectedCountry) {
      setError("Completa todos los campos requeridos.");
      return;
    }

    const inicioDate = new Date(inicioAt);
    const finDate = new Date(finAt);
    const now = new Date();

    if (isNaN(inicioDate.getTime()) || inicioDate <= now) {
      setError("La fecha de inicio debe ser válida y en el futuro.");
      return;
    }

    if (isNaN(finDate.getTime()) || finDate <= inicioDate) {
      setError("La fecha de finalización debe ser válida y posterior al inicio.");
      return;
    }

    setError("");
    onNext({ nombre, inicioAt, finAt, banner, lugar });
  };

  return {
    nombre,
    setNombre,
    inicioAt,
    setInicioAt,
    finAt,
    setFinAt,
    banner,
    setBanner,
    lugar,
    setLugar,
    error,
    touched,
    setTouched,
    countries,
    selectedCountry,
    handleCountryChange,
    handleContinue,
    handleLocationSelect,
    showOnMap,
  };
};
