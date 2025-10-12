import { Outlet } from "react-router-dom";
import { EquipoProvider } from "../context/EquipoContext";

export function EquipoLayout() {
  return (
    <EquipoProvider>
      <Outlet />
    </EquipoProvider>
  )
}