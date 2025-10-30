import { createContext,  useEffect, useState } from "react";
import { getCountries, getCountryByIso } from "../api/countries";

export const CountryContext = createContext();

export const CountryProvider = ({ children }) => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [countryCache, setCountryCache] = useState({});

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await getCountries();
        const formatted = data.countries.map((c) => ({
          name: c.name,
          iso: c.isoCode,
        }));
        setCountries(formatted);
      } catch (err) {
        setError("Error al cargar los países.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const getCountryDetails = async (iso) => {
    if (countryCache[iso]) return countryCache[iso];
    try {
      const data = await getCountryByIso(iso);
      setCountryCache((prev) => ({ ...prev, [iso]: data }));
      return data;
    } catch (err) {
      console.error("Error al obtener país:", err);
      throw err;
    }
  };

  return (
    <CountryContext.Provider
      value={{
        countries,
        loading,
        error,
        getCountryDetails,
      }}
    >
      {children}
    </CountryContext.Provider>
  );
};
