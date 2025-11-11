import { createContext, useEffect, useState } from "react";
import { getCountries, getCountryByIso } from "../api/countries";

export const CountryContext = createContext();

export const CountryProvider = ({ children }) => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCountries()
      .then((options) => {
        console.log("Países recibidos desde el backend:", options);
        setCountries(options.countries);
      })
      .catch((err) => console.error("Error al obtener países:", err))
      .finally(() => setLoading(false));
  }, []);

  const getCountryDetails = async (iso) => {
    try {
      return await getCountryByIso(iso);
    } catch (err) {
      console.error("Error al obtener país por ISO:", err);
      return null;
    }
  };
  return (
    <CountryContext.Provider value={{ countries, loading, getCountryDetails }}>
      {children}
    </CountryContext.Provider>
  );
};
