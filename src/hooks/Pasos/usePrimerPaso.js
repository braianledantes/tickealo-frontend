import { useState, useEffect } from "react";
import { getCountries, getCountryByIso } from "../../api/countries";

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
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(initialData.lugar?.pais || "");
  const [showOnMap, setShowOnMap] = useState(null);

  // Carga de países para el selector - SOAP
  useEffect(() => {
    getCountries()
      .then((data) => {
        const options = data.countries.map((c) => ({
          label: c.name,
          value: c.name,
          iso: c.isoCode,
        }));
        setCountries(options);
      })
      .catch((err) => console.error("Error al obtener países:", err));
  }, []);

  // Cargar la capital del país para visualizar en el mapa - SOAP
  const handleCountryChange = async (pais) => {
    setSelectedCountry(pais);
    setLugar({ direccion: "", ciudad: "", provincia: "" });
    const selected = countries.find((c) => c.value === pais);
    if (!selected) return;

    try {
      const data = await getCountryByIso(selected.iso);
      setShowOnMap({
        capital: data.sCapitalCity,
        country: pais,
        iso: data.sCurrencyISOCode, 
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
