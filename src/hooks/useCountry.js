import { useContext } from "react";
import { CountryContext } from "../context/CountryContext.jsx";

export const useCountry = () => {
  const context = useContext(CountryContext)

  if (!context) {
    throw new Error("useCountry must be used within an CountryProvider ")
  }

  return context;
}