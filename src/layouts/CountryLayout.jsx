import { Outlet } from "react-router-dom";
import { CountryProvider } from "../context/CountryContext";

export function CountryLayout() {
  return (
    <CountryProvider>
      <Outlet />
    </CountryProvider>
  )
}