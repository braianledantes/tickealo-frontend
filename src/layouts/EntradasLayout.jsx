import { Outlet } from "react-router-dom";
import { ComprasProvider } from "../context/ComprasContext";

export function EntradasLayout() {
  return (
    <ComprasProvider>
      <Outlet />
    </ComprasProvider>
  )
}