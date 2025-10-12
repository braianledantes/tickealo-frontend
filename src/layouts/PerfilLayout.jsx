import { Outlet } from "react-router-dom";
import { PerfilProvider } from "../context/PerfilContext";

export function PerfilLayout() {
  return (
    <PerfilProvider>
      <Outlet />
    </PerfilProvider>
  )
}